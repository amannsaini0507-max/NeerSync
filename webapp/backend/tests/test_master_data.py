import pytest
from pathlib import Path
from httpx import AsyncClient
from app.config import settings

SAMPLE_CSV_PATH = Path(__file__).resolve().parent.parent / "app" / "seed" / "sample_data.csv"


@pytest.mark.asyncio
async def test_get_master_entities(client: AsyncClient):
    """Verifies retrieval of seeded GP, Scheme, Node, and FHTC."""
    # GP Master
    gp_res = await client.get("/api/v1/master/gps/245123")
    assert gp_res.status_code == 200
    gp = gp_res.json()
    assert gp["lgd_gp_code"] == "245123"
    assert gp["name"] == "Badepur"
    assert gp["district"] == "Meerut"
    assert gp["total_fhtc"] >= 50

    # Scheme Master
    sch_res = await client.get("/api/v1/master/schemes/SCH-UP-245123")
    assert sch_res.status_code == 200
    assert sch_res.json()["scheme_id"] == "SCH-UP-245123"

    # Node Master
    node_res = await client.get("/api/v1/master/nodes/NS-UP-245123-N001")
    assert node_res.status_code == 200
    node = node_res.json()
    assert node["node_id"] == "NS-UP-245123-N001"
    assert node["type"] == "pump"

    # FHTC Master
    fhtc_res = await client.get("/api/v1/master/fhtcs/FHTC-UP-245123-0042")
    assert fhtc_res.status_code == 200
    fhtc = fhtc_res.json()
    assert fhtc["fhtc_id"] == "FHTC-UP-245123-0042"
    assert fhtc["lgd_gp_code"] == "245123"


@pytest.mark.asyncio
async def test_csv_bulk_import(client: AsyncClient):
    """Verifies importing master data hierarchy from CSV file."""
    assert SAMPLE_CSV_PATH.exists(), "Sample CSV file missing"
    with open(SAMPLE_CSV_PATH, "rb") as f:
        files = {"file": ("sample_data.csv", f, "text/csv")}
        resp = await client.post("/api/v1/master/import-csv", files=files)
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "success"
        assert data["imported_records"] >= 4
