import csv
import io
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.master import GramPanchayat, Scheme, Node, FHTC, Habitation, Village, Block, District, State
from app.schemas.master import (
    GPMasterResponse,
    SchemeMasterResponse,
    NodeMasterResponse,
    FHTCMasterResponse
)

router = APIRouter(prefix="/api/v1/master", tags=["Master Data Hierarchy"])


@router.get("/gps/{lgd_gp_code}", response_model=GPMasterResponse)
async def get_gp_master(lgd_gp_code: str, db: AsyncSession = Depends(get_db)):
    """Get Gram Panchayat Master Data by 6-digit LGD code."""
    res = await db.execute(select(GramPanchayat).where(GramPanchayat.lgd_gp_code == lgd_gp_code))
    gp = res.scalar_one_or_none()
    if not gp:
        raise HTTPException(status_code=404, detail=f"Gram Panchayat with LGD code {lgd_gp_code} not found")

    # Fetch associated schemes
    schemes_res = await db.execute(select(Scheme.scheme_id).where(Scheme.lgd_gp_code == lgd_gp_code))
    scheme_ids = [s for (s,) in schemes_res.all()]

    return GPMasterResponse(
        lgd_gp_code=gp.lgd_gp_code,
        name=gp.name,
        district=gp.district,
        state=gp.state,
        total_fhtc=gp.total_fhtc,
        schemes=scheme_ids
    )


@router.get("/schemes/{scheme_id}", response_model=SchemeMasterResponse)
async def get_scheme_master(scheme_id: str, db: AsyncSession = Depends(get_db)):
    """Get Water Supply Scheme Master Data."""
    res = await db.execute(select(Scheme).where(Scheme.scheme_id == scheme_id))
    sch = res.scalar_one_or_none()
    if not sch:
        raise HTTPException(status_code=404, detail=f"Scheme {scheme_id} not found")

    return SchemeMasterResponse(
        scheme_id=sch.scheme_id,
        name=sch.name,
        lgd_gp_code=sch.lgd_gp_code,
        state=sch.state,
        source_type=sch.source_type
    )


@router.get("/nodes/{node_id}", response_model=NodeMasterResponse)
async def get_node_details(node_id: str, db: AsyncSession = Depends(get_db)):
    """Get IoT Node Details and configuration."""
    res = await db.execute(select(Node).where(Node.node_id == node_id))
    node = res.scalar_one_or_none()
    if not node:
        raise HTTPException(status_code=404, detail=f"Node {node_id} not found")

    return NodeMasterResponse(
        node_id=node.node_id,
        lgd_gp_code=node.lgd_gp_code,
        scheme_id=node.scheme_id,
        type=node.type,
        fw=node.fw,
        status=node.status,
        battery_v=node.battery_v,
        rssi_dbm=node.rssi_dbm,
        branch=node.branch or "Main"
    )


@router.get("/fhtcs/{fhtc_id}", response_model=FHTCMasterResponse)
async def get_fhtc_details(fhtc_id: str, db: AsyncSession = Depends(get_db)):
    """Get Household FHTC Details."""
    res = await db.execute(select(FHTC).where(FHTC.fhtc_id == fhtc_id))
    fhtc = res.scalar_one_or_none()
    if not fhtc:
        raise HTTPException(status_code=404, detail=f"FHTC {fhtc_id} not found")

    return FHTCMasterResponse(
        fhtc_id=fhtc.fhtc_id,
        habitation_id=fhtc.habitation_id,
        lgd_gp_code=fhtc.lgd_gp_code,
        consumer_name_masked=fhtc.consumer_name_masked,
        phone_masked=fhtc.phone_masked,
        status=fhtc.status,
        branch=fhtc.branch or "Main_Branch",
        lat=fhtc.lat,
        lon=fhtc.lon
    )


@router.post("/import-csv", status_code=status.HTTP_200_OK)
async def import_master_hierarchy_csv(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    CSV Bulk Import for JJM Master Hierarchy:
    State > District > Block > GP > Village > Habitation > FHTC.
    """
    content = await file.read()
    decoded = content.decode("utf-8")
    reader = csv.DictReader(io.StringIO(decoded))

    imported_count = 0
    for row in reader:
        # Expected columns: state_code, state_name, district_code, district_name, block_code, block_name,
        # lgd_gp_code, gp_name, village_id, village_name, habitation_id, habitation_name, fhtc_id, consumer_name
        gp_code = row.get("lgd_gp_code", "").strip()
        fhtc_id = row.get("fhtc_id", "").strip()
        hab_id = row.get("habitation_id", "").strip()

        if not gp_code or not fhtc_id:
            continue

        # Check / Create GP
        gp_res = await db.execute(select(GramPanchayat).where(GramPanchayat.lgd_gp_code == gp_code))
        gp = gp_res.scalar_one_or_none()
        if not gp:
            gp = GramPanchayat(
                lgd_gp_code=gp_code,
                name=row.get("gp_name", "Demo GP"),
                district=row.get("district_name", "Demo District"),
                state=row.get("state_code", "UP"),
                total_fhtc=1
            )
            db.add(gp)
            await db.flush()
        else:
            gp.total_fhtc += 1

        # Check / Create Village
        village_id = row.get("village_id", f"VIL-{gp_code}")
        v_res = await db.execute(select(Village).where(Village.village_id == village_id))
        if not v_res.scalar_one_or_none():
            db.add(Village(village_id=village_id, name=row.get("village_name", "Demo Village"), lgd_gp_code=gp_code))
            await db.flush()

        # Check / Create Habitation
        if not hab_id:
            hab_id = f"HAB-{gp_code}-001"
        h_res = await db.execute(select(Habitation).where(Habitation.habitation_id == hab_id))
        if not h_res.scalar_one_or_none():
            db.add(Habitation(habitation_id=hab_id, name=row.get("habitation_name", "Main Habitation"), village_id=village_id, lgd_gp_code=gp_code))
            await db.flush()

        # Create FHTC
        fhtc_res = await db.execute(select(FHTC).where(FHTC.fhtc_id == fhtc_id))
        if not fhtc_res.scalar_one_or_none():
            phone = row.get("phone", "9876543210")
            masked_phone = phone[:2] + "XXXX" + phone[-4:] if len(phone) >= 6 else "XXXXXX0000"
            fhtc = FHTC(
                fhtc_id=fhtc_id,
                habitation_id=hab_id,
                lgd_gp_code=gp_code,
                consumer_name_masked=row.get("consumer_name", "Resident")[:2] + "***",
                phone_masked=masked_phone,
                lat=float(row["lat"]) if row.get("lat") else None,
                lon=float(row["lon"]) if row.get("lon") else None,
                branch=row.get("branch", "Main_Branch"),
                status=row.get("status", "functional")
            )
            db.add(fhtc)
            await db.flush()
            imported_count += 1

    await db.commit()
    return {"status": "success", "imported_records": imported_count}
