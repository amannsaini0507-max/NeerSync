(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="174",Ri={ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kd=0,lc=1,Zd=2,Jd=0,Xu=1,Va=2,yn=3,Fn=0,Nt=1,xn=2,Un=0,Pi=1,uc=2,dc=3,hc=4,Qd=5,Jn=100,eh=101,th=102,nh=103,ih=104,rh=200,sh=201,ah=202,oh=203,Ga=204,Wa=205,ch=206,lh=207,uh=208,dh=209,hh=210,fh=211,ph=212,mh=213,_h=214,qa=0,ja=1,Xa=2,Ii=3,Ya=4,Ka=5,Za=6,Ja=7,Yu=0,gh=1,vh=2,On=0,yh=1,xh=2,Sh=3,Ku=4,Mh=5,Eh=6,bh=7,Zu=300,Li=301,Ni=302,Qa=303,eo=304,zs=306,to=1e3,ei=1001,no=1002,nn=1003,wh=1004,or=1005,cn=1006,ea=1007,ti=1008,wn=1009,Ju=1010,Qu=1011,Ji=1012,Oo=1013,ni=1014,Sn=1015,Qi=1016,Fo=1017,ko=1018,Ui=1020,ed=35902,td=1021,nd=1022,tn=1023,id=1024,rd=1025,Ci=1026,Oi=1027,sd=1028,$o=1029,ad=1030,Bo=1031,zo=1033,Ps=33776,Cs=33777,Ds=33778,Is=33779,io=35840,ro=35841,so=35842,ao=35843,oo=36196,co=37492,lo=37496,uo=37808,ho=37809,fo=37810,po=37811,mo=37812,_o=37813,go=37814,vo=37815,yo=37816,xo=37817,So=37818,Mo=37819,Eo=37820,bo=37821,Ls=36492,wo=36494,To=36495,od=36283,Ao=36284,Ro=36285,Po=36286,Th=3200,Ah=3201,cd=0,Rh=1,Nn="",qt="srgb",Fi="srgb-linear",Os="linear",st="srgb",oi=7680,fc=519,Ph=512,Ch=513,Dh=514,ld=515,Ih=516,Lh=517,Nh=518,Uh=519,pc=35044,mc="300 es",Mn=2e3,Fs=2001;class si{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ns=Math.PI/180,Co=180/Math.PI;function er(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Oh(i,e){return(i%e+e)%e}function ta(i,e,t){return(1-t)*i+t*e}function Vi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fh={DEG2RAD:Ns};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,s,a,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],p=n[2],m=n[5],g=n[8],M=r[0],f=r[3],d=r[6],_=r[1],v=r[4],y=r[7],x=r[2],E=r[5],b=r[8];return s[0]=a*M+o*_+c*x,s[3]=a*f+o*v+c*E,s[6]=a*d+o*y+c*b,s[1]=l*M+u*_+h*x,s[4]=l*f+u*v+h*E,s[7]=l*d+u*y+h*b,s[2]=p*M+m*_+g*x,s[5]=p*f+m*v+g*E,s[8]=p*d+m*y+g*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,p=o*c-u*s,m=l*s-a*c,g=t*h+n*p+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=h*M,e[1]=(r*l-u*n)*M,e[2]=(o*n-r*a)*M,e[3]=p*M,e[4]=(u*t-r*c)*M,e[5]=(r*s-o*t)*M,e[6]=m*M,e[7]=(n*c-l*t)*M,e[8]=(a*t-n*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(na.makeScale(e,t)),this}rotate(e){return this.premultiply(na.makeRotation(-e)),this}translate(e,t){return this.premultiply(na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const na=new Ve;function ud(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ks(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kh(){const i=ks("canvas");return i.style.display="block",i}const _c={};function Kn(i){i in _c||(_c[i]=!0,console.warn(i))}function $h(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Bh(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zh(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const gc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hh(){const i={enabled:!0,workingColorSpace:Fi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===st&&(r.r=bn(r.r),r.g=bn(r.g),r.b=bn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(r.r=Di(r.r),r.g=Di(r.g),r.b=Di(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Nn?Os:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Fi]:{primaries:e,whitePoint:n,transfer:Os,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:n,transfer:st,toXYZ:gc,fromXYZ:vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),i}const Qe=Hh();function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ci;class Vh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ci===void 0&&(ci=ks("canvas")),ci.width=e.width,ci.height=e.height;const n=ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ci}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ks("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=bn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bn(t[n]/255)*255):t[n]=bn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gh=0;class Ho{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=er(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ia(r[a].image)):s.push(ia(r[a]))}else s=ia(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wh=0;class Ut extends si{constructor(e=Ut.DEFAULT_IMAGE,t=Ut.DEFAULT_MAPPING,n=ei,r=ei,s=cn,a=ti,o=tn,c=wn,l=Ut.DEFAULT_ANISOTROPY,u=Nn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=er(),this.name="",this.source=new Ho(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case to:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case no:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case to:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case no:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Zu;Ut.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,n=0,r=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],h=c[8],p=c[1],m=c[5],g=c[9],M=c[2],f=c[6],d=c[10];if(Math.abs(u-p)<.01&&Math.abs(h-M)<.01&&Math.abs(g-f)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+M)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,y=(m+1)/2,x=(d+1)/2,E=(u+p)/4,b=(h+M)/4,I=(g+f)/4;return v>y&&v>x?v<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(v),r=E/n,s=b/n):y>x?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=E/r,s=I/r):x<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(x),n=b/s,r=I/s),this.set(n,r,s,t),this}let _=Math.sqrt((f-g)*(f-g)+(h-M)*(h-M)+(p-u)*(p-u));return Math.abs(_)<.001&&(_=1),this.x=(f-g)/_,this.y=(h-M)/_,this.z=(p-u)/_,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qh extends si{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ut(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ho(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends qh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dd extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jh extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ri{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const p=s[a+0],m=s[a+1],g=s[a+2],M=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=p,e[t+1]=m,e[t+2]=g,e[t+3]=M;return}if(h!==M||c!==p||l!==m||u!==g){let f=1-o;const d=c*p+l*m+u*g+h*M,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const x=Math.sqrt(v),E=Math.atan2(x,d*_);f=Math.sin(f*E)/x,o=Math.sin(o*E)/x}const y=o*_;if(c=c*f+p*y,l=l*f+m*y,u=u*f+g*y,h=h*f+M*y,f===1-o){const x=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=x,l*=x,u*=x,h*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[a],p=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+u*h+c*m-l*p,e[t+1]=c*g+u*p+l*h-o*m,e[t+2]=l*g+u*m+o*p-c*h,e[t+3]=u*g-o*h-c*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),h=o(s/2),p=c(n/2),m=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=p*u*h+l*m*g,this._y=l*m*h-p*u*g,this._z=l*u*g+p*m*h,this._w=l*u*h-p*m*g;break;case"YXZ":this._x=p*u*h+l*m*g,this._y=l*m*h-p*u*g,this._z=l*u*g-p*m*h,this._w=l*u*h+p*m*g;break;case"ZXY":this._x=p*u*h-l*m*g,this._y=l*m*h+p*u*g,this._z=l*u*g+p*m*h,this._w=l*u*h-p*m*g;break;case"ZYX":this._x=p*u*h-l*m*g,this._y=l*m*h+p*u*g,this._z=l*u*g-p*m*h,this._w=l*u*h+p*m*g;break;case"YZX":this._x=p*u*h+l*m*g,this._y=l*m*h+p*u*g,this._z=l*u*g-p*m*h,this._w=l*u*h-p*m*g;break;case"XZY":this._x=p*u*h-l*m*g,this._y=l*m*h-p*u*g,this._z=l*u*g+p*m*h,this._w=l*u*h+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],p=n+o+h;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,p=Math.sin(t*u)/l;return this._w=a*h+this._w*p,this._x=n*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new V,yc=new ri;class tr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kt):Kt.fromBufferAttribute(s,a),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cr.copy(n.boundingBox)),cr.applyMatrix4(e.matrixWorld),this.union(cr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),lr.subVectors(this.max,Gi),li.subVectors(e.a,Gi),ui.subVectors(e.b,Gi),di.subVectors(e.c,Gi),Tn.subVectors(ui,li),An.subVectors(di,ui),zn.subVectors(li,di);let t=[0,-Tn.z,Tn.y,0,-An.z,An.y,0,-zn.z,zn.y,Tn.z,0,-Tn.x,An.z,0,-An.x,zn.z,0,-zn.x,-Tn.y,Tn.x,0,-An.y,An.x,0,-zn.y,zn.x,0];return!sa(t,li,ui,di,lr)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,li,ui,di,lr))?!1:(ur.crossVectors(Tn,An),t=[ur.x,ur.y,ur.z],sa(t,li,ui,di,lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new V,new V,new V,new V,new V,new V,new V,new V],Kt=new V,cr=new tr,li=new V,ui=new V,di=new V,Tn=new V,An=new V,zn=new V,Gi=new V,lr=new V,ur=new V,Hn=new V;function sa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Hn.fromArray(i,s);const o=r.x*Math.abs(Hn.x)+r.y*Math.abs(Hn.y)+r.z*Math.abs(Hn.z),c=e.dot(Hn),l=t.dot(Hn),u=n.dot(Hn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Xh=new tr,Wi=new V,aa=new V;class Hs{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);const t=Wi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Wi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(aa)),this.expandByPoint(Wi.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hn=new V,oa=new V,dr=new V,Rn=new V,ca=new V,hr=new V,la=new V;class Vs{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){oa.copy(e).add(t).multiplyScalar(.5),dr.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(oa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(dr),o=Rn.dot(this.direction),c=-Rn.dot(dr),l=Rn.lengthSq(),u=Math.abs(1-a*a);let h,p,m,g;if(u>0)if(h=a*c-o,p=a*o-c,g=s*u,h>=0)if(p>=-g)if(p<=g){const M=1/u;h*=M,p*=M,m=h*(h+a*p+2*o)+p*(a*h+p+2*c)+l}else p=s,h=Math.max(0,-(a*p+o)),m=-h*h+p*(p+2*c)+l;else p=-s,h=Math.max(0,-(a*p+o)),m=-h*h+p*(p+2*c)+l;else p<=-g?(h=Math.max(0,-(-a*s+o)),p=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+p*(p+2*c)+l):p<=g?(h=0,p=Math.min(Math.max(-s,-c),s),m=p*(p+2*c)+l):(h=Math.max(0,-(a*s+o)),p=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+p*(p+2*c)+l);else p=a>0?-s:s,h=Math.max(0,-(a*p+o)),m=-h*h+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(oa).addScaledVector(dr,p),m}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),r=hn.dot(hn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,r=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,r=(e.min.x-p.x)*l),u>=0?(s=(e.min.y-p.y)*u,a=(e.max.y-p.y)*u):(s=(e.max.y-p.y)*u,a=(e.min.y-p.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-p.z)*h,c=(e.max.z-p.z)*h):(o=(e.max.z-p.z)*h,c=(e.min.z-p.z)*h),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,s){ca.subVectors(t,e),hr.subVectors(n,e),la.crossVectors(ca,hr);let a=this.direction.dot(la),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Rn.subVectors(this.origin,e);const c=o*this.direction.dot(hr.crossVectors(Rn,hr));if(c<0)return null;const l=o*this.direction.dot(ca.cross(Rn));if(l<0||c+l>a)return null;const u=-o*Rn.dot(la);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,n,r,s,a,o,c,l,u,h,p,m,g,M,f){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,h,p,m,g,M,f)}set(e,t,n,r,s,a,o,c,l,u,h,p,m,g,M,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=p,d[3]=m,d[7]=g,d[11]=M,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/hi.setFromMatrixColumn(e,0).length(),s=1/hi.setFromMatrixColumn(e,1).length(),a=1/hi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const p=a*u,m=a*h,g=o*u,M=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=m+g*l,t[5]=p-M*l,t[9]=-o*c,t[2]=M-p*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const p=c*u,m=c*h,g=l*u,M=l*h;t[0]=p+M*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=M+p*o,t[10]=a*c}else if(e.order==="ZXY"){const p=c*u,m=c*h,g=l*u,M=l*h;t[0]=p-M*o,t[4]=-a*h,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=M-p*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const p=a*u,m=a*h,g=o*u,M=o*h;t[0]=c*u,t[4]=g*l-m,t[8]=p*l+M,t[1]=c*h,t[5]=M*l+p,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const p=a*c,m=a*l,g=o*c,M=o*l;t[0]=c*u,t[4]=M-p*h,t[8]=g*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*h+g,t[10]=p-M*h}else if(e.order==="XZY"){const p=a*c,m=a*l,g=o*c,M=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=p*h+M,t[5]=a*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=o*u,t[10]=M*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yh,e,Kh)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Pn.crossVectors(n,Ft),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Pn.crossVectors(n,Ft)),Pn.normalize(),fr.crossVectors(Ft,Pn),r[0]=Pn.x,r[4]=fr.x,r[8]=Ft.x,r[1]=Pn.y,r[5]=fr.y,r[9]=Ft.y,r[2]=Pn.z,r[6]=fr.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],p=n[9],m=n[13],g=n[2],M=n[6],f=n[10],d=n[14],_=n[3],v=n[7],y=n[11],x=n[15],E=r[0],b=r[4],I=r[8],A=r[12],w=r[1],U=r[5],$=r[9],B=r[13],H=r[2],te=r[6],Q=r[10],oe=r[14],K=r[3],de=r[7],R=r[11],T=r[15];return s[0]=a*E+o*w+c*H+l*K,s[4]=a*b+o*U+c*te+l*de,s[8]=a*I+o*$+c*Q+l*R,s[12]=a*A+o*B+c*oe+l*T,s[1]=u*E+h*w+p*H+m*K,s[5]=u*b+h*U+p*te+m*de,s[9]=u*I+h*$+p*Q+m*R,s[13]=u*A+h*B+p*oe+m*T,s[2]=g*E+M*w+f*H+d*K,s[6]=g*b+M*U+f*te+d*de,s[10]=g*I+M*$+f*Q+d*R,s[14]=g*A+M*B+f*oe+d*T,s[3]=_*E+v*w+y*H+x*K,s[7]=_*b+v*U+y*te+x*de,s[11]=_*I+v*$+y*Q+x*R,s[15]=_*A+v*B+y*oe+x*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],p=e[10],m=e[14],g=e[3],M=e[7],f=e[11],d=e[15];return g*(+s*c*h-r*l*h-s*o*p+n*l*p+r*o*m-n*c*m)+M*(+t*c*m-t*l*p+s*a*p-r*a*m+r*l*u-s*c*u)+f*(+t*l*h-t*o*m-s*a*h+n*a*m+s*o*u-n*l*u)+d*(-r*o*u-t*c*h+t*o*p+r*a*h-n*a*p+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],p=e[10],m=e[11],g=e[12],M=e[13],f=e[14],d=e[15],_=h*f*l-M*p*l+M*c*m-o*f*m-h*c*d+o*p*d,v=g*p*l-u*f*l-g*c*m+a*f*m+u*c*d-a*p*d,y=u*M*l-g*h*l+g*o*m-a*M*m-u*o*d+a*h*d,x=g*h*c-u*M*c-g*o*p+a*M*p+u*o*f-a*h*f,E=t*_+n*v+r*y+s*x;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/E;return e[0]=_*b,e[1]=(M*p*s-h*f*s-M*r*m+n*f*m+h*r*d-n*p*d)*b,e[2]=(o*f*s-M*c*s+M*r*l-n*f*l-o*r*d+n*c*d)*b,e[3]=(h*c*s-o*p*s-h*r*l+n*p*l+o*r*m-n*c*m)*b,e[4]=v*b,e[5]=(u*f*s-g*p*s+g*r*m-t*f*m-u*r*d+t*p*d)*b,e[6]=(g*c*s-a*f*s-g*r*l+t*f*l+a*r*d-t*c*d)*b,e[7]=(a*p*s-u*c*s+u*r*l-t*p*l-a*r*m+t*c*m)*b,e[8]=y*b,e[9]=(g*h*s-u*M*s-g*n*m+t*M*m+u*n*d-t*h*d)*b,e[10]=(a*M*s-g*o*s+g*n*l-t*M*l-a*n*d+t*o*d)*b,e[11]=(u*o*s-a*h*s-u*n*l+t*h*l+a*n*m-t*o*m)*b,e[12]=x*b,e[13]=(u*M*r-g*h*r+g*n*p-t*M*p-u*n*f+t*h*f)*b,e[14]=(g*o*r-a*M*r-g*n*c+t*M*c+a*n*f-t*o*f)*b,e[15]=(a*h*r-u*o*r+u*n*c-t*h*c-a*n*p+t*o*p)*b,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,p=s*l,m=s*u,g=s*h,M=a*u,f=a*h,d=o*h,_=c*l,v=c*u,y=c*h,x=n.x,E=n.y,b=n.z;return r[0]=(1-(M+d))*x,r[1]=(m+y)*x,r[2]=(g-v)*x,r[3]=0,r[4]=(m-y)*E,r[5]=(1-(p+d))*E,r[6]=(f+_)*E,r[7]=0,r[8]=(g+v)*b,r[9]=(f-_)*b,r[10]=(1-(p+M))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=hi.set(r[0],r[1],r[2]).length();const a=hi.set(r[4],r[5],r[6]).length(),o=hi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Zt.copy(this);const l=1/s,u=1/a,h=1/o;return Zt.elements[0]*=l,Zt.elements[1]*=l,Zt.elements[2]*=l,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Mn){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let m,g;if(o===Mn)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Fs)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Mn){const c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(a-s),p=(t+e)*l,m=(n+r)*u;let g,M;if(o===Mn)g=(a+s)*h,M=-2*h;else if(o===Fs)g=s*h,M=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=M,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const hi=new V,Zt=new lt,Yh=new V(0,0,0),Kh=new V(1,1,1),Pn=new V,fr=new V,Ft=new V,xc=new lt,Sc=new ri;class ln{constructor(e=0,t=0,n=0,r=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],p=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sc.setFromEuler(this),this.setFromQuaternion(Sc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class Vo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zh=0;const Mc=new V,fi=new ri,fn=new lt,pr=new V,qi=new V,Jh=new V,Qh=new ri,Ec=new V(1,0,0),bc=new V(0,1,0),wc=new V(0,0,1),Tc={type:"added"},ef={type:"removed"},pi={type:"childadded",child:null},ua={type:"childremoved",child:null};class St extends si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new V,t=new ln,n=new ri,r=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new lt},normalMatrix:{value:new Ve}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.multiply(fi),this}rotateOnWorldAxis(e,t){return fi.setFromAxisAngle(e,t),this.quaternion.premultiply(fi),this}rotateX(e){return this.rotateOnAxis(Ec,e)}rotateY(e){return this.rotateOnAxis(bc,e)}rotateZ(e){return this.rotateOnAxis(wc,e)}translateOnAxis(e,t){return Mc.copy(e).applyQuaternion(this.quaternion),this.position.add(Mc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ec,e)}translateY(e){return this.translateOnAxis(bc,e)}translateZ(e){return this.translateOnAxis(wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?pr.copy(e):pr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(qi,pr,this.up):fn.lookAt(pr,qi,this.up),this.quaternion.setFromRotationMatrix(fn),r&&(fn.extractRotation(r.matrixWorld),fi.setFromRotationMatrix(fn),this.quaternion.premultiply(fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tc),pi.child=e,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ef),ua.child=e,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tc),pi.child=e,this.dispatchEvent(pi),pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,e,Jh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qi,Qh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),p=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}St.DEFAULT_UP=new V(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new V,pn=new V,da=new V,mn=new V,mi=new V,_i=new V,Ac=new V,ha=new V,fa=new V,pa=new V,ma=new ht,_a=new ht,ga=new ht;class en{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jt.subVectors(r,t),pn.subVectors(n,t),da.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(pn),c=Jt.dot(da),l=pn.dot(pn),u=pn.dot(da),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const p=1/h,m=(l*c-o*u)*p,g=(a*u-o*c)*p;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,mn.x),c.addScaledVector(a,mn.y),c.addScaledVector(o,mn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return ma.setScalar(0),_a.setScalar(0),ga.setScalar(0),ma.fromBufferAttribute(e,t),_a.fromBufferAttribute(e,n),ga.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ma,s.x),a.addScaledVector(_a,s.y),a.addScaledVector(ga,s.z),a}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),pn.subVectors(e,t),Jt.cross(pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Jt.cross(pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return en.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;mi.subVectors(r,n),_i.subVectors(s,n),ha.subVectors(e,n);const c=mi.dot(ha),l=_i.dot(ha);if(c<=0&&l<=0)return t.copy(n);fa.subVectors(e,r);const u=mi.dot(fa),h=_i.dot(fa);if(u>=0&&h<=u)return t.copy(r);const p=c*h-u*l;if(p<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(mi,a);pa.subVectors(e,s);const m=mi.dot(pa),g=_i.dot(pa);if(g>=0&&m<=g)return t.copy(s);const M=m*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(_i,o);const f=u*g-m*h;if(f<=0&&h-u>=0&&m-g>=0)return Ac.subVectors(s,r),o=(h-u)/(h-u+(m-g)),t.copy(r).addScaledVector(Ac,o);const d=1/(f+M+p);return a=M*d,o=p*d,t.copy(n).addScaledVector(mi,a).addScaledVector(_i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},mr={h:0,s:0,l:0};function va(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Qe.workingColorSpace){if(e=Oh(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=va(a,s,e+1/3),this.g=va(a,s,e),this.b=va(a,s,e-1/3)}return Qe.toWorkingColorSpace(this,r),this}setStyle(e,t=qt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const n=hd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return Qe.fromWorkingColorSpace(Tt.copy(this),e),Math.round(je(Tt.r*255,0,255))*65536+Math.round(je(Tt.g*255,0,255))*256+Math.round(je(Tt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,r=Tt.g,s=Tt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=qt){Qe.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,r=Tt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(mr);const n=ta(Cn.h,mr.h,t),r=ta(Cn.s,mr.s,t),s=ta(Cn.l,mr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Oe;Oe.NAMES=hd;let tf=0;class Bi extends si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=er(),this.name="",this.type="Material",this.blending=Pi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=Wa,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ii,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ga&&(n.blendSrc=this.blendSrc),this.blendDst!==Wa&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ii&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Go extends Bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Yu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new V,_r=new Ue;let nf=0;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix3(e),this.setXY(t,_r.x,_r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Vi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Vi(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Vi(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Vi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Vi(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}}class fd extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class pd extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ft extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let rf=0;const Wt=new lt,ya=new St,gi=new V,kt=new tr,ji=new tr,xt=new V;class Ct extends si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ud(e)?pd:fd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return ya.lookAt(e),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ft(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];kt.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(kt.min,ji.min),kt.expandByPoint(xt),xt.addVectors(kt.max,ji.max),kt.expandByPoint(xt)):(kt.expandByPoint(ji.min),kt.expandByPoint(ji.max))}kt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(xt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)xt.fromBufferAttribute(o,l),c&&(gi.fromBufferAttribute(e,l),xt.add(gi)),r=Math.max(r,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<n.count;I++)o[I]=new V,c[I]=new V;const l=new V,u=new V,h=new V,p=new Ue,m=new Ue,g=new Ue,M=new V,f=new V;function d(I,A,w){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,A),h.fromBufferAttribute(n,w),p.fromBufferAttribute(s,I),m.fromBufferAttribute(s,A),g.fromBufferAttribute(s,w),u.sub(l),h.sub(l),m.sub(p),g.sub(p);const U=1/(m.x*g.y-g.x*m.y);isFinite(U)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(h,-m.y).multiplyScalar(U),f.copy(h).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(U),o[I].add(M),o[A].add(M),o[w].add(M),c[I].add(f),c[A].add(f),c[w].add(f))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let I=0,A=_.length;I<A;++I){const w=_[I],U=w.start,$=w.count;for(let B=U,H=U+$;B<H;B+=3)d(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const v=new V,y=new V,x=new V,E=new V;function b(I){x.fromBufferAttribute(r,I),E.copy(x);const A=o[I];v.copy(A),v.sub(x.multiplyScalar(x.dot(A))).normalize(),y.crossVectors(E,A);const U=y.dot(c[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,U)}for(let I=0,A=_.length;I<A;++I){const w=_[I],U=w.start,$=w.count;for(let B=U,H=U+$;B<H;B+=3)b(e.getX(B+0)),b(e.getX(B+1)),b(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const r=new V,s=new V,a=new V,o=new V,c=new V,l=new V,u=new V,h=new V;if(e)for(let p=0,m=e.count;p<m;p+=3){const g=e.getX(p+0),M=e.getX(p+1),f=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,f),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,M),l.fromBufferAttribute(n,f),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,p=new l.constructor(c.length*u);let m=0,g=0;for(let M=0,f=c.length;M<f;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*u;for(let d=0;d<u;d++)p[g++]=l[m++]}return new Ht(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){const p=l[u],m=e(p,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,p=l.length;h<p;h++){const m=l[h];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let p=0,m=h.length;p<m;p++)u.push(h[p].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rc=new lt,Vn=new Vs,gr=new Hs,Pc=new V,vr=new V,yr=new V,xr=new V,xa=new V,Sr=new V,Cc=new V,Mr=new V;class He extends St{constructor(e=new Ct,t=new Go){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Sr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],h=s[c];u!==0&&(xa.fromBufferAttribute(h,e),a?Sr.addScaledVector(xa,u):Sr.addScaledVector(xa.sub(t),u))}t.add(Sr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(s),Vn.copy(e.ray).recast(e.near),!(gr.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(gr,Pc)===null||Vn.origin.distanceToSquared(Pc)>(e.far-e.near)**2))&&(Rc.copy(s).invert(),Vn.copy(e.ray).applyMatrix4(Rc),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,p=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=p.length;g<M;g++){const f=p[g],d=a[f.materialIndex],_=Math.max(f.start,m.start),v=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let y=_,x=v;y<x;y+=3){const E=o.getX(y),b=o.getX(y+1),I=o.getX(y+2);r=Er(this,d,e,n,l,u,h,E,b,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let f=g,d=M;f<d;f+=3){const _=o.getX(f),v=o.getX(f+1),y=o.getX(f+2);r=Er(this,a,e,n,l,u,h,_,v,y),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=p.length;g<M;g++){const f=p[g],d=a[f.materialIndex],_=Math.max(f.start,m.start),v=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let y=_,x=v;y<x;y+=3){const E=y,b=y+1,I=y+2;r=Er(this,d,e,n,l,u,h,E,b,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let f=g,d=M;f<d;f+=3){const _=f,v=f+1,y=f+2;r=Er(this,a,e,n,l,u,h,_,v,y),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}}function sf(i,e,t,n,r,s,a,o){let c;if(e.side===Nt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Fn,o),c===null)return null;Mr.copy(o),Mr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Mr);return l<t.near||l>t.far?null:{distance:l,point:Mr.clone(),object:i}}function Er(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,vr),i.getVertexPosition(c,yr),i.getVertexPosition(l,xr);const u=sf(i,e,t,n,vr,yr,xr,Cc);if(u){const h=new V;en.getBarycoord(Cc,vr,yr,xr,h),r&&(u.uv=en.getInterpolatedAttribute(r,o,c,l,h,new Ue)),s&&(u.uv1=en.getInterpolatedAttribute(s,o,c,l,h,new Ue)),a&&(u.normal=en.getInterpolatedAttribute(a,o,c,l,h,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new V,materialIndex:0};en.getNormal(vr,yr,xr,p.normal),u.face=p,u.barycoord=h}return u}class En extends Ct{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],h=[];let p=0,m=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(h,2));function g(M,f,d,_,v,y,x,E,b,I,A){const w=y/b,U=x/I,$=y/2,B=x/2,H=E/2,te=b+1,Q=I+1;let oe=0,K=0;const de=new V;for(let R=0;R<Q;R++){const T=R*U-B;for(let N=0;N<te;N++){const P=N*w-$;de[M]=P*_,de[f]=T*v,de[d]=H,l.push(de.x,de.y,de.z),de[M]=0,de[f]=0,de[d]=E>0?1:-1,u.push(de.x,de.y,de.z),h.push(N/b),h.push(1-R/I),oe+=1}}for(let R=0;R<I;R++)for(let T=0;T<b;T++){const N=p+T+te*R,P=p+T+te*(R+1),S=p+(T+1)+te*(R+1),C=p+(T+1)+te*R;c.push(N,P,C),c.push(P,S,C),K+=6}o.addGroup(m,K,A),m+=K,p+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new En(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ki(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Pt(i){const e={};for(let t=0;t<i.length;t++){const n=ki(i[t]);for(const r in n)e[r]=n[r]}return e}function af(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function md(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const of={clone:ki,merge:Pt};var cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends Bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cf,this.fragmentShader=lf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ki(e.uniforms),this.uniformsGroups=af(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class _d extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Mn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new V,Dc=new Ue,Ic=new Ue;class jt extends _d{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,Dc,Ic),t.subVectors(Ic,Dc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vi=-90,yi=1;class uf extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jt(vi,yi,e,t);r.layers=this.layers,this.add(r);const s=new jt(vi,yi,e,t);s.layers=this.layers,this.add(s);const a=new jt(vi,yi,e,t);a.layers=this.layers,this.add(a);const o=new jt(vi,yi,e,t);o.layers=this.layers,this.add(o);const c=new jt(vi,yi,e,t);c.layers=this.layers,this.add(c);const l=new jt(vi,yi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=M,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,p,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gd extends Ut{constructor(e,t,n,r,s,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Li,super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class df extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new gd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new En(5,5,5),s=new kn({name:"CubemapFromEquirect",uniforms:ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:Un});s.uniforms.tEquirect.value=t;const a=new He(r,s),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=cn),new uf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class zt extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hf={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const f=t.getJointPose(M,n),d=this._getHandJoint(l,M);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],p=u.position.distanceTo(h.position),m=.02,g=.005;l.inputState.pinching&&p>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hf)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Wo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new Wo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ff extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ma=new V,pf=new V,mf=new Ve;class Ln{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ma.subVectors(n,t).cross(pf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ma),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||mf.getNormalMatrix(e),r=this.coplanarPoint(Ma).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gn=new Hs,br=new V;class qo{constructor(e=new Ln,t=new Ln,n=new Ln,r=new Ln,s=new Ln,a=new Ln){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],h=r[6],p=r[7],m=r[8],g=r[9],M=r[10],f=r[11],d=r[12],_=r[13],v=r[14],y=r[15];if(n[0].setComponents(c-s,p-l,f-m,y-d).normalize(),n[1].setComponents(c+s,p+l,f+m,y+d).normalize(),n[2].setComponents(c+a,p+u,f+g,y+_).normalize(),n[3].setComponents(c-a,p-u,f-g,y-_).normalize(),n[4].setComponents(c-o,p-h,f-M,y-v).normalize(),t===Mn)n[5].setComponents(c+o,p+h,f+M,y+v).normalize();else if(t===Fs)n[5].setComponents(o,h,M,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gn)}intersectsSprite(e){return Gn.center.set(0,0,0),Gn.radius=.7071067811865476,Gn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(br.x=r.normal.x>0?e.max.x:e.min.x,br.y=r.normal.y>0?e.max.y:e.min.y,br.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Do extends Bi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lc=new lt,Io=new Vs,wr=new Hs,Tr=new V;class Nc extends St{constructor(e=new Ct,t=new Do){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(r),wr.radius+=s,e.ray.intersectsSphere(wr)===!1)return;Lc.copy(r).invert(),Io.copy(e.ray).applyMatrix4(Lc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const p=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=p,M=m;g<M;g++){const f=l.getX(g);Tr.fromBufferAttribute(h,f),Uc(Tr,f,c,r,e,t,this)}}else{const p=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let g=p,M=m;g<M;g++)Tr.fromBufferAttribute(h,g),Uc(Tr,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Uc(i,e,t,n,r,s,a){const o=Io.distanceSqToPoint(i);if(o<t){const c=new V;Io.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class vd extends Ut{constructor(e,t,n,r,s,a,o,c,l,u=Ci){if(u!==Ci&&u!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ci&&(n=ni),n===void 0&&u===Oi&&(n=Ui),super(null,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:nn,this.minFilter=c!==void 0?c:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ho(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gs extends Ct{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new V,u=new Ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){const m=n+h/t*r;l.x=e*Math.cos(m),l.y=e*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[p]/e+1)/2,u.y=(a[p+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(o,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class _t extends Ct{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],p=[],m=[];let g=0;const M=[],f=n/2;let d=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ft(h,3)),this.setAttribute("normal",new ft(p,3)),this.setAttribute("uv",new ft(m,2));function _(){const y=new V,x=new V;let E=0;const b=(t-e)/n;for(let I=0;I<=s;I++){const A=[],w=I/s,U=w*(t-e)+e;for(let $=0;$<=r;$++){const B=$/r,H=B*c+o,te=Math.sin(H),Q=Math.cos(H);x.x=U*te,x.y=-w*n+f,x.z=U*Q,h.push(x.x,x.y,x.z),y.set(te,b,Q).normalize(),p.push(y.x,y.y,y.z),m.push(B,1-w),A.push(g++)}M.push(A)}for(let I=0;I<r;I++)for(let A=0;A<s;A++){const w=M[A][I],U=M[A+1][I],$=M[A+1][I+1],B=M[A][I+1];(e>0||A!==0)&&(u.push(w,U,B),E+=3),(t>0||A!==s-1)&&(u.push(U,$,B),E+=3)}l.addGroup(d,E,0),d+=E}function v(y){const x=g,E=new Ue,b=new V;let I=0;const A=y===!0?e:t,w=y===!0?1:-1;for(let $=1;$<=r;$++)h.push(0,f*w,0),p.push(0,w,0),m.push(.5,.5),g++;const U=g;for(let $=0;$<=r;$++){const H=$/r*c+o,te=Math.cos(H),Q=Math.sin(H);b.x=A*Q,b.y=f*w,b.z=A*te,h.push(b.x,b.y,b.z),p.push(0,w,0),E.x=te*.5+.5,E.y=Q*.5*w+.5,m.push(E.x,E.y),g++}for(let $=0;$<r;$++){const B=x+$,H=U+$;y===!0?u.push(H,H+1,B):u.push(H+1,H,B),I+=3}l.addGroup(d,I,y===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _t(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ti extends _t{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Ti(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jo extends Ct{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],a=[];o(r),l(n),u(),this.setAttribute("position",new ft(s,3)),this.setAttribute("normal",new ft(s.slice(),3)),this.setAttribute("uv",new ft(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const v=new V,y=new V,x=new V;for(let E=0;E<t.length;E+=3)m(t[E+0],v),m(t[E+1],y),m(t[E+2],x),c(v,y,x,_)}function c(_,v,y,x){const E=x+1,b=[];for(let I=0;I<=E;I++){b[I]=[];const A=_.clone().lerp(y,I/E),w=v.clone().lerp(y,I/E),U=E-I;for(let $=0;$<=U;$++)$===0&&I===E?b[I][$]=A:b[I][$]=A.clone().lerp(w,$/U)}for(let I=0;I<E;I++)for(let A=0;A<2*(E-I)-1;A++){const w=Math.floor(A/2);A%2===0?(p(b[I][w+1]),p(b[I+1][w]),p(b[I][w])):(p(b[I][w+1]),p(b[I+1][w+1]),p(b[I+1][w]))}}function l(_){const v=new V;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(_),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function u(){const _=new V;for(let v=0;v<s.length;v+=3){_.x=s[v+0],_.y=s[v+1],_.z=s[v+2];const y=f(_)/2/Math.PI+.5,x=d(_)/Math.PI+.5;a.push(y,1-x)}g(),h()}function h(){for(let _=0;_<a.length;_+=6){const v=a[_+0],y=a[_+2],x=a[_+4],E=Math.max(v,y,x),b=Math.min(v,y,x);E>.9&&b<.1&&(v<.2&&(a[_+0]+=1),y<.2&&(a[_+2]+=1),x<.2&&(a[_+4]+=1))}}function p(_){s.push(_.x,_.y,_.z)}function m(_,v){const y=_*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){const _=new V,v=new V,y=new V,x=new V,E=new Ue,b=new Ue,I=new Ue;for(let A=0,w=0;A<s.length;A+=9,w+=6){_.set(s[A+0],s[A+1],s[A+2]),v.set(s[A+3],s[A+4],s[A+5]),y.set(s[A+6],s[A+7],s[A+8]),E.set(a[w+0],a[w+1]),b.set(a[w+2],a[w+3]),I.set(a[w+4],a[w+5]),x.copy(_).add(v).add(y).divideScalar(3);const U=f(x);M(E,w+0,_,U),M(b,w+2,v,U),M(I,w+4,y,U)}}function M(_,v,y,x){x<0&&_.x===1&&(a[v]=_.x-1),y.x===0&&y.z===0&&(a[v]=x/2/Math.PI+.5)}function f(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.vertices,e.indices,e.radius,e.details)}}class Xo extends jo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xo(e.radius,e.detail)}}class nr extends Ct{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,h=e/o,p=t/c,m=[],g=[],M=[],f=[];for(let d=0;d<u;d++){const _=d*p-a;for(let v=0;v<l;v++){const y=v*h-s;g.push(y,-_,0),M.push(0,0,1),f.push(v/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<o;_++){const v=_+l*d,y=_+l*(d+1),x=_+1+l*(d+1),E=_+1+l*d;m.push(v,y,E),m.push(y,x,E)}this.setIndex(m),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(M,3)),this.setAttribute("uv",new ft(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yo extends Ct{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new V,p=new V,m=[],g=[],M=[],f=[];for(let d=0;d<=n;d++){const _=[],v=d/n;let y=0;d===0&&a===0?y=.5/t:d===n&&c===Math.PI&&(y=-.5/t);for(let x=0;x<=t;x++){const E=x/t;h.x=-e*Math.cos(r+E*s)*Math.sin(a+v*o),h.y=e*Math.cos(a+v*o),h.z=e*Math.sin(r+E*s)*Math.sin(a+v*o),g.push(h.x,h.y,h.z),p.copy(h).normalize(),M.push(p.x,p.y,p.z),f.push(E+y,1-v),_.push(l++)}u.push(_)}for(let d=0;d<n;d++)for(let _=0;_<t;_++){const v=u[d][_+1],y=u[d][_],x=u[d+1][_],E=u[d+1][_+1];(d!==0||a>0)&&m.push(v,y,E),(d!==n-1||c<Math.PI)&&m.push(y,x,E)}this.setIndex(m),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(M,3)),this.setAttribute("uv",new ft(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ws extends Ct{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const a=[],o=[],c=[],l=[],u=new V,h=new V,p=new V;for(let m=0;m<=n;m++)for(let g=0;g<=r;g++){const M=g/r*s,f=m/n*Math.PI*2;h.x=(e+t*Math.cos(f))*Math.cos(M),h.y=(e+t*Math.cos(f))*Math.sin(M),h.z=t*Math.sin(f),o.push(h.x,h.y,h.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),p.subVectors(h,u).normalize(),c.push(p.x,p.y,p.z),l.push(g/r),l.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=r;g++){const M=(r+1)*m+g-1,f=(r+1)*(m-1)+g-1,d=(r+1)*(m-1)+g,_=(r+1)*m+g;a.push(M,f,_),a.push(f,d,_)}this.setIndex(a),this.setAttribute("position",new ft(o,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class et extends Bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cd,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _f extends Bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gf extends Bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ko extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class vf extends Ko{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ea=new lt,Oc=new V,Fc=new V;class yf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qo,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Oc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Oc),Fc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Fc),t.updateMatrixWorld(),Ea.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ea),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ea)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class yd extends _d{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xf extends yf{constructor(){super(new yd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sf extends Ko{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new xf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Mf extends Ko{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ef extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}const kc=new lt;class bf{constructor(e,t,n=0,r=1/0){this.ray=new Vs(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kc),this}intersectObject(e,t=!0,n=[]){return Lo(e,this,n,t),n.sort($c),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Lo(e[r],this,n,t);return n.sort($c),n}}function $c(i,e){return i.distance-e.distance}function Lo(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Lo(s[a],e,t,!0)}}class Bc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class wf extends si{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function zc(i,e,t,n){const r=Tf(n);switch(t){case td:return i*e;case id:return i*e;case rd:return i*e*2;case sd:return i*e/r.components*r.byteLength;case $o:return i*e/r.components*r.byteLength;case ad:return i*e*2/r.components*r.byteLength;case Bo:return i*e*2/r.components*r.byteLength;case nd:return i*e*3/r.components*r.byteLength;case tn:return i*e*4/r.components*r.byteLength;case zo:return i*e*4/r.components*r.byteLength;case Ps:case Cs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Is:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ro:case ao:return Math.max(i,16)*Math.max(e,8)/4;case io:case so:return Math.max(i,8)*Math.max(e,8)/2;case oo:case co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _o:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case go:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case yo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ls:case wo:case To:return Math.ceil(i/4)*Math.ceil(e/4)*16;case od:case Ao:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ro:case Po:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Tf(i){switch(i){case wn:case Ju:return{byteLength:1,components:1};case Ji:case Qu:case Qi:return{byteLength:2,components:1};case Fo:case ko:return{byteLength:2,components:4};case ni:case Oo:case Sn:return{byteLength:4,components:1};case ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xd(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Af(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<h.length;m++){const g=h[p],M=h[m];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++p,h[p]=M)}h.length=p+1;for(let m=0,g=h.length;m<g;m++){const M=h[m];i.bufferSubData(l,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Rf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Of=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$f=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ep=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ip=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rp="gl_FragColor = linearToOutputTexel( gl_FragColor );",sp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ap=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ip=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Np=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Up=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$p=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,em=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,im=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,om=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,um=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_m=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ym=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Am=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Im=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Um=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Om=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,km=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ym=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Km=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,s_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Rf,alphahash_pars_fragment:Pf,alphamap_fragment:Cf,alphamap_pars_fragment:Df,alphatest_fragment:If,alphatest_pars_fragment:Lf,aomap_fragment:Nf,aomap_pars_fragment:Uf,batching_pars_vertex:Of,batching_vertex:Ff,begin_vertex:kf,beginnormal_vertex:$f,bsdfs:Bf,iridescence_fragment:zf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Vf,clipping_planes_pars_fragment:Gf,clipping_planes_pars_vertex:Wf,clipping_planes_vertex:qf,color_fragment:jf,color_pars_fragment:Xf,color_pars_vertex:Yf,color_vertex:Kf,common:Zf,cube_uv_reflection_fragment:Jf,defaultnormal_vertex:Qf,displacementmap_pars_vertex:ep,displacementmap_vertex:tp,emissivemap_fragment:np,emissivemap_pars_fragment:ip,colorspace_fragment:rp,colorspace_pars_fragment:sp,envmap_fragment:ap,envmap_common_pars_fragment:op,envmap_pars_fragment:cp,envmap_pars_vertex:lp,envmap_physical_pars_fragment:xp,envmap_vertex:up,fog_vertex:dp,fog_pars_vertex:hp,fog_fragment:fp,fog_pars_fragment:pp,gradientmap_pars_fragment:mp,lightmap_pars_fragment:_p,lights_lambert_fragment:gp,lights_lambert_pars_fragment:vp,lights_pars_begin:yp,lights_toon_fragment:Sp,lights_toon_pars_fragment:Mp,lights_phong_fragment:Ep,lights_phong_pars_fragment:bp,lights_physical_fragment:wp,lights_physical_pars_fragment:Tp,lights_fragment_begin:Ap,lights_fragment_maps:Rp,lights_fragment_end:Pp,logdepthbuf_fragment:Cp,logdepthbuf_pars_fragment:Dp,logdepthbuf_pars_vertex:Ip,logdepthbuf_vertex:Lp,map_fragment:Np,map_pars_fragment:Up,map_particle_fragment:Op,map_particle_pars_fragment:Fp,metalnessmap_fragment:kp,metalnessmap_pars_fragment:$p,morphinstance_vertex:Bp,morphcolor_vertex:zp,morphnormal_vertex:Hp,morphtarget_pars_vertex:Vp,morphtarget_vertex:Gp,normal_fragment_begin:Wp,normal_fragment_maps:qp,normal_pars_fragment:jp,normal_pars_vertex:Xp,normal_vertex:Yp,normalmap_pars_fragment:Kp,clearcoat_normal_fragment_begin:Zp,clearcoat_normal_fragment_maps:Jp,clearcoat_pars_fragment:Qp,iridescence_pars_fragment:em,opaque_fragment:tm,packing:nm,premultiplied_alpha_fragment:im,project_vertex:rm,dithering_fragment:sm,dithering_pars_fragment:am,roughnessmap_fragment:om,roughnessmap_pars_fragment:cm,shadowmap_pars_fragment:lm,shadowmap_pars_vertex:um,shadowmap_vertex:dm,shadowmask_pars_fragment:hm,skinbase_vertex:fm,skinning_pars_vertex:pm,skinning_vertex:mm,skinnormal_vertex:_m,specularmap_fragment:gm,specularmap_pars_fragment:vm,tonemapping_fragment:ym,tonemapping_pars_fragment:xm,transmission_fragment:Sm,transmission_pars_fragment:Mm,uv_pars_fragment:Em,uv_pars_vertex:bm,uv_vertex:wm,worldpos_vertex:Tm,background_vert:Am,background_frag:Rm,backgroundCube_vert:Pm,backgroundCube_frag:Cm,cube_vert:Dm,cube_frag:Im,depth_vert:Lm,depth_frag:Nm,distanceRGBA_vert:Um,distanceRGBA_frag:Om,equirect_vert:Fm,equirect_frag:km,linedashed_vert:$m,linedashed_frag:Bm,meshbasic_vert:zm,meshbasic_frag:Hm,meshlambert_vert:Vm,meshlambert_frag:Gm,meshmatcap_vert:Wm,meshmatcap_frag:qm,meshnormal_vert:jm,meshnormal_frag:Xm,meshphong_vert:Ym,meshphong_frag:Km,meshphysical_vert:Zm,meshphysical_frag:Jm,meshtoon_vert:Qm,meshtoon_frag:e_,points_vert:t_,points_frag:n_,shadow_vert:i_,shadow_frag:r_,sprite_vert:s_,sprite_frag:a_},ge={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},on={basic:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Oe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Pt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Pt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Oe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Pt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Pt([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Pt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Pt([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Pt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Pt([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Pt([ge.common,ge.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Pt([ge.lights,ge.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};on.physical={uniforms:Pt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Ar={r:0,b:0,g:0},Wn=new ln,o_=new lt;function c_(i,e,t,n,r,s,a){const o=new Oe(0);let c=s===!0?0:1,l,u,h=null,p=0,m=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function M(v){let y=!1;const x=g(v);x===null?d(o,c):x&&x.isColor&&(d(x,1),y=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(v,y){const x=g(y);x&&(x.isCubeTexture||x.mapping===zs)?(u===void 0&&(u=new He(new En(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:ki(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,b,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Wn.copy(y.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(o_.makeRotationFromEuler(Wn)),u.material.toneMapped=Qe.getTransfer(x.colorSpace)!==st,(h!==x||p!==x.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,h=x,p=x.version,m=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new He(new nr(2,2),new kn({name:"BackgroundMaterial",uniforms:ki(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(x.colorSpace)!==st,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||p!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,p=x.version,m=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,y){v.getRGB(Ar,md(i)),n.buffers.color.setClear(Ar.r,Ar.g,Ar.b,y,a)}function _(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),c=y,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(o,c)},render:M,addToRenderList:f,dispose:_}}function l_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,a=!1;function o(w,U,$,B,H){let te=!1;const Q=h(B,$,U);s!==Q&&(s=Q,l(s.object)),te=m(w,B,$,H),te&&g(w,B,$,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,y(w,U,$,B),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function l(w){return i.bindVertexArray(w)}function u(w){return i.deleteVertexArray(w)}function h(w,U,$){const B=$.wireframe===!0;let H=n[w.id];H===void 0&&(H={},n[w.id]=H);let te=H[U.id];te===void 0&&(te={},H[U.id]=te);let Q=te[B];return Q===void 0&&(Q=p(c()),te[B]=Q),Q}function p(w){const U=[],$=[],B=[];for(let H=0;H<t;H++)U[H]=0,$[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:$,attributeDivisors:B,object:w,attributes:{},index:null}}function m(w,U,$,B){const H=s.attributes,te=U.attributes;let Q=0;const oe=$.getAttributes();for(const K in oe)if(oe[K].location>=0){const R=H[K];let T=te[K];if(T===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(T=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(T=w.instanceColor)),R===void 0||R.attribute!==T||T&&R.data!==T.data)return!0;Q++}return s.attributesNum!==Q||s.index!==B}function g(w,U,$,B){const H={},te=U.attributes;let Q=0;const oe=$.getAttributes();for(const K in oe)if(oe[K].location>=0){let R=te[K];R===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(R=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(R=w.instanceColor));const T={};T.attribute=R,R&&R.data&&(T.data=R.data),H[K]=T,Q++}s.attributes=H,s.attributesNum=Q,s.index=B}function M(){const w=s.newAttributes;for(let U=0,$=w.length;U<$;U++)w[U]=0}function f(w){d(w,0)}function d(w,U){const $=s.newAttributes,B=s.enabledAttributes,H=s.attributeDivisors;$[w]=1,B[w]===0&&(i.enableVertexAttribArray(w),B[w]=1),H[w]!==U&&(i.vertexAttribDivisor(w,U),H[w]=U)}function _(){const w=s.newAttributes,U=s.enabledAttributes;for(let $=0,B=U.length;$<B;$++)U[$]!==w[$]&&(i.disableVertexAttribArray($),U[$]=0)}function v(w,U,$,B,H,te,Q){Q===!0?i.vertexAttribIPointer(w,U,$,H,te):i.vertexAttribPointer(w,U,$,B,H,te)}function y(w,U,$,B){M();const H=B.attributes,te=$.getAttributes(),Q=U.defaultAttributeValues;for(const oe in te){const K=te[oe];if(K.location>=0){let de=H[oe];if(de===void 0&&(oe==="instanceMatrix"&&w.instanceMatrix&&(de=w.instanceMatrix),oe==="instanceColor"&&w.instanceColor&&(de=w.instanceColor)),de!==void 0){const R=de.normalized,T=de.itemSize,N=e.get(de);if(N===void 0)continue;const P=N.buffer,S=N.type,C=N.bytesPerElement,k=S===i.INT||S===i.UNSIGNED_INT||de.gpuType===Oo;if(de.isInterleavedBufferAttribute){const X=de.data,ie=X.stride,me=de.offset;if(X.isInstancedInterleavedBuffer){for(let le=0;le<K.locationSize;le++)d(K.location+le,X.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let le=0;le<K.locationSize;le++)f(K.location+le);i.bindBuffer(i.ARRAY_BUFFER,P);for(let le=0;le<K.locationSize;le++)v(K.location+le,T/K.locationSize,S,R,ie*C,(me+T/K.locationSize*le)*C,k)}else{if(de.isInstancedBufferAttribute){for(let X=0;X<K.locationSize;X++)d(K.location+X,de.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let X=0;X<K.locationSize;X++)f(K.location+X);i.bindBuffer(i.ARRAY_BUFFER,P);for(let X=0;X<K.locationSize;X++)v(K.location+X,T/K.locationSize,S,R,T*C,T/K.locationSize*X*C,k)}}else if(Q!==void 0){const R=Q[oe];if(R!==void 0)switch(R.length){case 2:i.vertexAttrib2fv(K.location,R);break;case 3:i.vertexAttrib3fv(K.location,R);break;case 4:i.vertexAttrib4fv(K.location,R);break;default:i.vertexAttrib1fv(K.location,R)}}}}_()}function x(){I();for(const w in n){const U=n[w];for(const $ in U){const B=U[$];for(const H in B)u(B[H].object),delete B[H];delete U[$]}delete n[w]}}function E(w){if(n[w.id]===void 0)return;const U=n[w.id];for(const $ in U){const B=U[$];for(const H in B)u(B[H].object),delete B[H];delete U[$]}delete n[w.id]}function b(w){for(const U in n){const $=n[U];if($[w.id]===void 0)continue;const B=$[w.id];for(const H in B)u(B[H].object),delete B[H];delete $[w.id]}}function I(){A(),a=!0,s!==r&&(s=r,l(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:A,dispose:x,releaseStatesOfGeometry:E,releaseStatesOfProgram:b,initAttributes:M,enableAttribute:f,disableUnusedAttributes:_}}function u_(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let m=0;for(let g=0;g<h;g++)m+=u[g];t.update(m,n,1)}function c(l,u,h,p){if(h===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,u,0,p,0,h);let g=0;for(let M=0;M<h;M++)g+=u[M]*p[M];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function d_(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==tn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const I=b===Qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==wn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Sn&&!I)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:x,maxSamples:E}}function h_(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Ln,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const m=h.length!==0||p||n!==0||r;return r=p,n=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=u(h,p,0)},this.setState=function(h,p,m){const g=h.clippingPlanes,M=h.clipIntersection,f=h.clipShadows,d=i.get(h);if(!r||g===null||g.length===0||s&&!f)s?u(null):l();else{const _=s?0:n,v=_*4;let y=d.clippingState||null;c.value=y,y=u(g,p,v,m);for(let x=0;x!==v;++x)y[x]=t[x];d.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,p,m,g){const M=h!==null?h.length:0;let f=null;if(M!==0){if(f=c.value,g!==!0||f===null){const d=m+M*4,_=p.matrixWorldInverse;o.getNormalMatrix(_),(f===null||f.length<d)&&(f=new Float32Array(d));for(let v=0,y=m;v!==M;++v,y+=4)a.copy(h[v]).applyMatrix4(_,o),a.normal.toArray(f,y),f[y+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,f}}function f_(i){let e=new WeakMap;function t(a,o){return o===Qa?a.mapping=Li:o===eo&&(a.mapping=Ni),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Qa||o===eo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new df(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ai=4,Hc=[.125,.215,.35,.446,.526,.582],Qn=20,ba=new yd,Vc=new Oe;let wa=null,Ta=0,Aa=0,Ra=!1;const Zn=(1+Math.sqrt(5))/2,xi=1/Zn,Gc=[new V(-Zn,xi,0),new V(Zn,xi,0),new V(-xi,0,Zn),new V(xi,0,Zn),new V(0,Zn,-xi),new V(0,Zn,xi),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],p_=new V;class Wc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=p_}=s;wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(wa,Ta,Aa),this._renderer.xr.enabled=Ra,e.scissorTest=!1,Rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Qi,format:tn,colorSpace:Fi,depthBuffer:!1},r=qc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=m_(s)),this._blurMaterial=__(s,e,t)}return r}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,ba)}_sceneToCubeUV(e,t,n,r,s){const c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,m=h.toneMapping;h.getClearColor(Vc),h.toneMapping=On,h.autoClear=!1;const g=new Go({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),M=new He(new En,g);let f=!1;const d=e.background;d?d.isColor&&(g.color.copy(d),e.background=null,f=!0):(g.color.copy(Vc),f=!0);for(let _=0;_<6;_++){const v=_%3;v===0?(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[_],s.y,s.z)):v===1?(c.up.set(0,0,l[_]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[_],s.z)):(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[_]));const y=this._cubeSize;Rr(r,v*y,_>2?y:0,y,y),h.setRenderTarget(r),f&&h.render(M,c),h.render(e,c)}M.geometry.dispose(),M.material.dispose(),h.toneMapping=m,h.autoClear=p,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Li||e.mapping===Ni;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new He(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Rr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ba)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Gc[(r-s-1)%Gc.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new He(this._lodPlanes[r],l),p=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Qn-1),M=s/g,f=isFinite(s)?1+Math.floor(u*M):Qn;f>Qn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Qn}`);const d=[];let _=0;for(let b=0;b<Qn;++b){const I=b/M,A=Math.exp(-I*I/2);d.push(A),b===0?_+=A:b<f&&(_+=2*A)}for(let b=0;b<d.length;b++)d[b]=d[b]/_;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:v}=this;p.dTheta.value=g,p.mipInt.value=v-n;const y=this._sizeLods[r],x=3*y*(r>v-Ai?r-v+Ai:0),E=4*(this._cubeSize-y);Rr(t,x,E,3*y,2*y),c.setRenderTarget(t),c.render(h,ba)}}function m_(i){const e=[],t=[],n=[];let r=i;const s=i-Ai+1+Hc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>i-Ai?c=Hc[a-i+Ai-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,p=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,M=3,f=2,d=1,_=new Float32Array(M*g*m),v=new Float32Array(f*g*m),y=new Float32Array(d*g*m);for(let E=0;E<m;E++){const b=E%3*2/3-1,I=E>2?0:-1,A=[b,I,0,b+2/3,I,0,b+2/3,I+1,0,b,I,0,b+2/3,I+1,0,b,I+1,0];_.set(A,M*g*E),v.set(p,f*g*E);const w=[E,E,E,E,E,E];y.set(w,d*g*E)}const x=new Ct;x.setAttribute("position",new Ht(_,M)),x.setAttribute("uv",new Ht(v,f)),x.setAttribute("faceIndex",new Ht(y,d)),e.push(x),r>Ai&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qc(i,e,t){const n=new ii(i,e,t);return n.texture.mapping=zs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function __(i,e,t){const n=new Float32Array(Qn),r=new V(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function jc(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Xc(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Zo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function g_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Qa||c===eo,u=c===Li||c===Ni;if(l||u){let h=e.get(o);const p=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Wc(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const m=o.image;return l&&m&&m.height>0||u&&m&&r(m)?(t===null&&(t=new Wc(i)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function v_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Kn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function y_(i,e,t,n){const r={},s=new WeakMap;function a(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",a),delete r[p.id];const m=s.get(p);m&&(e.remove(m),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(h,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,t.memory.geometries++),p}function c(h){const p=h.attributes;for(const m in p)e.update(p[m],i.ARRAY_BUFFER)}function l(h){const p=[],m=h.index,g=h.attributes.position;let M=0;if(m!==null){const _=m.array;M=m.version;for(let v=0,y=_.length;v<y;v+=3){const x=_[v+0],E=_[v+1],b=_[v+2];p.push(x,E,E,b,b,x)}}else if(g!==void 0){const _=g.array;M=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){const x=v+0,E=v+1,b=v+2;p.push(x,E,E,b,b,x)}}else return;const f=new(ud(p)?pd:fd)(p,1);f.version=M;const d=s.get(h);d&&e.remove(d),s.set(h,f)}function u(h){const p=s.get(h);if(p){const m=h.index;m!==null&&p.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function x_(i,e,t){let n;function r(p){n=p}let s,a;function o(p){s=p.type,a=p.bytesPerElement}function c(p,m){i.drawElements(n,m,s,p*a),t.update(m,n,1)}function l(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,p*a,g),t.update(m,n,g))}function u(p,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,p,0,g);let f=0;for(let d=0;d<g;d++)f+=m[d];t.update(f,n,1)}function h(p,m,g,M){if(g===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)l(p[d]/a,m[d],M[d]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,s,p,0,M,0,g);let d=0;for(let _=0;_<g;_++)d+=m[_]*M[_];t.update(d,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function S_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function M_(i,e,t){const n=new WeakMap,r=new ht;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let p=n.get(o);if(p===void 0||p.count!==h){let A=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",A)};p!==void 0&&p.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let v=0;m===!0&&(v=1),g===!0&&(v=2),M===!0&&(v=3);let y=o.attributes.position.count*v,x=1;y>e.maxTextureSize&&(x=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*x*4*h),b=new dd(E,y,x,h);b.type=Sn,b.needsUpdate=!0;const I=v*4;for(let w=0;w<h;w++){const U=f[w],$=d[w],B=_[w],H=y*x*4*w;for(let te=0;te<U.count;te++){const Q=te*I;m===!0&&(r.fromBufferAttribute(U,te),E[H+Q+0]=r.x,E[H+Q+1]=r.y,E[H+Q+2]=r.z,E[H+Q+3]=0),g===!0&&(r.fromBufferAttribute($,te),E[H+Q+4]=r.x,E[H+Q+5]=r.y,E[H+Q+6]=r.z,E[H+Q+7]=0),M===!0&&(r.fromBufferAttribute(B,te),E[H+Q+8]=r.x,E[H+Q+9]=r.y,E[H+Q+10]=r.z,E[H+Q+11]=B.itemSize===4?r.w:1)}}p={count:h,texture:b,size:new Ue(y,x)},n.set(o,p),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function E_(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==l&&(p.update(),r.set(p,l))}return h}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const Sd=new Ut,Yc=new vd(1,1),Md=new dd,Ed=new jh,bd=new gd,Kc=[],Zc=[],Jc=new Float32Array(16),Qc=new Float32Array(9),el=new Float32Array(4);function zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Kc[r];if(s===void 0&&(s=new Float32Array(r),Kc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function qs(i,e){let t=Zc[e];t===void 0&&(t=new Int32Array(e),Zc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function b_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function w_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function T_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function A_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function R_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(vt(t,n))return;el.set(n),i.uniformMatrix2fv(this.addr,!1,el),yt(t,n)}}function P_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(vt(t,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),yt(t,n)}}function C_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(vt(t,n))return;Jc.set(n),i.uniformMatrix4fv(this.addr,!1,Jc),yt(t,n)}}function D_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function I_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function L_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function N_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function U_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function O_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function F_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function k_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function $_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Yc.compareFunction=ld,s=Yc):s=Sd,t.setTexture2D(e||s,r)}function B_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Ed,r)}function z_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||bd,r)}function H_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Md,r)}function V_(i){switch(i){case 5126:return b_;case 35664:return w_;case 35665:return T_;case 35666:return A_;case 35674:return R_;case 35675:return P_;case 35676:return C_;case 5124:case 35670:return D_;case 35667:case 35671:return I_;case 35668:case 35672:return L_;case 35669:case 35673:return N_;case 5125:return U_;case 36294:return O_;case 36295:return F_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return $_;case 35679:case 36299:case 36307:return B_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return H_}}function G_(i,e){i.uniform1fv(this.addr,e)}function W_(i,e){const t=zi(e,this.size,2);i.uniform2fv(this.addr,t)}function q_(i,e){const t=zi(e,this.size,3);i.uniform3fv(this.addr,t)}function j_(i,e){const t=zi(e,this.size,4);i.uniform4fv(this.addr,t)}function X_(i,e){const t=zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Y_(i,e){const t=zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function K_(i,e){const t=zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Z_(i,e){i.uniform1iv(this.addr,e)}function J_(i,e){i.uniform2iv(this.addr,e)}function Q_(i,e){i.uniform3iv(this.addr,e)}function eg(i,e){i.uniform4iv(this.addr,e)}function tg(i,e){i.uniform1uiv(this.addr,e)}function ng(i,e){i.uniform2uiv(this.addr,e)}function ig(i,e){i.uniform3uiv(this.addr,e)}function rg(i,e){i.uniform4uiv(this.addr,e)}function sg(i,e,t){const n=this.cache,r=e.length,s=qs(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Sd,s[a])}function ag(i,e,t){const n=this.cache,r=e.length,s=qs(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ed,s[a])}function og(i,e,t){const n=this.cache,r=e.length,s=qs(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||bd,s[a])}function cg(i,e,t){const n=this.cache,r=e.length,s=qs(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),yt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Md,s[a])}function lg(i){switch(i){case 5126:return G_;case 35664:return W_;case 35665:return q_;case 35666:return j_;case 35674:return X_;case 35675:return Y_;case 35676:return K_;case 5124:case 35670:return Z_;case 35667:case 35671:return J_;case 35668:case 35672:return Q_;case 35669:case 35673:return eg;case 5125:return tg;case 36294:return ng;case 36295:return ig;case 36296:return rg;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return cg}}class ug{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=V_(t.type)}}class dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lg(t.type)}}class hg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function tl(i,e){i.seq.push(e),i.map[e.id]=e}function fg(i,e,t){const n=i.name,r=n.length;for(Pa.lastIndex=0;;){const s=Pa.exec(n),a=Pa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){tl(t,l===void 0?new ug(o,i,e):new dg(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new hg(o),tl(t,h)),t=h}}}class Us{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);fg(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function nl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const pg=37297;let mg=0;function _g(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const il=new Ve;function gg(i){Qe._getMatrix(il,Qe.workingColorSpace,i);const e=`mat3( ${il.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case Os:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+_g(i.getShaderSource(e),a)}else return r}function vg(i,e){const t=gg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function yg(i,e){let t;switch(e){case yh:t="Linear";break;case xh:t="Reinhard";break;case Sh:t="Cineon";break;case Ku:t="ACESFilmic";break;case Eh:t="AgX";break;case bh:t="Neutral";break;case Mh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Pr=new V;function xg(){Qe.getLuminanceCoefficients(Pr);const i=Pr.x.toFixed(4),e=Pr.y.toFixed(4),t=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zi).join(`
`)}function Mg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Eg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Zi(i){return i!==""}function sl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function al(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(i){return i.replace(bg,Tg)}const wg=new Map;function Tg(i,e){let t=We[e];if(t===void 0){const n=wg.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return No(t)}const Ag=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ol(i){return i.replace(Ag,Rg)}function Rg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Pg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Va?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===yn&&(e="SHADOWMAP_TYPE_VSM"),e}function Cg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Li:case Ni:e="ENVMAP_TYPE_CUBE";break;case zs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Dg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ni:e="ENVMAP_MODE_REFRACTION";break}return e}function Ig(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yu:e="ENVMAP_BLENDING_MULTIPLY";break;case gh:e="ENVMAP_BLENDING_MIX";break;case vh:e="ENVMAP_BLENDING_ADD";break}return e}function Lg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ng(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Pg(t),l=Cg(t),u=Dg(t),h=Ig(t),p=Lg(t),m=Sg(t),g=Mg(s),M=r.createProgram();let f,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zi).join(`
`),d.length>0&&(d+=`
`)):(f=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),d=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?We.tonemapping_pars_fragment:"",t.toneMapping!==On?yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,vg("linearToOutputTexel",t.outputColorSpace),xg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zi).join(`
`)),a=No(a),a=sl(a,t),a=al(a,t),o=No(o),o=sl(o,t),o=al(o,t),a=ol(a),o=ol(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===mc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=_+f+a,y=_+d+o,x=nl(r,r.VERTEX_SHADER,v),E=nl(r,r.FRAGMENT_SHADER,y);r.attachShader(M,x),r.attachShader(M,E),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function b(U){if(i.debug.checkShaderErrors){const $=r.getProgramInfoLog(M).trim(),B=r.getShaderInfoLog(x).trim(),H=r.getShaderInfoLog(E).trim();let te=!0,Q=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,M,x,E);else{const oe=rl(r,x,"vertex"),K=rl(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+$+`
`+oe+`
`+K)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(B===""||H==="")&&(Q=!1);Q&&(U.diagnostics={runnable:te,programLog:$,vertexShader:{log:B,prefix:f},fragmentShader:{log:H,prefix:d}})}r.deleteShader(x),r.deleteShader(E),I=new Us(r,M),A=Eg(r,M)}let I;this.getUniforms=function(){return I===void 0&&b(this),I};let A;this.getAttributes=function(){return A===void 0&&b(this),A};let w=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=r.getProgramParameter(M,pg)),w},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mg++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=x,this.fragmentShader=E,this}let Ug=0;class Og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Fg(e),t.set(e,n)),n}}class Fg{constructor(e){this.id=Ug++,this.code=e,this.usedTimes=0}}function kg(i,e,t,n,r,s,a){const o=new Vo,c=new Og,l=new Set,u=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return l.add(A),A===0?"uv":`uv${A}`}function f(A,w,U,$,B){const H=$.fog,te=B.geometry,Q=A.isMeshStandardMaterial?$.environment:null,oe=(A.isMeshStandardMaterial?t:e).get(A.envMap||Q),K=oe&&oe.mapping===zs?oe.image.height:null,de=g[A.type];A.precision!==null&&(m=r.getMaxPrecision(A.precision),m!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",m,"instead."));const R=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,T=R!==void 0?R.length:0;let N=0;te.morphAttributes.position!==void 0&&(N=1),te.morphAttributes.normal!==void 0&&(N=2),te.morphAttributes.color!==void 0&&(N=3);let P,S,C,k;if(de){const it=on[de];P=it.vertexShader,S=it.fragmentShader}else P=A.vertexShader,S=A.fragmentShader,c.update(A),C=c.getVertexShaderID(A),k=c.getFragmentShaderID(A);const X=i.getRenderTarget(),ie=i.state.buffers.depth.getReversed(),me=B.isInstancedMesh===!0,le=B.isBatchedMesh===!0,z=!!A.map,W=!!A.matcap,Z=!!oe,O=!!A.aoMap,pe=!!A.lightMap,he=!!A.bumpMap,Ce=!!A.normalMap,_e=!!A.displacementMap,Le=!!A.emissiveMap,Se=!!A.metalnessMap,F=!!A.roughnessMap,D=A.anisotropy>0,Y=A.clearcoat>0,se=A.dispersion>0,ce=A.iridescence>0,re=A.sheen>0,Pe=A.transmission>0,ve=D&&!!A.anisotropyMap,be=Y&&!!A.clearcoatMap,Ye=Y&&!!A.clearcoatNormalMap,fe=Y&&!!A.clearcoatRoughnessMap,Te=ce&&!!A.iridescenceMap,Ne=ce&&!!A.iridescenceThicknessMap,Fe=re&&!!A.sheenColorMap,Ae=re&&!!A.sheenRoughnessMap,Ke=!!A.specularMap,Ge=!!A.specularColorMap,ot=!!A.specularIntensityMap,G=Pe&&!!A.transmissionMap,ye=Pe&&!!A.thicknessMap,ne=!!A.gradientMap,ae=!!A.alphaMap,Ee=A.alphaTest>0,Me=!!A.alphaHash,ze=!!A.extensions;let ut=On;A.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(ut=i.toneMapping);const bt={shaderID:de,shaderType:A.type,shaderName:A.name,vertexShader:P,fragmentShader:S,defines:A.defines,customVertexShaderID:C,customFragmentShaderID:k,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:m,batching:le,batchingColor:le&&B._colorsTexture!==null,instancing:me,instancingColor:me&&B.instanceColor!==null,instancingMorph:me&&B.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:X===null?i.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Fi,alphaToCoverage:!!A.alphaToCoverage,map:z,matcap:W,envMap:Z,envMapMode:Z&&oe.mapping,envMapCubeUVHeight:K,aoMap:O,lightMap:pe,bumpMap:he,normalMap:Ce,displacementMap:p&&_e,emissiveMap:Le,normalMapObjectSpace:Ce&&A.normalMapType===Rh,normalMapTangentSpace:Ce&&A.normalMapType===cd,metalnessMap:Se,roughnessMap:F,anisotropy:D,anisotropyMap:ve,clearcoat:Y,clearcoatMap:be,clearcoatNormalMap:Ye,clearcoatRoughnessMap:fe,dispersion:se,iridescence:ce,iridescenceMap:Te,iridescenceThicknessMap:Ne,sheen:re,sheenColorMap:Fe,sheenRoughnessMap:Ae,specularMap:Ke,specularColorMap:Ge,specularIntensityMap:ot,transmission:Pe,transmissionMap:G,thicknessMap:ye,gradientMap:ne,opaque:A.transparent===!1&&A.blending===Pi&&A.alphaToCoverage===!1,alphaMap:ae,alphaTest:Ee,alphaHash:Me,combine:A.combine,mapUv:z&&M(A.map.channel),aoMapUv:O&&M(A.aoMap.channel),lightMapUv:pe&&M(A.lightMap.channel),bumpMapUv:he&&M(A.bumpMap.channel),normalMapUv:Ce&&M(A.normalMap.channel),displacementMapUv:_e&&M(A.displacementMap.channel),emissiveMapUv:Le&&M(A.emissiveMap.channel),metalnessMapUv:Se&&M(A.metalnessMap.channel),roughnessMapUv:F&&M(A.roughnessMap.channel),anisotropyMapUv:ve&&M(A.anisotropyMap.channel),clearcoatMapUv:be&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&M(A.sheenRoughnessMap.channel),specularMapUv:Ke&&M(A.specularMap.channel),specularColorMapUv:Ge&&M(A.specularColorMap.channel),specularIntensityMapUv:ot&&M(A.specularIntensityMap.channel),transmissionMapUv:G&&M(A.transmissionMap.channel),thicknessMapUv:ye&&M(A.thicknessMap.channel),alphaMapUv:ae&&M(A.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(Ce||D),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!te.attributes.uv&&(z||ae),fog:!!H,useFog:A.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ie,skinning:B.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:N,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ut,decodeVideoTexture:z&&A.map.isVideoTexture===!0&&Qe.getTransfer(A.map.colorSpace)===st,decodeVideoTextureEmissive:Le&&A.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(A.emissiveMap.colorSpace)===st,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===xn,flipSided:A.side===Nt,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:ze&&A.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&A.extensions.multiDraw===!0||le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function d(A){const w=[];if(A.shaderID?w.push(A.shaderID):(w.push(A.customVertexShaderID),w.push(A.customFragmentShaderID)),A.defines!==void 0)for(const U in A.defines)w.push(U),w.push(A.defines[U]);return A.isRawShaderMaterial===!1&&(_(w,A),v(w,A),w.push(i.outputColorSpace)),w.push(A.customProgramCacheKey),w.join()}function _(A,w){A.push(w.precision),A.push(w.outputColorSpace),A.push(w.envMapMode),A.push(w.envMapCubeUVHeight),A.push(w.mapUv),A.push(w.alphaMapUv),A.push(w.lightMapUv),A.push(w.aoMapUv),A.push(w.bumpMapUv),A.push(w.normalMapUv),A.push(w.displacementMapUv),A.push(w.emissiveMapUv),A.push(w.metalnessMapUv),A.push(w.roughnessMapUv),A.push(w.anisotropyMapUv),A.push(w.clearcoatMapUv),A.push(w.clearcoatNormalMapUv),A.push(w.clearcoatRoughnessMapUv),A.push(w.iridescenceMapUv),A.push(w.iridescenceThicknessMapUv),A.push(w.sheenColorMapUv),A.push(w.sheenRoughnessMapUv),A.push(w.specularMapUv),A.push(w.specularColorMapUv),A.push(w.specularIntensityMapUv),A.push(w.transmissionMapUv),A.push(w.thicknessMapUv),A.push(w.combine),A.push(w.fogExp2),A.push(w.sizeAttenuation),A.push(w.morphTargetsCount),A.push(w.morphAttributeCount),A.push(w.numDirLights),A.push(w.numPointLights),A.push(w.numSpotLights),A.push(w.numSpotLightMaps),A.push(w.numHemiLights),A.push(w.numRectAreaLights),A.push(w.numDirLightShadows),A.push(w.numPointLightShadows),A.push(w.numSpotLightShadows),A.push(w.numSpotLightShadowsWithMaps),A.push(w.numLightProbes),A.push(w.shadowMapType),A.push(w.toneMapping),A.push(w.numClippingPlanes),A.push(w.numClipIntersection),A.push(w.depthPacking)}function v(A,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),A.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reverseDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),A.push(o.mask)}function y(A){const w=g[A.type];let U;if(w){const $=on[w];U=of.clone($.uniforms)}else U=A.uniforms;return U}function x(A,w){let U;for(let $=0,B=u.length;$<B;$++){const H=u[$];if(H.cacheKey===w){U=H,++U.usedTimes;break}}return U===void 0&&(U=new Ng(i,w,A,s),u.push(U)),U}function E(A){if(--A.usedTimes===0){const w=u.indexOf(A);u[w]=u[u.length-1],u.pop(),A.destroy()}}function b(A){c.remove(A)}function I(){c.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:y,acquireProgram:x,releaseProgram:E,releaseShaderCache:b,programs:u,dispose:I}}function $g(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Bg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ll(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ul(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,p,m,g,M,f){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:p,material:m,groupOrder:g,renderOrder:h.renderOrder,z:M,group:f},i[e]=d):(d.id=h.id,d.object=h,d.geometry=p,d.material=m,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=M,d.group=f),e++,d}function o(h,p,m,g,M,f){const d=a(h,p,m,g,M,f);m.transmission>0?n.push(d):m.transparent===!0?r.push(d):t.push(d)}function c(h,p,m,g,M,f){const d=a(h,p,m,g,M,f);m.transmission>0?n.unshift(d):m.transparent===!0?r.unshift(d):t.unshift(d)}function l(h,p){t.length>1&&t.sort(h||Bg),n.length>1&&n.sort(p||ll),r.length>1&&r.sort(p||ll)}function u(){for(let h=e,p=i.length;h<p;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function zg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new ul,i.set(n,[a])):r>=s.length?(a=new ul,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Hg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Oe};break;case"SpotLight":t={position:new V,direction:new V,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function Vg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gg=0;function Wg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qg(i){const e=new Hg,t=Vg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const r=new V,s=new lt,a=new lt;function o(l){let u=0,h=0,p=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let m=0,g=0,M=0,f=0,d=0,_=0,v=0,y=0,x=0,E=0,b=0;l.sort(Wg);for(let A=0,w=l.length;A<w;A++){const U=l[A],$=U.color,B=U.intensity,H=U.distance,te=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=$.r*B,h+=$.g*B,p+=$.b*B;else if(U.isLightProbe){for(let Q=0;Q<9;Q++)n.probe[Q].addScaledVector(U.sh.coefficients[Q],B);b++}else if(U.isDirectionalLight){const Q=e.get(U);if(Q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const oe=U.shadow,K=t.get(U);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=te,n.directionalShadowMatrix[m]=U.shadow.matrix,_++}n.directional[m]=Q,m++}else if(U.isSpotLight){const Q=e.get(U);Q.position.setFromMatrixPosition(U.matrixWorld),Q.color.copy($).multiplyScalar(B),Q.distance=H,Q.coneCos=Math.cos(U.angle),Q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Q.decay=U.decay,n.spot[M]=Q;const oe=U.shadow;if(U.map&&(n.spotLightMap[x]=U.map,x++,oe.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[M]=oe.matrix,U.castShadow){const K=t.get(U);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,n.spotShadow[M]=K,n.spotShadowMap[M]=te,y++}M++}else if(U.isRectAreaLight){const Q=e.get(U);Q.color.copy($).multiplyScalar(B),Q.halfWidth.set(U.width*.5,0,0),Q.halfHeight.set(0,U.height*.5,0),n.rectArea[f]=Q,f++}else if(U.isPointLight){const Q=e.get(U);if(Q.color.copy(U.color).multiplyScalar(U.intensity),Q.distance=U.distance,Q.decay=U.decay,U.castShadow){const oe=U.shadow,K=t.get(U);K.shadowIntensity=oe.intensity,K.shadowBias=oe.bias,K.shadowNormalBias=oe.normalBias,K.shadowRadius=oe.radius,K.shadowMapSize=oe.mapSize,K.shadowCameraNear=oe.camera.near,K.shadowCameraFar=oe.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=te,n.pointShadowMatrix[g]=U.shadow.matrix,v++}n.point[g]=Q,g++}else if(U.isHemisphereLight){const Q=e.get(U);Q.skyColor.copy(U.color).multiplyScalar(B),Q.groundColor.copy(U.groundColor).multiplyScalar(B),n.hemi[d]=Q,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=p;const I=n.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==M||I.rectAreaLength!==f||I.hemiLength!==d||I.numDirectionalShadows!==_||I.numPointShadows!==v||I.numSpotShadows!==y||I.numSpotMaps!==x||I.numLightProbes!==b)&&(n.directional.length=m,n.spot.length=M,n.rectArea.length=f,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=b,I.directionalLength=m,I.pointLength=g,I.spotLength=M,I.rectAreaLength=f,I.hemiLength=d,I.numDirectionalShadows=_,I.numPointShadows=v,I.numSpotShadows=y,I.numSpotMaps=x,I.numLightProbes=b,n.version=Gg++)}function c(l,u){let h=0,p=0,m=0,g=0,M=0;const f=u.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){const v=l[d];if(v.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),h++}else if(v.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(f),m++}else if(v.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),a.identity(),s.copy(v.matrixWorld),s.premultiply(f),a.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const y=n.point[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){const y=n.hemi[M];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(f),M++}}}return{setup:o,setupView:c,state:n}}function dl(i){const e=new qg(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function jg(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new dl(i),e.set(r,[o])):s>=a.length?(o=new dl(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Kg(i,e,t){let n=new qo;const r=new Ue,s=new Ue,a=new ht,o=new _f({depthPacking:Ah}),c=new gf,l={},u=t.maxTextureSize,h={[Fn]:Nt,[Nt]:Fn,[xn]:xn},p=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Xg,fragmentShader:Yg}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new He(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xu;let d=this.type;this.render=function(E,b,I){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;const A=i.getRenderTarget(),w=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),$=i.state;$.setBlending(Un),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const B=d!==yn&&this.type===yn,H=d===yn&&this.type!==yn;for(let te=0,Q=E.length;te<Q;te++){const oe=E[te],K=oe.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const de=K.getFrameExtents();if(r.multiply(de),s.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/de.x),r.x=s.x*de.x,K.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/de.y),r.y=s.y*de.y,K.mapSize.y=s.y)),K.map===null||B===!0||H===!0){const T=this.type!==yn?{minFilter:nn,magFilter:nn}:{};K.map!==null&&K.map.dispose(),K.map=new ii(r.x,r.y,T),K.map.texture.name=oe.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();const R=K.getViewportCount();for(let T=0;T<R;T++){const N=K.getViewport(T);a.set(s.x*N.x,s.y*N.y,s.x*N.z,s.y*N.w),$.viewport(a),K.updateMatrices(oe,T),n=K.getFrustum(),y(b,I,K.camera,oe,this.type)}K.isPointLightShadow!==!0&&this.type===yn&&_(K,I),K.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(A,w,U)};function _(E,b){const I=e.update(M);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ii(r.x,r.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(b,null,I,p,M,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(b,null,I,m,M,null)}function v(E,b,I,A){let w=null;const U=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)w=U;else if(w=I.isPointLight===!0?c:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const $=w.uuid,B=b.uuid;let H=l[$];H===void 0&&(H={},l[$]=H);let te=H[B];te===void 0&&(te=w.clone(),H[B]=te,b.addEventListener("dispose",x)),w=te}if(w.visible=b.visible,w.wireframe=b.wireframe,A===yn?w.side=b.shadowSide!==null?b.shadowSide:b.side:w.side=b.shadowSide!==null?b.shadowSide:h[b.side],w.alphaMap=b.alphaMap,w.alphaTest=b.alphaTest,w.map=b.map,w.clipShadows=b.clipShadows,w.clippingPlanes=b.clippingPlanes,w.clipIntersection=b.clipIntersection,w.displacementMap=b.displacementMap,w.displacementScale=b.displacementScale,w.displacementBias=b.displacementBias,w.wireframeLinewidth=b.wireframeLinewidth,w.linewidth=b.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const $=i.properties.get(w);$.light=I}return w}function y(E,b,I,A,w){if(E.visible===!1)return;if(E.layers.test(b.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&w===yn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);const B=e.update(E),H=E.material;if(Array.isArray(H)){const te=B.groups;for(let Q=0,oe=te.length;Q<oe;Q++){const K=te[Q],de=H[K.materialIndex];if(de&&de.visible){const R=v(E,de,A,w);E.onBeforeShadow(i,E,b,I,B,R,K),i.renderBufferDirect(I,null,B,R,E,K),E.onAfterShadow(i,E,b,I,B,R,K)}}}else if(H.visible){const te=v(E,H,A,w);E.onBeforeShadow(i,E,b,I,B,te,null),i.renderBufferDirect(I,null,B,te,E,null),E.onAfterShadow(i,E,b,I,B,te,null)}}const $=E.children;for(let B=0,H=$.length;B<H;B++)y($[B],b,I,A,w)}function x(E){E.target.removeEventListener("dispose",x);for(const I in l){const A=l[I],w=E.target.uuid;w in A&&(A[w].dispose(),delete A[w])}}}const Zg={[qa]:ja,[Xa]:Za,[Ya]:Ja,[Ii]:Ka,[ja]:qa,[Za]:Xa,[Ja]:Ya,[Ka]:Ii};function Jg(i,e){function t(){let G=!1;const ye=new ht;let ne=null;const ae=new ht(0,0,0,0);return{setMask:function(Ee){ne!==Ee&&!G&&(i.colorMask(Ee,Ee,Ee,Ee),ne=Ee)},setLocked:function(Ee){G=Ee},setClear:function(Ee,Me,ze,ut,bt){bt===!0&&(Ee*=ut,Me*=ut,ze*=ut),ye.set(Ee,Me,ze,ut),ae.equals(ye)===!1&&(i.clearColor(Ee,Me,ze,ut),ae.copy(ye))},reset:function(){G=!1,ne=null,ae.set(-1,0,0,0)}}}function n(){let G=!1,ye=!1,ne=null,ae=null,Ee=null;return{setReversed:function(Me){if(ye!==Me){const ze=e.get("EXT_clip_control");ye?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT);const ut=Ee;Ee=null,this.setClear(ut)}ye=Me},getReversed:function(){return ye},setTest:function(Me){Me?X(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(Me){ne!==Me&&!G&&(i.depthMask(Me),ne=Me)},setFunc:function(Me){if(ye&&(Me=Zg[Me]),ae!==Me){switch(Me){case qa:i.depthFunc(i.NEVER);break;case ja:i.depthFunc(i.ALWAYS);break;case Xa:i.depthFunc(i.LESS);break;case Ii:i.depthFunc(i.LEQUAL);break;case Ya:i.depthFunc(i.EQUAL);break;case Ka:i.depthFunc(i.GEQUAL);break;case Za:i.depthFunc(i.GREATER);break;case Ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Me}},setLocked:function(Me){G=Me},setClear:function(Me){Ee!==Me&&(ye&&(Me=1-Me),i.clearDepth(Me),Ee=Me)},reset:function(){G=!1,ne=null,ae=null,Ee=null,ye=!1}}}function r(){let G=!1,ye=null,ne=null,ae=null,Ee=null,Me=null,ze=null,ut=null,bt=null;return{setTest:function(it){G||(it?X(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(it){ye!==it&&!G&&(i.stencilMask(it),ye=it)},setFunc:function(it,Xt,un){(ne!==it||ae!==Xt||Ee!==un)&&(i.stencilFunc(it,Xt,un),ne=it,ae=Xt,Ee=un)},setOp:function(it,Xt,un){(Me!==it||ze!==Xt||ut!==un)&&(i.stencilOp(it,Xt,un),Me=it,ze=Xt,ut=un)},setLocked:function(it){G=it},setClear:function(it){bt!==it&&(i.clearStencil(it),bt=it)},reset:function(){G=!1,ye=null,ne=null,ae=null,Ee=null,Me=null,ze=null,ut=null,bt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},h={},p=new WeakMap,m=[],g=null,M=!1,f=null,d=null,_=null,v=null,y=null,x=null,E=null,b=new Oe(0,0,0),I=0,A=!1,w=null,U=null,$=null,B=null,H=null;const te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,oe=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(K)[1]),Q=oe>=1):K.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Q=oe>=2);let de=null,R={};const T=i.getParameter(i.SCISSOR_BOX),N=i.getParameter(i.VIEWPORT),P=new ht().fromArray(T),S=new ht().fromArray(N);function C(G,ye,ne,ae){const Ee=new Uint8Array(4),Me=i.createTexture();i.bindTexture(G,Me),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<ne;ze++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,ae,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(ye+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return Me}const k={};k[i.TEXTURE_2D]=C(i.TEXTURE_2D,i.TEXTURE_2D,1),k[i.TEXTURE_CUBE_MAP]=C(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[i.TEXTURE_2D_ARRAY]=C(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),k[i.TEXTURE_3D]=C(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),X(i.DEPTH_TEST),a.setFunc(Ii),he(!1),Ce(lc),X(i.CULL_FACE),O(Un);function X(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function ie(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function me(G,ye){return h[G]!==ye?(i.bindFramebuffer(G,ye),h[G]=ye,G===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ye),G===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function le(G,ye){let ne=m,ae=!1;if(G){ne=p.get(ye),ne===void 0&&(ne=[],p.set(ye,ne));const Ee=G.textures;if(ne.length!==Ee.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,ze=Ee.length;Me<ze;Me++)ne[Me]=i.COLOR_ATTACHMENT0+Me;ne.length=Ee.length,ae=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,ae=!0);ae&&i.drawBuffers(ne)}function z(G){return g!==G?(i.useProgram(G),g=G,!0):!1}const W={[Jn]:i.FUNC_ADD,[eh]:i.FUNC_SUBTRACT,[th]:i.FUNC_REVERSE_SUBTRACT};W[nh]=i.MIN,W[ih]=i.MAX;const Z={[rh]:i.ZERO,[sh]:i.ONE,[ah]:i.SRC_COLOR,[Ga]:i.SRC_ALPHA,[hh]:i.SRC_ALPHA_SATURATE,[uh]:i.DST_COLOR,[ch]:i.DST_ALPHA,[oh]:i.ONE_MINUS_SRC_COLOR,[Wa]:i.ONE_MINUS_SRC_ALPHA,[dh]:i.ONE_MINUS_DST_COLOR,[lh]:i.ONE_MINUS_DST_ALPHA,[fh]:i.CONSTANT_COLOR,[ph]:i.ONE_MINUS_CONSTANT_COLOR,[mh]:i.CONSTANT_ALPHA,[_h]:i.ONE_MINUS_CONSTANT_ALPHA};function O(G,ye,ne,ae,Ee,Me,ze,ut,bt,it){if(G===Un){M===!0&&(ie(i.BLEND),M=!1);return}if(M===!1&&(X(i.BLEND),M=!0),G!==Qd){if(G!==f||it!==A){if((d!==Jn||y!==Jn)&&(i.blendEquation(i.FUNC_ADD),d=Jn,y=Jn),it)switch(G){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case uc:i.blendFunc(i.ONE,i.ONE);break;case dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case uc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}_=null,v=null,x=null,E=null,b.set(0,0,0),I=0,f=G,A=it}return}Ee=Ee||ye,Me=Me||ne,ze=ze||ae,(ye!==d||Ee!==y)&&(i.blendEquationSeparate(W[ye],W[Ee]),d=ye,y=Ee),(ne!==_||ae!==v||Me!==x||ze!==E)&&(i.blendFuncSeparate(Z[ne],Z[ae],Z[Me],Z[ze]),_=ne,v=ae,x=Me,E=ze),(ut.equals(b)===!1||bt!==I)&&(i.blendColor(ut.r,ut.g,ut.b,bt),b.copy(ut),I=bt),f=G,A=!1}function pe(G,ye){G.side===xn?ie(i.CULL_FACE):X(i.CULL_FACE);let ne=G.side===Nt;ye&&(ne=!ne),he(ne),G.blending===Pi&&G.transparent===!1?O(Un):O(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),s.setMask(G.colorWrite);const ae=G.stencilWrite;o.setTest(ae),ae&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Le(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function he(G){w!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),w=G)}function Ce(G){G!==Kd?(X(i.CULL_FACE),G!==U&&(G===lc?i.cullFace(i.BACK):G===Zd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),U=G}function _e(G){G!==$&&(Q&&i.lineWidth(G),$=G)}function Le(G,ye,ne){G?(X(i.POLYGON_OFFSET_FILL),(B!==ye||H!==ne)&&(i.polygonOffset(ye,ne),B=ye,H=ne)):ie(i.POLYGON_OFFSET_FILL)}function Se(G){G?X(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function F(G){G===void 0&&(G=i.TEXTURE0+te-1),de!==G&&(i.activeTexture(G),de=G)}function D(G,ye,ne){ne===void 0&&(de===null?ne=i.TEXTURE0+te-1:ne=de);let ae=R[ne];ae===void 0&&(ae={type:void 0,texture:void 0},R[ne]=ae),(ae.type!==G||ae.texture!==ye)&&(de!==ne&&(i.activeTexture(ne),de=ne),i.bindTexture(G,ye||k[G]),ae.type=G,ae.texture=ye)}function Y(){const G=R[de];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function se(){try{i.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ce(){try{i.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function re(){try{i.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pe(){try{i.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ve(){try{i.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function be(){try{i.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ye(){try{i.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function fe(){try{i.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Te(){try{i.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ne(){try{i.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Fe(G){P.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),P.copy(G))}function Ae(G){S.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),S.copy(G))}function Ke(G,ye){let ne=l.get(ye);ne===void 0&&(ne=new WeakMap,l.set(ye,ne));let ae=ne.get(G);ae===void 0&&(ae=i.getUniformBlockIndex(ye,G.name),ne.set(G,ae))}function Ge(G,ye){const ae=l.get(ye).get(G);c.get(ye)!==ae&&(i.uniformBlockBinding(ye,ae,G.__bindingPointIndex),c.set(ye,ae))}function ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},de=null,R={},h={},p=new WeakMap,m=[],g=null,M=!1,f=null,d=null,_=null,v=null,y=null,x=null,E=null,b=new Oe(0,0,0),I=0,A=!1,w=null,U=null,$=null,B=null,H=null,P.set(0,0,i.canvas.width,i.canvas.height),S.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:X,disable:ie,bindFramebuffer:me,drawBuffers:le,useProgram:z,setBlending:O,setMaterial:pe,setFlipSided:he,setCullFace:Ce,setLineWidth:_e,setPolygonOffset:Le,setScissorTest:Se,activeTexture:F,bindTexture:D,unbindTexture:Y,compressedTexImage2D:se,compressedTexImage3D:ce,texImage2D:Te,texImage3D:Ne,updateUBOMapping:Ke,uniformBlockBinding:Ge,texStorage2D:Ye,texStorage3D:fe,texSubImage2D:re,texSubImage3D:Pe,compressedTexSubImage2D:ve,compressedTexSubImage3D:be,scissor:Fe,viewport:Ae,reset:ot}}function Qg(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ue,u=new WeakMap;let h;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(F,D){return m?new OffscreenCanvas(F,D):ks("canvas")}function M(F,D,Y){let se=1;const ce=Se(F);if((ce.width>Y||ce.height>Y)&&(se=Y/Math.max(ce.width,ce.height)),se<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const re=Math.floor(se*ce.width),Pe=Math.floor(se*ce.height);h===void 0&&(h=g(re,Pe));const ve=D?g(re,Pe):h;return ve.width=re,ve.height=Pe,ve.getContext("2d").drawImage(F,0,0,re,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+re+"x"+Pe+")."),ve}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),F;return F}function f(F){return F.generateMipmaps}function d(F){i.generateMipmap(F)}function _(F){return F.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?i.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(F,D,Y,se,ce=!1){if(F!==null){if(i[F]!==void 0)return i[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let re=D;if(D===i.RED&&(Y===i.FLOAT&&(re=i.R32F),Y===i.HALF_FLOAT&&(re=i.R16F),Y===i.UNSIGNED_BYTE&&(re=i.R8)),D===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(re=i.R8UI),Y===i.UNSIGNED_SHORT&&(re=i.R16UI),Y===i.UNSIGNED_INT&&(re=i.R32UI),Y===i.BYTE&&(re=i.R8I),Y===i.SHORT&&(re=i.R16I),Y===i.INT&&(re=i.R32I)),D===i.RG&&(Y===i.FLOAT&&(re=i.RG32F),Y===i.HALF_FLOAT&&(re=i.RG16F),Y===i.UNSIGNED_BYTE&&(re=i.RG8)),D===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(re=i.RG8UI),Y===i.UNSIGNED_SHORT&&(re=i.RG16UI),Y===i.UNSIGNED_INT&&(re=i.RG32UI),Y===i.BYTE&&(re=i.RG8I),Y===i.SHORT&&(re=i.RG16I),Y===i.INT&&(re=i.RG32I)),D===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(re=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(re=i.RGB16UI),Y===i.UNSIGNED_INT&&(re=i.RGB32UI),Y===i.BYTE&&(re=i.RGB8I),Y===i.SHORT&&(re=i.RGB16I),Y===i.INT&&(re=i.RGB32I)),D===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(re=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(re=i.RGBA16UI),Y===i.UNSIGNED_INT&&(re=i.RGBA32UI),Y===i.BYTE&&(re=i.RGBA8I),Y===i.SHORT&&(re=i.RGBA16I),Y===i.INT&&(re=i.RGBA32I)),D===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(re=i.RGB9_E5),D===i.RGBA){const Pe=ce?Os:Qe.getTransfer(se);Y===i.FLOAT&&(re=i.RGBA32F),Y===i.HALF_FLOAT&&(re=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(re=Pe===st?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(re=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(re=i.RGB5_A1)}return(re===i.R16F||re===i.R32F||re===i.RG16F||re===i.RG32F||re===i.RGBA16F||re===i.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function y(F,D){let Y;return F?D===null||D===ni||D===Ui?Y=i.DEPTH24_STENCIL8:D===Sn?Y=i.DEPTH32F_STENCIL8:D===Ji&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):D===null||D===ni||D===Ui?Y=i.DEPTH_COMPONENT24:D===Sn?Y=i.DEPTH_COMPONENT32F:D===Ji&&(Y=i.DEPTH_COMPONENT16),Y}function x(F,D){return f(F)===!0||F.isFramebufferTexture&&F.minFilter!==nn&&F.minFilter!==cn?Math.log2(Math.max(D.width,D.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?D.mipmaps.length:1}function E(F){const D=F.target;D.removeEventListener("dispose",E),I(D),D.isVideoTexture&&u.delete(D)}function b(F){const D=F.target;D.removeEventListener("dispose",b),w(D)}function I(F){const D=n.get(F);if(D.__webglInit===void 0)return;const Y=F.source,se=p.get(Y);if(se){const ce=se[D.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&A(F),Object.keys(se).length===0&&p.delete(Y)}n.remove(F)}function A(F){const D=n.get(F);i.deleteTexture(D.__webglTexture);const Y=F.source,se=p.get(Y);delete se[D.__cacheKey],a.memory.textures--}function w(F){const D=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(D.__webglFramebuffer[se]))for(let ce=0;ce<D.__webglFramebuffer[se].length;ce++)i.deleteFramebuffer(D.__webglFramebuffer[se][ce]);else i.deleteFramebuffer(D.__webglFramebuffer[se]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[se])}else{if(Array.isArray(D.__webglFramebuffer))for(let se=0;se<D.__webglFramebuffer.length;se++)i.deleteFramebuffer(D.__webglFramebuffer[se]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let se=0;se<D.__webglColorRenderbuffer.length;se++)D.__webglColorRenderbuffer[se]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[se]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}const Y=F.textures;for(let se=0,ce=Y.length;se<ce;se++){const re=n.get(Y[se]);re.__webglTexture&&(i.deleteTexture(re.__webglTexture),a.memory.textures--),n.remove(Y[se])}n.remove(F)}let U=0;function $(){U=0}function B(){const F=U;return F>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+r.maxTextures),U+=1,F}function H(F){const D=[];return D.push(F.wrapS),D.push(F.wrapT),D.push(F.wrapR||0),D.push(F.magFilter),D.push(F.minFilter),D.push(F.anisotropy),D.push(F.internalFormat),D.push(F.format),D.push(F.type),D.push(F.generateMipmaps),D.push(F.premultiplyAlpha),D.push(F.flipY),D.push(F.unpackAlignment),D.push(F.colorSpace),D.join()}function te(F,D){const Y=n.get(F);if(F.isVideoTexture&&_e(F),F.isRenderTargetTexture===!1&&F.version>0&&Y.__version!==F.version){const se=F.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{S(Y,F,D);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+D)}function Q(F,D){const Y=n.get(F);if(F.version>0&&Y.__version!==F.version){S(Y,F,D);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+D)}function oe(F,D){const Y=n.get(F);if(F.version>0&&Y.__version!==F.version){S(Y,F,D);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+D)}function K(F,D){const Y=n.get(F);if(F.version>0&&Y.__version!==F.version){C(Y,F,D);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+D)}const de={[to]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[no]:i.MIRRORED_REPEAT},R={[nn]:i.NEAREST,[wh]:i.NEAREST_MIPMAP_NEAREST,[or]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[ea]:i.LINEAR_MIPMAP_NEAREST,[ti]:i.LINEAR_MIPMAP_LINEAR},T={[Ph]:i.NEVER,[Uh]:i.ALWAYS,[Ch]:i.LESS,[ld]:i.LEQUAL,[Dh]:i.EQUAL,[Nh]:i.GEQUAL,[Ih]:i.GREATER,[Lh]:i.NOTEQUAL};function N(F,D){if(D.type===Sn&&e.has("OES_texture_float_linear")===!1&&(D.magFilter===cn||D.magFilter===ea||D.magFilter===or||D.magFilter===ti||D.minFilter===cn||D.minFilter===ea||D.minFilter===or||D.minFilter===ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(F,i.TEXTURE_WRAP_S,de[D.wrapS]),i.texParameteri(F,i.TEXTURE_WRAP_T,de[D.wrapT]),(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)&&i.texParameteri(F,i.TEXTURE_WRAP_R,de[D.wrapR]),i.texParameteri(F,i.TEXTURE_MAG_FILTER,R[D.magFilter]),i.texParameteri(F,i.TEXTURE_MIN_FILTER,R[D.minFilter]),D.compareFunction&&(i.texParameteri(F,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(F,i.TEXTURE_COMPARE_FUNC,T[D.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(D.magFilter===nn||D.minFilter!==or&&D.minFilter!==ti||D.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(D.anisotropy>1||n.get(D).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(F,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(D.anisotropy,r.getMaxAnisotropy())),n.get(D).__currentAnisotropy=D.anisotropy}}}function P(F,D){let Y=!1;F.__webglInit===void 0&&(F.__webglInit=!0,D.addEventListener("dispose",E));const se=D.source;let ce=p.get(se);ce===void 0&&(ce={},p.set(se,ce));const re=H(D);if(re!==F.__cacheKey){ce[re]===void 0&&(ce[re]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),ce[re].usedTimes++;const Pe=ce[F.__cacheKey];Pe!==void 0&&(ce[F.__cacheKey].usedTimes--,Pe.usedTimes===0&&A(D)),F.__cacheKey=re,F.__webglTexture=ce[re].texture}return Y}function S(F,D,Y){let se=i.TEXTURE_2D;(D.isDataArrayTexture||D.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),D.isData3DTexture&&(se=i.TEXTURE_3D);const ce=P(F,D),re=D.source;t.bindTexture(se,F.__webglTexture,i.TEXTURE0+Y);const Pe=n.get(re);if(re.version!==Pe.__version||ce===!0){t.activeTexture(i.TEXTURE0+Y);const ve=Qe.getPrimaries(Qe.workingColorSpace),be=D.colorSpace===Nn?null:Qe.getPrimaries(D.colorSpace),Ye=D.colorSpace===Nn||ve===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let fe=M(D.image,!1,r.maxTextureSize);fe=Le(D,fe);const Te=s.convert(D.format,D.colorSpace),Ne=s.convert(D.type);let Fe=v(D.internalFormat,Te,Ne,D.colorSpace,D.isVideoTexture);N(se,D);let Ae;const Ke=D.mipmaps,Ge=D.isVideoTexture!==!0,ot=Pe.__version===void 0||ce===!0,G=re.dataReady,ye=x(D,fe);if(D.isDepthTexture)Fe=y(D.format===Oi,D.type),ot&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,Fe,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,Fe,fe.width,fe.height,0,Te,Ne,null));else if(D.isDataTexture)if(Ke.length>0){Ge&&ot&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,Ke[0].width,Ke[0].height);for(let ne=0,ae=Ke.length;ne<ae;ne++)Ae=Ke[ne],Ge?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,Ae.width,Ae.height,Te,Ne,Ae.data):t.texImage2D(i.TEXTURE_2D,ne,Fe,Ae.width,Ae.height,0,Te,Ne,Ae.data);D.generateMipmaps=!1}else Ge?(ot&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,fe.width,fe.height),G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe.width,fe.height,Te,Ne,fe.data)):t.texImage2D(i.TEXTURE_2D,0,Fe,fe.width,fe.height,0,Te,Ne,fe.data);else if(D.isCompressedTexture)if(D.isCompressedArrayTexture){Ge&&ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Fe,Ke[0].width,Ke[0].height,fe.depth);for(let ne=0,ae=Ke.length;ne<ae;ne++)if(Ae=Ke[ne],D.format!==tn)if(Te!==null)if(Ge){if(G)if(D.layerUpdates.size>0){const Ee=zc(Ae.width,Ae.height,D.format,D.type);for(const Me of D.layerUpdates){const ze=Ae.data.subarray(Me*Ee/Ae.data.BYTES_PER_ELEMENT,(Me+1)*Ee/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,Me,Ae.width,Ae.height,1,Te,ze)}D.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,Ae.width,Ae.height,fe.depth,Te,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,Fe,Ae.width,Ae.height,fe.depth,0,Ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,Ae.width,Ae.height,fe.depth,Te,Ne,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,Fe,Ae.width,Ae.height,fe.depth,0,Te,Ne,Ae.data)}else{Ge&&ot&&t.texStorage2D(i.TEXTURE_2D,ye,Fe,Ke[0].width,Ke[0].height);for(let ne=0,ae=Ke.length;ne<ae;ne++)Ae=Ke[ne],D.format!==tn?Te!==null?Ge?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,Ae.width,Ae.height,Te,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,Fe,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,Ae.width,Ae.height,Te,Ne,Ae.data):t.texImage2D(i.TEXTURE_2D,ne,Fe,Ae.width,Ae.height,0,Te,Ne,Ae.data)}else if(D.isDataArrayTexture)if(Ge){if(ot&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Fe,fe.width,fe.height,fe.depth),G)if(D.layerUpdates.size>0){const ne=zc(fe.width,fe.height,D.format,D.type);for(const ae of D.layerUpdates){const Ee=fe.data.subarray(ae*ne/fe.data.BYTES_PER_ELEMENT,(ae+1)*ne/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,fe.width,fe.height,1,Te,Ne,Ee)}D.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Te,Ne,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,fe.width,fe.height,fe.depth,0,Te,Ne,fe.data);else if(D.isData3DTexture)Ge?(ot&&t.texStorage3D(i.TEXTURE_3D,ye,Fe,fe.width,fe.height,fe.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Te,Ne,fe.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,fe.width,fe.height,fe.depth,0,Te,Ne,fe.data);else if(D.isFramebufferTexture){if(ot)if(Ge)t.texStorage2D(i.TEXTURE_2D,ye,Fe,fe.width,fe.height);else{let ne=fe.width,ae=fe.height;for(let Ee=0;Ee<ye;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,Fe,ne,ae,0,Te,Ne,null),ne>>=1,ae>>=1}}else if(Ke.length>0){if(Ge&&ot){const ne=Se(Ke[0]);t.texStorage2D(i.TEXTURE_2D,ye,Fe,ne.width,ne.height)}for(let ne=0,ae=Ke.length;ne<ae;ne++)Ae=Ke[ne],Ge?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,Te,Ne,Ae):t.texImage2D(i.TEXTURE_2D,ne,Fe,Te,Ne,Ae);D.generateMipmaps=!1}else if(Ge){if(ot){const ne=Se(fe);t.texStorage2D(i.TEXTURE_2D,ye,Fe,ne.width,ne.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,Ne,fe)}else t.texImage2D(i.TEXTURE_2D,0,Fe,Te,Ne,fe);f(D)&&d(se),Pe.__version=re.version,D.onUpdate&&D.onUpdate(D)}F.__version=D.version}function C(F,D,Y){if(D.image.length!==6)return;const se=P(F,D),ce=D.source;t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+Y);const re=n.get(ce);if(ce.version!==re.__version||se===!0){t.activeTexture(i.TEXTURE0+Y);const Pe=Qe.getPrimaries(Qe.workingColorSpace),ve=D.colorSpace===Nn?null:Qe.getPrimaries(D.colorSpace),be=D.colorSpace===Nn||Pe===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ye=D.isCompressedTexture||D.image[0].isCompressedTexture,fe=D.image[0]&&D.image[0].isDataTexture,Te=[];for(let ae=0;ae<6;ae++)!Ye&&!fe?Te[ae]=M(D.image[ae],!0,r.maxCubemapSize):Te[ae]=fe?D.image[ae].image:D.image[ae],Te[ae]=Le(D,Te[ae]);const Ne=Te[0],Fe=s.convert(D.format,D.colorSpace),Ae=s.convert(D.type),Ke=v(D.internalFormat,Fe,Ae,D.colorSpace),Ge=D.isVideoTexture!==!0,ot=re.__version===void 0||se===!0,G=ce.dataReady;let ye=x(D,Ne);N(i.TEXTURE_CUBE_MAP,D);let ne;if(Ye){Ge&&ot&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ke,Ne.width,Ne.height);for(let ae=0;ae<6;ae++){ne=Te[ae].mipmaps;for(let Ee=0;Ee<ne.length;Ee++){const Me=ne[Ee];D.format!==tn?Fe!==null?Ge?G&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee,0,0,Me.width,Me.height,Fe,Me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee,Ke,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee,0,0,Me.width,Me.height,Fe,Ae,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee,Ke,Me.width,Me.height,0,Fe,Ae,Me.data)}}}else{if(ne=D.mipmaps,Ge&&ot){ne.length>0&&ye++;const ae=Se(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,Ke,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(fe){Ge?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Te[ae].width,Te[ae].height,Fe,Ae,Te[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ke,Te[ae].width,Te[ae].height,0,Fe,Ae,Te[ae].data);for(let Ee=0;Ee<ne.length;Ee++){const ze=ne[Ee].image[ae].image;Ge?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee+1,0,0,ze.width,ze.height,Fe,Ae,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee+1,Ke,ze.width,ze.height,0,Fe,Ae,ze.data)}}else{Ge?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Fe,Ae,Te[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ke,Fe,Ae,Te[ae]);for(let Ee=0;Ee<ne.length;Ee++){const Me=ne[Ee];Ge?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee+1,0,0,Fe,Ae,Me.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ee+1,Ke,Fe,Ae,Me.image[ae])}}}f(D)&&d(i.TEXTURE_CUBE_MAP),re.__version=ce.version,D.onUpdate&&D.onUpdate(D)}F.__version=D.version}function k(F,D,Y,se,ce,re){const Pe=s.convert(Y.format,Y.colorSpace),ve=s.convert(Y.type),be=v(Y.internalFormat,Pe,ve,Y.colorSpace),Ye=n.get(D),fe=n.get(Y);if(fe.__renderTarget=D,!Ye.__hasExternalTextures){const Te=Math.max(1,D.width>>re),Ne=Math.max(1,D.height>>re);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,re,be,Te,Ne,D.depth,0,Pe,ve,null):t.texImage2D(ce,re,be,Te,Ne,0,Pe,ve,null)}t.bindFramebuffer(i.FRAMEBUFFER,F),Ce(D)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ce,fe.__webglTexture,0,he(D)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,ce,fe.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function X(F,D,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,F),D.depthBuffer){const se=D.depthTexture,ce=se&&se.isDepthTexture?se.type:null,re=y(D.stencilBuffer,ce),Pe=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=he(D);Ce(D)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,re,D.width,D.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,re,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,re,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,F)}else{const se=D.textures;for(let ce=0;ce<se.length;ce++){const re=se[ce],Pe=s.convert(re.format,re.colorSpace),ve=s.convert(re.type),be=v(re.internalFormat,Pe,ve,re.colorSpace),Ye=he(D);Y&&Ce(D)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye,be,D.width,D.height):Ce(D)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye,be,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,be,D.width,D.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ie(F,D){if(D&&D.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,F),!(D.depthTexture&&D.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=n.get(D.depthTexture);se.__renderTarget=D,(!se.__webglTexture||D.depthTexture.image.width!==D.width||D.depthTexture.image.height!==D.height)&&(D.depthTexture.image.width=D.width,D.depthTexture.image.height=D.height,D.depthTexture.needsUpdate=!0),te(D.depthTexture,0);const ce=se.__webglTexture,re=he(D);if(D.depthTexture.format===Ci)Ce(D)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0);else if(D.depthTexture.format===Oi)Ce(D)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function me(F){const D=n.get(F),Y=F.isWebGLCubeRenderTarget===!0;if(D.__boundDepthTexture!==F.depthTexture){const se=F.depthTexture;if(D.__depthDisposeCallback&&D.__depthDisposeCallback(),se){const ce=()=>{delete D.__boundDepthTexture,delete D.__depthDisposeCallback,se.removeEventListener("dispose",ce)};se.addEventListener("dispose",ce),D.__depthDisposeCallback=ce}D.__boundDepthTexture=se}if(F.depthTexture&&!D.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ie(D.__webglFramebuffer,F)}else if(Y){D.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer[se]),D.__webglDepthbuffer[se]===void 0)D.__webglDepthbuffer[se]=i.createRenderbuffer(),X(D.__webglDepthbuffer[se],F,!1);else{const ce=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=D.__webglDepthbuffer[se];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,re)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),D.__webglDepthbuffer===void 0)D.__webglDepthbuffer=i.createRenderbuffer(),X(D.__webglDepthbuffer,F,!1);else{const se=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=D.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ce)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(F,D,Y){const se=n.get(F);D!==void 0&&k(se.__webglFramebuffer,F,F.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&me(F)}function z(F){const D=F.texture,Y=n.get(F),se=n.get(D);F.addEventListener("dispose",b);const ce=F.textures,re=F.isWebGLCubeRenderTarget===!0,Pe=ce.length>1;if(Pe||(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=D.version,a.memory.textures++),re){Y.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(D.mipmaps&&D.mipmaps.length>0){Y.__webglFramebuffer[ve]=[];for(let be=0;be<D.mipmaps.length;be++)Y.__webglFramebuffer[ve][be]=i.createFramebuffer()}else Y.__webglFramebuffer[ve]=i.createFramebuffer()}else{if(D.mipmaps&&D.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ve=0;ve<D.mipmaps.length;ve++)Y.__webglFramebuffer[ve]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let ve=0,be=ce.length;ve<be;ve++){const Ye=n.get(ce[ve]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(F.samples>0&&Ce(F)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ve=0;ve<ce.length;ve++){const be=ce[ve];Y.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ve]);const Ye=s.convert(be.format,be.colorSpace),fe=s.convert(be.type),Te=v(be.internalFormat,Ye,fe,be.colorSpace,F.isXRRenderTarget===!0),Ne=he(F);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,Te,F.width,F.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),F.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),X(Y.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),N(i.TEXTURE_CUBE_MAP,D);for(let ve=0;ve<6;ve++)if(D.mipmaps&&D.mipmaps.length>0)for(let be=0;be<D.mipmaps.length;be++)k(Y.__webglFramebuffer[ve][be],F,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,be);else k(Y.__webglFramebuffer[ve],F,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);f(D)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ve=0,be=ce.length;ve<be;ve++){const Ye=ce[ve],fe=n.get(Ye);t.bindTexture(i.TEXTURE_2D,fe.__webglTexture),N(i.TEXTURE_2D,Ye),k(Y.__webglFramebuffer,F,Ye,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),f(Ye)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ve=i.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(ve=F.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,se.__webglTexture),N(ve,D),D.mipmaps&&D.mipmaps.length>0)for(let be=0;be<D.mipmaps.length;be++)k(Y.__webglFramebuffer[be],F,D,i.COLOR_ATTACHMENT0,ve,be);else k(Y.__webglFramebuffer,F,D,i.COLOR_ATTACHMENT0,ve,0);f(D)&&d(ve),t.unbindTexture()}F.depthBuffer&&me(F)}function W(F){const D=F.textures;for(let Y=0,se=D.length;Y<se;Y++){const ce=D[Y];if(f(ce)){const re=_(F),Pe=n.get(ce).__webglTexture;t.bindTexture(re,Pe),d(re),t.unbindTexture()}}}const Z=[],O=[];function pe(F){if(F.samples>0){if(Ce(F)===!1){const D=F.textures,Y=F.width,se=F.height;let ce=i.COLOR_BUFFER_BIT;const re=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(F),ve=D.length>1;if(ve)for(let be=0;be<D.length;be++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let be=0;be<D.length;be++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),ve){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[be]);const Ye=n.get(D[be]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ye,0)}i.blitFramebuffer(0,0,Y,se,0,0,Y,se,ce,i.NEAREST),c===!0&&(Z.length=0,O.length=0,Z.push(i.COLOR_ATTACHMENT0+be),F.depthBuffer&&F.resolveDepthBuffer===!1&&(Z.push(re),O.push(re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let be=0;be<D.length;be++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[be]);const Ye=n.get(D[be]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+be,i.TEXTURE_2D,Ye,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&c){const D=F.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[D])}}}function he(F){return Math.min(r.maxSamples,F.samples)}function Ce(F){const D=n.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&D.__useRenderToTexture!==!1}function _e(F){const D=a.render.frame;u.get(F)!==D&&(u.set(F,D),F.update())}function Le(F,D){const Y=F.colorSpace,se=F.format,ce=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||Y!==Fi&&Y!==Nn&&(Qe.getTransfer(Y)===st?(se!==tn||ce!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),D}function Se(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(l.width=F.naturalWidth||F.width,l.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(l.width=F.displayWidth,l.height=F.displayHeight):(l.width=F.width,l.height=F.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=$,this.setTexture2D=te,this.setTexture2DArray=Q,this.setTexture3D=oe,this.setTextureCube=K,this.rebindTextures=le,this.setupRenderTarget=z,this.updateRenderTargetMipmap=W,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=k,this.useMultisampledRTT=Ce}function e0(i,e){function t(n,r=Nn){let s;const a=Qe.getTransfer(r);if(n===wn)return i.UNSIGNED_BYTE;if(n===Fo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ed)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ju)return i.BYTE;if(n===Qu)return i.SHORT;if(n===Ji)return i.UNSIGNED_SHORT;if(n===Oo)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===Qi)return i.HALF_FLOAT;if(n===td)return i.ALPHA;if(n===nd)return i.RGB;if(n===tn)return i.RGBA;if(n===id)return i.LUMINANCE;if(n===rd)return i.LUMINANCE_ALPHA;if(n===Ci)return i.DEPTH_COMPONENT;if(n===Oi)return i.DEPTH_STENCIL;if(n===sd)return i.RED;if(n===$o)return i.RED_INTEGER;if(n===ad)return i.RG;if(n===Bo)return i.RG_INTEGER;if(n===zo)return i.RGBA_INTEGER;if(n===Ps||n===Cs||n===Ds||n===Is)if(a===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ps)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ps)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===io||n===ro||n===so||n===ao)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===io)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ro)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===so)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ao)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oo||n===co||n===lo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oo||n===co)return a===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===lo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===uo||n===ho||n===fo||n===po||n===mo||n===_o||n===go||n===vo||n===yo||n===xo||n===So||n===Mo||n===Eo||n===bo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===uo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ho)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===po)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_o)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===So)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bo)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ls||n===wo||n===To)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ls)return a===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===To)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===od||n===Ao||n===Ro||n===Po)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ls)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ao)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ro)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Po)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const t0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,n0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class i0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Ut,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new kn({vertexShader:t0,fragmentShader:n0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new nr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r0 extends si{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,p=null,m=null,g=null;const M=new i0,f=t.getContextAttributes();let d=null,_=null;const v=[],y=[],x=new Ue;let E=null;const b=new jt;b.viewport=new ht;const I=new jt;I.viewport=new ht;const A=[b,I],w=new Ef;let U=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(S){let C=v[S];return C===void 0&&(C=new Sa,v[S]=C),C.getTargetRaySpace()},this.getControllerGrip=function(S){let C=v[S];return C===void 0&&(C=new Sa,v[S]=C),C.getGripSpace()},this.getHand=function(S){let C=v[S];return C===void 0&&(C=new Sa,v[S]=C),C.getHandSpace()};function B(S){const C=y.indexOf(S.inputSource);if(C===-1)return;const k=v[C];k!==void 0&&(k.update(S.inputSource,S.frame,l||a),k.dispatchEvent({type:S.type,data:S.inputSource}))}function H(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",te);for(let S=0;S<v.length;S++){const C=y[S];C!==null&&(y[S]=null,v[S].disconnect(C))}U=null,$=null,M.reset(),e.setRenderTarget(d),m=null,p=null,h=null,r=null,_=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(S){s=S,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(S){o=S,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(S){l=S},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(S){if(r=S,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",H),r.addEventListener("inputsourceschange",te),f.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(x),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let k=null,X=null,ie=null;f.depth&&(ie=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=f.stencil?Oi:Ci,X=f.stencil?Ui:ni);const me={colorFormat:t.RGBA8,depthFormat:ie,scaleFactor:s};h=new XRWebGLBinding(r,t),p=h.createProjectionLayer(me),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),_=new ii(p.textureWidth,p.textureHeight,{format:tn,type:wn,depthTexture:new vd(p.textureWidth,p.textureHeight,X,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const k={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,k),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new ii(m.framebufferWidth,m.framebufferHeight,{format:tn,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function te(S){for(let C=0;C<S.removed.length;C++){const k=S.removed[C],X=y.indexOf(k);X>=0&&(y[X]=null,v[X].disconnect(k))}for(let C=0;C<S.added.length;C++){const k=S.added[C];let X=y.indexOf(k);if(X===-1){for(let me=0;me<v.length;me++)if(me>=y.length){y.push(k),X=me;break}else if(y[me]===null){y[me]=k,X=me;break}if(X===-1)break}const ie=v[X];ie&&ie.connect(k)}}const Q=new V,oe=new V;function K(S,C,k){Q.setFromMatrixPosition(C.matrixWorld),oe.setFromMatrixPosition(k.matrixWorld);const X=Q.distanceTo(oe),ie=C.projectionMatrix.elements,me=k.projectionMatrix.elements,le=ie[14]/(ie[10]-1),z=ie[14]/(ie[10]+1),W=(ie[9]+1)/ie[5],Z=(ie[9]-1)/ie[5],O=(ie[8]-1)/ie[0],pe=(me[8]+1)/me[0],he=le*O,Ce=le*pe,_e=X/(-O+pe),Le=_e*-O;if(C.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(Le),S.translateZ(_e),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert(),ie[10]===-1)S.projectionMatrix.copy(C.projectionMatrix),S.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{const Se=le+_e,F=z+_e,D=he-Le,Y=Ce+(X-Le),se=W*z/F*Se,ce=Z*z/F*Se;S.projectionMatrix.makePerspective(D,Y,se,ce,Se,F),S.projectionMatrixInverse.copy(S.projectionMatrix).invert()}}function de(S,C){C===null?S.matrixWorld.copy(S.matrix):S.matrixWorld.multiplyMatrices(C.matrixWorld,S.matrix),S.matrixWorldInverse.copy(S.matrixWorld).invert()}this.updateCamera=function(S){if(r===null)return;let C=S.near,k=S.far;M.texture!==null&&(M.depthNear>0&&(C=M.depthNear),M.depthFar>0&&(k=M.depthFar)),w.near=I.near=b.near=C,w.far=I.far=b.far=k,(U!==w.near||$!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),U=w.near,$=w.far),b.layers.mask=S.layers.mask|2,I.layers.mask=S.layers.mask|4,w.layers.mask=b.layers.mask|I.layers.mask;const X=S.parent,ie=w.cameras;de(w,X);for(let me=0;me<ie.length;me++)de(ie[me],X);ie.length===2?K(w,b,I):w.projectionMatrix.copy(b.projectionMatrix),R(S,w,X)};function R(S,C,k){k===null?S.matrix.copy(C.matrixWorld):(S.matrix.copy(k.matrixWorld),S.matrix.invert(),S.matrix.multiply(C.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0),S.projectionMatrix.copy(C.projectionMatrix),S.projectionMatrixInverse.copy(C.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=Co*2*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(S){c=S,p!==null&&(p.fixedFoveation=S),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=S)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(w)};let T=null;function N(S,C){if(u=C.getViewerPose(l||a),g=C,u!==null){const k=u.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let X=!1;k.length!==w.cameras.length&&(w.cameras.length=0,X=!0);for(let le=0;le<k.length;le++){const z=k[le];let W=null;if(m!==null)W=m.getViewport(z);else{const O=h.getViewSubImage(p,z);W=O.viewport,le===0&&(e.setRenderTargetTextures(_,O.colorTexture,p.ignoreDepthValues?void 0:O.depthStencilTexture),e.setRenderTarget(_))}let Z=A[le];Z===void 0&&(Z=new jt,Z.layers.enable(le),Z.viewport=new ht,A[le]=Z),Z.matrix.fromArray(z.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(z.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(W.x,W.y,W.width,W.height),le===0&&(w.matrix.copy(Z.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),X===!0&&w.cameras.push(Z)}const ie=r.enabledFeatures;if(ie&&ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const le=h.getDepthInformation(k[0]);le&&le.isValid&&le.texture&&M.init(e,le,r.renderState)}}for(let k=0;k<v.length;k++){const X=y[k],ie=v[k];X!==null&&ie!==void 0&&ie.update(X,C,l||a)}T&&T(S,C),C.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:C}),g=null}const P=new xd;P.setAnimationLoop(N),this.setAnimationLoop=function(S){T=S},this.dispose=function(){}}}const qn=new ln,s0=new lt;function a0(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,md(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function r(f,d,_,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(f,d):d.isMeshToonMaterial?(s(f,d),h(f,d)):d.isMeshPhongMaterial?(s(f,d),u(f,d)):d.isMeshStandardMaterial?(s(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,y)):d.isMeshMatcapMaterial?(s(f,d),g(f,d)):d.isMeshDepthMaterial?s(f,d):d.isMeshDistanceMaterial?(s(f,d),M(f,d)):d.isMeshNormalMaterial?s(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,_,v):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Nt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Nt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const _=e.get(d),v=_.envMap,y=_.envMapRotation;v&&(f.envMap.value=v,qn.copy(y),qn.x*=-1,qn.y*=-1,qn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(qn.y*=-1,qn.z*=-1),f.envMapRotation.value.setFromMatrix4(s0.makeRotationFromEuler(qn)),f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,_,v){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*_,f.scale.value=v*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function u(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function h(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,_){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Nt&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=_.texture,f.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function M(f,d){const _=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(_.matrixWorld),f.nearDistance.value=_.shadow.camera.near,f.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function o0(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,v){const y=v.program;n.uniformBlockBinding(_,y)}function l(_,v){let y=r[_.id];y===void 0&&(g(_),y=u(_),r[_.id]=y,_.addEventListener("dispose",f));const x=v.program;n.updateUBOMapping(_,x);const E=e.render.frame;s[_.id]!==E&&(p(_),s[_.id]=E)}function u(_){const v=h();_.__bindingPointIndex=v;const y=i.createBuffer(),x=_.__size,E=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,x,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function h(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(_){const v=r[_.id],y=_.uniforms,x=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,b=y.length;E<b;E++){const I=Array.isArray(y[E])?y[E]:[y[E]];for(let A=0,w=I.length;A<w;A++){const U=I[A];if(m(U,E,A,x)===!0){const $=U.__offset,B=Array.isArray(U.value)?U.value:[U.value];let H=0;for(let te=0;te<B.length;te++){const Q=B[te],oe=M(Q);typeof Q=="number"||typeof Q=="boolean"?(U.__data[0]=Q,i.bufferSubData(i.UNIFORM_BUFFER,$+H,U.__data)):Q.isMatrix3?(U.__data[0]=Q.elements[0],U.__data[1]=Q.elements[1],U.__data[2]=Q.elements[2],U.__data[3]=0,U.__data[4]=Q.elements[3],U.__data[5]=Q.elements[4],U.__data[6]=Q.elements[5],U.__data[7]=0,U.__data[8]=Q.elements[6],U.__data[9]=Q.elements[7],U.__data[10]=Q.elements[8],U.__data[11]=0):(Q.toArray(U.__data,H),H+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(_,v,y,x){const E=_.value,b=v+"_"+y;if(x[b]===void 0)return typeof E=="number"||typeof E=="boolean"?x[b]=E:x[b]=E.clone(),!0;{const I=x[b];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return x[b]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function g(_){const v=_.uniforms;let y=0;const x=16;for(let b=0,I=v.length;b<I;b++){const A=Array.isArray(v[b])?v[b]:[v[b]];for(let w=0,U=A.length;w<U;w++){const $=A[w],B=Array.isArray($.value)?$.value:[$.value];for(let H=0,te=B.length;H<te;H++){const Q=B[H],oe=M(Q),K=y%x,de=K%oe.boundary,R=K+de;y+=de,R!==0&&x-R<oe.storage&&(y+=x-R),$.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=y,y+=oe.storage}}}const E=y%x;return E>0&&(y+=x-E),_.__size=y,_.__cache={},this}function M(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function f(_){const v=_.target;v.removeEventListener("dispose",f);const y=a.indexOf(v.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const _ in r)i.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}class c0{constructor(e={}){const{canvas:t=kh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const g=new Uint32Array(4),M=new Int32Array(4);let f=null,d=null;const _=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=On,this.toneMappingExposure=1;const y=this;let x=!1,E=0,b=0,I=null,A=-1,w=null;const U=new ht,$=new ht;let B=null;const H=new Oe(0);let te=0,Q=t.width,oe=t.height,K=1,de=null,R=null;const T=new ht(0,0,Q,oe),N=new ht(0,0,Q,oe);let P=!1;const S=new qo;let C=!1,k=!1;this.transmissionResolutionScale=1;const X=new lt,ie=new lt,me=new V,le=new ht,z={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let W=!1;function Z(){return I===null?K:1}let O=n;function pe(L,q){return t.getContext(L,q)}try{const L={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uo}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Me,!1),O===null){const q="webgl2";if(O=pe(q,L),O===null)throw pe(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let he,Ce,_e,Le,Se,F,D,Y,se,ce,re,Pe,ve,be,Ye,fe,Te,Ne,Fe,Ae,Ke,Ge,ot,G;function ye(){he=new v_(O),he.init(),Ge=new e0(O,he),Ce=new d_(O,he,e,Ge),_e=new Jg(O,he),Ce.reverseDepthBuffer&&p&&_e.buffers.depth.setReversed(!0),Le=new S_(O),Se=new $g,F=new Qg(O,he,_e,Se,Ce,Ge,Le),D=new f_(y),Y=new g_(y),se=new Af(O),ot=new l_(O,se),ce=new y_(O,se,Le,ot),re=new E_(O,ce,se,Le),Fe=new M_(O,Ce,F),fe=new h_(Se),Pe=new kg(y,D,Y,he,Ce,ot,fe),ve=new a0(y,Se),be=new zg,Ye=new jg(he),Ne=new c_(y,D,Y,_e,re,m,c),Te=new Kg(y,re,Ce),G=new o0(O,Le,Ce,_e),Ae=new u_(O,he,Le),Ke=new x_(O,he,Le),Le.programs=Pe.programs,y.capabilities=Ce,y.extensions=he,y.properties=Se,y.renderLists=be,y.shadowMap=Te,y.state=_e,y.info=Le}ye();const ne=new r0(y,O);this.xr=ne,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const L=he.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=he.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(L){L!==void 0&&(K=L,this.setSize(Q,oe,!1))},this.getSize=function(L){return L.set(Q,oe)},this.setSize=function(L,q,J=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=L,oe=q,t.width=Math.floor(L*K),t.height=Math.floor(q*K),J===!0&&(t.style.width=L+"px",t.style.height=q+"px"),this.setViewport(0,0,L,q)},this.getDrawingBufferSize=function(L){return L.set(Q*K,oe*K).floor()},this.setDrawingBufferSize=function(L,q,J){Q=L,oe=q,K=J,t.width=Math.floor(L*J),t.height=Math.floor(q*J),this.setViewport(0,0,L,q)},this.getCurrentViewport=function(L){return L.copy(U)},this.getViewport=function(L){return L.copy(T)},this.setViewport=function(L,q,J,ee){L.isVector4?T.set(L.x,L.y,L.z,L.w):T.set(L,q,J,ee),_e.viewport(U.copy(T).multiplyScalar(K).round())},this.getScissor=function(L){return L.copy(N)},this.setScissor=function(L,q,J,ee){L.isVector4?N.set(L.x,L.y,L.z,L.w):N.set(L,q,J,ee),_e.scissor($.copy(N).multiplyScalar(K).round())},this.getScissorTest=function(){return P},this.setScissorTest=function(L){_e.setScissorTest(P=L)},this.setOpaqueSort=function(L){de=L},this.setTransparentSort=function(L){R=L},this.getClearColor=function(L){return L.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(L=!0,q=!0,J=!0){let ee=0;if(L){let j=!1;if(I!==null){const ue=I.texture.format;j=ue===zo||ue===Bo||ue===$o}if(j){const ue=I.texture.type,xe=ue===wn||ue===ni||ue===Ji||ue===Ui||ue===Fo||ue===ko,we=Ne.getClearColor(),Re=Ne.getClearAlpha(),ke=we.r,$e=we.g,De=we.b;xe?(g[0]=ke,g[1]=$e,g[2]=De,g[3]=Re,O.clearBufferuiv(O.COLOR,0,g)):(M[0]=ke,M[1]=$e,M[2]=De,M[3]=Re,O.clearBufferiv(O.COLOR,0,M))}else ee|=O.COLOR_BUFFER_BIT}q&&(ee|=O.DEPTH_BUFFER_BIT),J&&(ee|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),Ne.dispose(),be.dispose(),Ye.dispose(),Se.dispose(),D.dispose(),Y.dispose(),re.dispose(),ot.dispose(),G.dispose(),Pe.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",nc),ne.removeEventListener("sessionend",ic),$n.stop()};function ae(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const L=Le.autoReset,q=Te.enabled,J=Te.autoUpdate,ee=Te.needsUpdate,j=Te.type;ye(),Le.autoReset=L,Te.enabled=q,Te.autoUpdate=J,Te.needsUpdate=ee,Te.type=j}function Me(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function ze(L){const q=L.target;q.removeEventListener("dispose",ze),ut(q)}function ut(L){bt(L),Se.remove(L)}function bt(L){const q=Se.get(L).programs;q!==void 0&&(q.forEach(function(J){Pe.releaseProgram(J)}),L.isShaderMaterial&&Pe.releaseShaderCache(L))}this.renderBufferDirect=function(L,q,J,ee,j,ue){q===null&&(q=z);const xe=j.isMesh&&j.matrixWorld.determinant()<0,we=Gd(L,q,J,ee,j);_e.setMaterial(ee,xe);let Re=J.index,ke=1;if(ee.wireframe===!0){if(Re=ce.getWireframeAttribute(J),Re===void 0)return;ke=2}const $e=J.drawRange,De=J.attributes.position;let Ze=$e.start*ke,tt=($e.start+$e.count)*ke;ue!==null&&(Ze=Math.max(Ze,ue.start*ke),tt=Math.min(tt,(ue.start+ue.count)*ke)),Re!==null?(Ze=Math.max(Ze,0),tt=Math.min(tt,Re.count)):De!=null&&(Ze=Math.max(Ze,0),tt=Math.min(tt,De.count));const pt=tt-Ze;if(pt<0||pt===1/0)return;ot.setup(j,ee,we,J,Re);let dt,Je=Ae;if(Re!==null&&(dt=se.get(Re),Je=Ke,Je.setIndex(dt)),j.isMesh)ee.wireframe===!0?(_e.setLineWidth(ee.wireframeLinewidth*Z()),Je.setMode(O.LINES)):Je.setMode(O.TRIANGLES);else if(j.isLine){let Ie=ee.linewidth;Ie===void 0&&(Ie=1),_e.setLineWidth(Ie*Z()),j.isLineSegments?Je.setMode(O.LINES):j.isLineLoop?Je.setMode(O.LINE_LOOP):Je.setMode(O.LINE_STRIP)}else j.isPoints?Je.setMode(O.POINTS):j.isSprite&&Je.setMode(O.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)Kn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Je.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))Je.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Ie=j._multiDrawStarts,Mt=j._multiDrawCounts,nt=j._multiDrawCount,Yt=Re?se.get(Re).bytesPerElement:1,ai=Se.get(ee).currentProgram.getUniforms();for(let Ot=0;Ot<nt;Ot++)ai.setValue(O,"_gl_DrawID",Ot),Je.render(Ie[Ot]/Yt,Mt[Ot])}else if(j.isInstancedMesh)Je.renderInstances(Ze,pt,j.count);else if(J.isInstancedBufferGeometry){const Ie=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Mt=Math.min(J.instanceCount,Ie);Je.renderInstances(Ze,pt,Mt)}else Je.render(Ze,pt)};function it(L,q,J){L.transparent===!0&&L.side===xn&&L.forceSinglePass===!1?(L.side=Nt,L.needsUpdate=!0,ar(L,q,J),L.side=Fn,L.needsUpdate=!0,ar(L,q,J),L.side=xn):ar(L,q,J)}this.compile=function(L,q,J=null){J===null&&(J=L),d=Ye.get(J),d.init(q),v.push(d),J.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),L!==J&&L.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),d.setupLights();const ee=new Set;return L.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const ue=j.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){const we=ue[xe];it(we,J,j),ee.add(we)}else it(ue,J,j),ee.add(ue)}),d=v.pop(),ee},this.compileAsync=function(L,q,J=null){const ee=this.compile(L,q,J);return new Promise(j=>{function ue(){if(ee.forEach(function(xe){Se.get(xe).currentProgram.isReady()&&ee.delete(xe)}),ee.size===0){j(L);return}setTimeout(ue,10)}he.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Xt=null;function un(L){Xt&&Xt(L)}function nc(){$n.stop()}function ic(){$n.start()}const $n=new xd;$n.setAnimationLoop(un),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(L){Xt=L,ne.setAnimationLoop(L),L===null?$n.stop():$n.start()},ne.addEventListener("sessionstart",nc),ne.addEventListener("sessionend",ic),this.render=function(L,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(q),q=ne.getCamera()),L.isScene===!0&&L.onBeforeRender(y,L,q,I),d=Ye.get(L,v.length),d.init(q),v.push(d),ie.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),S.setFromProjectionMatrix(ie),k=this.localClippingEnabled,C=fe.init(this.clippingPlanes,k),f=be.get(L,_.length),f.init(),_.push(f),ne.enabled===!0&&ne.isPresenting===!0){const ue=y.xr.getDepthSensingMesh();ue!==null&&Js(ue,q,-1/0,y.sortObjects)}Js(L,q,0,y.sortObjects),f.finish(),y.sortObjects===!0&&f.sort(de,R),W=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,W&&Ne.addToRenderList(f,L),this.info.render.frame++,C===!0&&fe.beginShadows();const J=d.state.shadowsArray;Te.render(J,L,q),C===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=f.opaque,j=f.transmissive;if(d.setupLights(),q.isArrayCamera){const ue=q.cameras;if(j.length>0)for(let xe=0,we=ue.length;xe<we;xe++){const Re=ue[xe];sc(ee,j,L,Re)}W&&Ne.render(L);for(let xe=0,we=ue.length;xe<we;xe++){const Re=ue[xe];rc(f,L,Re,Re.viewport)}}else j.length>0&&sc(ee,j,L,q),W&&Ne.render(L),rc(f,L,q);I!==null&&b===0&&(F.updateMultisampleRenderTarget(I),F.updateRenderTargetMipmap(I)),L.isScene===!0&&L.onAfterRender(y,L,q),ot.resetDefaultState(),A=-1,w=null,v.pop(),v.length>0?(d=v[v.length-1],C===!0&&fe.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?f=_[_.length-1]:f=null};function Js(L,q,J,ee){if(L.visible===!1)return;if(L.layers.test(q.layers)){if(L.isGroup)J=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(q);else if(L.isLight)d.pushLight(L),L.castShadow&&d.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||S.intersectsSprite(L)){ee&&le.setFromMatrixPosition(L.matrixWorld).applyMatrix4(ie);const xe=re.update(L),we=L.material;we.visible&&f.push(L,xe,we,J,le.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||S.intersectsObject(L))){const xe=re.update(L),we=L.material;if(ee&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),le.copy(L.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),le.copy(xe.boundingSphere.center)),le.applyMatrix4(L.matrixWorld).applyMatrix4(ie)),Array.isArray(we)){const Re=xe.groups;for(let ke=0,$e=Re.length;ke<$e;ke++){const De=Re[ke],Ze=we[De.materialIndex];Ze&&Ze.visible&&f.push(L,xe,Ze,J,le.z,De)}}else we.visible&&f.push(L,xe,we,J,le.z,null)}}const ue=L.children;for(let xe=0,we=ue.length;xe<we;xe++)Js(ue[xe],q,J,ee)}function rc(L,q,J,ee){const j=L.opaque,ue=L.transmissive,xe=L.transparent;d.setupLightsView(J),C===!0&&fe.setGlobalState(y.clippingPlanes,J),ee&&_e.viewport(U.copy(ee)),j.length>0&&sr(j,q,J),ue.length>0&&sr(ue,q,J),xe.length>0&&sr(xe,q,J),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function sc(L,q,J,ee){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[ee.id]===void 0&&(d.state.transmissionRenderTarget[ee.id]=new ii(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Qi:wn,minFilter:ti,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ue=d.state.transmissionRenderTarget[ee.id],xe=ee.viewport||U;ue.setSize(xe.z*y.transmissionResolutionScale,xe.w*y.transmissionResolutionScale);const we=y.getRenderTarget();y.setRenderTarget(ue),y.getClearColor(H),te=y.getClearAlpha(),te<1&&y.setClearColor(16777215,.5),y.clear(),W&&Ne.render(J);const Re=y.toneMapping;y.toneMapping=On;const ke=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),d.setupLightsView(ee),C===!0&&fe.setGlobalState(y.clippingPlanes,ee),sr(L,J,ee),F.updateMultisampleRenderTarget(ue),F.updateRenderTargetMipmap(ue),he.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let De=0,Ze=q.length;De<Ze;De++){const tt=q[De],pt=tt.object,dt=tt.geometry,Je=tt.material,Ie=tt.group;if(Je.side===xn&&pt.layers.test(ee.layers)){const Mt=Je.side;Je.side=Nt,Je.needsUpdate=!0,ac(pt,J,ee,dt,Je,Ie),Je.side=Mt,Je.needsUpdate=!0,$e=!0}}$e===!0&&(F.updateMultisampleRenderTarget(ue),F.updateRenderTargetMipmap(ue))}y.setRenderTarget(we),y.setClearColor(H,te),ke!==void 0&&(ee.viewport=ke),y.toneMapping=Re}function sr(L,q,J){const ee=q.isScene===!0?q.overrideMaterial:null;for(let j=0,ue=L.length;j<ue;j++){const xe=L[j],we=xe.object,Re=xe.geometry,ke=ee===null?xe.material:ee,$e=xe.group;we.layers.test(J.layers)&&ac(we,q,J,Re,ke,$e)}}function ac(L,q,J,ee,j,ue){L.onBeforeRender(y,q,J,ee,j,ue),L.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),j.onBeforeRender(y,q,J,ee,L,ue),j.transparent===!0&&j.side===xn&&j.forceSinglePass===!1?(j.side=Nt,j.needsUpdate=!0,y.renderBufferDirect(J,q,ee,j,L,ue),j.side=Fn,j.needsUpdate=!0,y.renderBufferDirect(J,q,ee,j,L,ue),j.side=xn):y.renderBufferDirect(J,q,ee,j,L,ue),L.onAfterRender(y,q,J,ee,j,ue)}function ar(L,q,J){q.isScene!==!0&&(q=z);const ee=Se.get(L),j=d.state.lights,ue=d.state.shadowsArray,xe=j.state.version,we=Pe.getParameters(L,j.state,ue,q,J),Re=Pe.getProgramCacheKey(we);let ke=ee.programs;ee.environment=L.isMeshStandardMaterial?q.environment:null,ee.fog=q.fog,ee.envMap=(L.isMeshStandardMaterial?Y:D).get(L.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&L.envMap===null?q.environmentRotation:L.envMapRotation,ke===void 0&&(L.addEventListener("dispose",ze),ke=new Map,ee.programs=ke);let $e=ke.get(Re);if($e!==void 0){if(ee.currentProgram===$e&&ee.lightsStateVersion===xe)return cc(L,we),$e}else we.uniforms=Pe.getUniforms(L),L.onBeforeCompile(we,y),$e=Pe.acquireProgram(we,Re),ke.set(Re,$e),ee.uniforms=we.uniforms;const De=ee.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(De.clippingPlanes=fe.uniform),cc(L,we),ee.needsLights=qd(L),ee.lightsStateVersion=xe,ee.needsLights&&(De.ambientLightColor.value=j.state.ambient,De.lightProbe.value=j.state.probe,De.directionalLights.value=j.state.directional,De.directionalLightShadows.value=j.state.directionalShadow,De.spotLights.value=j.state.spot,De.spotLightShadows.value=j.state.spotShadow,De.rectAreaLights.value=j.state.rectArea,De.ltc_1.value=j.state.rectAreaLTC1,De.ltc_2.value=j.state.rectAreaLTC2,De.pointLights.value=j.state.point,De.pointLightShadows.value=j.state.pointShadow,De.hemisphereLights.value=j.state.hemi,De.directionalShadowMap.value=j.state.directionalShadowMap,De.directionalShadowMatrix.value=j.state.directionalShadowMatrix,De.spotShadowMap.value=j.state.spotShadowMap,De.spotLightMatrix.value=j.state.spotLightMatrix,De.spotLightMap.value=j.state.spotLightMap,De.pointShadowMap.value=j.state.pointShadowMap,De.pointShadowMatrix.value=j.state.pointShadowMatrix),ee.currentProgram=$e,ee.uniformsList=null,$e}function oc(L){if(L.uniformsList===null){const q=L.currentProgram.getUniforms();L.uniformsList=Us.seqWithValue(q.seq,L.uniforms)}return L.uniformsList}function cc(L,q){const J=Se.get(L);J.outputColorSpace=q.outputColorSpace,J.batching=q.batching,J.batchingColor=q.batchingColor,J.instancing=q.instancing,J.instancingColor=q.instancingColor,J.instancingMorph=q.instancingMorph,J.skinning=q.skinning,J.morphTargets=q.morphTargets,J.morphNormals=q.morphNormals,J.morphColors=q.morphColors,J.morphTargetsCount=q.morphTargetsCount,J.numClippingPlanes=q.numClippingPlanes,J.numIntersection=q.numClipIntersection,J.vertexAlphas=q.vertexAlphas,J.vertexTangents=q.vertexTangents,J.toneMapping=q.toneMapping}function Gd(L,q,J,ee,j){q.isScene!==!0&&(q=z),F.resetTextureUnits();const ue=q.fog,xe=ee.isMeshStandardMaterial?q.environment:null,we=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Fi,Re=(ee.isMeshStandardMaterial?Y:D).get(ee.envMap||xe),ke=ee.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,$e=!!J.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),De=!!J.morphAttributes.position,Ze=!!J.morphAttributes.normal,tt=!!J.morphAttributes.color;let pt=On;ee.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(pt=y.toneMapping);const dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Je=dt!==void 0?dt.length:0,Ie=Se.get(ee),Mt=d.state.lights;if(C===!0&&(k===!0||L!==w)){const At=L===w&&ee.id===A;fe.setState(ee,L,At)}let nt=!1;ee.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Mt.state.version||Ie.outputColorSpace!==we||j.isBatchedMesh&&Ie.batching===!1||!j.isBatchedMesh&&Ie.batching===!0||j.isBatchedMesh&&Ie.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Ie.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Ie.instancing===!1||!j.isInstancedMesh&&Ie.instancing===!0||j.isSkinnedMesh&&Ie.skinning===!1||!j.isSkinnedMesh&&Ie.skinning===!0||j.isInstancedMesh&&Ie.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Ie.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Ie.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Ie.instancingMorph===!1&&j.morphTexture!==null||Ie.envMap!==Re||ee.fog===!0&&Ie.fog!==ue||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==fe.numPlanes||Ie.numIntersection!==fe.numIntersection)||Ie.vertexAlphas!==ke||Ie.vertexTangents!==$e||Ie.morphTargets!==De||Ie.morphNormals!==Ze||Ie.morphColors!==tt||Ie.toneMapping!==pt||Ie.morphTargetsCount!==Je)&&(nt=!0):(nt=!0,Ie.__version=ee.version);let Yt=Ie.currentProgram;nt===!0&&(Yt=ar(ee,q,j));let ai=!1,Ot=!1,Hi=!1;const ct=Yt.getUniforms(),Vt=Ie.uniforms;if(_e.useProgram(Yt.program)&&(ai=!0,Ot=!0,Hi=!0),ee.id!==A&&(A=ee.id,Ot=!0),ai||w!==L){_e.buffers.depth.getReversed()?(X.copy(L.projectionMatrix),Bh(X),zh(X),ct.setValue(O,"projectionMatrix",X)):ct.setValue(O,"projectionMatrix",L.projectionMatrix),ct.setValue(O,"viewMatrix",L.matrixWorldInverse);const Dt=ct.map.cameraPosition;Dt!==void 0&&Dt.setValue(O,me.setFromMatrixPosition(L.matrixWorld)),Ce.logarithmicDepthBuffer&&ct.setValue(O,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&ct.setValue(O,"isOrthographic",L.isOrthographicCamera===!0),w!==L&&(w=L,Ot=!0,Hi=!0)}if(j.isSkinnedMesh){ct.setOptional(O,j,"bindMatrix"),ct.setOptional(O,j,"bindMatrixInverse");const At=j.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ct.setValue(O,"boneTexture",At.boneTexture,F))}j.isBatchedMesh&&(ct.setOptional(O,j,"batchingTexture"),ct.setValue(O,"batchingTexture",j._matricesTexture,F),ct.setOptional(O,j,"batchingIdTexture"),ct.setValue(O,"batchingIdTexture",j._indirectTexture,F),ct.setOptional(O,j,"batchingColorTexture"),j._colorsTexture!==null&&ct.setValue(O,"batchingColorTexture",j._colorsTexture,F));const Gt=J.morphAttributes;if((Gt.position!==void 0||Gt.normal!==void 0||Gt.color!==void 0)&&Fe.update(j,J,Yt),(Ot||Ie.receiveShadow!==j.receiveShadow)&&(Ie.receiveShadow=j.receiveShadow,ct.setValue(O,"receiveShadow",j.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(Vt.envMap.value=Re,Vt.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&q.environment!==null&&(Vt.envMapIntensity.value=q.environmentIntensity),Ot&&(ct.setValue(O,"toneMappingExposure",y.toneMappingExposure),Ie.needsLights&&Wd(Vt,Hi),ue&&ee.fog===!0&&ve.refreshFogUniforms(Vt,ue),ve.refreshMaterialUniforms(Vt,ee,K,oe,d.state.transmissionRenderTarget[L.id]),Us.upload(O,oc(Ie),Vt,F)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Us.upload(O,oc(Ie),Vt,F),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&ct.setValue(O,"center",j.center),ct.setValue(O,"modelViewMatrix",j.modelViewMatrix),ct.setValue(O,"normalMatrix",j.normalMatrix),ct.setValue(O,"modelMatrix",j.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const At=ee.uniformsGroups;for(let Dt=0,Qs=At.length;Dt<Qs;Dt++){const Bn=At[Dt];G.update(Bn,Yt),G.bind(Bn,Yt)}}return Yt}function Wd(L,q){L.ambientLightColor.needsUpdate=q,L.lightProbe.needsUpdate=q,L.directionalLights.needsUpdate=q,L.directionalLightShadows.needsUpdate=q,L.pointLights.needsUpdate=q,L.pointLightShadows.needsUpdate=q,L.spotLights.needsUpdate=q,L.spotLightShadows.needsUpdate=q,L.rectAreaLights.needsUpdate=q,L.hemisphereLights.needsUpdate=q}function qd(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(L,q,J){Se.get(L.texture).__webglTexture=q,Se.get(L.depthTexture).__webglTexture=J;const ee=Se.get(L);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=J===void 0,ee.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,q){const J=Se.get(L);J.__webglFramebuffer=q,J.__useDefaultFramebuffer=q===void 0};const jd=O.createFramebuffer();this.setRenderTarget=function(L,q=0,J=0){I=L,E=q,b=J;let ee=!0,j=null,ue=!1,xe=!1;if(L){const Re=Se.get(L);if(Re.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(O.FRAMEBUFFER,null),ee=!1;else if(Re.__webglFramebuffer===void 0)F.setupRenderTarget(L);else if(Re.__hasExternalTextures)F.rebindTextures(L,Se.get(L.texture).__webglTexture,Se.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const De=L.depthTexture;if(Re.__boundDepthTexture!==De){if(De!==null&&Se.has(De)&&(L.width!==De.image.width||L.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");F.setupDepthRenderbuffer(L)}}const ke=L.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(xe=!0);const $e=Se.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray($e[q])?j=$e[q][J]:j=$e[q],ue=!0):L.samples>0&&F.useMultisampledRTT(L)===!1?j=Se.get(L).__webglMultisampledFramebuffer:Array.isArray($e)?j=$e[J]:j=$e,U.copy(L.viewport),$.copy(L.scissor),B=L.scissorTest}else U.copy(T).multiplyScalar(K).floor(),$.copy(N).multiplyScalar(K).floor(),B=P;if(J!==0&&(j=jd),_e.bindFramebuffer(O.FRAMEBUFFER,j)&&ee&&_e.drawBuffers(L,j),_e.viewport(U),_e.scissor($),_e.setScissorTest(B),ue){const Re=Se.get(L.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+q,Re.__webglTexture,J)}else if(xe){const Re=Se.get(L.texture),ke=q;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Re.__webglTexture,J,ke)}else if(L!==null&&J!==0){const Re=Se.get(L.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Re.__webglTexture,J)}A=-1},this.readRenderTargetPixels=function(L,q,J,ee,j,ue,xe){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Se.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){_e.bindFramebuffer(O.FRAMEBUFFER,we);try{const Re=L.texture,ke=Re.format,$e=Re.type;if(!Ce.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=L.width-ee&&J>=0&&J<=L.height-j&&O.readPixels(q,J,ee,j,Ge.convert(ke),Ge.convert($e),ue)}finally{const Re=I!==null?Se.get(I).__webglFramebuffer:null;_e.bindFramebuffer(O.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(L,q,J,ee,j,ue,xe){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Se.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){const Re=L.texture,ke=Re.format,$e=Re.type;if(!Ce.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=L.width-ee&&J>=0&&J<=L.height-j){_e.bindFramebuffer(O.FRAMEBUFFER,we);const De=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,De),O.bufferData(O.PIXEL_PACK_BUFFER,ue.byteLength,O.STREAM_READ),O.readPixels(q,J,ee,j,Ge.convert(ke),Ge.convert($e),0);const Ze=I!==null?Se.get(I).__webglFramebuffer:null;_e.bindFramebuffer(O.FRAMEBUFFER,Ze);const tt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await $h(O,tt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,De),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ue),O.deleteBuffer(De),O.deleteSync(tt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,q=null,J=0){L.isTexture!==!0&&(Kn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,L=arguments[1]);const ee=Math.pow(2,-J),j=Math.floor(L.image.width*ee),ue=Math.floor(L.image.height*ee),xe=q!==null?q.x:0,we=q!==null?q.y:0;F.setTexture2D(L,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,xe,we,j,ue),_e.unbindTexture()};const Xd=O.createFramebuffer(),Yd=O.createFramebuffer();this.copyTextureToTexture=function(L,q,J=null,ee=null,j=0,ue=null){L.isTexture!==!0&&(Kn("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,L=arguments[1],q=arguments[2],ue=arguments[3]||0,J=null),ue===null&&(j!==0?(Kn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ue=j,j=0):ue=0);let xe,we,Re,ke,$e,De,Ze,tt,pt;const dt=L.isCompressedTexture?L.mipmaps[ue]:L.image;if(J!==null)xe=J.max.x-J.min.x,we=J.max.y-J.min.y,Re=J.isBox3?J.max.z-J.min.z:1,ke=J.min.x,$e=J.min.y,De=J.isBox3?J.min.z:0;else{const Gt=Math.pow(2,-j);xe=Math.floor(dt.width*Gt),we=Math.floor(dt.height*Gt),L.isDataArrayTexture?Re=dt.depth:L.isData3DTexture?Re=Math.floor(dt.depth*Gt):Re=1,ke=0,$e=0,De=0}ee!==null?(Ze=ee.x,tt=ee.y,pt=ee.z):(Ze=0,tt=0,pt=0);const Je=Ge.convert(q.format),Ie=Ge.convert(q.type);let Mt;q.isData3DTexture?(F.setTexture3D(q,0),Mt=O.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(F.setTexture2DArray(q,0),Mt=O.TEXTURE_2D_ARRAY):(F.setTexture2D(q,0),Mt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,q.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,q.unpackAlignment);const nt=O.getParameter(O.UNPACK_ROW_LENGTH),Yt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),ai=O.getParameter(O.UNPACK_SKIP_PIXELS),Ot=O.getParameter(O.UNPACK_SKIP_ROWS),Hi=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,dt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,dt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ke),O.pixelStorei(O.UNPACK_SKIP_ROWS,$e),O.pixelStorei(O.UNPACK_SKIP_IMAGES,De);const ct=L.isDataArrayTexture||L.isData3DTexture,Vt=q.isDataArrayTexture||q.isData3DTexture;if(L.isDepthTexture){const Gt=Se.get(L),At=Se.get(q),Dt=Se.get(Gt.__renderTarget),Qs=Se.get(At.__renderTarget);_e.bindFramebuffer(O.READ_FRAMEBUFFER,Dt.__webglFramebuffer),_e.bindFramebuffer(O.DRAW_FRAMEBUFFER,Qs.__webglFramebuffer);for(let Bn=0;Bn<Re;Bn++)ct&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Se.get(L).__webglTexture,j,De+Bn),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Se.get(q).__webglTexture,ue,pt+Bn)),O.blitFramebuffer(ke,$e,xe,we,Ze,tt,xe,we,O.DEPTH_BUFFER_BIT,O.NEAREST);_e.bindFramebuffer(O.READ_FRAMEBUFFER,null),_e.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(j!==0||L.isRenderTargetTexture||Se.has(L)){const Gt=Se.get(L),At=Se.get(q);_e.bindFramebuffer(O.READ_FRAMEBUFFER,Xd),_e.bindFramebuffer(O.DRAW_FRAMEBUFFER,Yd);for(let Dt=0;Dt<Re;Dt++)ct?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Gt.__webglTexture,j,De+Dt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Gt.__webglTexture,j),Vt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,At.__webglTexture,ue,pt+Dt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,At.__webglTexture,ue),j!==0?O.blitFramebuffer(ke,$e,xe,we,Ze,tt,xe,we,O.COLOR_BUFFER_BIT,O.NEAREST):Vt?O.copyTexSubImage3D(Mt,ue,Ze,tt,pt+Dt,ke,$e,xe,we):O.copyTexSubImage2D(Mt,ue,Ze,tt,ke,$e,xe,we);_e.bindFramebuffer(O.READ_FRAMEBUFFER,null),_e.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Vt?L.isDataTexture||L.isData3DTexture?O.texSubImage3D(Mt,ue,Ze,tt,pt,xe,we,Re,Je,Ie,dt.data):q.isCompressedArrayTexture?O.compressedTexSubImage3D(Mt,ue,Ze,tt,pt,xe,we,Re,Je,dt.data):O.texSubImage3D(Mt,ue,Ze,tt,pt,xe,we,Re,Je,Ie,dt):L.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ue,Ze,tt,xe,we,Je,Ie,dt.data):L.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ue,Ze,tt,dt.width,dt.height,Je,dt.data):O.texSubImage2D(O.TEXTURE_2D,ue,Ze,tt,xe,we,Je,Ie,dt);O.pixelStorei(O.UNPACK_ROW_LENGTH,nt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Yt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ai),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ot),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Hi),ue===0&&q.generateMipmaps&&O.generateMipmap(Mt),_e.unbindTexture()},this.copyTextureToTexture3D=function(L,q,J=null,ee=null,j=0){return L.isTexture!==!0&&(Kn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,ee=arguments[1]||null,L=arguments[2],q=arguments[3],j=arguments[4]||0),Kn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,q,J,ee,j)},this.initRenderTarget=function(L){Se.get(L).__webglFramebuffer===void 0&&F.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?F.setTextureCube(L,0):L.isData3DTexture?F.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?F.setTexture2DArray(L,0):F.setTexture2D(L,0),_e.unbindTexture()},this.resetState=function(){E=0,b=0,I=null,_e.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const $i={lgd_gp_code:"245123",state:"UP",scheme_id:"SCH-UP-245123",total_households:15},an={PUMP:{node_id:"JS-UP-245123-N001",type:"pump",role:"Source Tube-Well & Submersible Pump",location:"Pump House, Western Ingress",coords:[-14,0,-9]},ESR:{node_id:"JS-UP-245123-N002",type:"esr_level",role:"Elevated Storage Reservoir (50,000 L, 15m Stage)",location:"High Ridge Knoll (+8m ground)",coords:[0,8,-9]},FLOW:{node_id:"JS-UP-245123-N003",type:"flow",role:"Bulk Electromagnetic Transmission Meter",location:"Main Distribution Header J0",coords:[0,4.5,0]},TAIL_PRESSURE:{node_id:"JS-UP-245123-N004",type:"pressure",role:"Tail-End Pressure Monitor (Branch B / Ridge)",location:"House B5 Terminal Standpost",coords:[21,6.2,0]},QUALITY:{node_id:"JS-UP-245123-N005",type:"quality",role:"In-line Multi-parameter Water Quality Probe",location:"ESR Gravity Outlet Staging",coords:[0,4.8,-9]}},l0=[{id:"A",name:"Branch A (West Terrace)",dir:[-1,0],elevation_profile:[4.2,3.8,3.5,3.2,3],color:"#0284c7"},{id:"B",name:"Branch B (East Ridge)",dir:[1,0],elevation_profile:[5.2,5.6,6,6.3,6.5],color:"#0284c7"},{id:"C",name:"Branch C (South Pond Valley)",dir:[0,1],elevation_profile:[3.8,2.9,2.1,1.4,.8],color:"#0284c7"}],Bt={C_FACTOR:130,TRUNK_DIA_MM:90,TRUNK_LEN_M:72,BRANCH_DIAS_MM:[63,63,50,50,40],BRANCH_LENS_M:[40,32,32,32,32],SERVICE_DIA_MM:20,TAP_NOMINAL_DEMAND_LPM:15,PUMP_RATED_FLOW_LPM:400,TANK_MAX_RANGE_M:4,TANK_AREA_M2:2},u0=[{start_h:6,end_h:9,label:"Morning Supply (06:00 - 09:00)"},{start_h:17,end_h:19,label:"Evening Supply (17:00 - 19:00)"}],hl={broker_url:"wss://broker.emqx.io:8084/mqtt",topic_prefix:"jalsetu/v1"};function d0(){const i=[],e=[],s=[0,8,-9],a=[-14,4,-9],o=[0,4.5,0];let c=1;return l0.forEach((l,u)=>{const h=[],p=[-l.dir[1],l.dir[0]];for(let m=0;m<5;m++){const g=6+4.5*m,M=m%2===0?1:-1,f=l.elevation_profile[m],d=l.dir[0]*g,_=f,v=l.dir[1]*g,y=d+p[0]*M*3.5,x=f,E=v+p[1]*M*3.5,b=String(c).padStart(4,"0"),I=`FHTC-${$i.state}-${$i.lgd_gp_code}-${b}`,A=`${l.id}${m+1}`;let w="residential",U=`Household ${A}`;l.id==="A"&&m===2?(w="anganwadi",U="Anganwadi Centre 01 (Vulnerable Site)"):l.id==="C"&&m===1&&(w="school",U="Govt Primary School (Vulnerable Site)");const $={branchId:l.id,bIdx:u,index:m,id:A,fhtc_id:I,pos:[d,_,v],housePos:[y,x,E],elevation:f,siteType:w,siteLabel:U,ward:`Ward ${u+1}`,P:12,P_kpa:117.7,q:0,leak:0,cd:0,res:1,cl:.45,tu:1.1,reported:!1};h.push($),e.push($),c++}i.push(h)}),{ESR_POS:s,PUMP_POS:a,J0_POS:o,ESR_GROUND_Z:8,PUMP_GROUND_Z:4,JUNCTION_J0_Z:4.5,nodes:i,households:e}}function fl(i,e,t,n=Bt.C_FACTOR){if(t<=0)return 0;const r=t/6e4,s=e/1e3,a=10.67*i*Math.pow(r,1.852),o=Math.pow(n,1.852)*Math.pow(s,4.87);return a/o}class h0{constructor(e){this.model=e,this.nodes=e.nodes,this.DIA=Bt.BRANCH_DIAS_MM,this.SEG=Bt.BRANCH_LENS_M,this.Q0=Bt.TAP_NOMINAL_DEMAND_LPM,this.TANK_BASE_STAGE=15}isSupplyOpen(e){const t=e/60%24;return u0.some(n=>t>=n.start_h&&t<n.end_h)}solve(e){const{level:t,faults:n,simTimeMinutes:r}=e,s=this.isSupplyOpen(r);this.nodes[1][2].cd=n.leak?14:0,this.nodes[0][1].cd=n.burst?90:0,this.nodes[2][0].res=n.choke?1200:1;const a=this.model.ESR_GROUND_Z+this.TANK_BASE_STAGE+t;let o=0,c=[[],[],[]];for(let l=0;l<24;l++){o=0,c=this.nodes.map(p=>{let m=0;const g=new Array(5);for(let M=4;M>=0;M--){const f=p[M],d=Math.max(f.P,0),_=s?this.Q0*Math.min(1,Math.sqrt(d/10)):0;f.q=.6*f.q+.4*_,f.leak=f.cd*Math.sqrt(d),m+=f.q+f.leak,g[M]=m}return o+=g[0],g});const u=fl(Bt.TRUNK_LEN_M,Bt.TRUNK_DIA_MM,o),h=a-u;e.PJ_head=Math.max(0,h-this.model.JUNCTION_J0_Z),this.nodes.forEach((p,m)=>{let g=h;p.forEach((M,f)=>{const d=c[m][f],_=fl(this.SEG[f],this.DIA[f],d)*M.res;g=g-_;const v=Math.max(0,g-M.elevation);M.P=.6*M.P+.4*v,M.P_kpa=Number((M.P*9.80665).toFixed(1))})})}return{trunkFlow:o,branchFlows:c,isSupply:s,tankHead:a}}updateWaterQuality(e,t){const{faults:n}=e,r=n.rain?.04:.48,s=n.rain?14.5:.95,a=1-Math.exp(-t/20);e.cl+=(r-e.cl)*a,e.tu+=(s-e.tu)*a,this.nodes.forEach(o=>{o.forEach((c,l)=>{const u=1-Math.exp(-t/(8+6*l)),h=e.cl*Math.exp(-.045*(l+1));c.cl+=(h-c.cl)*u,c.tu+=(e.tu-c.tu)*u})})}updateTankMassBalance(e,t,n){e.level<1.2?e.pumpCmd=!0:e.level>3.8&&(e.pumpCmd=!1),e.pumpOn=e.pumpCmd&&!e.faults.pump,e.pumpCurrent=e.pumpOn?4.2+.15*Math.sin(e.simTimeMinutes/10):0,e.pumpFlow=e.pumpOn?Bt.PUMP_RATED_FLOW_LPM:0;const s=(e.pumpFlow-n)*t/(Bt.TANK_AREA_M2*1e3);e.level=Math.max(0,Math.min(Bt.TANK_MAX_RANGE_M,e.level+s))}}class js{constructor(e){this.model=e,this.hwSolver=new h0(e),this.worker=null,this.workerAvailable=!1,this.initWorker()}initWorker(){try{typeof window<"u"&&typeof Worker<"u"&&(this.worker=new Worker(new URL(""+new URL("epanet-worker-CsayE2TG.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onmessage=e=>{e.data.type==="INIT_RESULT"&&(this.workerAvailable=e.data.success)},this.worker.postMessage({type:"INIT"}))}catch{console.warn("[HydraulicEngine] Web Worker not available in this environment. Using Hazen-Williams engine directly."),this.workerAvailable=!1}}step(e,t){e.simTimeMinutes+=t;const n=this.hwSolver.solve(e);if(this.hwSolver.updateTankMassBalance(e,t,n.trunkFlow),this.hwSolver.updateWaterQuality(e,t),this.worker&&this.workerAvailable)try{this.worker.postMessage({type:"SOLVE",payload:{simTimeMinutes:e.simTimeMinutes,level:e.level,faults:e.faults}})}catch{}return{trunkFlow:n.trunkFlow,branchFlows:n.branchFlows,isSupply:n.isSupply,tankHead:n.tankHead,tankLevel:e.level,pumpOn:e.pumpOn,pumpCurrent:e.pumpCurrent,cl:e.cl,tu:e.tu}}static getHouseholdStatus(e){return e.P<3?"none":e.P<7.14?"low":e.cl<.2||e.tu>5?"unsafe":"ok"}}class f0{constructor(e){this.canvas=e,this.quality="high",this.renderer=new c0({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.toneMapping=Ku,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Va,this.applyQualitySettings()}setQuality(e){this.quality=e,this.applyQualitySettings()}applyQualitySettings(){const e=typeof window<"u"?window.devicePixelRatio:1;this.quality==="low"?(this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1):this.quality==="medium"?(this.renderer.setPixelRatio(Math.min(e,1.25)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Jd):(this.renderer.setPixelRatio(Math.min(e,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Va)}resize(e,t){this.renderer.setSize(e,t,!1)}render(e,t){this.renderer.render(e,t)}dispose(){this.renderer.dispose()}}const pl={type:"change"},Jo={type:"start"},wd={type:"end"},Cr=new Vs,ml=new Ln,p0=Math.cos(70*Fh.DEG2RAD),gt=new V,Lt=2*Math.PI,at={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ca=1e-6;class m0 extends wf{constructor(e,t=null){super(e,t),this.state=at.NONE,this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new ri,this._lastTargetPosition=new V,this._quat=new ri().setFromUnitVectors(e.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Bc,this._sphericalDelta=new Bc,this._scale=1,this._panOffset=new V,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new V,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=g0.bind(this),this._onPointerDown=_0.bind(this),this._onPointerUp=v0.bind(this),this._onContextMenu=w0.bind(this),this._onMouseWheel=S0.bind(this),this._onKeyDown=M0.bind(this),this._onTouchStart=E0.bind(this),this._onTouchMove=b0.bind(this),this._onMouseDown=y0.bind(this),this._onMouseMove=x0.bind(this),this._interceptControlDown=T0.bind(this),this._interceptControlUp=A0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pl),this.update(),this.state=at.NONE}update(e=null){const t=this.object.position;gt.copy(t).sub(this.target),gt.applyQuaternion(this._quat),this._spherical.setFromVector3(gt),this.autoRotate&&this.state===at.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Lt:n>Math.PI&&(n-=Lt),r<-Math.PI?r+=Lt:r>Math.PI&&(r-=Lt),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(gt.setFromSpherical(this._spherical),gt.applyQuaternion(this._quatInverse),t.copy(this.target).add(gt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=gt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const o=new V(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new V(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=gt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Cr.origin.copy(this.object.position),Cr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cr.direction))<p0?this.object.lookAt(this.target):(ml.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cr.intersectPlane(ml,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Ca||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ca||this._lastTargetPosition.distanceToSquared(this.target)>Ca?(this.dispatchEvent(pl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Lt/60*this.autoRotateSpeed*e:Lt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){gt.setFromMatrixColumn(t,0),gt.multiplyScalar(-e),this._panOffset.add(gt)}_panUp(e,t){this.screenSpacePanning===!0?gt.setFromMatrixColumn(t,1):(gt.setFromMatrixColumn(t,0),gt.crossVectors(this.object.up,gt)),gt.multiplyScalar(e),this._panOffset.add(gt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;gt.copy(r).sub(this.target);let s=gt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Lt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Lt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Lt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function _0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function g0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function v0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wd),this.state=at.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function y0(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ri.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=at.DOLLY;break;case Ri.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=at.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=at.ROTATE}break;case Ri.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=at.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=at.PAN}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Jo)}function x0(i){switch(this.state){case at.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case at.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case at.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function S0(i){this.enabled===!1||this.enableZoom===!1||this.state!==at.NONE||(i.preventDefault(),this.dispatchEvent(Jo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(wd))}function M0(i){this.enabled!==!1&&this._handleKeyDown(i)}function E0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=at.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=at.TOUCH_PAN;break;default:this.state=at.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=at.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=at.TOUCH_DOLLY_ROTATE;break;default:this.state=at.NONE}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Jo)}function b0(i){switch(this._trackPointer(i),this.state){case at.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case at.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case at.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case at.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=at.NONE}}function w0(i){this.enabled!==!1&&i.preventDefault()}function T0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function A0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class R0{constructor(e,t=1){this.camera=new jt(42,t,.2,500),this.defaultTarget=new V(0,4,0),this.camera.position.set(38,30,44),this.camera.lookAt(this.defaultTarget),this.controls=new m0(this.camera,e),this.controls.target.copy(this.defaultTarget),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.maxPolarAngle=Math.PI/2-.04,this.controls.minDistance=6,this.controls.maxDistance=140,this.isTransitioning=!1,this.transitionStart=0,this.transitionDuration=1200,this.sourcePos=new V,this.targetPos=new V,this.sourceLookAt=new V,this.targetLookAt=new V,this.shakeIntensity=0,this.shakeDecay=0,this.shakeOffset=new V}resize(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}flyTo(e,t=16){this.isTransitioning=!0,this.transitionStart=performance.now(),this.sourcePos.copy(this.camera.position),this.sourceLookAt.copy(this.controls.target),this.targetLookAt.copy(e),this.targetPos.set(e.x+t*.7,e.y+t*.6,e.z+t*.7)}triggerShake(e=.45,t=1.2){this.shakeIntensity=e,this.shakeDecay=e/(t*60)}resetView(){this.flyTo(this.defaultTarget,48)}update(){if(this.isTransitioning){const e=performance.now()-this.transitionStart,t=Math.min(1,e/this.transitionDuration),n=1-Math.pow(1-t,3);this.camera.position.lerpVectors(this.sourcePos,this.targetPos,n),this.controls.target.lerpVectors(this.sourceLookAt,this.targetLookAt,n),t>=1&&(this.isTransitioning=!1)}this.shakeIntensity>.001&&(this.shakeOffset.set((Math.random()-.5)*this.shakeIntensity,(Math.random()-.5)*this.shakeIntensity,(Math.random()-.5)*this.shakeIntensity),this.camera.position.add(this.shakeOffset),this.shakeIntensity=Math.max(0,this.shakeIntensity-this.shakeDecay)),this.controls.update()}}class P0{constructor(e){this.scene=e,this.ambientLight=new Mf(16777215,.65),this.scene.add(this.ambientLight),this.sunLight=new Sf(16775917,1.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.width=2048,this.sunLight.shadow.mapSize.height=2048,this.sunLight.shadow.camera.near=.5,this.sunLight.shadow.camera.far=250,this.sunLight.shadow.bias=-5e-4;const t=48;this.sunLight.shadow.camera.left=-t,this.sunLight.shadow.camera.right=t,this.sunLight.shadow.camera.top=t,this.sunLight.shadow.camera.bottom=-t,this.scene.add(this.sunLight),this.hemiLight=new vf(14150130,9083811,.4),this.scene.add(this.hemiLight),this.fog=new Wo(14150130,55,160),this.scene.fog=this.fog}updateDayNightCycle(e,t="light"){const n=e/60%24,r=(n-6)/12*Math.PI,s=n>=5.5&&n<=18.5,a=65,o=Math.sin(r),c=Math.cos(r);if(s)if(this.sunLight.position.set(c*a*.7,Math.max(8,o*a),c*a*.5),n>=5.5&&n<7){const l=(n-5.5)/1.5;this.sunLight.color.setHex(16755302),this.sunLight.intensity=.6+.5*l,this.ambientLight.intensity=.4+.2*l}else if(n>=17&&n<=18.5){const l=(n-17)/1.5;this.sunLight.color.setHex(16742212),this.sunLight.intensity=1.1-.6*l,this.ambientLight.intensity=.6-.2*l}else this.sunLight.color.setHex(16775406),this.sunLight.intensity=1.25,this.ambientLight.intensity=.7;else{const l=(n<6?n+18:n-6)/12*Math.PI;this.sunLight.position.set(Math.cos(l)*a*.6,Math.max(12,Math.sin(l)*a*.7),Math.sin(l)*a*.6),this.sunLight.color.setHex(6333946),this.sunLight.intensity=.25,this.ambientLight.intensity=.25}if(t==="dark"||!s){const l=new Oe(463128);this.scene.background=l,this.fog.color.copy(l)}else{const l=new Oe(14150130);this.scene.background=l,this.fog.color.copy(l)}}}class C0{constructor(e){this.scene=e,this.groundMesh=null,this.pondMesh=null,this.decorationsGroup=new zt,this.isXRayCutaway=!1,this.buildTerrain(),this.buildVillagePond(),this.buildPublicHandpump(),this.buildVegetationAndFields(),this.scene.add(this.decorationsGroup)}getElevation(e,t){const n=Math.hypot(e-0,t- -9),r=Math.max(0,8*Math.exp(-Math.pow(n/8,2))),s=Math.hypot(e- -14,t- -9),a=Math.max(0,4*Math.exp(-Math.pow(s/6,2))),o=e>0&&Math.abs(t)<10?Math.min(6.5,4.5+e/25*2):0,c=e<0&&Math.abs(t)<10?Math.max(3,4.5-Math.abs(e)/25*1.5):0,l=t>0&&Math.abs(e)<12?Math.max(.6,4.5-t/25*3.7):0,u=Math.max(.5,4-t/20*2+e/30*1.5);return Math.max(.2,Math.max(r,a,o,c,l,u))}buildTerrain(){const n=new nr(110,110,64,64);n.rotateX(-Math.PI/2);const r=n.attributes.position,s=new Float32Array(r.count*3),a=new Oe(11915192),o=new Oe(13942425),c=new Oe(13287589),l=new Oe;for(let h=0;h<r.count;h++){const p=r.getX(h),m=r.getZ(h),g=this.getElevation(p,m);r.setY(h,g),Math.abs(p)<2.2&&m>-12&&m<25||Math.abs(m)<2&&Math.abs(p)<30?l.copy(o):g>5.5?l.copy(c):l.copy(a),s[h*3]=l.r,s[h*3+1]=l.g,s[h*3+2]=l.b}n.setAttribute("color",new Ht(s,3)),n.computeVertexNormals();const u=new et({vertexColors:!0,roughness:.88,metalness:.05,transparent:!0,opacity:1});this.groundMesh=new He(n,u),this.groundMesh.receiveShadow=!0,this.scene.add(this.groundMesh)}buildVillagePond(){const e=new Gs(8.5,32);e.rotateX(-Math.PI/2);const t=new et({color:2849400,roughness:.1,metalness:.8,transparent:!0,opacity:.85});this.pondMesh=new He(e,t),this.pondMesh.position.set(0,.45,27),this.scene.add(this.pondMesh)}buildPublicHandpump(){const e=new zt,t=this.getElevation(3,3);e.position.set(3,t,3);const n=new He(new _t(1.4,1.4,.2,16),new et({color:10265519,roughness:.7}));n.position.y=.1,n.receiveShadow=!0,e.add(n);const r=new He(new _t(.08,.08,1.1,8),new et({color:1409085,roughness:.5}));r.position.y=.65,r.castShadow=!0,e.add(r);const s=new He(new _t(.03,.03,.9,6),new et({color:3621201}));s.position.set(.3,1,0),s.rotation.z=Math.PI/6,e.add(s),this.decorationsGroup.add(e)}buildVegetationAndFields(){const e=new _t(.18,.25,2.2,6),t=new Xo(1.6),n=new et({color:6045747,roughness:.9}),r=new et({color:2976335,roughness:.8});[[-18,-14],[-8,-14],[8,-14],[18,-14],[-22,10],[-18,22],[18,12],[22,20],[-5,26],[7,26]].forEach(([a,o])=>{const c=this.getElevation(a,o),l=new zt;l.position.set(a,c,o);const u=new He(e,n);u.position.y=1.1,u.castShadow=!0;const h=new He(t,r);h.position.y=2.4,h.scale.set(1,1.2,1),h.castShadow=!0,l.add(u,h),this.decorationsGroup.add(l)})}setTrenchCutaway(e){this.isXRayCutaway=e,this.groundMesh&&(e?(this.groundMesh.material.opacity=.28,this.groundMesh.material.depthWrite=!1,this.groundMesh.material.wireframe=!0):(this.groundMesh.material.opacity=1,this.groundMesh.material.depthWrite=!0,this.groundMesh.material.wireframe=!1))}}class D0{constructor(e,t){this.scene=e,this.model=t,this.houseMeshes=[],this.tapStands=[],this.waterMesh=null,this.pumpLed=null,this.buildElevatedStorageReservoir(),this.buildPumpHouse(),this.buildHouseholdDwellings()}buildElevatedStorageReservoir(){const e=new zt,[t,n,r]=this.model.ESR_POS;e.position.set(t,n,r);const s=15,a=new _t(.35,.45,s,12),o=new et({color:9741240,roughness:.7});[[2.2,2.2],[-2.2,2.2],[2.2,-2.2],[-2.2,-2.2]].forEach(([d,_])=>{const v=new He(a,o);v.position.set(d,s/2,_),v.castShadow=!0,v.receiveShadow=!0,e.add(v)}),[5,10,14.8].forEach(d=>{const _=new He(new Ws(3.1,.12,8,16),o);_.rotation.x=Math.PI/2,_.position.y=d,e.add(_)});const l=new He(new _t(.24,.24,s+1,12),new et({color:165063,metalness:.4,roughness:.4}));l.position.y=(s+1)/2,l.castShadow=!0,e.add(l);const u=new He(new _t(3.6,3.6,.4,24),new et({color:6583435,roughness:.6}));u.position.y=s,u.receiveShadow=!0,e.add(u);const h=4.2,p=3.2,m=new He(new _t(p,p,h,32),new et({color:12248829,transparent:!0,opacity:.35,roughness:.1,metalness:.1}));m.position.y=s+h/2,e.add(m);const g=new He(new Ti(p+.3,1.2,32),new et({color:165063,roughness:.5}));g.position.y=s+h+.6,e.add(g);const M=new _t(p-.1,p-.1,1,24),f=new et({color:165063,roughness:.1,metalness:.6,transparent:!0,opacity:.85});this.waterMesh=new He(M,f),this.waterMesh.position.y=s+.5,e.add(this.waterMesh),this.scene.add(e)}buildPumpHouse(){const e=new zt,[t,n,r]=this.model.PUMP_POS;e.position.set(t,n,r);const s=new He(new En(4,2.8,3.2),new et({color:12456508,roughness:.8}));s.position.y=1.4,s.castShadow=!0,s.receiveShadow=!0,e.add(s);const a=new He(new Ti(3.2,1,4),new et({color:4674921,metalness:.6,roughness:.4}));a.position.y=3.3,a.rotation.y=Math.PI/4,a.castShadow=!0,e.add(a);const o=new He(new _t(.25,.25,1.4,12),new et({color:1976635,metalness:.7,roughness:.3}));o.position.set(2.8,.7,0),o.castShadow=!0,e.add(o);const c=new He(new _t(.35,.35,.2,12),new et({color:165063}));c.position.set(2.8,1.4,0),e.add(c);const l=new He(new En(.6,.9,.3),new et({color:9741240}));l.position.set(-2.05,1.6,.5),e.add(l);const u=new Yo(.12,12,12),h=new Go({color:2278750});this.pumpLed=new He(u,h),this.pumpLed.position.set(-2.22,1.8,.5),e.add(this.pumpLed),this.scene.add(e)}buildHouseholdDwellings(){const e={mud:new et({color:14251782,roughness:.9}),brick:new et({color:12131356,roughness:.8}),plaster:new et({color:15857145,roughness:.6}),roofTile:new et({color:10105874,roughness:.7}),roofTin:new et({color:6583435,metalness:.6,roughness:.4}),roofFlat:new et({color:14870768,roughness:.6}),sintexTank:new et({color:988970,roughness:.3}),faucetBrass:new et({color:15381256,metalness:.8,roughness:.2})};this.model.households.forEach((t,n)=>{const r=new zt,[s,a,o]=t.housePos;r.position.set(s,a,o);const c=n%4,l=c===0?e.mud:c===1?e.brick:e.plaster,u=t.siteType==="school"?4.2:2.6,h=t.siteType==="school"?2.4:1.8,p=t.siteType==="school"?3.4:2.4,m=new He(new En(u,h,p),l.clone());if(m.position.y=h/2,m.castShadow=!0,m.receiveShadow=!0,m.userData.node=t,r.add(m),this.houseMeshes.push(m),t.mesh=m,c===0){const f=new He(new Ti(2.2,1.1,4),e.roofTile);f.position.y=h+.55,f.rotation.y=Math.PI/4,f.castShadow=!0,r.add(f)}else if(c===1||c===2){const f=new He(new Ti(2.3,.9,4),c===1?e.roofTile:e.roofTin);f.position.y=h+.45,f.rotation.y=Math.PI/4,f.castShadow=!0,r.add(f)}else{const f=new He(new En(u+.2,.25,p+.2),e.roofFlat);f.position.y=h+.12,r.add(f);const d=new He(new _t(.45,.45,.8,12),e.sintexTank);d.position.set(.6,h+.55,.4),d.castShadow=!0,r.add(d)}const g=new He(new _t(.04,.04,.85,8),new et({color:4674921}));g.position.set(1.6,.42,1.2),g.castShadow=!0;const M=new He(new _t(.03,.03,.15,6),e.faucetBrass);M.position.set(1.68,.8,1.2),M.rotation.z=Math.PI/2,r.add(g,M),this.tapStands.push({node:t,worldPos:new V(s+1.68,a+.8,o+1.2)}),this.scene.add(r)})}update(e){if(this.waterMesh){const n=Math.max(.05,Math.min(4,e.level));this.waterMesh.scale.y=n,this.waterMesh.position.y=15+n/2}this.pumpLed&&(e.pumpOn?this.pumpLed.material.color.setHex(2278750):e.pumpCmd?this.pumpLed.material.color.setHex(15680580):this.pumpLed.material.color.setHex(9741240));const t={ok:14674404,low:16096779,none:15680580,unsafe:9647082};this.model.households.forEach(n=>{const r=js.getHouseholdStatus(n);n.mesh&&n.mesh.material.color.setHex(t[r]||14674404)})}}class I0{constructor(e,t){this.scene=e,this.model=t,this.pipes=[],this.pipeGroup=new zt,this.valvesGroup=new zt,this.buildNetworkPipes(),this.buildFittingsAndValves(),this.scene.add(this.pipeGroup,this.valvesGroup)}createPipeCylinder(e,t,n,r,s=null){const a=new V(...e),o=new V(...t);a.y=a.y-.6,o.y=o.y-.6;const c=a.distanceTo(o),l=Math.max(.06,n/1e3*1.6),u=new _t(l,l,c,12);u.translate(0,c/2,0),u.rotateX(Math.PI/2);const h=new et({color:165063,roughness:.35,metalness:.15}),p=new He(u,h);p.position.copy(a),p.lookAt(o),p.castShadow=!0,p.receiveShadow=!0,this.pipeGroup.add(p);const m={a,b:o,mesh:p,length:c,diameterMm:n,type:r,refNode:s,particlesPhase:[0,.2,.4,.6,.8]};return this.pipes.push(m),m}buildNetworkPipes(){const{PUMP_POS:e,ESR_POS:t,J0_POS:n,nodes:r}=this.model;this.createPipeCylinder(e,t,Bt.TRUNK_DIA_MM,"pump"),this.createPipeCylinder(t,n,Bt.TRUNK_DIA_MM,"trunk"),r.forEach(s=>{s.forEach((a,o)=>{const c=o===0?n:s[o-1].pos,l=Bt.BRANCH_DIAS_MM[o];this.createPipeCylinder(c,a.pos,l,"branch",a),this.createPipeCylinder(a.pos,a.housePos,Bt.SERVICE_DIA_MM,"service",a)})})}buildFittingsAndValves(){const[e,t,n]=this.model.J0_POS,r=t-.6,s=new Ws(.28,.04,8,16);s.rotateX(Math.PI/2);const a=new _t(.04,.04,.6,8),o=new et({color:14251782,roughness:.4,metalness:.6});this.model.nodes.forEach(c=>{const l=c[0].pos,u=e+(l[0]-e)*.15,h=n+(l[2]-n)*.15,p=new zt;p.position.set(u,r+.3,h);const m=new He(a,o);m.position.y=.3;const g=new He(s,o);g.position.y=.6,p.add(m,g),this.valvesGroup.add(p)})}update(e,t){const n=new Oe(165063),r=new Oe(16096779),s=new Oe(15680580),a=new Oe(7877903);this.pipes.forEach(o=>{let c=14,l=e.tu;o.refNode?(c=o.refNode.P,l=o.refNode.tu):o.type==="trunk"&&(c=e.PJ_head||14),l>5?o.mesh.material.color.copy(a):c>=7.14?o.mesh.material.color.copy(n):c>=3?o.mesh.material.color.copy(r):o.mesh.material.color.copy(s)})}}class L0{constructor(e,t,n){this.scene=e,this.pipesManager=t,this.buildingsManager=n,this.flowPointsMesh=null,this.flowPositions=null,this.tapStreams=[],this.burstEffect=null,this.leakEffect=null,this.initPipeFlowParticles(),this.initHouseholdTapStreams(),this.initBurstAndLeakEffects()}initPipeFlowParticles(){const n=this.pipesManager.pipes.length*8;this.flowPositions=new Float32Array(n*3);const r=new Ct;r.setAttribute("position",new Ht(this.flowPositions,3));const s=new Do({color:12248829,size:.35,transparent:!0,opacity:.9,depthWrite:!1});this.flowPointsMesh=new Nc(r,s),this.flowPointsMesh.renderOrder=2,this.flowPointsMesh.frustumCulled=!1,this.scene.add(this.flowPointsMesh)}initHouseholdTapStreams(){const e=new _t(.015,.02,.7,6);e.translate(0,-.35,0);const t=new et({color:3718648,transparent:!0,opacity:.85,roughness:.1,metalness:.5});this.buildingsManager.tapStands.forEach(n=>{const r=new He(e,t.clone());r.position.copy(n.worldPos),r.visible=!1,this.scene.add(r),this.tapStreams.push({node:n.node,mesh:r,tapPos:n.worldPos})})}createSprayEffect(e,t,n,r){const s=new Float32Array(e*3).fill(-100),a=new Float32Array(e*3),o=new Ct;o.setAttribute("position",new Ht(s,3));const c=new Do({color:14742270,size:t,transparent:!0,opacity:.9,depthWrite:!1}),l=new Nc(o,c);l.visible=!1,l.renderOrder=3,l.frustumCulled=!1,this.scene.add(l);const u=new Gs(1,32);u.rotateX(-Math.PI/2);const h=new et({color:165063,transparent:!0,opacity:.75,roughness:.1,metalness:.8}),p=new He(u,h);return p.position.set(n[0],n[1]+.06,n[2]),p.scale.set(.01,.01,.01),this.scene.add(p),{particles:l,pos:s,vel:a,count:e,source:new V(...n),puddle:p,maxPuddleRadius:r,growth:0}}initBurstAndLeakEffects(){const e=this.pipesManager.model.nodes[0][1].pos;this.burstEffect=this.createSprayEffect(220,.38,e,4.5);const t=this.pipesManager.model.nodes[1][2].pos;this.leakEffect=this.createSprayEffect(60,.22,t,1.8)}stepSpraySystem(e,t,n,r){e.particles.visible=t||e.growth>.02,e.growth=Math.max(0,Math.min(1,e.growth+(t?.08:-.04)*n*4));const s=Math.max(.01,e.growth*e.maxPuddleRadius);if(e.puddle.scale.set(s,1,s),!!e.particles.visible){for(let a=0;a<e.count;a++){const o=a*3;t&&e.pos[o+1]<e.source.y?(e.pos[o]=e.source.x+(Math.random()-.5)*.4,e.pos[o+1]=e.source.y+.1,e.pos[o+2]=e.source.z+(Math.random()-.5)*.4,e.vel[o]=(Math.random()-.5)*r*1.5,e.vel[o+1]=r*(1.5+Math.random()*2.2),e.vel[o+2]=(Math.random()-.5)*r*1.5):e.pos[o+1]>=e.source.y&&(e.pos[o]+=e.vel[o]*n,e.pos[o+1]+=e.vel[o+1]*n,e.pos[o+2]+=e.vel[o+2]*n,e.vel[o+1]-=9.81*n)}e.particles.geometry.attributes.position.needsUpdate=!0}}update(e,t,n){let r=0;const s=8,a=new Oe(12248829),o=new Oe(10576391);this.flowPointsMesh&&this.flowPointsMesh.material.color.copy(e.tu>5?o:a),this.pipesManager.pipes.forEach(c=>{let l=0;c.type==="pump"?l=e.pumpOn?400:0:c.type==="trunk"?l=t.trunkFlow:c.refNode&&(l=c.type==="branch"?t.branchFlows[c.refNode.bIdx][c.refNode.index]:c.refNode.q);const u=l>.5?Math.min(3,.2+l*.008):0;for(let h=0;h<s;h++){c.particlesPhase[h]=(c.particlesPhase[h]+u*n/Math.max(1,c.length))%1;const p=c.particlesPhase[h],m=r*3;this.flowPositions[m]=c.a.x+(c.b.x-c.a.x)*p,this.flowPositions[m+1]=c.a.y+(c.b.y-c.a.y)*p,this.flowPositions[m+2]=c.a.z+(c.b.z-c.a.z)*p,r++}}),this.flowPointsMesh&&(this.flowPointsMesh.geometry.attributes.position.needsUpdate=!0),this.tapStreams.forEach(c=>{const l=t.isSupply,u=c.node.P,h=c.node.tu>5;!l||u<3?c.mesh.visible=!1:(c.mesh.visible=!0,c.mesh.material.color.setHex(h?7877903:3718648),u<7.14?c.mesh.scale.set(.35,.7,.35):c.mesh.scale.set(1,1,1))}),this.stepSpraySystem(this.burstEffect,!!e.faults.burst,n,4.2),this.stepSpraySystem(this.leakEffect,!!e.faults.leak,n,1.6)}}class Td{constructor(e){this.model=e,this.nodes=e.nodes,this.activeAlerts={},this.closedAlerts=[],this.alertCounter=1}evaluate(e,t){const n={},r=(a,o,c,l,u,h)=>{n[a]={alert_id:`ALT-20261004-${String(this.alertCounter++).padStart(4,"0")}`,type:o,severity:c,scope:{gp:$i.lgd_gp_code,branch:l,...u?{fhtc_id:u}:{}},reason:h,created_ts:new Date(Date.UTC(2026,9,4,0,Math.floor(e.simTimeMinutes))).toISOString(),status:"active",branchKey:l}};e.pfm=e.pumpCmd&&!e.pumpOn?(e.pfm||0)+1:0,e.pfm>=8&&r("pump","no_supply","high","Pump House Headworks",null,`Pump is commanded ON but motor current is ${e.pumpCurrent.toFixed(1)} A for ${e.pfm} min. Tank level is ${e.level.toFixed(1)} m and falling.`);const s=this.model.households.filter(a=>a.P<3).length;return e.level<.5&&r("esr","no_supply","high","Elevated Storage Reservoir",null,`Tank level is ${e.level.toFixed(1)} m. ${s} of ${$i.total_households} households have no water.`),this.nodes.forEach((a,o)=>{const c=this.model.nodes[o][0].branchId,l=t.branchFlows[o][0],u=t.isSupply?75:0,h=l-u,p=a.filter(M=>M.reported).length,m=a[4],g=m.P;if(h>8){let M=0;a.forEach((d,_)=>{d.leak>a[M].leak&&(M=_)});const f=h>60;r(`leak_${c}`,"leakage",f?"high":"medium",`Branch ${c}`,a[M].fhtc_id,`Branch ${c} inflow is ${Math.round(l)} lpm but its houses need about ${Math.round(u)} lpm, so ${Math.round(h)} lpm is lost. Likely near ${a[M].id}. ${p} of 5 households have reported.`)}else t.isSupply&&g<7.14&&e.level>=.5&&r(`lp_${c}`,"low_pressure","medium",`Branch ${c}`,m.fhtc_id,`Tail-end sensor on Branch ${c} reads ${g.toFixed(1)} m (${m.P_kpa} kPa, benchmark is 70 kPa) while the tank has water. Inflow is only ${Math.round(l)} lpm, so the pipe is probably choked.`)}),(e.cl<.2||e.tu>5)&&r("wq","quality","high","Tank Gravity Outlet Staging",null,`Chlorine is ${e.cl.toFixed(2)} mg/L (minimum 0.20) and turbidity is ${e.tu.toFixed(1)} NTU (maximum 5.0) at the tank outlet. Likely runoff after heavy rain.`),Object.keys(n).forEach(a=>{this.activeAlerts[a]?(Object.assign(this.activeAlerts[a],n[a]),this.activeAlerts[a].miss=0):this.activeAlerts[a]={...n[a],t0:e.simTimeMinutes,miss:0}}),Object.keys(this.activeAlerts).forEach(a=>{if(!n[a]&&(this.activeAlerts[a].miss+=1,this.activeAlerts[a].miss>=5)){const o=this.activeAlerts[a];this.closedAlerts.unshift({...o,status:"resolved",closed_ts:new Date(Date.UTC(2026,9,4,0,Math.floor(e.simTimeMinutes))).toISOString(),message:`${this.formatTime(e.simTimeMinutes)} ${o.type.replace("_"," ").toUpperCase()} on ${o.scope.branch} closed automatically (system normal for 5 min)`}),this.closedAlerts.length>5&&this.closedAlerts.pop(),delete this.activeAlerts[a]}}),{active:Object.values(this.activeAlerts),closed:this.closedAlerts}}static getEscalation(e,t){const n=t-e.t0;return n<30?"Jal Mitra notified":n<120?"Escalated to Village Water & Sanitation Committee (VWSC)":n<360?"Escalated to Junior Engineer (JE)":"Escalated to Executive Engineer (EE)"}formatTime(e){const t=Math.floor(e%1440),n=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0");return`${n}:${r}`}}const _l=["qr","whatsapp","ivr","app"],N0={none:"no_water",low:"low_pressure",unsafe:"dirty_water"},U0={no_water:["Subah se nal me paani bilkul nahi aa raha hai.","No water supply received during scheduled morning hours.","Tap is completely dry since today morning."],low_pressure:["Nal se paani bahut dheeme beh raha hai, dhaar bahut patli hai.","Very low water pressure at the tap standpost, bucket taking 20 mins.","Pressure is too weak to fill household storage buckets."],dirty_water:["Paani mitti jaisa peela aur badbudaar aa raha hai.","Turbid muddy water coming out from tap after rainfall.","Water quality is unsafe and smells unchlorinated."]};class O0{constructor(e){this.model=e,this.households=e.households,this.feedbackLog=[],this.ticketCounter=1}step(e,t){const n=e.simTimeMinutes/60%24,r=[];return n<6||n>22||this.households.forEach(s=>{const a=js.getHouseholdStatus(s);if(a==="ok")s.reported=!1;else if(!s.reported){const o=.05*t;if(Math.random()<o){s.reported=!0;const c=_l[Math.floor(Math.random()*_l.length)],l=N0[a]||"other",u=U0[l]||["Problem reported by citizen."],h=u[Math.floor(Math.random()*u.length)],p=Math.random()>.4?"hi":"en",m=`FB-20261004-${String(this.ticketCounter++).padStart(4,"0")}`,g=new Date(Date.UTC(2026,9,4,0,Math.floor(e.simTimeMinutes))).toISOString(),M=29.0832,f=77.7121,d=Number((M+s.housePos[2]*1e-4).toFixed(6)),_=Number((f+s.housePos[0]*1e-4).toFixed(6)),v={feedback_id:m,fhtc_id:s.fhtc_id,channel:c,category:l,lang:p,ts:g,text:h,lat:d,lon:_,nodeId:s.id,displayTime:this.formatTime(e.simTimeMinutes)};this.feedbackLog.unshift(v),r.push(v),this.feedbackLog.length>20&&this.feedbackLog.pop()}}}),r}formatTime(e){const t=Math.floor(e%1440),n=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0");return`${n}:${r}`}}class F0{constructor(){this.seqCounters={[an.PUMP.node_id]:100,[an.ESR.node_id]:100,[an.FLOW.node_id]:100,[an.TAIL_PRESSURE.node_id]:100,[an.QUALITY.node_id]:100},this.packetLossEnabled=!1,this.packetLossRate=.025,this.sensorDriftEnabled=!1,this.driftAccumulatorKpa=0}createPacket(e,t,n){if(this.packetLossEnabled&&Math.random()<this.packetLossRate)return null;const r=this.seqCounters[e.node_id]++,s=Number((3.85+.1*Math.sin(r/20)).toFixed(2)),a=Math.round(-78+4*Math.sin(r/15));return{schema_version:"1.0",node_id:e.node_id,lgd_gp_code:$i.lgd_gp_code,scheme_id:$i.scheme_id,ts:n,seq:r,type:e.type,values:t,battery_v:s,rssi_dbm:a,fw:"2.4.1"}}emitLiveTelemetry(e,t){const n=new Date(Date.UTC(2026,9,4,0,Math.floor(e.simTimeMinutes))).toISOString(),r=[],s=this.createPacket(an.PUMP,{state:e.pumpOn?1:0,current_a:Number(e.pumpCurrent.toFixed(1)),voltage_v:e.pumpOn?415:0},n);s&&r.push(s);const a=Number((e.level*100).toFixed(1)),o=this.createPacket(an.ESR,{level_cm:a},n);o&&r.push(o);const c=Number(t.trunkFlow.toFixed(1)),l=this.createPacket(an.FLOW,{flow_lpm:c},n);l&&r.push(l);let u=Number(e.nodes[1][4].P_kpa.toFixed(1));this.sensorDriftEnabled&&(this.driftAccumulatorKpa+=.02,u=Number((u+this.driftAccumulatorKpa).toFixed(1)));const h=this.createPacket(an.TAIL_PRESSURE,{pressure_kpa:u},n);h&&r.push(h);const p=this.createPacket(an.QUALITY,{turbidity_ntu:Number(e.tu.toFixed(2)),chlorine_mgl:Number(e.cl.toFixed(2)),ph:Number((7.2+.1*Math.sin(e.simTimeMinutes/100)).toFixed(2)),tds_ppm:210},n);return p&&r.push(p),r}}function Ad(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Dr={exports:{}},Da={},_n={},jn={},Ia={},La={},Na={},gl;function $s(){return gl||(gl=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.regexpCode=i.getEsmExportName=i.getProperty=i.safeStringify=i.stringify=i.strConcat=i.addCodeArg=i.str=i._=i.nil=i._Code=i.Name=i.IDENTIFIER=i._CodeOrName=void 0;class e{}i._CodeOrName=e,i.IDENTIFIER=/^[a-z$_][a-z$_0-9]*$/i;class t extends e{constructor(_){if(super(),!i.IDENTIFIER.test(_))throw new Error("CodeGen: name must be a valid identifier");this.str=_}toString(){return this.str}emptyStr(){return!1}get names(){return{[this.str]:1}}}i.Name=t;class n extends e{constructor(_){super(),this._items=typeof _=="string"?[_]:_}toString(){return this.str}emptyStr(){if(this._items.length>1)return!1;const _=this._items[0];return _===""||_==='""'}get str(){var _;return(_=this._str)!==null&&_!==void 0?_:this._str=this._items.reduce((v,y)=>`${v}${y}`,"")}get names(){var _;return(_=this._names)!==null&&_!==void 0?_:this._names=this._items.reduce((v,y)=>(y instanceof t&&(v[y.str]=(v[y.str]||0)+1),v),{})}}i._Code=n,i.nil=new n("");function r(d,..._){const v=[d[0]];let y=0;for(;y<_.length;)o(v,_[y]),v.push(d[++y]);return new n(v)}i._=r;const s=new n("+");function a(d,..._){const v=[m(d[0])];let y=0;for(;y<_.length;)v.push(s),o(v,_[y]),v.push(s,m(d[++y]));return c(v),new n(v)}i.str=a;function o(d,_){_ instanceof n?d.push(..._._items):_ instanceof t?d.push(_):d.push(h(_))}i.addCodeArg=o;function c(d){let _=1;for(;_<d.length-1;){if(d[_]===s){const v=l(d[_-1],d[_+1]);if(v!==void 0){d.splice(_-1,3,v);continue}d[_++]="+"}_++}}function l(d,_){if(_==='""')return d;if(d==='""')return _;if(typeof d=="string")return _ instanceof t||d[d.length-1]!=='"'?void 0:typeof _!="string"?`${d.slice(0,-1)}${_}"`:_[0]==='"'?d.slice(0,-1)+_.slice(1):void 0;if(typeof _=="string"&&_[0]==='"'&&!(d instanceof t))return`"${d}${_.slice(1)}`}function u(d,_){return _.emptyStr()?d:d.emptyStr()?_:a`${d}${_}`}i.strConcat=u;function h(d){return typeof d=="number"||typeof d=="boolean"||d===null?d:m(Array.isArray(d)?d.join(","):d)}function p(d){return new n(m(d))}i.stringify=p;function m(d){return JSON.stringify(d).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}i.safeStringify=m;function g(d){return typeof d=="string"&&i.IDENTIFIER.test(d)?new n(`.${d}`):r`[${d}]`}i.getProperty=g;function M(d){if(typeof d=="string"&&i.IDENTIFIER.test(d))return new n(`${d}`);throw new Error(`CodeGen: invalid export name: ${d}, use explicit $id name mapping`)}i.getEsmExportName=M;function f(d){return new n(d.toString())}i.regexpCode=f})(Na)),Na}var Ua={},vl;function yl(){return vl||(vl=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.ValueScope=i.ValueScopeName=i.Scope=i.varKinds=i.UsedValueState=void 0;const e=$s();class t extends Error{constructor(l){super(`CodeGen: "code" for ${l} not defined`),this.value=l.value}}var n;(function(c){c[c.Started=0]="Started",c[c.Completed=1]="Completed"})(n||(i.UsedValueState=n={})),i.varKinds={const:new e.Name("const"),let:new e.Name("let"),var:new e.Name("var")};class r{constructor({prefixes:l,parent:u}={}){this._names={},this._prefixes=l,this._parent=u}toName(l){return l instanceof e.Name?l:this.name(l)}name(l){return new e.Name(this._newName(l))}_newName(l){const u=this._names[l]||this._nameGroup(l);return`${l}${u.index++}`}_nameGroup(l){var u,h;if(!((h=(u=this._parent)===null||u===void 0?void 0:u._prefixes)===null||h===void 0)&&h.has(l)||this._prefixes&&!this._prefixes.has(l))throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);return this._names[l]={prefix:l,index:0}}}i.Scope=r;class s extends e.Name{constructor(l,u){super(u),this.prefix=l}setValue(l,{property:u,itemIndex:h}){this.value=l,this.scopePath=(0,e._)`.${new e.Name(u)}[${h}]`}}i.ValueScopeName=s;const a=(0,e._)`\n`;class o extends r{constructor(l){super(l),this._values={},this._scope=l.scope,this.opts={...l,_n:l.lines?a:e.nil}}get(){return this._scope}name(l){return new s(l,this._newName(l))}value(l,u){var h;if(u.ref===void 0)throw new Error("CodeGen: ref must be passed in value");const p=this.toName(l),{prefix:m}=p,g=(h=u.key)!==null&&h!==void 0?h:u.ref;let M=this._values[m];if(M){const _=M.get(g);if(_)return _}else M=this._values[m]=new Map;M.set(g,p);const f=this._scope[m]||(this._scope[m]=[]),d=f.length;return f[d]=u.ref,p.setValue(u,{property:m,itemIndex:d}),p}getValue(l,u){const h=this._values[l];if(h)return h.get(u)}scopeRefs(l,u=this._values){return this._reduceValues(u,h=>{if(h.scopePath===void 0)throw new Error(`CodeGen: name "${h}" has no value`);return(0,e._)`${l}${h.scopePath}`})}scopeCode(l=this._values,u,h){return this._reduceValues(l,p=>{if(p.value===void 0)throw new Error(`CodeGen: name "${p}" has no value`);return p.value.code},u,h)}_reduceValues(l,u,h={},p){let m=e.nil;for(const g in l){const M=l[g];if(!M)continue;const f=h[g]=h[g]||new Map;M.forEach(d=>{if(f.has(d))return;f.set(d,n.Started);let _=u(d);if(_){const v=this.opts.es5?i.varKinds.var:i.varKinds.const;m=(0,e._)`${m}${v} ${d} = ${_};${this.opts._n}`}else if(_=p?.(d))m=(0,e._)`${m}${_}${this.opts._n}`;else throw new t(d);f.set(d,n.Completed)})}return m}}i.ValueScope=o})(Ua)),Ua}var xl;function Be(){return xl||(xl=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.or=i.and=i.not=i.CodeGen=i.operators=i.varKinds=i.ValueScopeName=i.ValueScope=i.Scope=i.Name=i.regexpCode=i.stringify=i.getProperty=i.nil=i.strConcat=i.str=i._=void 0;const e=$s(),t=yl();var n=$s();Object.defineProperty(i,"_",{enumerable:!0,get:function(){return n._}}),Object.defineProperty(i,"str",{enumerable:!0,get:function(){return n.str}}),Object.defineProperty(i,"strConcat",{enumerable:!0,get:function(){return n.strConcat}}),Object.defineProperty(i,"nil",{enumerable:!0,get:function(){return n.nil}}),Object.defineProperty(i,"getProperty",{enumerable:!0,get:function(){return n.getProperty}}),Object.defineProperty(i,"stringify",{enumerable:!0,get:function(){return n.stringify}}),Object.defineProperty(i,"regexpCode",{enumerable:!0,get:function(){return n.regexpCode}}),Object.defineProperty(i,"Name",{enumerable:!0,get:function(){return n.Name}});var r=yl();Object.defineProperty(i,"Scope",{enumerable:!0,get:function(){return r.Scope}}),Object.defineProperty(i,"ValueScope",{enumerable:!0,get:function(){return r.ValueScope}}),Object.defineProperty(i,"ValueScopeName",{enumerable:!0,get:function(){return r.ValueScopeName}}),Object.defineProperty(i,"varKinds",{enumerable:!0,get:function(){return r.varKinds}}),i.operators={GT:new e._Code(">"),GTE:new e._Code(">="),LT:new e._Code("<"),LTE:new e._Code("<="),EQ:new e._Code("==="),NEQ:new e._Code("!=="),NOT:new e._Code("!"),OR:new e._Code("||"),AND:new e._Code("&&"),ADD:new e._Code("+")};class s{optimizeNodes(){return this}optimizeNames(S,C){return this}}class a extends s{constructor(S,C,k){super(),this.varKind=S,this.name=C,this.rhs=k}render({es5:S,_n:C}){const k=S?t.varKinds.var:this.varKind,X=this.rhs===void 0?"":` = ${this.rhs}`;return`${k} ${this.name}${X};`+C}optimizeNames(S,C){if(S[this.name.str])return this.rhs&&(this.rhs=H(this.rhs,S,C)),this}get names(){return this.rhs instanceof e._CodeOrName?this.rhs.names:{}}}class o extends s{constructor(S,C,k){super(),this.lhs=S,this.rhs=C,this.sideEffects=k}render({_n:S}){return`${this.lhs} = ${this.rhs};`+S}optimizeNames(S,C){if(!(this.lhs instanceof e.Name&&!S[this.lhs.str]&&!this.sideEffects))return this.rhs=H(this.rhs,S,C),this}get names(){const S=this.lhs instanceof e.Name?{}:{...this.lhs.names};return B(S,this.rhs)}}class c extends o{constructor(S,C,k,X){super(S,k,X),this.op=C}render({_n:S}){return`${this.lhs} ${this.op}= ${this.rhs};`+S}}class l extends s{constructor(S){super(),this.label=S,this.names={}}render({_n:S}){return`${this.label}:`+S}}class u extends s{constructor(S){super(),this.label=S,this.names={}}render({_n:S}){return`break${this.label?` ${this.label}`:""};`+S}}class h extends s{constructor(S){super(),this.error=S}render({_n:S}){return`throw ${this.error};`+S}get names(){return this.error.names}}class p extends s{constructor(S){super(),this.code=S}render({_n:S}){return`${this.code};`+S}optimizeNodes(){return`${this.code}`?this:void 0}optimizeNames(S,C){return this.code=H(this.code,S,C),this}get names(){return this.code instanceof e._CodeOrName?this.code.names:{}}}class m extends s{constructor(S=[]){super(),this.nodes=S}render(S){return this.nodes.reduce((C,k)=>C+k.render(S),"")}optimizeNodes(){const{nodes:S}=this;let C=S.length;for(;C--;){const k=S[C].optimizeNodes();Array.isArray(k)?S.splice(C,1,...k):k?S[C]=k:S.splice(C,1)}return S.length>0?this:void 0}optimizeNames(S,C){const{nodes:k}=this;let X=k.length;for(;X--;){const ie=k[X];ie.optimizeNames(S,C)||(te(S,ie.names),k.splice(X,1))}return k.length>0?this:void 0}get names(){return this.nodes.reduce((S,C)=>$(S,C.names),{})}}class g extends m{render(S){return"{"+S._n+super.render(S)+"}"+S._n}}class M extends m{}class f extends g{}f.kind="else";class d extends g{constructor(S,C){super(C),this.condition=S}render(S){let C=`if(${this.condition})`+super.render(S);return this.else&&(C+="else "+this.else.render(S)),C}optimizeNodes(){super.optimizeNodes();const S=this.condition;if(S===!0)return this.nodes;let C=this.else;if(C){const k=C.optimizeNodes();C=this.else=Array.isArray(k)?new f(k):k}if(C)return S===!1?C instanceof d?C:C.nodes:this.nodes.length?this:new d(Q(S),C instanceof d?[C]:C.nodes);if(!(S===!1||!this.nodes.length))return this}optimizeNames(S,C){var k;if(this.else=(k=this.else)===null||k===void 0?void 0:k.optimizeNames(S,C),!!(super.optimizeNames(S,C)||this.else))return this.condition=H(this.condition,S,C),this}get names(){const S=super.names;return B(S,this.condition),this.else&&$(S,this.else.names),S}}d.kind="if";class _ extends g{}_.kind="for";class v extends _{constructor(S){super(),this.iteration=S}render(S){return`for(${this.iteration})`+super.render(S)}optimizeNames(S,C){if(super.optimizeNames(S,C))return this.iteration=H(this.iteration,S,C),this}get names(){return $(super.names,this.iteration.names)}}class y extends _{constructor(S,C,k,X){super(),this.varKind=S,this.name=C,this.from=k,this.to=X}render(S){const C=S.es5?t.varKinds.var:this.varKind,{name:k,from:X,to:ie}=this;return`for(${C} ${k}=${X}; ${k}<${ie}; ${k}++)`+super.render(S)}get names(){const S=B(super.names,this.from);return B(S,this.to)}}class x extends _{constructor(S,C,k,X){super(),this.loop=S,this.varKind=C,this.name=k,this.iterable=X}render(S){return`for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})`+super.render(S)}optimizeNames(S,C){if(super.optimizeNames(S,C))return this.iterable=H(this.iterable,S,C),this}get names(){return $(super.names,this.iterable.names)}}class E extends g{constructor(S,C,k){super(),this.name=S,this.args=C,this.async=k}render(S){return`${this.async?"async ":""}function ${this.name}(${this.args})`+super.render(S)}}E.kind="func";class b extends m{render(S){return"return "+super.render(S)}}b.kind="return";class I extends g{render(S){let C="try"+super.render(S);return this.catch&&(C+=this.catch.render(S)),this.finally&&(C+=this.finally.render(S)),C}optimizeNodes(){var S,C;return super.optimizeNodes(),(S=this.catch)===null||S===void 0||S.optimizeNodes(),(C=this.finally)===null||C===void 0||C.optimizeNodes(),this}optimizeNames(S,C){var k,X;return super.optimizeNames(S,C),(k=this.catch)===null||k===void 0||k.optimizeNames(S,C),(X=this.finally)===null||X===void 0||X.optimizeNames(S,C),this}get names(){const S=super.names;return this.catch&&$(S,this.catch.names),this.finally&&$(S,this.finally.names),S}}class A extends g{constructor(S){super(),this.error=S}render(S){return`catch(${this.error})`+super.render(S)}}A.kind="catch";class w extends g{render(S){return"finally"+super.render(S)}}w.kind="finally";class U{constructor(S,C={}){this._values={},this._blockStarts=[],this._constants={},this.opts={...C,_n:C.lines?`
`:""},this._extScope=S,this._scope=new t.Scope({parent:S}),this._nodes=[new M]}toString(){return this._root.render(this.opts)}name(S){return this._scope.name(S)}scopeName(S){return this._extScope.name(S)}scopeValue(S,C){const k=this._extScope.value(S,C);return(this._values[k.prefix]||(this._values[k.prefix]=new Set)).add(k),k}getScopeValue(S,C){return this._extScope.getValue(S,C)}scopeRefs(S){return this._extScope.scopeRefs(S,this._values)}scopeCode(){return this._extScope.scopeCode(this._values)}_def(S,C,k,X){const ie=this._scope.toName(C);return k!==void 0&&X&&(this._constants[ie.str]=k),this._leafNode(new a(S,ie,k)),ie}const(S,C,k){return this._def(t.varKinds.const,S,C,k)}let(S,C,k){return this._def(t.varKinds.let,S,C,k)}var(S,C,k){return this._def(t.varKinds.var,S,C,k)}assign(S,C,k){return this._leafNode(new o(S,C,k))}add(S,C){return this._leafNode(new c(S,i.operators.ADD,C))}code(S){return typeof S=="function"?S():S!==e.nil&&this._leafNode(new p(S)),this}object(...S){const C=["{"];for(const[k,X]of S)C.length>1&&C.push(","),C.push(k),(k!==X||this.opts.es5)&&(C.push(":"),(0,e.addCodeArg)(C,X));return C.push("}"),new e._Code(C)}if(S,C,k){if(this._blockNode(new d(S)),C&&k)this.code(C).else().code(k).endIf();else if(C)this.code(C).endIf();else if(k)throw new Error('CodeGen: "else" body without "then" body');return this}elseIf(S){return this._elseNode(new d(S))}else(){return this._elseNode(new f)}endIf(){return this._endBlockNode(d,f)}_for(S,C){return this._blockNode(S),C&&this.code(C).endFor(),this}for(S,C){return this._for(new v(S),C)}forRange(S,C,k,X,ie=this.opts.es5?t.varKinds.var:t.varKinds.let){const me=this._scope.toName(S);return this._for(new y(ie,me,C,k),()=>X(me))}forOf(S,C,k,X=t.varKinds.const){const ie=this._scope.toName(S);if(this.opts.es5){const me=C instanceof e.Name?C:this.var("_arr",C);return this.forRange("_i",0,(0,e._)`${me}.length`,le=>{this.var(ie,(0,e._)`${me}[${le}]`),k(ie)})}return this._for(new x("of",X,ie,C),()=>k(ie))}forIn(S,C,k,X=this.opts.es5?t.varKinds.var:t.varKinds.const){if(this.opts.ownProperties)return this.forOf(S,(0,e._)`Object.keys(${C})`,k);const ie=this._scope.toName(S);return this._for(new x("in",X,ie,C),()=>k(ie))}endFor(){return this._endBlockNode(_)}label(S){return this._leafNode(new l(S))}break(S){return this._leafNode(new u(S))}return(S){const C=new b;if(this._blockNode(C),this.code(S),C.nodes.length!==1)throw new Error('CodeGen: "return" should have one node');return this._endBlockNode(b)}try(S,C,k){if(!C&&!k)throw new Error('CodeGen: "try" without "catch" and "finally"');const X=new I;if(this._blockNode(X),this.code(S),C){const ie=this.name("e");this._currNode=X.catch=new A(ie),C(ie)}return k&&(this._currNode=X.finally=new w,this.code(k)),this._endBlockNode(A,w)}throw(S){return this._leafNode(new h(S))}block(S,C){return this._blockStarts.push(this._nodes.length),S&&this.code(S).endBlock(C),this}endBlock(S){const C=this._blockStarts.pop();if(C===void 0)throw new Error("CodeGen: not in self-balancing block");const k=this._nodes.length-C;if(k<0||S!==void 0&&k!==S)throw new Error(`CodeGen: wrong number of nodes: ${k} vs ${S} expected`);return this._nodes.length=C,this}func(S,C=e.nil,k,X){return this._blockNode(new E(S,C,k)),X&&this.code(X).endFunc(),this}endFunc(){return this._endBlockNode(E)}optimize(S=1){for(;S-- >0;)this._root.optimizeNodes(),this._root.optimizeNames(this._root.names,this._constants)}_leafNode(S){return this._currNode.nodes.push(S),this}_blockNode(S){this._currNode.nodes.push(S),this._nodes.push(S)}_endBlockNode(S,C){const k=this._currNode;if(k instanceof S||C&&k instanceof C)return this._nodes.pop(),this;throw new Error(`CodeGen: not in block "${C?`${S.kind}/${C.kind}`:S.kind}"`)}_elseNode(S){const C=this._currNode;if(!(C instanceof d))throw new Error('CodeGen: "else" without "if"');return this._currNode=C.else=S,this}get _root(){return this._nodes[0]}get _currNode(){const S=this._nodes;return S[S.length-1]}set _currNode(S){const C=this._nodes;C[C.length-1]=S}}i.CodeGen=U;function $(P,S){for(const C in S)P[C]=(P[C]||0)+(S[C]||0);return P}function B(P,S){return S instanceof e._CodeOrName?$(P,S.names):P}function H(P,S,C){if(P instanceof e.Name)return k(P);if(!X(P))return P;return new e._Code(P._items.reduce((ie,me)=>(me instanceof e.Name&&(me=k(me)),me instanceof e._Code?ie.push(...me._items):ie.push(me),ie),[]));function k(ie){const me=C[ie.str];return me===void 0||S[ie.str]!==1?ie:(delete S[ie.str],me)}function X(ie){return ie instanceof e._Code&&ie._items.some(me=>me instanceof e.Name&&S[me.str]===1&&C[me.str]!==void 0)}}function te(P,S){for(const C in S)P[C]=(P[C]||0)-(S[C]||0)}function Q(P){return typeof P=="boolean"||typeof P=="number"||P===null?!P:(0,e._)`!${N(P)}`}i.not=Q;const oe=T(i.operators.AND);function K(...P){return P.reduce(oe)}i.and=K;const de=T(i.operators.OR);function R(...P){return P.reduce(de)}i.or=R;function T(P){return(S,C)=>S===e.nil?C:C===e.nil?S:(0,e._)`${N(S)} ${P} ${N(C)}`}function N(P){return P instanceof e.Name?P:(0,e._)`(${P})`}})(La)),La}var qe={},Sl;function Xe(){if(Sl)return qe;Sl=1,Object.defineProperty(qe,"__esModule",{value:!0}),qe.checkStrictMode=qe.getErrorPath=qe.Type=qe.useFunc=qe.setEvaluated=qe.evaluatedPropsToName=qe.mergeEvaluated=qe.eachItem=qe.unescapeJsonPointer=qe.escapeJsonPointer=qe.escapeFragment=qe.unescapeFragment=qe.schemaRefOrVal=qe.schemaHasRulesButRef=qe.schemaHasRules=qe.checkUnknownRules=qe.alwaysValidSchema=qe.toHash=void 0;const i=Be(),e=$s();function t(x){const E={};for(const b of x)E[b]=!0;return E}qe.toHash=t;function n(x,E){return typeof E=="boolean"?E:Object.keys(E).length===0?!0:(r(x,E),!s(E,x.self.RULES.all))}qe.alwaysValidSchema=n;function r(x,E=x.schema){const{opts:b,self:I}=x;if(!b.strictSchema||typeof E=="boolean")return;const A=I.RULES.keywords;for(const w in E)A[w]||y(x,`unknown keyword: "${w}"`)}qe.checkUnknownRules=r;function s(x,E){if(typeof x=="boolean")return!x;for(const b in x)if(E[b])return!0;return!1}qe.schemaHasRules=s;function a(x,E){if(typeof x=="boolean")return!x;for(const b in x)if(b!=="$ref"&&E.all[b])return!0;return!1}qe.schemaHasRulesButRef=a;function o({topSchemaRef:x,schemaPath:E},b,I,A){if(!A){if(typeof b=="number"||typeof b=="boolean")return b;if(typeof b=="string")return(0,i._)`${b}`}return(0,i._)`${x}${E}${(0,i.getProperty)(I)}`}qe.schemaRefOrVal=o;function c(x){return h(decodeURIComponent(x))}qe.unescapeFragment=c;function l(x){return encodeURIComponent(u(x))}qe.escapeFragment=l;function u(x){return typeof x=="number"?`${x}`:x.replace(/~/g,"~0").replace(/\//g,"~1")}qe.escapeJsonPointer=u;function h(x){return x.replace(/~1/g,"/").replace(/~0/g,"~")}qe.unescapeJsonPointer=h;function p(x,E){if(Array.isArray(x))for(const b of x)E(b);else E(x)}qe.eachItem=p;function m({mergeNames:x,mergeToName:E,mergeValues:b,resultToName:I}){return(A,w,U,$)=>{const B=U===void 0?w:U instanceof i.Name?(w instanceof i.Name?x(A,w,U):E(A,w,U),U):w instanceof i.Name?(E(A,U,w),w):b(w,U);return $===i.Name&&!(B instanceof i.Name)?I(A,B):B}}qe.mergeEvaluated={props:m({mergeNames:(x,E,b)=>x.if((0,i._)`${b} !== true && ${E} !== undefined`,()=>{x.if((0,i._)`${E} === true`,()=>x.assign(b,!0),()=>x.assign(b,(0,i._)`${b} || {}`).code((0,i._)`Object.assign(${b}, ${E})`))}),mergeToName:(x,E,b)=>x.if((0,i._)`${b} !== true`,()=>{E===!0?x.assign(b,!0):(x.assign(b,(0,i._)`${b} || {}`),M(x,b,E))}),mergeValues:(x,E)=>x===!0?!0:{...x,...E},resultToName:g}),items:m({mergeNames:(x,E,b)=>x.if((0,i._)`${b} !== true && ${E} !== undefined`,()=>x.assign(b,(0,i._)`${E} === true ? true : ${b} > ${E} ? ${b} : ${E}`)),mergeToName:(x,E,b)=>x.if((0,i._)`${b} !== true`,()=>x.assign(b,E===!0?!0:(0,i._)`${b} > ${E} ? ${b} : ${E}`)),mergeValues:(x,E)=>x===!0?!0:Math.max(x,E),resultToName:(x,E)=>x.var("items",E)})};function g(x,E){if(E===!0)return x.var("props",!0);const b=x.var("props",(0,i._)`{}`);return E!==void 0&&M(x,b,E),b}qe.evaluatedPropsToName=g;function M(x,E,b){Object.keys(b).forEach(I=>x.assign((0,i._)`${E}${(0,i.getProperty)(I)}`,!0))}qe.setEvaluated=M;const f={};function d(x,E){return x.scopeValue("func",{ref:E,code:f[E.code]||(f[E.code]=new e._Code(E.code))})}qe.useFunc=d;var _;(function(x){x[x.Num=0]="Num",x[x.Str=1]="Str"})(_||(qe.Type=_={}));function v(x,E,b){if(x instanceof i.Name){const I=E===_.Num;return b?I?(0,i._)`"[" + ${x} + "]"`:(0,i._)`"['" + ${x} + "']"`:I?(0,i._)`"/" + ${x}`:(0,i._)`"/" + ${x}.replace(/~/g, "~0").replace(/\\//g, "~1")`}return b?(0,i.getProperty)(x).toString():"/"+u(x)}qe.getErrorPath=v;function y(x,E,b=x.opts.strictSchema){if(b){if(E=`strict mode: ${E}`,b===!0)throw new Error(E);x.self.logger.warn(E)}}return qe.checkStrictMode=y,qe}var Ir={},Ml;function rn(){if(Ml)return Ir;Ml=1,Object.defineProperty(Ir,"__esModule",{value:!0});const i=Be(),e={data:new i.Name("data"),valCxt:new i.Name("valCxt"),instancePath:new i.Name("instancePath"),parentData:new i.Name("parentData"),parentDataProperty:new i.Name("parentDataProperty"),rootData:new i.Name("rootData"),dynamicAnchors:new i.Name("dynamicAnchors"),vErrors:new i.Name("vErrors"),errors:new i.Name("errors"),this:new i.Name("this"),self:new i.Name("self"),scope:new i.Name("scope"),json:new i.Name("json"),jsonPos:new i.Name("jsonPos"),jsonLen:new i.Name("jsonLen"),jsonPart:new i.Name("jsonPart")};return Ir.default=e,Ir}var El;function Xs(){return El||(El=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.extendErrors=i.resetErrorsCount=i.reportExtraError=i.reportError=i.keyword$DataError=i.keywordError=void 0;const e=Be(),t=Xe(),n=rn();i.keywordError={message:({keyword:f})=>(0,e.str)`must pass "${f}" keyword validation`},i.keyword$DataError={message:({keyword:f,schemaType:d})=>d?(0,e.str)`"${f}" keyword must be ${d} ($data)`:(0,e.str)`"${f}" keyword is invalid ($data)`};function r(f,d=i.keywordError,_,v){const{it:y}=f,{gen:x,compositeRule:E,allErrors:b}=y,I=h(f,d,_);v??(E||b)?c(x,I):l(y,(0,e._)`[${I}]`)}i.reportError=r;function s(f,d=i.keywordError,_){const{it:v}=f,{gen:y,compositeRule:x,allErrors:E}=v,b=h(f,d,_);c(y,b),x||E||l(v,n.default.vErrors)}i.reportExtraError=s;function a(f,d){f.assign(n.default.errors,d),f.if((0,e._)`${n.default.vErrors} !== null`,()=>f.if(d,()=>f.assign((0,e._)`${n.default.vErrors}.length`,d),()=>f.assign(n.default.vErrors,null)))}i.resetErrorsCount=a;function o({gen:f,keyword:d,schemaValue:_,data:v,errsCount:y,it:x}){if(y===void 0)throw new Error("ajv implementation error");const E=f.name("err");f.forRange("i",y,n.default.errors,b=>{f.const(E,(0,e._)`${n.default.vErrors}[${b}]`),f.if((0,e._)`${E}.instancePath === undefined`,()=>f.assign((0,e._)`${E}.instancePath`,(0,e.strConcat)(n.default.instancePath,x.errorPath))),f.assign((0,e._)`${E}.schemaPath`,(0,e.str)`${x.errSchemaPath}/${d}`),x.opts.verbose&&(f.assign((0,e._)`${E}.schema`,_),f.assign((0,e._)`${E}.data`,v))})}i.extendErrors=o;function c(f,d){const _=f.const("err",d);f.if((0,e._)`${n.default.vErrors} === null`,()=>f.assign(n.default.vErrors,(0,e._)`[${_}]`),(0,e._)`${n.default.vErrors}.push(${_})`),f.code((0,e._)`${n.default.errors}++`)}function l(f,d){const{gen:_,validateName:v,schemaEnv:y}=f;y.$async?_.throw((0,e._)`new ${f.ValidationError}(${d})`):(_.assign((0,e._)`${v}.errors`,d),_.return(!1))}const u={keyword:new e.Name("keyword"),schemaPath:new e.Name("schemaPath"),params:new e.Name("params"),propertyName:new e.Name("propertyName"),message:new e.Name("message"),schema:new e.Name("schema"),parentSchema:new e.Name("parentSchema")};function h(f,d,_){const{createErrors:v}=f.it;return v===!1?(0,e._)`{}`:p(f,d,_)}function p(f,d,_={}){const{gen:v,it:y}=f,x=[m(y,_),g(f,_)];return M(f,d,x),v.object(...x)}function m({errorPath:f},{instancePath:d}){const _=d?(0,e.str)`${f}${(0,t.getErrorPath)(d,t.Type.Str)}`:f;return[n.default.instancePath,(0,e.strConcat)(n.default.instancePath,_)]}function g({keyword:f,it:{errSchemaPath:d}},{schemaPath:_,parentSchema:v}){let y=v?d:(0,e.str)`${d}/${f}`;return _&&(y=(0,e.str)`${y}${(0,t.getErrorPath)(_,t.Type.Str)}`),[u.schemaPath,y]}function M(f,{params:d,message:_},v){const{keyword:y,data:x,schemaValue:E,it:b}=f,{opts:I,propertyName:A,topSchemaRef:w,schemaPath:U}=b;v.push([u.keyword,y],[u.params,typeof d=="function"?d(f):d||(0,e._)`{}`]),I.messages&&v.push([u.message,typeof _=="function"?_(f):_]),I.verbose&&v.push([u.schema,E],[u.parentSchema,(0,e._)`${w}${U}`],[n.default.data,x]),A&&v.push([u.propertyName,A])}})(Ia)),Ia}var bl;function k0(){if(bl)return jn;bl=1,Object.defineProperty(jn,"__esModule",{value:!0}),jn.boolOrEmptySchema=jn.topBoolOrEmptySchema=void 0;const i=Xs(),e=Be(),t=rn(),n={message:"boolean schema is false"};function r(o){const{gen:c,schema:l,validateName:u}=o;l===!1?a(o,!1):typeof l=="object"&&l.$async===!0?c.return(t.default.data):(c.assign((0,e._)`${u}.errors`,null),c.return(!0))}jn.topBoolOrEmptySchema=r;function s(o,c){const{gen:l,schema:u}=o;u===!1?(l.var(c,!1),a(o)):l.var(c,!0)}jn.boolOrEmptySchema=s;function a(o,c){const{gen:l,data:u}=o,h={gen:l,keyword:"false schema",data:u,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:o};(0,i.reportError)(h,n,void 0,c)}return jn}var Et={},Xn={},wl;function Rd(){if(wl)return Xn;wl=1,Object.defineProperty(Xn,"__esModule",{value:!0}),Xn.getRules=Xn.isJSONType=void 0;const i=["string","number","integer","boolean","null","object","array"],e=new Set(i);function t(r){return typeof r=="string"&&e.has(r)}Xn.isJSONType=t;function n(){const r={number:{type:"number",rules:[]},string:{type:"string",rules:[]},array:{type:"array",rules:[]},object:{type:"object",rules:[]}};return{types:{...r,integer:!0,boolean:!0,null:!0},rules:[{rules:[]},r.number,r.string,r.array,r.object],post:{rules:[]},all:{},keywords:{}}}return Xn.getRules=n,Xn}var gn={},Tl;function Pd(){if(Tl)return gn;Tl=1,Object.defineProperty(gn,"__esModule",{value:!0}),gn.shouldUseRule=gn.shouldUseGroup=gn.schemaHasRulesForType=void 0;function i({schema:n,self:r},s){const a=r.RULES.types[s];return a&&a!==!0&&e(n,a)}gn.schemaHasRulesForType=i;function e(n,r){return r.rules.some(s=>t(n,s))}gn.shouldUseGroup=e;function t(n,r){var s;return n[r.keyword]!==void 0||((s=r.definition.implements)===null||s===void 0?void 0:s.some(a=>n[a]!==void 0))}return gn.shouldUseRule=t,gn}var Al;function Bs(){if(Al)return Et;Al=1,Object.defineProperty(Et,"__esModule",{value:!0}),Et.reportTypeError=Et.checkDataTypes=Et.checkDataType=Et.coerceAndCheckDataType=Et.getJSONTypes=Et.getSchemaTypes=Et.DataType=void 0;const i=Rd(),e=Pd(),t=Xs(),n=Be(),r=Xe();var s;(function(_){_[_.Correct=0]="Correct",_[_.Wrong=1]="Wrong"})(s||(Et.DataType=s={}));function a(_){const v=o(_.type);if(v.includes("null")){if(_.nullable===!1)throw new Error("type: null contradicts nullable: false")}else{if(!v.length&&_.nullable!==void 0)throw new Error('"nullable" cannot be used without "type"');_.nullable===!0&&v.push("null")}return v}Et.getSchemaTypes=a;function o(_){const v=Array.isArray(_)?_:_?[_]:[];if(v.every(i.isJSONType))return v;throw new Error("type must be JSONType or JSONType[]: "+v.join(","))}Et.getJSONTypes=o;function c(_,v){const{gen:y,data:x,opts:E}=_,b=u(v,E.coerceTypes),I=v.length>0&&!(b.length===0&&v.length===1&&(0,e.schemaHasRulesForType)(_,v[0]));if(I){const A=g(v,x,E.strictNumbers,s.Wrong);y.if(A,()=>{b.length?h(_,v,b):f(_)})}return I}Et.coerceAndCheckDataType=c;const l=new Set(["string","number","integer","boolean","null"]);function u(_,v){return v?_.filter(y=>l.has(y)||v==="array"&&y==="array"):[]}function h(_,v,y){const{gen:x,data:E,opts:b}=_,I=x.let("dataType",(0,n._)`typeof ${E}`),A=x.let("coerced",(0,n._)`undefined`);b.coerceTypes==="array"&&x.if((0,n._)`${I} == 'object' && Array.isArray(${E}) && ${E}.length == 1`,()=>x.assign(E,(0,n._)`${E}[0]`).assign(I,(0,n._)`typeof ${E}`).if(g(v,E,b.strictNumbers),()=>x.assign(A,E))),x.if((0,n._)`${A} !== undefined`);for(const U of y)(l.has(U)||U==="array"&&b.coerceTypes==="array")&&w(U);x.else(),f(_),x.endIf(),x.if((0,n._)`${A} !== undefined`,()=>{x.assign(E,A),p(_,A)});function w(U){switch(U){case"string":x.elseIf((0,n._)`${I} == "number" || ${I} == "boolean"`).assign(A,(0,n._)`"" + ${E}`).elseIf((0,n._)`${E} === null`).assign(A,(0,n._)`""`);return;case"number":x.elseIf((0,n._)`${I} == "boolean" || ${E} === null
              || (${I} == "string" && ${E} && ${E} == +${E})`).assign(A,(0,n._)`+${E}`);return;case"integer":x.elseIf((0,n._)`${I} === "boolean" || ${E} === null
              || (${I} === "string" && ${E} && ${E} == +${E} && !(${E} % 1))`).assign(A,(0,n._)`+${E}`);return;case"boolean":x.elseIf((0,n._)`${E} === "false" || ${E} === 0 || ${E} === null`).assign(A,!1).elseIf((0,n._)`${E} === "true" || ${E} === 1`).assign(A,!0);return;case"null":x.elseIf((0,n._)`${E} === "" || ${E} === 0 || ${E} === false`),x.assign(A,null);return;case"array":x.elseIf((0,n._)`${I} === "string" || ${I} === "number"
              || ${I} === "boolean" || ${E} === null`).assign(A,(0,n._)`[${E}]`)}}}function p({gen:_,parentData:v,parentDataProperty:y},x){_.if((0,n._)`${v} !== undefined`,()=>_.assign((0,n._)`${v}[${y}]`,x))}function m(_,v,y,x=s.Correct){const E=x===s.Correct?n.operators.EQ:n.operators.NEQ;let b;switch(_){case"null":return(0,n._)`${v} ${E} null`;case"array":b=(0,n._)`Array.isArray(${v})`;break;case"object":b=(0,n._)`${v} && typeof ${v} == "object" && !Array.isArray(${v})`;break;case"integer":b=I((0,n._)`!(${v} % 1) && !isNaN(${v})`);break;case"number":b=I();break;default:return(0,n._)`typeof ${v} ${E} ${_}`}return x===s.Correct?b:(0,n.not)(b);function I(A=n.nil){return(0,n.and)((0,n._)`typeof ${v} == "number"`,A,y?(0,n._)`isFinite(${v})`:n.nil)}}Et.checkDataType=m;function g(_,v,y,x){if(_.length===1)return m(_[0],v,y,x);let E;const b=(0,r.toHash)(_);if(b.array&&b.object){const I=(0,n._)`typeof ${v} != "object"`;E=b.null?I:(0,n._)`!${v} || ${I}`,delete b.null,delete b.array,delete b.object}else E=n.nil;b.number&&delete b.integer;for(const I in b)E=(0,n.and)(E,m(I,v,y,x));return E}Et.checkDataTypes=g;const M={message:({schema:_})=>`must be ${_}`,params:({schema:_,schemaValue:v})=>typeof _=="string"?(0,n._)`{type: ${_}}`:(0,n._)`{type: ${v}}`};function f(_){const v=d(_);(0,t.reportError)(v,M)}Et.reportTypeError=f;function d(_){const{gen:v,data:y,schema:x}=_,E=(0,r.schemaRefOrVal)(_,x,"type");return{gen:v,keyword:"type",data:y,schema:x.type,schemaCode:E,schemaValue:E,parentSchema:x,params:{},it:_}}return Et}var Xi={},Rl;function $0(){if(Rl)return Xi;Rl=1,Object.defineProperty(Xi,"__esModule",{value:!0}),Xi.assignDefaults=void 0;const i=Be(),e=Xe();function t(r,s){const{properties:a,items:o}=r.schema;if(s==="object"&&a)for(const c in a)n(r,c,a[c].default);else s==="array"&&Array.isArray(o)&&o.forEach((c,l)=>n(r,l,c.default))}Xi.assignDefaults=t;function n(r,s,a){const{gen:o,compositeRule:c,data:l,opts:u}=r;if(a===void 0)return;const h=(0,i._)`${l}${(0,i.getProperty)(s)}`;if(c){(0,e.checkStrictMode)(r,`default is ignored for: ${h}`);return}let p=(0,i._)`${h} === undefined`;u.useDefaults==="empty"&&(p=(0,i._)`${p} || ${h} === null || ${h} === ""`),o.if(p,(0,i._)`${h} = ${(0,i.stringify)(a)}`)}return Xi}var Qt={},rt={},Pl;function sn(){if(Pl)return rt;Pl=1,Object.defineProperty(rt,"__esModule",{value:!0}),rt.validateUnion=rt.validateArray=rt.usePattern=rt.callValidateCode=rt.schemaProperties=rt.allSchemaProperties=rt.noPropertyInData=rt.propertyInData=rt.isOwnProperty=rt.hasPropFunc=rt.reportMissingProp=rt.checkMissingProp=rt.checkReportMissingProp=void 0;const i=Be(),e=Xe(),t=rn(),n=Xe();function r(_,v){const{gen:y,data:x,it:E}=_;y.if(u(y,x,v,E.opts.ownProperties),()=>{_.setParams({missingProperty:(0,i._)`${v}`},!0),_.error()})}rt.checkReportMissingProp=r;function s({gen:_,data:v,it:{opts:y}},x,E){return(0,i.or)(...x.map(b=>(0,i.and)(u(_,v,b,y.ownProperties),(0,i._)`${E} = ${b}`)))}rt.checkMissingProp=s;function a(_,v){_.setParams({missingProperty:v},!0),_.error()}rt.reportMissingProp=a;function o(_){return _.scopeValue("func",{ref:Object.prototype.hasOwnProperty,code:(0,i._)`Object.prototype.hasOwnProperty`})}rt.hasPropFunc=o;function c(_,v,y){return(0,i._)`${o(_)}.call(${v}, ${y})`}rt.isOwnProperty=c;function l(_,v,y,x){const E=(0,i._)`${v}${(0,i.getProperty)(y)} !== undefined`;return x?(0,i._)`${E} && ${c(_,v,y)}`:E}rt.propertyInData=l;function u(_,v,y,x){const E=(0,i._)`${v}${(0,i.getProperty)(y)} === undefined`;return x?(0,i.or)(E,(0,i.not)(c(_,v,y))):E}rt.noPropertyInData=u;function h(_){return _?Object.keys(_).filter(v=>v!=="__proto__"):[]}rt.allSchemaProperties=h;function p(_,v){return h(v).filter(y=>!(0,e.alwaysValidSchema)(_,v[y]))}rt.schemaProperties=p;function m({schemaCode:_,data:v,it:{gen:y,topSchemaRef:x,schemaPath:E,errorPath:b},it:I},A,w,U){const $=U?(0,i._)`${_}, ${v}, ${x}${E}`:v,B=[[t.default.instancePath,(0,i.strConcat)(t.default.instancePath,b)],[t.default.parentData,I.parentData],[t.default.parentDataProperty,I.parentDataProperty],[t.default.rootData,t.default.rootData]];I.opts.dynamicRef&&B.push([t.default.dynamicAnchors,t.default.dynamicAnchors]);const H=(0,i._)`${$}, ${y.object(...B)}`;return w!==i.nil?(0,i._)`${A}.call(${w}, ${H})`:(0,i._)`${A}(${H})`}rt.callValidateCode=m;const g=(0,i._)`new RegExp`;function M({gen:_,it:{opts:v}},y){const x=v.unicodeRegExp?"u":"",{regExp:E}=v.code,b=E(y,x);return _.scopeValue("pattern",{key:b.toString(),ref:b,code:(0,i._)`${E.code==="new RegExp"?g:(0,n.useFunc)(_,E)}(${y}, ${x})`})}rt.usePattern=M;function f(_){const{gen:v,data:y,keyword:x,it:E}=_,b=v.name("valid");if(E.allErrors){const A=v.let("valid",!0);return I(()=>v.assign(A,!1)),A}return v.var(b,!0),I(()=>v.break()),b;function I(A){const w=v.const("len",(0,i._)`${y}.length`);v.forRange("i",0,w,U=>{_.subschema({keyword:x,dataProp:U,dataPropType:e.Type.Num},b),v.if((0,i.not)(b),A)})}}rt.validateArray=f;function d(_){const{gen:v,schema:y,keyword:x,it:E}=_;if(!Array.isArray(y))throw new Error("ajv implementation error");if(y.some(w=>(0,e.alwaysValidSchema)(E,w))&&!E.opts.unevaluated)return;const I=v.let("valid",!1),A=v.name("_valid");v.block(()=>y.forEach((w,U)=>{const $=_.subschema({keyword:x,schemaProp:U,compositeRule:!0},A);v.assign(I,(0,i._)`${I} || ${A}`),_.mergeValidEvaluated($,A)||v.if((0,i.not)(I))})),_.result(I,()=>_.reset(),()=>_.error(!0))}return rt.validateUnion=d,rt}var Cl;function B0(){if(Cl)return Qt;Cl=1,Object.defineProperty(Qt,"__esModule",{value:!0}),Qt.validateKeywordUsage=Qt.validSchemaType=Qt.funcKeywordCode=Qt.macroKeywordCode=void 0;const i=Be(),e=rn(),t=sn(),n=Xs();function r(p,m){const{gen:g,keyword:M,schema:f,parentSchema:d,it:_}=p,v=m.macro.call(_.self,f,d,_),y=l(g,M,v);_.opts.validateSchema!==!1&&_.self.validateSchema(v,!0);const x=g.name("valid");p.subschema({schema:v,schemaPath:i.nil,errSchemaPath:`${_.errSchemaPath}/${M}`,topSchemaRef:y,compositeRule:!0},x),p.pass(x,()=>p.error(!0))}Qt.macroKeywordCode=r;function s(p,m){var g;const{gen:M,keyword:f,schema:d,parentSchema:_,$data:v,it:y}=p;c(y,m);const x=!v&&m.compile?m.compile.call(y.self,d,_,y):m.validate,E=l(M,f,x),b=M.let("valid");p.block$data(b,I),p.ok((g=m.valid)!==null&&g!==void 0?g:b);function I(){if(m.errors===!1)U(),m.modifying&&a(p),$(()=>p.error());else{const B=m.async?A():w();m.modifying&&a(p),$(()=>o(p,B))}}function A(){const B=M.let("ruleErrs",null);return M.try(()=>U((0,i._)`await `),H=>M.assign(b,!1).if((0,i._)`${H} instanceof ${y.ValidationError}`,()=>M.assign(B,(0,i._)`${H}.errors`),()=>M.throw(H))),B}function w(){const B=(0,i._)`${E}.errors`;return M.assign(B,null),U(i.nil),B}function U(B=m.async?(0,i._)`await `:i.nil){const H=y.opts.passContext?e.default.this:e.default.self,te=!("compile"in m&&!v||m.schema===!1);M.assign(b,(0,i._)`${B}${(0,t.callValidateCode)(p,E,H,te)}`,m.modifying)}function $(B){var H;M.if((0,i.not)((H=m.valid)!==null&&H!==void 0?H:b),B)}}Qt.funcKeywordCode=s;function a(p){const{gen:m,data:g,it:M}=p;m.if(M.parentData,()=>m.assign(g,(0,i._)`${M.parentData}[${M.parentDataProperty}]`))}function o(p,m){const{gen:g}=p;g.if((0,i._)`Array.isArray(${m})`,()=>{g.assign(e.default.vErrors,(0,i._)`${e.default.vErrors} === null ? ${m} : ${e.default.vErrors}.concat(${m})`).assign(e.default.errors,(0,i._)`${e.default.vErrors}.length`),(0,n.extendErrors)(p)},()=>p.error())}function c({schemaEnv:p},m){if(m.async&&!p.$async)throw new Error("async keyword in sync schema")}function l(p,m,g){if(g===void 0)throw new Error(`keyword "${m}" failed to compile`);return p.scopeValue("keyword",typeof g=="function"?{ref:g}:{ref:g,code:(0,i.stringify)(g)})}function u(p,m,g=!1){return!m.length||m.some(M=>M==="array"?Array.isArray(p):M==="object"?p&&typeof p=="object"&&!Array.isArray(p):typeof p==M||g&&typeof p>"u")}Qt.validSchemaType=u;function h({schema:p,opts:m,self:g,errSchemaPath:M},f,d){if(Array.isArray(f.keyword)?!f.keyword.includes(d):f.keyword!==d)throw new Error("ajv implementation error");const _=f.dependencies;if(_?.some(v=>!Object.prototype.hasOwnProperty.call(p,v)))throw new Error(`parent schema must have dependencies of ${d}: ${_.join(",")}`);if(f.validateSchema&&!f.validateSchema(p[d])){const y=`keyword "${d}" value is invalid at path "${M}": `+g.errorsText(f.validateSchema.errors);if(m.validateSchema==="log")g.logger.error(y);else throw new Error(y)}}return Qt.validateKeywordUsage=h,Qt}var vn={},Dl;function z0(){if(Dl)return vn;Dl=1,Object.defineProperty(vn,"__esModule",{value:!0}),vn.extendSubschemaMode=vn.extendSubschemaData=vn.getSubschema=void 0;const i=Be(),e=Xe();function t(s,{keyword:a,schemaProp:o,schema:c,schemaPath:l,errSchemaPath:u,topSchemaRef:h}){if(a!==void 0&&c!==void 0)throw new Error('both "keyword" and "schema" passed, only one allowed');if(a!==void 0){const p=s.schema[a];return o===void 0?{schema:p,schemaPath:(0,i._)`${s.schemaPath}${(0,i.getProperty)(a)}`,errSchemaPath:`${s.errSchemaPath}/${a}`}:{schema:p[o],schemaPath:(0,i._)`${s.schemaPath}${(0,i.getProperty)(a)}${(0,i.getProperty)(o)}`,errSchemaPath:`${s.errSchemaPath}/${a}/${(0,e.escapeFragment)(o)}`}}if(c!==void 0){if(l===void 0||u===void 0||h===void 0)throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');return{schema:c,schemaPath:l,topSchemaRef:h,errSchemaPath:u}}throw new Error('either "keyword" or "schema" must be passed')}vn.getSubschema=t;function n(s,a,{dataProp:o,dataPropType:c,data:l,dataTypes:u,propertyName:h}){if(l!==void 0&&o!==void 0)throw new Error('both "data" and "dataProp" passed, only one allowed');const{gen:p}=a;if(o!==void 0){const{errorPath:g,dataPathArr:M,opts:f}=a,d=p.let("data",(0,i._)`${a.data}${(0,i.getProperty)(o)}`,!0);m(d),s.errorPath=(0,i.str)`${g}${(0,e.getErrorPath)(o,c,f.jsPropertySyntax)}`,s.parentDataProperty=(0,i._)`${o}`,s.dataPathArr=[...M,s.parentDataProperty]}if(l!==void 0){const g=l instanceof i.Name?l:p.let("data",l,!0);m(g),h!==void 0&&(s.propertyName=h)}u&&(s.dataTypes=u);function m(g){s.data=g,s.dataLevel=a.dataLevel+1,s.dataTypes=[],a.definedProperties=new Set,s.parentData=a.data,s.dataNames=[...a.dataNames,g]}}vn.extendSubschemaData=n;function r(s,{jtdDiscriminator:a,jtdMetadata:o,compositeRule:c,createErrors:l,allErrors:u}){c!==void 0&&(s.compositeRule=c),l!==void 0&&(s.createErrors=l),u!==void 0&&(s.allErrors=u),s.jtdDiscriminator=a,s.jtdMetadata=o}return vn.extendSubschemaMode=r,vn}var Rt={},Oa,Il;function Cd(){return Il||(Il=1,Oa=function i(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,r,s;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!i(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(s=Object.keys(e),n=s.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,s[r]))return!1;for(r=n;r--!==0;){var a=s[r];if(!i(e[a],t[a]))return!1}return!0}return e!==e&&t!==t}),Oa}var Fa={exports:{}},Ll;function H0(){if(Ll)return Fa.exports;Ll=1;var i=Fa.exports=function(n,r,s){typeof r=="function"&&(s=r,r={}),s=r.cb||s;var a=typeof s=="function"?s:s.pre||function(){},o=s.post||function(){};e(r,a,o,n,"",n)};i.keywords={additionalItems:!0,items:!0,contains:!0,additionalProperties:!0,propertyNames:!0,not:!0,if:!0,then:!0,else:!0},i.arrayKeywords={items:!0,allOf:!0,anyOf:!0,oneOf:!0},i.propsKeywords={$defs:!0,definitions:!0,properties:!0,patternProperties:!0,dependencies:!0},i.skipKeywords={default:!0,enum:!0,const:!0,required:!0,maximum:!0,minimum:!0,exclusiveMaximum:!0,exclusiveMinimum:!0,multipleOf:!0,maxLength:!0,minLength:!0,pattern:!0,format:!0,maxItems:!0,minItems:!0,uniqueItems:!0,maxProperties:!0,minProperties:!0};function e(n,r,s,a,o,c,l,u,h,p){if(a&&typeof a=="object"&&!Array.isArray(a)){r(a,o,c,l,u,h,p);for(var m in a){var g=a[m];if(Array.isArray(g)){if(m in i.arrayKeywords)for(var M=0;M<g.length;M++)e(n,r,s,g[M],o+"/"+m+"/"+M,c,o,m,a,M)}else if(m in i.propsKeywords){if(g&&typeof g=="object")for(var f in g)e(n,r,s,g[f],o+"/"+m+"/"+t(f),c,o,m,a,f)}else(m in i.keywords||n.allKeys&&!(m in i.skipKeywords))&&e(n,r,s,g,o+"/"+m,c,o,m,a)}s(a,o,c,l,u,h,p)}}function t(n){return n.replace(/~/g,"~0").replace(/\//g,"~1")}return Fa.exports}var Nl;function Ys(){if(Nl)return Rt;Nl=1,Object.defineProperty(Rt,"__esModule",{value:!0}),Rt.getSchemaRefs=Rt.resolveUrl=Rt.normalizeId=Rt._getFullPath=Rt.getFullPath=Rt.inlineRef=void 0;const i=Xe(),e=Cd(),t=H0(),n=new Set(["type","format","pattern","maxLength","minLength","maxProperties","minProperties","maxItems","minItems","maximum","minimum","uniqueItems","multipleOf","required","enum","const"]);function r(M,f=!0){return typeof M=="boolean"?!0:f===!0?!a(M):f?o(M)<=f:!1}Rt.inlineRef=r;const s=new Set(["$ref","$recursiveRef","$recursiveAnchor","$dynamicRef","$dynamicAnchor"]);function a(M){for(const f in M){if(s.has(f))return!0;const d=M[f];if(Array.isArray(d)&&d.some(a)||typeof d=="object"&&a(d))return!0}return!1}function o(M){let f=0;for(const d in M){if(d==="$ref")return 1/0;if(f++,!n.has(d)&&(typeof M[d]=="object"&&(0,i.eachItem)(M[d],_=>f+=o(_)),f===1/0))return 1/0}return f}function c(M,f="",d){d!==!1&&(f=h(f));const _=M.parse(f);return l(M,_)}Rt.getFullPath=c;function l(M,f){return M.serialize(f).split("#")[0]+"#"}Rt._getFullPath=l;const u=/#\/?$/;function h(M){return M?M.replace(u,""):""}Rt.normalizeId=h;function p(M,f,d){return d=h(d),M.resolve(f,d)}Rt.resolveUrl=p;const m=/^[a-z_][-a-z0-9._]*$/i;function g(M,f){if(typeof M=="boolean")return{};const{schemaId:d,uriResolver:_}=this.opts,v=h(M[d]||f),y={"":v},x=c(_,v,!1),E={},b=new Set;return t(M,{allKeys:!0},(w,U,$,B)=>{if(B===void 0)return;const H=x+U;let te=y[B];typeof w[d]=="string"&&(te=Q.call(this,w[d])),oe.call(this,w.$anchor),oe.call(this,w.$dynamicAnchor),y[U]=te;function Q(K){const de=this.opts.uriResolver.resolve;if(K=h(te?de(te,K):K),b.has(K))throw A(K);b.add(K);let R=this.refs[K];return typeof R=="string"&&(R=this.refs[R]),typeof R=="object"?I(w,R.schema,K):K!==h(H)&&(K[0]==="#"?(I(w,E[K],K),E[K]=w):this.refs[K]=H),K}function oe(K){if(typeof K=="string"){if(!m.test(K))throw new Error(`invalid anchor "${K}"`);Q.call(this,`#${K}`)}}}),E;function I(w,U,$){if(U!==void 0&&!e(w,U))throw A($)}function A(w){return new Error(`reference "${w}" resolves to more than one schema`)}}return Rt.getSchemaRefs=g,Rt}var Ul;function ir(){if(Ul)return _n;Ul=1,Object.defineProperty(_n,"__esModule",{value:!0}),_n.getData=_n.KeywordCxt=_n.validateFunctionCode=void 0;const i=k0(),e=Bs(),t=Pd(),n=Bs(),r=$0(),s=B0(),a=z0(),o=Be(),c=rn(),l=Ys(),u=Xe(),h=Xs();function p(z){if(x(z)&&(b(z),y(z))){f(z);return}m(z,()=>(0,i.topBoolOrEmptySchema)(z))}_n.validateFunctionCode=p;function m({gen:z,validateName:W,schema:Z,schemaEnv:O,opts:pe},he){pe.code.es5?z.func(W,(0,o._)`${c.default.data}, ${c.default.valCxt}`,O.$async,()=>{z.code((0,o._)`"use strict"; ${_(Z,pe)}`),M(z,pe),z.code(he)}):z.func(W,(0,o._)`${c.default.data}, ${g(pe)}`,O.$async,()=>z.code(_(Z,pe)).code(he))}function g(z){return(0,o._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${z.dynamicRef?(0,o._)`, ${c.default.dynamicAnchors}={}`:o.nil}}={}`}function M(z,W){z.if(c.default.valCxt,()=>{z.var(c.default.instancePath,(0,o._)`${c.default.valCxt}.${c.default.instancePath}`),z.var(c.default.parentData,(0,o._)`${c.default.valCxt}.${c.default.parentData}`),z.var(c.default.parentDataProperty,(0,o._)`${c.default.valCxt}.${c.default.parentDataProperty}`),z.var(c.default.rootData,(0,o._)`${c.default.valCxt}.${c.default.rootData}`),W.dynamicRef&&z.var(c.default.dynamicAnchors,(0,o._)`${c.default.valCxt}.${c.default.dynamicAnchors}`)},()=>{z.var(c.default.instancePath,(0,o._)`""`),z.var(c.default.parentData,(0,o._)`undefined`),z.var(c.default.parentDataProperty,(0,o._)`undefined`),z.var(c.default.rootData,c.default.data),W.dynamicRef&&z.var(c.default.dynamicAnchors,(0,o._)`{}`)})}function f(z){const{schema:W,opts:Z,gen:O}=z;m(z,()=>{Z.$comment&&W.$comment&&B(z),w(z),O.let(c.default.vErrors,null),O.let(c.default.errors,0),Z.unevaluated&&d(z),I(z),H(z)})}function d(z){const{gen:W,validateName:Z}=z;z.evaluated=W.const("evaluated",(0,o._)`${Z}.evaluated`),W.if((0,o._)`${z.evaluated}.dynamicProps`,()=>W.assign((0,o._)`${z.evaluated}.props`,(0,o._)`undefined`)),W.if((0,o._)`${z.evaluated}.dynamicItems`,()=>W.assign((0,o._)`${z.evaluated}.items`,(0,o._)`undefined`))}function _(z,W){const Z=typeof z=="object"&&z[W.schemaId];return Z&&(W.code.source||W.code.process)?(0,o._)`/*# sourceURL=${Z} */`:o.nil}function v(z,W){if(x(z)&&(b(z),y(z))){E(z,W);return}(0,i.boolOrEmptySchema)(z,W)}function y({schema:z,self:W}){if(typeof z=="boolean")return!z;for(const Z in z)if(W.RULES.all[Z])return!0;return!1}function x(z){return typeof z.schema!="boolean"}function E(z,W){const{schema:Z,gen:O,opts:pe}=z;pe.$comment&&Z.$comment&&B(z),U(z),$(z);const he=O.const("_errs",c.default.errors);I(z,he),O.var(W,(0,o._)`${he} === ${c.default.errors}`)}function b(z){(0,u.checkUnknownRules)(z),A(z)}function I(z,W){if(z.opts.jtd)return Q(z,[],!1,W);const Z=(0,e.getSchemaTypes)(z.schema),O=(0,e.coerceAndCheckDataType)(z,Z);Q(z,Z,!O,W)}function A(z){const{schema:W,errSchemaPath:Z,opts:O,self:pe}=z;W.$ref&&O.ignoreKeywordsWithRef&&(0,u.schemaHasRulesButRef)(W,pe.RULES)&&pe.logger.warn(`$ref: keywords ignored in schema at path "${Z}"`)}function w(z){const{schema:W,opts:Z}=z;W.default!==void 0&&Z.useDefaults&&Z.strictSchema&&(0,u.checkStrictMode)(z,"default is ignored in the schema root")}function U(z){const W=z.schema[z.opts.schemaId];W&&(z.baseId=(0,l.resolveUrl)(z.opts.uriResolver,z.baseId,W))}function $(z){if(z.schema.$async&&!z.schemaEnv.$async)throw new Error("async schema in sync schema")}function B({gen:z,schemaEnv:W,schema:Z,errSchemaPath:O,opts:pe}){const he=Z.$comment;if(pe.$comment===!0)z.code((0,o._)`${c.default.self}.logger.log(${he})`);else if(typeof pe.$comment=="function"){const Ce=(0,o.str)`${O}/$comment`,_e=z.scopeValue("root",{ref:W.root});z.code((0,o._)`${c.default.self}.opts.$comment(${he}, ${Ce}, ${_e}.schema)`)}}function H(z){const{gen:W,schemaEnv:Z,validateName:O,ValidationError:pe,opts:he}=z;Z.$async?W.if((0,o._)`${c.default.errors} === 0`,()=>W.return(c.default.data),()=>W.throw((0,o._)`new ${pe}(${c.default.vErrors})`)):(W.assign((0,o._)`${O}.errors`,c.default.vErrors),he.unevaluated&&te(z),W.return((0,o._)`${c.default.errors} === 0`))}function te({gen:z,evaluated:W,props:Z,items:O}){Z instanceof o.Name&&z.assign((0,o._)`${W}.props`,Z),O instanceof o.Name&&z.assign((0,o._)`${W}.items`,O)}function Q(z,W,Z,O){const{gen:pe,schema:he,data:Ce,allErrors:_e,opts:Le,self:Se}=z,{RULES:F}=Se;if(he.$ref&&(Le.ignoreKeywordsWithRef||!(0,u.schemaHasRulesButRef)(he,F))){pe.block(()=>X(z,"$ref",F.all.$ref.definition));return}Le.jtd||K(z,W),pe.block(()=>{for(const Y of F.rules)D(Y);D(F.post)});function D(Y){(0,t.shouldUseGroup)(he,Y)&&(Y.type?(pe.if((0,n.checkDataType)(Y.type,Ce,Le.strictNumbers)),oe(z,Y),W.length===1&&W[0]===Y.type&&Z&&(pe.else(),(0,n.reportTypeError)(z)),pe.endIf()):oe(z,Y),_e||pe.if((0,o._)`${c.default.errors} === ${O||0}`))}}function oe(z,W){const{gen:Z,schema:O,opts:{useDefaults:pe}}=z;pe&&(0,r.assignDefaults)(z,W.type),Z.block(()=>{for(const he of W.rules)(0,t.shouldUseRule)(O,he)&&X(z,he.keyword,he.definition,W.type)})}function K(z,W){z.schemaEnv.meta||!z.opts.strictTypes||(de(z,W),z.opts.allowUnionTypes||R(z,W),T(z,z.dataTypes))}function de(z,W){if(W.length){if(!z.dataTypes.length){z.dataTypes=W;return}W.forEach(Z=>{P(z.dataTypes,Z)||C(z,`type "${Z}" not allowed by context "${z.dataTypes.join(",")}"`)}),S(z,W)}}function R(z,W){W.length>1&&!(W.length===2&&W.includes("null"))&&C(z,"use allowUnionTypes to allow union type keyword")}function T(z,W){const Z=z.self.RULES.all;for(const O in Z){const pe=Z[O];if(typeof pe=="object"&&(0,t.shouldUseRule)(z.schema,pe)){const{type:he}=pe.definition;he.length&&!he.some(Ce=>N(W,Ce))&&C(z,`missing type "${he.join(",")}" for keyword "${O}"`)}}}function N(z,W){return z.includes(W)||W==="number"&&z.includes("integer")}function P(z,W){return z.includes(W)||W==="integer"&&z.includes("number")}function S(z,W){const Z=[];for(const O of z.dataTypes)P(W,O)?Z.push(O):W.includes("integer")&&O==="number"&&Z.push("integer");z.dataTypes=Z}function C(z,W){const Z=z.schemaEnv.baseId+z.errSchemaPath;W+=` at "${Z}" (strictTypes)`,(0,u.checkStrictMode)(z,W,z.opts.strictTypes)}class k{constructor(W,Z,O){if((0,s.validateKeywordUsage)(W,Z,O),this.gen=W.gen,this.allErrors=W.allErrors,this.keyword=O,this.data=W.data,this.schema=W.schema[O],this.$data=Z.$data&&W.opts.$data&&this.schema&&this.schema.$data,this.schemaValue=(0,u.schemaRefOrVal)(W,this.schema,O,this.$data),this.schemaType=Z.schemaType,this.parentSchema=W.schema,this.params={},this.it=W,this.def=Z,this.$data)this.schemaCode=W.gen.const("vSchema",le(this.$data,W));else if(this.schemaCode=this.schemaValue,!(0,s.validSchemaType)(this.schema,Z.schemaType,Z.allowUndefined))throw new Error(`${O} value must be ${JSON.stringify(Z.schemaType)}`);("code"in Z?Z.trackErrors:Z.errors!==!1)&&(this.errsCount=W.gen.const("_errs",c.default.errors))}result(W,Z,O){this.failResult((0,o.not)(W),Z,O)}failResult(W,Z,O){this.gen.if(W),O?O():this.error(),Z?(this.gen.else(),Z(),this.allErrors&&this.gen.endIf()):this.allErrors?this.gen.endIf():this.gen.else()}pass(W,Z){this.failResult((0,o.not)(W),void 0,Z)}fail(W){if(W===void 0){this.error(),this.allErrors||this.gen.if(!1);return}this.gen.if(W),this.error(),this.allErrors?this.gen.endIf():this.gen.else()}fail$data(W){if(!this.$data)return this.fail(W);const{schemaCode:Z}=this;this.fail((0,o._)`${Z} !== undefined && (${(0,o.or)(this.invalid$data(),W)})`)}error(W,Z,O){if(Z){this.setParams(Z),this._error(W,O),this.setParams({});return}this._error(W,O)}_error(W,Z){(W?h.reportExtraError:h.reportError)(this,this.def.error,Z)}$dataError(){(0,h.reportError)(this,this.def.$dataError||h.keyword$DataError)}reset(){if(this.errsCount===void 0)throw new Error('add "trackErrors" to keyword definition');(0,h.resetErrorsCount)(this.gen,this.errsCount)}ok(W){this.allErrors||this.gen.if(W)}setParams(W,Z){Z?Object.assign(this.params,W):this.params=W}block$data(W,Z,O=o.nil){this.gen.block(()=>{this.check$data(W,O),Z()})}check$data(W=o.nil,Z=o.nil){if(!this.$data)return;const{gen:O,schemaCode:pe,schemaType:he,def:Ce}=this;O.if((0,o.or)((0,o._)`${pe} === undefined`,Z)),W!==o.nil&&O.assign(W,!0),(he.length||Ce.validateSchema)&&(O.elseIf(this.invalid$data()),this.$dataError(),W!==o.nil&&O.assign(W,!1)),O.else()}invalid$data(){const{gen:W,schemaCode:Z,schemaType:O,def:pe,it:he}=this;return(0,o.or)(Ce(),_e());function Ce(){if(O.length){if(!(Z instanceof o.Name))throw new Error("ajv implementation error");const Le=Array.isArray(O)?O:[O];return(0,o._)`${(0,n.checkDataTypes)(Le,Z,he.opts.strictNumbers,n.DataType.Wrong)}`}return o.nil}function _e(){if(pe.validateSchema){const Le=W.scopeValue("validate$data",{ref:pe.validateSchema});return(0,o._)`!${Le}(${Z})`}return o.nil}}subschema(W,Z){const O=(0,a.getSubschema)(this.it,W);(0,a.extendSubschemaData)(O,this.it,W),(0,a.extendSubschemaMode)(O,W);const pe={...this.it,...O,items:void 0,props:void 0};return v(pe,Z),pe}mergeEvaluated(W,Z){const{it:O,gen:pe}=this;O.opts.unevaluated&&(O.props!==!0&&W.props!==void 0&&(O.props=u.mergeEvaluated.props(pe,W.props,O.props,Z)),O.items!==!0&&W.items!==void 0&&(O.items=u.mergeEvaluated.items(pe,W.items,O.items,Z)))}mergeValidEvaluated(W,Z){const{it:O,gen:pe}=this;if(O.opts.unevaluated&&(O.props!==!0||O.items!==!0))return pe.if(Z,()=>this.mergeEvaluated(W,o.Name)),!0}}_n.KeywordCxt=k;function X(z,W,Z,O){const pe=new k(z,Z,W);"code"in Z?Z.code(pe,O):pe.$data&&Z.validate?(0,s.funcKeywordCode)(pe,Z):"macro"in Z?(0,s.macroKeywordCode)(pe,Z):(Z.compile||Z.validate)&&(0,s.funcKeywordCode)(pe,Z)}const ie=/^\/(?:[^~]|~0|~1)*$/,me=/^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;function le(z,{dataLevel:W,dataNames:Z,dataPathArr:O}){let pe,he;if(z==="")return c.default.rootData;if(z[0]==="/"){if(!ie.test(z))throw new Error(`Invalid JSON-pointer: ${z}`);pe=z,he=c.default.rootData}else{const Se=me.exec(z);if(!Se)throw new Error(`Invalid JSON-pointer: ${z}`);const F=+Se[1];if(pe=Se[2],pe==="#"){if(F>=W)throw new Error(Le("property/index",F));return O[W-F]}if(F>W)throw new Error(Le("data",F));if(he=Z[W-F],!pe)return he}let Ce=he;const _e=pe.split("/");for(const Se of _e)Se&&(he=(0,o._)`${he}${(0,o.getProperty)((0,u.unescapeJsonPointer)(Se))}`,Ce=(0,o._)`${Ce} && ${he}`);return Ce;function Le(Se,F){return`Cannot access ${Se} ${F} levels up, current level is ${W}`}}return _n.getData=le,_n}var Lr={},Ol;function Ks(){if(Ol)return Lr;Ol=1,Object.defineProperty(Lr,"__esModule",{value:!0});class i extends Error{constructor(t){super("validation failed"),this.errors=t,this.ajv=this.validation=!0}}return Lr.default=i,Lr}var Nr={},Fl;function rr(){if(Fl)return Nr;Fl=1,Object.defineProperty(Nr,"__esModule",{value:!0});const i=Ys();class e extends Error{constructor(n,r,s,a){super(a||`can't resolve reference ${s} from id ${r}`),this.missingRef=(0,i.resolveUrl)(n,r,s),this.missingSchema=(0,i.normalizeId)((0,i.getFullPath)(n,this.missingRef))}}return Nr.default=e,Nr}var $t={},kl;function Zs(){if(kl)return $t;kl=1,Object.defineProperty($t,"__esModule",{value:!0}),$t.resolveSchema=$t.getCompilingSchema=$t.resolveRef=$t.compileSchema=$t.SchemaEnv=void 0;const i=Be(),e=Ks(),t=rn(),n=Ys(),r=Xe(),s=ir();class a{constructor(d){var _;this.refs={},this.dynamicAnchors={};let v;typeof d.schema=="object"&&(v=d.schema),this.schema=d.schema,this.schemaId=d.schemaId,this.root=d.root||this,this.baseId=(_=d.baseId)!==null&&_!==void 0?_:(0,n.normalizeId)(v?.[d.schemaId||"$id"]),this.schemaPath=d.schemaPath,this.localRefs=d.localRefs,this.meta=d.meta,this.$async=v?.$async,this.refs={}}}$t.SchemaEnv=a;function o(f){const d=u.call(this,f);if(d)return d;const _=(0,n.getFullPath)(this.opts.uriResolver,f.root.baseId),{es5:v,lines:y}=this.opts.code,{ownProperties:x}=this.opts,E=new i.CodeGen(this.scope,{es5:v,lines:y,ownProperties:x});let b;f.$async&&(b=E.scopeValue("Error",{ref:e.default,code:(0,i._)`require("ajv/dist/runtime/validation_error").default`}));const I=E.scopeName("validate");f.validateName=I;const A={gen:E,allErrors:this.opts.allErrors,data:t.default.data,parentData:t.default.parentData,parentDataProperty:t.default.parentDataProperty,dataNames:[t.default.data],dataPathArr:[i.nil],dataLevel:0,dataTypes:[],definedProperties:new Set,topSchemaRef:E.scopeValue("schema",this.opts.code.source===!0?{ref:f.schema,code:(0,i.stringify)(f.schema)}:{ref:f.schema}),validateName:I,ValidationError:b,schema:f.schema,schemaEnv:f,rootId:_,baseId:f.baseId||_,schemaPath:i.nil,errSchemaPath:f.schemaPath||(this.opts.jtd?"":"#"),errorPath:(0,i._)`""`,opts:this.opts,self:this};let w;try{this._compilations.add(f),(0,s.validateFunctionCode)(A),E.optimize(this.opts.code.optimize);const U=E.toString();w=`${E.scopeRefs(t.default.scope)}return ${U}`,this.opts.code.process&&(w=this.opts.code.process(w,f));const B=new Function(`${t.default.self}`,`${t.default.scope}`,w)(this,this.scope.get());if(this.scope.value(I,{ref:B}),B.errors=null,B.schema=f.schema,B.schemaEnv=f,f.$async&&(B.$async=!0),this.opts.code.source===!0&&(B.source={validateName:I,validateCode:U,scopeValues:E._values}),this.opts.unevaluated){const{props:H,items:te}=A;B.evaluated={props:H instanceof i.Name?void 0:H,items:te instanceof i.Name?void 0:te,dynamicProps:H instanceof i.Name,dynamicItems:te instanceof i.Name},B.source&&(B.source.evaluated=(0,i.stringify)(B.evaluated))}return f.validate=B,f}catch(U){throw delete f.validate,delete f.validateName,w&&this.logger.error("Error compiling schema, function code:",w),U}finally{this._compilations.delete(f)}}$t.compileSchema=o;function c(f,d,_){var v;_=(0,n.resolveUrl)(this.opts.uriResolver,d,_);const y=f.refs[_];if(y)return y;let x=p.call(this,f,_);if(x===void 0){const E=(v=f.localRefs)===null||v===void 0?void 0:v[_],{schemaId:b}=this.opts;E&&(x=new a({schema:E,schemaId:b,root:f,baseId:d}))}if(x!==void 0)return f.refs[_]=l.call(this,x)}$t.resolveRef=c;function l(f){return(0,n.inlineRef)(f.schema,this.opts.inlineRefs)?f.schema:f.validate?f:o.call(this,f)}function u(f){for(const d of this._compilations)if(h(d,f))return d}$t.getCompilingSchema=u;function h(f,d){return f.schema===d.schema&&f.root===d.root&&f.baseId===d.baseId}function p(f,d){let _;for(;typeof(_=this.refs[d])=="string";)d=_;return _||this.schemas[d]||m.call(this,f,d)}function m(f,d){const _=this.opts.uriResolver.parse(d),v=(0,n._getFullPath)(this.opts.uriResolver,_);let y=(0,n.getFullPath)(this.opts.uriResolver,f.baseId,void 0);if(Object.keys(f.schema).length>0&&v===y)return M.call(this,_,f);const x=(0,n.normalizeId)(v),E=this.refs[x]||this.schemas[x];if(typeof E=="string"){const b=m.call(this,f,E);return typeof b?.schema!="object"?void 0:M.call(this,_,b)}if(typeof E?.schema=="object"){if(E.validate||o.call(this,E),x===(0,n.normalizeId)(d)){const{schema:b}=E,{schemaId:I}=this.opts,A=b[I];return A&&(y=(0,n.resolveUrl)(this.opts.uriResolver,y,A)),new a({schema:b,schemaId:I,root:f,baseId:y})}return M.call(this,_,E)}}$t.resolveSchema=m;const g=new Set(["properties","patternProperties","enum","dependencies","definitions"]);function M(f,{baseId:d,schema:_,root:v}){var y;if(((y=f.fragment)===null||y===void 0?void 0:y[0])!=="/")return;for(const b of f.fragment.slice(1).split("/")){if(typeof _=="boolean")return;const I=_[(0,r.unescapeFragment)(b)];if(I===void 0)return;_=I;const A=typeof _=="object"&&_[this.opts.schemaId];!g.has(b)&&A&&(d=(0,n.resolveUrl)(this.opts.uriResolver,d,A))}let x;if(typeof _!="boolean"&&_.$ref&&!(0,r.schemaHasRulesButRef)(_,this.RULES)){const b=(0,n.resolveUrl)(this.opts.uriResolver,d,_.$ref);x=m.call(this,v,b)}const{schemaId:E}=this.opts;if(x=x||new a({schema:_,schemaId:E,root:v,baseId:d}),x.schema!==x.root.schema)return x}return $t}const V0="https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",G0="Meta-schema for $data reference (JSON AnySchema extension proposal)",W0="object",q0=["$data"],j0={$data:{type:"string",anyOf:[{format:"relative-json-pointer"},{format:"json-pointer"}]}},X0=!1,Y0={$id:V0,description:G0,type:W0,required:q0,properties:j0,additionalProperties:X0};var Ur={},Yi={exports:{}},ka,$l;function Dd(){if($l)return ka;$l=1;const i=RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu),e=RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u),t=RegExp.prototype.test.bind(/^\d*$/u),n=RegExp.prototype.test.bind(/^[\da-f]{2}$/iu),r=RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu),s=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u),a=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u),o=RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u),c=new Array(256);{const R="0123456789ABCDEF";for(let T=0;T<256;T++)c[T]="%"+R[T>>4]+R[T&15]}function l(R){return R<2048?c[192|R>>6]+c[128|R&63]:R<65536?c[224|R>>12]+c[128|R>>6&63]+c[128|R&63]:c[240|R>>18]+c[128|R>>12&63]+c[128|R>>6&63]+c[128|R&63]}function u(R){let T="",N=0,P=0;for(P=0;P<R.length;P++)if(N=R[P].charCodeAt(0),N!==48){if(!(N>=48&&N<=57||N>=65&&N<=70||N>=97&&N<=102))return"";T+=R[P];break}for(P+=1;P<R.length;P++){if(N=R[P].charCodeAt(0),!(N>=48&&N<=57||N>=65&&N<=70||N>=97&&N<=102))return"";T+=R[P]}return T}const h=RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/),p=RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/),m=RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/),g=RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);function M(R){if(R.length===0)return!1;for(let T=0;T<R.length;T++)if(!m(R[T])){if(R[T]==="%"&&T+2<R.length&&n(R.slice(T+1,T+3))){T+=2;continue}return!1}return!0}function f(R){let T=-1,N=0,P=-1,S=0;for(let X=0;X<R.length;X++)R[X]==="0"?(P===-1&&(P=X),S++,S>N&&(N=S,T=P)):(P=-1,S=0);if(N<2)return R.join(":");const C=R.slice(0,T).join(":"),k=R.slice(T+N).join(":");return C+"::"+k}function d(R){const T=R.indexOf("::");if(T!==-1&&R.indexOf("::",T+1)!==-1)return;const N=T===-1?R.split(":"):R.slice(0,T).split(":"),P=T===-1?[]:R.slice(T+2).split(":");T!==-1&&(N.length===1&&N[0]===""&&(N.length=0),P.length===1&&P[0]===""&&(P.length=0));const S=N.concat(P);let C=0;for(let X=0;X<S.length;X++){const ie=S[X];if(ie==="")return;if(ie.indexOf(".")!==-1){if(X!==S.length-1||T!==-1&&P.length===0||!e(ie))return;C+=2;continue}if(!h(ie))return;S[X]=parseInt(ie,16).toString(16),C++}if(T===-1)return C!==8?void 0:f(S);if(C>=8)return;const k=S.slice(0,N.length);for(let X=C;X<8;X++)k.push("0");for(let X=N.length;X<S.length;X++)k.push(S[X]);return f(k)}function _(R){const T=R[0]==="["&&R[R.length-1]==="]";if((R[0]==="["||R[R.length-1]==="]")&&!T)return{host:R,isIPV6:!1,error:!0};let P=T?R.slice(1,-1):R;if(T&&p(P))return P=P.toLowerCase(),{host:`[${P}]`,escapedHost:P,isIPV6:!1,isIPVFuture:!0};if(v(P,":")<2)return{host:R,isIPV6:!1,error:T};let S="";const C=P.indexOf("%");if(C!==-1){const X=P.slice(C,C+3).toLowerCase()==="%25"?3:1;if(S=P.slice(C+X),!M(S))return{host:R,isIPV6:!1,error:!0};P=P.slice(0,C)}const k=d(P);return k===void 0?{host:R,isIPV6:!1,error:!0}:{host:k+(S?"%"+S:""),escapedHost:k+(S?"%25"+S:""),isIPV6:!0}}function v(R,T){let N=0;for(let P=0;P<R.length;P++)R[P]===T&&N++;return N}function y(R){let T=R;const N=[];let P=-1,S=0;for(;S=T.length;){if(S===1){if(T===".")break;if(T==="/"){N.push("/");break}else{N.push(T);break}}else if(S===2){if(T[0]==="."){if(T[1]===".")break;if(T[1]==="/"){T=T.slice(2);continue}}else if(T[0]==="/"&&(T[1]==="."||T[1]==="/")){N.push("/");break}}else if(S===3&&T==="/.."){N.length!==0&&N.pop(),N.push("/");break}if(T[0]==="."){if(T[1]==="."){if(T[2]==="/"){T=T.slice(3);continue}}else if(T[1]==="/"){T=T.slice(2);continue}}else if(T[0]==="/"&&T[1]==="."){if(T[2]==="/"){T=T.slice(2);continue}else if(T[2]==="."&&T[3]==="/"){T=T.slice(3),N.length!==0&&N.pop();continue}}if((P=T.indexOf("/",1))===-1){N.push(T);break}else N.push(T.slice(0,P)),T=T.slice(P)}return N.join("")}const x={"@":"%40","/":"%2F","?":"%3F","#":"%23",":":"%3A"},E=/[@/?#:]/g,b=/[@/?#]/g;function I(R,T){const N=T?b:E;return N.lastIndex=0,R.replace(N,P=>x[P])}function A(R,T=!1){if(R.indexOf("%")===-1)return R;let N="";for(let P=0;P<R.length;P++){if(R[P]==="%"&&P+2<R.length){const S=R.slice(P+1,P+3);if(n(S)){const C=S.toUpperCase(),k=String.fromCharCode(parseInt(C,16));T&&r(k)?N+=k:N+="%"+C,P+=2;continue}}N+=R[P]}return N}function w(R){let T="";for(let N=0;N<R.length;N++){const P=R[N];if(P==="%"&&N+2<R.length){const S=R.slice(N+1,N+3);if(n(S)){const C=S.toUpperCase(),k=String.fromCharCode(parseInt(C,16));k!=="."&&r(k)?T+=k:T+="%"+C,N+=2;continue}}if(s(P))T+=P;else{const S=R.charCodeAt(N);if(S<128)T+=Q(S)?P:c[S];else if(S<55296||S>57343)T+=l(S);else if(S<=56319&&N+1<R.length){const C=R.charCodeAt(N+1);C>=56320&&C<=57343?(T+=l(65536+(S-55296<<10)+(C-56320)),N++):T+=l(65533)}else T+=l(65533)}}return T}function U(R,T=!1){let N="",P=T&&R[0]!=="/";for(let S=0;S<R.length;S++){const C=R[S];if(C==="%"&&S+2<R.length){const k=R.slice(S+1,S+3);if(n(k)){N+="%"+k.toUpperCase(),S+=2;continue}}if(C==="/"&&(P=!1),s(C)&&(C!==":"||!P))N+=C;else{const k=R.charCodeAt(S);if(k<128)N+=c[k];else if(k<55296||k>57343)N+=l(k);else if(k<=56319&&S+1<R.length){const X=R.charCodeAt(S+1);X>=56320&&X<=57343?(N+=l(65536+(k-55296<<10)+(X-56320)),S++):N+=l(65533)}else N+=l(65533)}}return N}function $(R,T){let N="";for(let P=0;P<R.length;P++){const S=R[P];if(S==="%"&&P+2<R.length){const C=R.slice(P+1,P+3);if(n(C)){N+="%"+C.toUpperCase(),P+=2;continue}}if(T(S))N+=S;else{const C=R.charCodeAt(P);if(C<128)N+=c[C];else if(C<55296||C>57343)N+=l(C);else if(C<=56319&&P+1<R.length){const k=R.charCodeAt(P+1);k>=56320&&k<=57343?(N+=l(65536+(C-55296<<10)+(k-56320)),P++):N+=l(65533)}else N+=l(65533)}}return N}function B(R){return $(R,o)}function H(R){return $(R,a)}function te(R){return $(R,a)}function Q(R){return R>=48&&R<=57||R>=65&&R<=90||R>=97&&R<=122||R===42||R===43||R===45||R===46||R===47||R===64||R===95}function oe(R){let T="";for(let N=0;N<R.length;N++){const P=R[N];if(P==="%"&&N+2<R.length){const S=R.slice(N+1,N+3);if(n(S)){const C=S.toUpperCase(),k=String.fromCharCode(parseInt(C,16));r(k)?T+=k:T+="%"+C,N+=2;continue}}if(a(P))T+=P;else{const S=R.charCodeAt(N);if(S<128)T+=Q(S)?P:c[S];else if(S<55296||S>57343)T+=l(S);else if(S<=56319&&N+1<R.length){const C=R.charCodeAt(N+1);C>=56320&&C<=57343?(T+=l(65536+(S-55296<<10)+(C-56320)),N++):T+=l(65533)}else T+=l(65533)}}return T}function K(R){let T="";for(let N=0;N<R.length;N++){if(R[N]==="%"&&N+2<R.length){const P=R.slice(N+1,N+3);if(n(P)){T+="%"+P.toUpperCase(),N+=2;continue}}T+=escape(R[N])}return T}function de(R){const T=[];if(R.userinfo!==void 0&&(T.push(B(R.userinfo)),T.push("@")),R.host!==void 0){let N=R.host;if(!e(N)){let P=_(N);P.isIPV6!==!0&&P.isIPVFuture!==!0&&(N=A(N,!0),P=_(N)),P.isIPV6===!0||P.isIPVFuture===!0?N=`[${P.escapedHost}]`:N=I(N,!1)}T.push(N)}if(typeof R.port=="number"||typeof R.port=="string"){const N=String(R.port);if(!t(N))throw new TypeError("URI port is malformed.");T.push(":"),T.push(N)}return T.length?T.join(""):void 0}return ka={nonSimpleDomain:g,recomposeAuthority:de,reescapeHostDelimiters:I,normalizePercentEncoding:A,normalizePathEncoding:w,serializePathEncoding:U,normalizeQueryFragmentEncoding:oe,encodeUserinfo:B,encodeQuery:H,encodeFragment:te,escapePreservingEscapes:K,removeDotSegments:y,isIPv4:e,isUUID:i,normalizeIPv6:_,stringArrayToHexStripped:u},ka}var $a,Bl;function K0(){if(Bl)return $a;Bl=1;const{isUUID:i}=Dd(),e=/^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu,t=["http","https","ws","wss","urn","urn:uuid"];function n(x){return t.indexOf(x)!==-1}function r(x){return x.secure===!0?!0:x.secure===!1?!1:x.scheme?x.scheme.length===3&&(x.scheme[0]==="w"||x.scheme[0]==="W")&&(x.scheme[1]==="s"||x.scheme[1]==="S")&&(x.scheme[2]==="s"||x.scheme[2]==="S"):!1}function s(x){return x.host||(x.error=x.error||"HTTP URIs must have a host."),x}function a(x){const E=String(x.scheme).toLowerCase()==="https";return(x.port===(E?443:80)||x.port==="")&&(x.port=void 0),x.path||(x.path="/"),x}function o(x){return x.secure=r(x),x.resourceName=(x.path||"/")+(x.query?"?"+x.query:""),x.path=void 0,x.query=void 0,x}function c(x){if((x.port===(r(x)?443:80)||x.port==="")&&(x.port=void 0),typeof x.secure=="boolean"&&(x.scheme=x.secure?"wss":"ws",x.secure=void 0),x.resourceName){const E=x.resourceName.indexOf("?"),b=E===-1?x.resourceName:x.resourceName.slice(0,E);x.path=b&&b!=="/"?b:void 0,x.query=E===-1?void 0:x.resourceName.slice(E+1),x.resourceName=void 0}return x.fragment=void 0,x}function l(x,E){if(!x.path)return x.error="URN can not be parsed",x;const b=x.path.match(e);if(b&&b[0]===x.path){const I=E.scheme||x.scheme||"urn";x.nid=b[1].toLowerCase(),x.nss=b[2];const A=`${I}:${E.nid||x.nid}`,w=y(A);x.path=void 0,w&&(x=w.parse(x,E))}else x.error=x.error||"URN can not be parsed.";return x}function u(x,E){if(x.nid===void 0)throw new Error("URN without nid cannot be serialized");const b=E.scheme||x.scheme||"urn",I=x.nid.toLowerCase(),A=`${b}:${E.nid||I}`,w=y(A);w&&(x=w.serialize(x,E));const U=x,$=x.nss;return U.path=`${I||E.nid}:${$}`,E.skipEscape=!0,U}function h(x,E){const b=x;return b.uuid=b.nss,b.nss=void 0,!E.tolerant&&(!b.uuid||!i(b.uuid))&&(b.error=b.error||"UUID is not valid."),b}function p(x){const E=x;return E.nss=(x.uuid||"").toLowerCase(),E}const m={scheme:"http",domainHost:!0,parse:s,serialize:a},g={scheme:"https",domainHost:m.domainHost,parse:s,serialize:a},M={scheme:"ws",domainHost:!0,parse:o,serialize:c},f={scheme:"wss",domainHost:M.domainHost,parse:M.parse,serialize:M.serialize},v={http:m,https:g,ws:M,wss:f,urn:{scheme:"urn",parse:l,serialize:u,skipNormalize:!0},"urn:uuid":{scheme:"urn:uuid",parse:h,serialize:p,skipNormalize:!0}};Object.setPrototypeOf(v,null);function y(x){return x&&(v[x]||v[x.toLowerCase()])||void 0}return $a={wsIsSecure:r,SCHEMES:v,isValidSchemeName:n,getSchemeHandler:y},$a}var zl;function Z0(){if(zl)return Yi.exports;zl=1;const{normalizeIPv6:i,removeDotSegments:e,recomposeAuthority:t,normalizePercentEncoding:n,normalizePathEncoding:r,serializePathEncoding:s,normalizeQueryFragmentEncoding:a,encodeQuery:o,encodeFragment:c,reescapeHostDelimiters:l,isIPv4:u,nonSimpleDomain:h}=Dd(),{SCHEMES:p,getSchemeHandler:m}=K0(),g=/^[A-Za-z][A-Za-z0-9+.-]*$/u,M="URI scheme is malformed.";function f(R){const T=unescape(String(R));if(!g.test(T))throw new TypeError(M);return T}function d(R,T){return typeof R=="string"?R=Q(R,T):typeof R=="object"&&(R=te(x(R,T),T)),R}function _(R,T,N){const P=N?Object.assign({scheme:"null"},N):{scheme:"null"},{parsed:S,malformedAuthorityOrPort:C,malformedPercentEncoding:k,malformedSchemeSpecific:X,malformedHost:ie,malformedScheme:me}=H(R,P),{parsed:le,malformedAuthorityOrPort:z,malformedPercentEncoding:W,malformedSchemeSpecific:Z,malformedHost:O,malformedScheme:pe}=H(T,P);if(C||z||k||W||X||Z||ie||O||me||pe)throw new Error(S.error||le.error||"URI is malformed.");const he=v(S,le,P,!0),Ce=m(N&&N.scheme||he.scheme),_e=he.host,Le=_e!==void 0&&_e!==""&&(u(_e)||i(_e).isIPV6);B(he,N||{},Ce,Le);const Se=_e&&_e.indexOf("%")!==-1&&!/\P{ASCII}/u.test(_e);if(he.error&&!Se)throw new Error(he.error);return P.skipEscape=!0,x(he,P)}function v(R,T,N,P){const S={};return P||(R=te(x(R,N),N),T=te(x(T,N),N)),N=N||{},!N.tolerant&&T.scheme?(S.scheme=T.scheme,S.userinfo=T.userinfo,S.host=T.host,S.port=T.port,S.path=e(T.path||""),S.query=T.query):(T.userinfo!==void 0||T.host!==void 0||T.port!==void 0?(S.userinfo=T.userinfo,S.host=T.host,S.port=T.port,S.path=e(T.path||""),S.query=T.query):(T.path?(T.path[0]==="/"?S.path=e(T.path):((R.userinfo!==void 0||R.host!==void 0||R.port!==void 0)&&!R.path?S.path="/"+T.path:R.path?S.path=R.path.slice(0,R.path.lastIndexOf("/")+1)+T.path:S.path=T.path,S.path=e(S.path)),S.query=T.query):(S.path=R.path,T.query!==void 0?S.query=T.query:S.query=R.query),S.userinfo=R.userinfo,S.host=R.host,S.port=R.port),S.scheme=R.scheme),S.fragment=T.fragment,S}function y(R,T,N){const P=K(R,N),S=K(T,N);return P!==void 0&&S!==void 0&&P===S}function x(R,T){const N={host:R.host,scheme:R.scheme,userinfo:R.userinfo,port:R.port,path:R.path,query:R.query,nid:R.nid,nss:R.nss,uuid:R.uuid,fragment:R.fragment,reference:R.reference,resourceName:R.resourceName,secure:R.secure,error:""},P=Object.assign({},T),S=[];N.scheme&&(N.scheme=f(N.scheme));const C=m(P.scheme||N.scheme);C&&C.serialize&&C.serialize(N,P);const k=N.userinfo!==void 0||N.host!==void 0||N.port!==void 0,X=!P.skipEscape&&N.scheme===void 0&&!k;N.path!==void 0&&(P.skipEscape?N.path=n(N.path):N.path=s(N.path,X)),P.reference!=="suffix"&&N.scheme&&(N.scheme=f(N.scheme),S.push(N.scheme,":"));const ie=t(N);if(ie!==void 0&&(P.reference!=="suffix"&&S.push("//"),S.push(ie),N.path&&N.path[0]!=="/"&&S.push("/")),N.path!==void 0){let me=N.path;!P.absolutePath&&(!C||!C.absolutePath)&&(me=e(me)),X&&(me=s(me,!0)),ie===void 0&&me[0]==="/"&&me[1]==="/"&&(me="/%2F"+me.slice(2)),S.push(me)}return N.query!==void 0&&S.push("?",o(N.query)),N.fragment!==void 0&&S.push("#",c(N.fragment)),S.join("")}const E=/^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u,b=/^(?:[^#/:?]+:)?\/\/([^/?#]*)/,I=/^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;function A(R,T){if(T[2]!==void 0&&R.path&&R.path[0]!=="/")return'URI path must start with "/" when authority is present.';if(typeof R.port=="number"&&(R.port<0||R.port>65535))return"URI port is malformed."}function w(R){if(R===void 0)return!1;let T=R.indexOf("%");for(;T!==-1;){if(T+2>=R.length||!/^[\da-f]{2}$/iu.test(R.slice(T+1,T+3)))return!0;T=R.indexOf("%",T+3)}return!1}function U(R){return R[0]==="["&&R[R.length-1]==="]"}function $(R){const T=R[4];return w(R[3])||T!==void 0&&!U(T)&&w(T)||w(R[6])||w(R[7])||w(R[8])}function B(R,T,N,P){if(!T.unicodeSupport&&(!N||!N.unicodeSupport)&&R.host&&!U(R.host)&&(T.domainHost||N&&N.domainHost)&&P===!1&&h(R.host))try{R.host=new URL("http://"+R.host).hostname}catch(S){return R.error=R.error||"Host's domain name can not be converted to ASCII: "+S,!0}return!1}function H(R,T){const N=Object.assign({},T),P={scheme:void 0,userinfo:void 0,host:"",port:void 0,path:"",query:void 0,fragment:void 0};let S=!1,C=!1,k=!1,X=!1,ie=!1,me=!1,le=!1;N.reference==="suffix"&&(N.scheme?R=N.scheme+":"+R:R="//"+R);const z=R.match(b);z!==null&&z[1].indexOf("\\")!==-1&&(P.error="URI authority must not contain a literal backslash.",S=!0);const W=R.match(I);if(W!==null){const O=W[1],pe=O.replace(/[\t\n\r]/g,"");pe.length>=2&&(pe.slice(0,2)!=="//"?(P.error=P.error||"URI authority must not contain a literal backslash.",S=!0):O.length!==pe.length&&(P.error=P.error||"URI authority introducer must not contain whitespace.",S=!0))}const Z=R.match(E);if(Z){if(P.scheme=Z[1],P.userinfo=Z[3],P.host=Z[4],P.port=parseInt(Z[5],10),P.path=Z[6]||"",P.query=Z[7],P.fragment=Z[8],P.scheme!==void 0){const he=unescape(P.scheme);g.test(he)?P.scheme=he.toLowerCase():(P.error=P.error||M,me=!0)}C=$(Z),C&&(P.error=P.error||"URI contains malformed percent-encoding."),isNaN(P.port)&&(P.port=Z[5]);const O=A(P,Z);if(O!==void 0&&(P.error=P.error||O,S=!0),P.host)if(u(P.host)===!1){const Ce=U(P.host),_e=P.host.indexOf("[")!==-1||P.host.indexOf("]")!==-1,Le=i(P.host);le=Le.isIPV6||Le.isIPVFuture===!0,ie=_e&&(!Ce||Le.error===!0),P.host=le?Le.host:Le.host.toLowerCase(),ie&&(P.error=P.error||"URI host is malformed.",S=!0)}else le=!0;P.scheme===void 0&&P.userinfo===void 0&&P.host===void 0&&P.port===void 0&&P.query===void 0&&!P.path?P.reference="same-document":P.scheme===void 0?P.reference="relative":P.fragment===void 0?P.reference="absolute":P.reference="uri",N.reference&&N.reference!=="suffix"&&N.reference!==P.reference&&(P.error=P.error||"URI is not a "+N.reference+" reference.");const pe=m(N.scheme||P.scheme);if(ie||(X=B(P,N,pe,le)),R.indexOf("%")!==-1&&P.host!==void 0&&!ie){let he=le?P.host:n(P.host,!0);le||(he=n(he.toLowerCase())),P.host=l(he,le)}(!pe||pe&&!pe.skipNormalize)&&(P.path&&(P.path=r(P.path)),P.query&&(P.query=a(P.query)),P.fragment&&(P.fragment=a(P.fragment))),pe&&pe.parse&&(pe.parse(P,N),pe===p.urn&&P.nid===void 0&&(k=!0))}else P.error=P.error||"URI can not be parsed.";return{parsed:P,malformedAuthorityOrPort:S,malformedPercentEncoding:C,malformedSchemeSpecific:k,malformedHost:X,malformedScheme:me}}function te(R,T){return H(R,T).parsed}function Q(R,T){return oe(R,T).normalized}function oe(R,T){const{parsed:N,malformedAuthorityOrPort:P,malformedPercentEncoding:S,malformedSchemeSpecific:C,malformedHost:k,malformedScheme:X}=H(R,T);return{normalized:P||S||C||k||X?R:x(N,T),malformedAuthorityOrPort:P,malformedPercentEncoding:S,malformedSchemeSpecific:C,malformedHost:k,malformedScheme:X}}function K(R,T){if(typeof R!="string"&&typeof R!="object")return;let N;try{N=typeof R=="string"?R:x(R,T)}catch{return}const{normalized:P,malformedAuthorityOrPort:S,malformedPercentEncoding:C,malformedSchemeSpecific:k,malformedHost:X,malformedScheme:ie}=oe(N,T);return S||C||k||X||ie?void 0:P}const de={SCHEMES:p,normalize:d,resolve:_,resolveComponent:v,equal:y,serialize:x,parse:te};return Yi.exports=de,Yi.exports.default=de,Yi.exports.fastUri=de,Yi.exports}var Hl;function J0(){if(Hl)return Ur;Hl=1,Object.defineProperty(Ur,"__esModule",{value:!0});const i=Z0();return i.code='require("ajv/dist/runtime/uri").default',Ur.default=i,Ur}var Vl;function Id(){return Vl||(Vl=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.CodeGen=i.Name=i.nil=i.stringify=i.str=i._=i.KeywordCxt=void 0;var e=ir();Object.defineProperty(i,"KeywordCxt",{enumerable:!0,get:function(){return e.KeywordCxt}});var t=Be();Object.defineProperty(i,"_",{enumerable:!0,get:function(){return t._}}),Object.defineProperty(i,"str",{enumerable:!0,get:function(){return t.str}}),Object.defineProperty(i,"stringify",{enumerable:!0,get:function(){return t.stringify}}),Object.defineProperty(i,"nil",{enumerable:!0,get:function(){return t.nil}}),Object.defineProperty(i,"Name",{enumerable:!0,get:function(){return t.Name}}),Object.defineProperty(i,"CodeGen",{enumerable:!0,get:function(){return t.CodeGen}});const n=Ks(),r=rr(),s=Rd(),a=Zs(),o=Be(),c=Ys(),l=Bs(),u=Xe(),h=Y0,p=J0(),m=(R,T)=>new RegExp(R,T);m.code="new RegExp";const g=["removeAdditional","useDefaults","coerceTypes"],M=new Set(["validate","serialize","parse","wrapper","root","schema","keyword","pattern","formats","validate$data","func","obj","Error"]),f={errorDataPath:"",format:"`validateFormats: false` can be used instead.",nullable:'"nullable" keyword is supported by default.',jsonPointers:"Deprecated jsPropertySyntax can be used instead.",extendRefs:"Deprecated ignoreKeywordsWithRef can be used instead.",missingRefs:"Pass empty schema with $id that should be ignored to ajv.addSchema.",processCode:"Use option `code: {process: (code, schemaEnv: object) => string}`",sourceCode:"Use option `code: {source: true}`",strictDefaults:"It is default now, see option `strict`.",strictKeywords:"It is default now, see option `strict`.",uniqueItems:'"uniqueItems" keyword is always validated.',unknownFormats:"Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",cache:"Map is used as cache, schema object as key.",serialize:"Map is used as cache, schema object as key.",ajvErrors:"It is default now."},d={ignoreKeywordsWithRef:"",jsPropertySyntax:"",unicode:'"minLength"/"maxLength" account for unicode characters by default.'},_=200;function v(R){var T,N,P,S,C,k,X,ie,me,le,z,W,Z,O,pe,he,Ce,_e,Le,Se,F,D,Y,se,ce;const re=R.strict,Pe=(T=R.code)===null||T===void 0?void 0:T.optimize,ve=Pe===!0||Pe===void 0?1:Pe||0,be=(P=(N=R.code)===null||N===void 0?void 0:N.regExp)!==null&&P!==void 0?P:m,Ye=(S=R.uriResolver)!==null&&S!==void 0?S:p.default;return{strictSchema:(k=(C=R.strictSchema)!==null&&C!==void 0?C:re)!==null&&k!==void 0?k:!0,strictNumbers:(ie=(X=R.strictNumbers)!==null&&X!==void 0?X:re)!==null&&ie!==void 0?ie:!0,strictTypes:(le=(me=R.strictTypes)!==null&&me!==void 0?me:re)!==null&&le!==void 0?le:"log",strictTuples:(W=(z=R.strictTuples)!==null&&z!==void 0?z:re)!==null&&W!==void 0?W:"log",strictRequired:(O=(Z=R.strictRequired)!==null&&Z!==void 0?Z:re)!==null&&O!==void 0?O:!1,code:R.code?{...R.code,optimize:ve,regExp:be}:{optimize:ve,regExp:be},loopRequired:(pe=R.loopRequired)!==null&&pe!==void 0?pe:_,loopEnum:(he=R.loopEnum)!==null&&he!==void 0?he:_,meta:(Ce=R.meta)!==null&&Ce!==void 0?Ce:!0,messages:(_e=R.messages)!==null&&_e!==void 0?_e:!0,inlineRefs:(Le=R.inlineRefs)!==null&&Le!==void 0?Le:!0,schemaId:(Se=R.schemaId)!==null&&Se!==void 0?Se:"$id",addUsedSchema:(F=R.addUsedSchema)!==null&&F!==void 0?F:!0,validateSchema:(D=R.validateSchema)!==null&&D!==void 0?D:!0,validateFormats:(Y=R.validateFormats)!==null&&Y!==void 0?Y:!0,unicodeRegExp:(se=R.unicodeRegExp)!==null&&se!==void 0?se:!0,int32range:(ce=R.int32range)!==null&&ce!==void 0?ce:!0,uriResolver:Ye}}class y{constructor(T={}){this.schemas={},this.refs={},this.formats={},this._compilations=new Set,this._loading={},this._cache=new Map,T=this.opts={...T,...v(T)};const{es5:N,lines:P}=this.opts.code;this.scope=new o.ValueScope({scope:{},prefixes:M,es5:N,lines:P}),this.logger=$(T.logger);const S=T.validateFormats;T.validateFormats=!1,this.RULES=(0,s.getRules)(),x.call(this,f,T,"NOT SUPPORTED"),x.call(this,d,T,"DEPRECATED","warn"),this._metaOpts=w.call(this),T.formats&&I.call(this),this._addVocabularies(),this._addDefaultMetaSchema(),T.keywords&&A.call(this,T.keywords),typeof T.meta=="object"&&this.addMetaSchema(T.meta),b.call(this),T.validateFormats=S}_addVocabularies(){this.addKeyword("$async")}_addDefaultMetaSchema(){const{$data:T,meta:N,schemaId:P}=this.opts;let S=h;P==="id"&&(S={...h},S.id=S.$id,delete S.$id),N&&T&&this.addMetaSchema(S,S[P],!1)}defaultMeta(){const{meta:T,schemaId:N}=this.opts;return this.opts.defaultMeta=typeof T=="object"?T[N]||T:void 0}validate(T,N){let P;if(typeof T=="string"){if(P=this.getSchema(T),!P)throw new Error(`no schema with key or ref "${T}"`)}else P=this.compile(T);const S=P(N);return"$async"in P||(this.errors=P.errors),S}compile(T,N){const P=this._addSchema(T,N);return P.validate||this._compileSchemaEnv(P)}compileAsync(T,N){if(typeof this.opts.loadSchema!="function")throw new Error("options.loadSchema should be a function");const{loadSchema:P}=this.opts;return S.call(this,T,N);async function S(le,z){await C.call(this,le.$schema);const W=this._addSchema(le,z);return W.validate||k.call(this,W)}async function C(le){le&&!this.getSchema(le)&&await S.call(this,{$ref:le},!0)}async function k(le){try{return this._compileSchemaEnv(le)}catch(z){if(!(z instanceof r.default))throw z;return X.call(this,z),await ie.call(this,z.missingSchema),k.call(this,le)}}function X({missingSchema:le,missingRef:z}){if(this.refs[le])throw new Error(`AnySchema ${le} is loaded but ${z} cannot be resolved`)}async function ie(le){const z=await me.call(this,le);this.refs[le]||await C.call(this,z.$schema),this.refs[le]||this.addSchema(z,le,N)}async function me(le){const z=this._loading[le];if(z)return z;try{return await(this._loading[le]=P(le))}finally{delete this._loading[le]}}}addSchema(T,N,P,S=this.opts.validateSchema){if(Array.isArray(T)){for(const k of T)this.addSchema(k,void 0,P,S);return this}let C;if(typeof T=="object"){const{schemaId:k}=this.opts;if(C=T[k],C!==void 0&&typeof C!="string")throw new Error(`schema ${k} must be string`)}return N=(0,c.normalizeId)(N||C),this._checkUnique(N),this.schemas[N]=this._addSchema(T,P,N,S,!0),this}addMetaSchema(T,N,P=this.opts.validateSchema){return this.addSchema(T,N,!0,P),this}validateSchema(T,N){if(typeof T=="boolean")return!0;let P;if(P=T.$schema,P!==void 0&&typeof P!="string")throw new Error("$schema must be a string");if(P=P||this.opts.defaultMeta||this.defaultMeta(),!P)return this.logger.warn("meta-schema not available"),this.errors=null,!0;const S=this.validate(P,T);if(!S&&N){const C="schema is invalid: "+this.errorsText();if(this.opts.validateSchema==="log")this.logger.error(C);else throw new Error(C)}return S}getSchema(T){let N;for(;typeof(N=E.call(this,T))=="string";)T=N;if(N===void 0){const{schemaId:P}=this.opts,S=new a.SchemaEnv({schema:{},schemaId:P});if(N=a.resolveSchema.call(this,S,T),!N)return;this.refs[T]=N}return N.validate||this._compileSchemaEnv(N)}removeSchema(T){if(T instanceof RegExp)return this._removeAllSchemas(this.schemas,T),this._removeAllSchemas(this.refs,T),this;switch(typeof T){case"undefined":return this._removeAllSchemas(this.schemas),this._removeAllSchemas(this.refs),this._cache.clear(),this;case"string":{const N=E.call(this,T);return typeof N=="object"&&this._cache.delete(N.schema),delete this.schemas[T],delete this.refs[T],this}case"object":{const N=T;this._cache.delete(N);let P=T[this.opts.schemaId];return P&&(P=(0,c.normalizeId)(P),delete this.schemas[P],delete this.refs[P]),this}default:throw new Error("ajv.removeSchema: invalid parameter")}}addVocabulary(T){for(const N of T)this.addKeyword(N);return this}addKeyword(T,N){let P;if(typeof T=="string")P=T,typeof N=="object"&&(this.logger.warn("these parameters are deprecated, see docs for addKeyword"),N.keyword=P);else if(typeof T=="object"&&N===void 0){if(N=T,P=N.keyword,Array.isArray(P)&&!P.length)throw new Error("addKeywords: keyword must be string or non-empty array")}else throw new Error("invalid addKeywords parameters");if(H.call(this,P,N),!N)return(0,u.eachItem)(P,C=>te.call(this,C)),this;oe.call(this,N);const S={...N,type:(0,l.getJSONTypes)(N.type),schemaType:(0,l.getJSONTypes)(N.schemaType)};return(0,u.eachItem)(P,S.type.length===0?C=>te.call(this,C,S):C=>S.type.forEach(k=>te.call(this,C,S,k))),this}getKeyword(T){const N=this.RULES.all[T];return typeof N=="object"?N.definition:!!N}removeKeyword(T){const{RULES:N}=this;delete N.keywords[T],delete N.all[T];for(const P of N.rules){const S=P.rules.findIndex(C=>C.keyword===T);S>=0&&P.rules.splice(S,1)}return this}addFormat(T,N){return typeof N=="string"&&(N=new RegExp(N)),this.formats[T]=N,this}errorsText(T=this.errors,{separator:N=", ",dataVar:P="data"}={}){return!T||T.length===0?"No errors":T.map(S=>`${P}${S.instancePath} ${S.message}`).reduce((S,C)=>S+N+C)}$dataMetaSchema(T,N){const P=this.RULES.all;T=JSON.parse(JSON.stringify(T));for(const S of N){const C=S.split("/").slice(1);let k=T;for(const X of C)k=k[X];for(const X in P){const ie=P[X];if(typeof ie!="object")continue;const{$data:me}=ie.definition,le=k[X];me&&le&&(k[X]=de(le))}}return T}_removeAllSchemas(T,N){for(const P in T){const S=T[P];(!N||N.test(P))&&(typeof S=="string"?delete T[P]:S&&!S.meta&&(this._cache.delete(S.schema),delete T[P]))}}_addSchema(T,N,P,S=this.opts.validateSchema,C=this.opts.addUsedSchema){let k;const{schemaId:X}=this.opts;if(typeof T=="object")k=T[X];else{if(this.opts.jtd)throw new Error("schema must be object");if(typeof T!="boolean")throw new Error("schema must be object or boolean")}let ie=this._cache.get(T);if(ie!==void 0)return ie;P=(0,c.normalizeId)(k||P);const me=c.getSchemaRefs.call(this,T,P);return ie=new a.SchemaEnv({schema:T,schemaId:X,meta:N,baseId:P,localRefs:me}),this._cache.set(ie.schema,ie),C&&!P.startsWith("#")&&(P&&this._checkUnique(P),this.refs[P]=ie),S&&this.validateSchema(T,!0),ie}_checkUnique(T){if(this.schemas[T]||this.refs[T])throw new Error(`schema with key or id "${T}" already exists`)}_compileSchemaEnv(T){if(T.meta?this._compileMetaSchema(T):a.compileSchema.call(this,T),!T.validate)throw new Error("ajv implementation error");return T.validate}_compileMetaSchema(T){const N=this.opts;this.opts=this._metaOpts;try{a.compileSchema.call(this,T)}finally{this.opts=N}}}y.ValidationError=n.default,y.MissingRefError=r.default,i.default=y;function x(R,T,N,P="error"){for(const S in R){const C=S;C in T&&this.logger[P](`${N}: option ${S}. ${R[C]}`)}}function E(R){return R=(0,c.normalizeId)(R),this.schemas[R]||this.refs[R]}function b(){const R=this.opts.schemas;if(R)if(Array.isArray(R))this.addSchema(R);else for(const T in R)this.addSchema(R[T],T)}function I(){for(const R in this.opts.formats){const T=this.opts.formats[R];T&&this.addFormat(R,T)}}function A(R){if(Array.isArray(R)){this.addVocabulary(R);return}this.logger.warn("keywords option as map is deprecated, pass array");for(const T in R){const N=R[T];N.keyword||(N.keyword=T),this.addKeyword(N)}}function w(){const R={...this.opts};for(const T of g)delete R[T];return R}const U={log(){},warn(){},error(){}};function $(R){if(R===!1)return U;if(R===void 0)return console;if(R.log&&R.warn&&R.error)return R;throw new Error("logger must implement log, warn and error methods")}const B=/^[a-z_$][a-z0-9_$:-]*$/i;function H(R,T){const{RULES:N}=this;if((0,u.eachItem)(R,P=>{if(N.keywords[P])throw new Error(`Keyword ${P} is already defined`);if(!B.test(P))throw new Error(`Keyword ${P} has invalid name`)}),!!T&&T.$data&&!("code"in T||"validate"in T))throw new Error('$data keyword must have "code" or "validate" function')}function te(R,T,N){var P;const S=T?.post;if(N&&S)throw new Error('keyword with "post" flag cannot have "type"');const{RULES:C}=this;let k=S?C.post:C.rules.find(({type:ie})=>ie===N);if(k||(k={type:N,rules:[]},C.rules.push(k)),C.keywords[R]=!0,!T)return;const X={keyword:R,definition:{...T,type:(0,l.getJSONTypes)(T.type),schemaType:(0,l.getJSONTypes)(T.schemaType)}};T.before?Q.call(this,k,X,T.before):k.rules.push(X),C.all[R]=X,(P=T.implements)===null||P===void 0||P.forEach(ie=>this.addKeyword(ie))}function Q(R,T,N){const P=R.rules.findIndex(S=>S.keyword===N);P>=0?R.rules.splice(P,0,T):(R.rules.push(T),this.logger.warn(`rule ${N} is not defined`))}function oe(R){let{metaSchema:T}=R;T!==void 0&&(R.$data&&this.opts.$data&&(T=de(T)),R.validateSchema=this.compile(T,!0))}const K={$ref:"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"};function de(R){return{anyOf:[R,K]}}})(Da)),Da}var Or={},Fr={},kr={},Gl;function Q0(){if(Gl)return kr;Gl=1,Object.defineProperty(kr,"__esModule",{value:!0});const i={keyword:"id",code(){throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID')}};return kr.default=i,kr}var In={},Wl;function Qo(){if(Wl)return In;Wl=1,Object.defineProperty(In,"__esModule",{value:!0}),In.callRef=In.getValidate=void 0;const i=rr(),e=sn(),t=Be(),n=rn(),r=Zs(),s=Xe(),a={keyword:"$ref",schemaType:"string",code(l){const{gen:u,schema:h,it:p}=l,{baseId:m,schemaEnv:g,validateName:M,opts:f,self:d}=p,{root:_}=g;if((h==="#"||h==="#/")&&m===_.baseId)return y();const v=r.resolveRef.call(d,_,m,h);if(v===void 0)throw new i.default(p.opts.uriResolver,m,h);if(v instanceof r.SchemaEnv)return x(v);return E(v);function y(){if(g===_)return c(l,M,g,g.$async);const b=u.scopeValue("root",{ref:_});return c(l,(0,t._)`${b}.validate`,_,_.$async)}function x(b){const I=o(l,b);c(l,I,b,b.$async)}function E(b){const I=u.scopeValue("schema",f.code.source===!0?{ref:b,code:(0,t.stringify)(b)}:{ref:b}),A=u.name("valid"),w=l.subschema({schema:b,dataTypes:[],schemaPath:t.nil,topSchemaRef:I,errSchemaPath:h},A);l.mergeEvaluated(w),l.ok(A)}}};function o(l,u){const{gen:h}=l;return u.validate?h.scopeValue("validate",{ref:u.validate}):(0,t._)`${h.scopeValue("wrapper",{ref:u})}.validate`}In.getValidate=o;function c(l,u,h,p){const{gen:m,it:g}=l,{allErrors:M,schemaEnv:f,opts:d}=g,_=d.passContext?n.default.this:t.nil;p?v():y();function v(){if(!f.$async)throw new Error("async schema referenced by sync schema");const b=m.let("valid");m.try(()=>{m.code((0,t._)`await ${(0,e.callValidateCode)(l,u,_)}`),E(u),M||m.assign(b,!0)},I=>{m.if((0,t._)`!(${I} instanceof ${g.ValidationError})`,()=>m.throw(I)),x(I),M||m.assign(b,!1)}),l.ok(b)}function y(){l.result((0,e.callValidateCode)(l,u,_),()=>E(u),()=>x(u))}function x(b){const I=(0,t._)`${b}.errors`;m.assign(n.default.vErrors,(0,t._)`${n.default.vErrors} === null ? ${I} : ${n.default.vErrors}.concat(${I})`),m.assign(n.default.errors,(0,t._)`${n.default.vErrors}.length`)}function E(b){var I;if(!g.opts.unevaluated)return;const A=(I=h?.validate)===null||I===void 0?void 0:I.evaluated;if(g.props!==!0)if(A&&!A.dynamicProps)A.props!==void 0&&(g.props=s.mergeEvaluated.props(m,A.props,g.props));else{const w=m.var("props",(0,t._)`${b}.evaluated.props`);g.props=s.mergeEvaluated.props(m,w,g.props,t.Name)}if(g.items!==!0)if(A&&!A.dynamicItems)A.items!==void 0&&(g.items=s.mergeEvaluated.items(m,A.items,g.items));else{const w=m.var("items",(0,t._)`${b}.evaluated.items`);g.items=s.mergeEvaluated.items(m,w,g.items,t.Name)}}}return In.callRef=c,In.default=a,In}var ql;function Ld(){if(ql)return Fr;ql=1,Object.defineProperty(Fr,"__esModule",{value:!0});const i=Q0(),e=Qo(),t=["$schema","$id","$defs","$vocabulary",{keyword:"$comment"},"definitions",i.default,e.default];return Fr.default=t,Fr}var $r={},Br={},jl;function ev(){if(jl)return Br;jl=1,Object.defineProperty(Br,"__esModule",{value:!0});const i=Be(),e=i.operators,t={maximum:{okStr:"<=",ok:e.LTE,fail:e.GT},minimum:{okStr:">=",ok:e.GTE,fail:e.LT},exclusiveMaximum:{okStr:"<",ok:e.LT,fail:e.GTE},exclusiveMinimum:{okStr:">",ok:e.GT,fail:e.LTE}},n={message:({keyword:s,schemaCode:a})=>(0,i.str)`must be ${t[s].okStr} ${a}`,params:({keyword:s,schemaCode:a})=>(0,i._)`{comparison: ${t[s].okStr}, limit: ${a}}`},r={keyword:Object.keys(t),type:"number",schemaType:"number",$data:!0,error:n,code(s){const{keyword:a,data:o,schemaCode:c}=s;s.fail$data((0,i._)`${o} ${t[a].fail} ${c} || isNaN(${o})`)}};return Br.default=r,Br}var zr={},Xl;function tv(){if(Xl)return zr;Xl=1,Object.defineProperty(zr,"__esModule",{value:!0});const i=Be(),t={keyword:"multipleOf",type:"number",schemaType:"number",$data:!0,error:{message:({schemaCode:n})=>(0,i.str)`must be multiple of ${n}`,params:({schemaCode:n})=>(0,i._)`{multipleOf: ${n}}`},code(n){const{gen:r,data:s,schemaCode:a,it:o}=n,c=o.opts.multipleOfPrecision,l=r.let("res"),u=c?(0,i._)`Math.abs(Math.round(${l}) - ${l}) > 1e-${c}`:(0,i._)`${l} !== parseInt(${l})`;n.fail$data((0,i._)`(${a} === 0 || (${l} = ${s}/${a}, ${u}))`)}};return zr.default=t,zr}var Hr={},Vr={},Yl;function nv(){if(Yl)return Vr;Yl=1,Object.defineProperty(Vr,"__esModule",{value:!0});function i(e){const t=e.length;let n=0,r=0,s;for(;r<t;)n++,s=e.charCodeAt(r++),s>=55296&&s<=56319&&r<t&&(s=e.charCodeAt(r),(s&64512)===56320&&r++);return n}return Vr.default=i,i.code='require("ajv/dist/runtime/ucs2length").default',Vr}var Kl;function iv(){if(Kl)return Hr;Kl=1,Object.defineProperty(Hr,"__esModule",{value:!0});const i=Be(),e=Xe(),t=nv(),r={keyword:["maxLength","minLength"],type:"string",schemaType:"number",$data:!0,error:{message({keyword:s,schemaCode:a}){const o=s==="maxLength"?"more":"fewer";return(0,i.str)`must NOT have ${o} than ${a} characters`},params:({schemaCode:s})=>(0,i._)`{limit: ${s}}`},code(s){const{keyword:a,data:o,schemaCode:c,it:l}=s,u=a==="maxLength"?i.operators.GT:i.operators.LT,h=l.opts.unicode===!1?(0,i._)`${o}.length`:(0,i._)`${(0,e.useFunc)(s.gen,t.default)}(${o})`;s.fail$data((0,i._)`${h} ${u} ${c}`)}};return Hr.default=r,Hr}var Gr={},Zl;function rv(){if(Zl)return Gr;Zl=1,Object.defineProperty(Gr,"__esModule",{value:!0});const i=sn(),e=Be(),n={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:{message:({schemaCode:r})=>(0,e.str)`must match pattern "${r}"`,params:({schemaCode:r})=>(0,e._)`{pattern: ${r}}`},code(r){const{data:s,$data:a,schema:o,schemaCode:c,it:l}=r,u=l.opts.unicodeRegExp?"u":"",h=a?(0,e._)`(new RegExp(${c}, ${u}))`:(0,i.usePattern)(r,o);r.fail$data((0,e._)`!${h}.test(${s})`)}};return Gr.default=n,Gr}var Wr={},Jl;function sv(){if(Jl)return Wr;Jl=1,Object.defineProperty(Wr,"__esModule",{value:!0});const i=Be(),t={keyword:["maxProperties","minProperties"],type:"object",schemaType:"number",$data:!0,error:{message({keyword:n,schemaCode:r}){const s=n==="maxProperties"?"more":"fewer";return(0,i.str)`must NOT have ${s} than ${r} properties`},params:({schemaCode:n})=>(0,i._)`{limit: ${n}}`},code(n){const{keyword:r,data:s,schemaCode:a}=n,o=r==="maxProperties"?i.operators.GT:i.operators.LT;n.fail$data((0,i._)`Object.keys(${s}).length ${o} ${a}`)}};return Wr.default=t,Wr}var qr={},Ql;function av(){if(Ql)return qr;Ql=1,Object.defineProperty(qr,"__esModule",{value:!0});const i=sn(),e=Be(),t=Xe(),r={keyword:"required",type:"object",schemaType:"array",$data:!0,error:{message:({params:{missingProperty:s}})=>(0,e.str)`must have required property '${s}'`,params:({params:{missingProperty:s}})=>(0,e._)`{missingProperty: ${s}}`},code(s){const{gen:a,schema:o,schemaCode:c,data:l,$data:u,it:h}=s,{opts:p}=h;if(!u&&o.length===0)return;const m=o.length>=p.loopRequired;if(h.allErrors?g():M(),p.strictRequired){const _=s.parentSchema.properties,{definedProperties:v}=s.it;for(const y of o)if(_?.[y]===void 0&&!v.has(y)){const x=h.schemaEnv.baseId+h.errSchemaPath,E=`required property "${y}" is not defined at "${x}" (strictRequired)`;(0,t.checkStrictMode)(h,E,h.opts.strictRequired)}}function g(){if(m||u)s.block$data(e.nil,f);else for(const _ of o)(0,i.checkReportMissingProp)(s,_)}function M(){const _=a.let("missing");if(m||u){const v=a.let("valid",!0);s.block$data(v,()=>d(_,v)),s.ok(v)}else a.if((0,i.checkMissingProp)(s,o,_)),(0,i.reportMissingProp)(s,_),a.else()}function f(){a.forOf("prop",c,_=>{s.setParams({missingProperty:_}),a.if((0,i.noPropertyInData)(a,l,_,p.ownProperties),()=>s.error())})}function d(_,v){s.setParams({missingProperty:_}),a.forOf(_,c,()=>{a.assign(v,(0,i.propertyInData)(a,l,_,p.ownProperties)),a.if((0,e.not)(v),()=>{s.error(),a.break()})},e.nil)}}};return qr.default=r,qr}var jr={},eu;function ov(){if(eu)return jr;eu=1,Object.defineProperty(jr,"__esModule",{value:!0});const i=Be(),t={keyword:["maxItems","minItems"],type:"array",schemaType:"number",$data:!0,error:{message({keyword:n,schemaCode:r}){const s=n==="maxItems"?"more":"fewer";return(0,i.str)`must NOT have ${s} than ${r} items`},params:({schemaCode:n})=>(0,i._)`{limit: ${n}}`},code(n){const{keyword:r,data:s,schemaCode:a}=n,o=r==="maxItems"?i.operators.GT:i.operators.LT;n.fail$data((0,i._)`${s}.length ${o} ${a}`)}};return jr.default=t,jr}var Xr={},Yr={},tu;function ec(){if(tu)return Yr;tu=1,Object.defineProperty(Yr,"__esModule",{value:!0});const i=Cd();return i.code='require("ajv/dist/runtime/equal").default',Yr.default=i,Yr}var nu;function cv(){if(nu)return Xr;nu=1,Object.defineProperty(Xr,"__esModule",{value:!0});const i=Bs(),e=Be(),t=Xe(),n=ec(),s={keyword:"uniqueItems",type:"array",schemaType:"boolean",$data:!0,error:{message:({params:{i:a,j:o}})=>(0,e.str)`must NOT have duplicate items (items ## ${o} and ${a} are identical)`,params:({params:{i:a,j:o}})=>(0,e._)`{i: ${a}, j: ${o}}`},code(a){const{gen:o,data:c,$data:l,schema:u,parentSchema:h,schemaCode:p,it:m}=a;if(!l&&!u)return;const g=o.let("valid"),M=h.items?(0,i.getSchemaTypes)(h.items):[];a.block$data(g,f,(0,e._)`${p} === false`),a.ok(g);function f(){const y=o.let("i",(0,e._)`${c}.length`),x=o.let("j");a.setParams({i:y,j:x}),o.assign(g,!0),o.if((0,e._)`${y} > 1`,()=>(d()?_:v)(y,x))}function d(){return M.length>0&&!M.some(y=>y==="object"||y==="array")}function _(y,x){const E=o.name("item"),b=(0,i.checkDataTypes)(M,E,m.opts.strictNumbers,i.DataType.Wrong),I=o.const("indices",(0,e._)`{}`);o.for((0,e._)`;${y}--;`,()=>{o.let(E,(0,e._)`${c}[${y}]`),o.if(b,(0,e._)`continue`),M.length>1&&o.if((0,e._)`typeof ${E} == "string"`,(0,e._)`${E} += "_"`),o.if((0,e._)`typeof ${I}[${E}] == "number"`,()=>{o.assign(x,(0,e._)`${I}[${E}]`),a.error(),o.assign(g,!1).break()}).code((0,e._)`${I}[${E}] = ${y}`)})}function v(y,x){const E=(0,t.useFunc)(o,n.default),b=o.name("outer");o.label(b).for((0,e._)`;${y}--;`,()=>o.for((0,e._)`${x} = ${y}; ${x}--;`,()=>o.if((0,e._)`${E}(${c}[${y}], ${c}[${x}])`,()=>{a.error(),o.assign(g,!1).break(b)})))}}};return Xr.default=s,Xr}var Kr={},iu;function lv(){if(iu)return Kr;iu=1,Object.defineProperty(Kr,"__esModule",{value:!0});const i=Be(),e=Xe(),t=ec(),r={keyword:"const",$data:!0,error:{message:"must be equal to constant",params:({schemaCode:s})=>(0,i._)`{allowedValue: ${s}}`},code(s){const{gen:a,data:o,$data:c,schemaCode:l,schema:u}=s;c||u&&typeof u=="object"?s.fail$data((0,i._)`!${(0,e.useFunc)(a,t.default)}(${o}, ${l})`):s.fail((0,i._)`${u} !== ${o}`)}};return Kr.default=r,Kr}var Zr={},ru;function uv(){if(ru)return Zr;ru=1,Object.defineProperty(Zr,"__esModule",{value:!0});const i=Be(),e=Xe(),t=ec(),r={keyword:"enum",schemaType:"array",$data:!0,error:{message:"must be equal to one of the allowed values",params:({schemaCode:s})=>(0,i._)`{allowedValues: ${s}}`},code(s){const{gen:a,data:o,$data:c,schema:l,schemaCode:u,it:h}=s;if(!c&&l.length===0)throw new Error("enum must have non-empty array");const p=l.length>=h.opts.loopEnum;let m;const g=()=>m??(m=(0,e.useFunc)(a,t.default));let M;if(p||c)M=a.let("valid"),s.block$data(M,f);else{if(!Array.isArray(l))throw new Error("ajv implementation error");const _=a.const("vSchema",u);M=(0,i.or)(...l.map((v,y)=>d(_,y)))}s.pass(M);function f(){a.assign(M,!1),a.forOf("v",u,_=>a.if((0,i._)`${g()}(${o}, ${_})`,()=>a.assign(M,!0).break()))}function d(_,v){const y=l[v];return typeof y=="object"&&y!==null?(0,i._)`${g()}(${o}, ${_}[${v}])`:(0,i._)`${o} === ${y}`}}};return Zr.default=r,Zr}var su;function Nd(){if(su)return $r;su=1,Object.defineProperty($r,"__esModule",{value:!0});const i=ev(),e=tv(),t=iv(),n=rv(),r=sv(),s=av(),a=ov(),o=cv(),c=lv(),l=uv(),u=[i.default,e.default,t.default,n.default,r.default,s.default,a.default,o.default,{keyword:"type",schemaType:["string","array"]},{keyword:"nullable",schemaType:"boolean"},c.default,l.default];return $r.default=u,$r}var Jr={},Si={},au;function Ud(){if(au)return Si;au=1,Object.defineProperty(Si,"__esModule",{value:!0}),Si.validateAdditionalItems=void 0;const i=Be(),e=Xe(),n={keyword:"additionalItems",type:"array",schemaType:["boolean","object"],before:"uniqueItems",error:{message:({params:{len:s}})=>(0,i.str)`must NOT have more than ${s} items`,params:({params:{len:s}})=>(0,i._)`{limit: ${s}}`},code(s){const{parentSchema:a,it:o}=s,{items:c}=a;if(!Array.isArray(c)){(0,e.checkStrictMode)(o,'"additionalItems" is ignored when "items" is not an array of schemas');return}r(s,c)}};function r(s,a){const{gen:o,schema:c,data:l,keyword:u,it:h}=s;h.items=!0;const p=o.const("len",(0,i._)`${l}.length`);if(c===!1)s.setParams({len:a.length}),s.pass((0,i._)`${p} <= ${a.length}`);else if(typeof c=="object"&&!(0,e.alwaysValidSchema)(h,c)){const g=o.var("valid",(0,i._)`${p} <= ${a.length}`);o.if((0,i.not)(g),()=>m(g)),s.ok(g)}function m(g){o.forRange("i",a.length,p,M=>{s.subschema({keyword:u,dataProp:M,dataPropType:e.Type.Num},g),h.allErrors||o.if((0,i.not)(g),()=>o.break())})}}return Si.validateAdditionalItems=r,Si.default=n,Si}var Qr={},Mi={},ou;function Od(){if(ou)return Mi;ou=1,Object.defineProperty(Mi,"__esModule",{value:!0}),Mi.validateTuple=void 0;const i=Be(),e=Xe(),t=sn(),n={keyword:"items",type:"array",schemaType:["object","array","boolean"],before:"uniqueItems",code(s){const{schema:a,it:o}=s;if(Array.isArray(a))return r(s,"additionalItems",a);o.items=!0,!(0,e.alwaysValidSchema)(o,a)&&s.ok((0,t.validateArray)(s))}};function r(s,a,o=s.schema){const{gen:c,parentSchema:l,data:u,keyword:h,it:p}=s;M(l),p.opts.unevaluated&&o.length&&p.items!==!0&&(p.items=e.mergeEvaluated.items(c,o.length,p.items));const m=c.name("valid"),g=c.const("len",(0,i._)`${u}.length`);o.forEach((f,d)=>{(0,e.alwaysValidSchema)(p,f)||(c.if((0,i._)`${g} > ${d}`,()=>s.subschema({keyword:h,schemaProp:d,dataProp:d},m)),s.ok(m))});function M(f){const{opts:d,errSchemaPath:_}=p,v=o.length,y=v===f.minItems&&(v===f.maxItems||f[a]===!1);if(d.strictTuples&&!y){const x=`"${h}" is ${v}-tuple, but minItems or maxItems/${a} are not specified or different at path "${_}"`;(0,e.checkStrictMode)(p,x,d.strictTuples)}}}return Mi.validateTuple=r,Mi.default=n,Mi}var cu;function dv(){if(cu)return Qr;cu=1,Object.defineProperty(Qr,"__esModule",{value:!0});const i=Od(),e={keyword:"prefixItems",type:"array",schemaType:["array"],before:"uniqueItems",code:t=>(0,i.validateTuple)(t,"items")};return Qr.default=e,Qr}var es={},lu;function hv(){if(lu)return es;lu=1,Object.defineProperty(es,"__esModule",{value:!0});const i=Be(),e=Xe(),t=sn(),n=Ud(),s={keyword:"items",type:"array",schemaType:["object","boolean"],before:"uniqueItems",error:{message:({params:{len:a}})=>(0,i.str)`must NOT have more than ${a} items`,params:({params:{len:a}})=>(0,i._)`{limit: ${a}}`},code(a){const{schema:o,parentSchema:c,it:l}=a,{prefixItems:u}=c;l.items=!0,!(0,e.alwaysValidSchema)(l,o)&&(u?(0,n.validateAdditionalItems)(a,u):a.ok((0,t.validateArray)(a)))}};return es.default=s,es}var ts={},uu;function fv(){if(uu)return ts;uu=1,Object.defineProperty(ts,"__esModule",{value:!0});const i=Be(),e=Xe(),n={keyword:"contains",type:"array",schemaType:["object","boolean"],before:"uniqueItems",trackErrors:!0,error:{message:({params:{min:r,max:s}})=>s===void 0?(0,i.str)`must contain at least ${r} valid item(s)`:(0,i.str)`must contain at least ${r} and no more than ${s} valid item(s)`,params:({params:{min:r,max:s}})=>s===void 0?(0,i._)`{minContains: ${r}}`:(0,i._)`{minContains: ${r}, maxContains: ${s}}`},code(r){const{gen:s,schema:a,parentSchema:o,data:c,it:l}=r;let u,h;const{minContains:p,maxContains:m}=o;l.opts.next?(u=p===void 0?1:p,h=m):u=1;const g=s.const("len",(0,i._)`${c}.length`);if(r.setParams({min:u,max:h}),h===void 0&&u===0){(0,e.checkStrictMode)(l,'"minContains" == 0 without "maxContains": "contains" keyword ignored');return}if(h!==void 0&&u>h){(0,e.checkStrictMode)(l,'"minContains" > "maxContains" is always invalid'),r.fail();return}if((0,e.alwaysValidSchema)(l,a)){let v=(0,i._)`${g} >= ${u}`;h!==void 0&&(v=(0,i._)`${v} && ${g} <= ${h}`),r.pass(v);return}l.items=!0;const M=s.name("valid");h===void 0&&u===1?d(M,()=>s.if(M,()=>s.break())):u===0?(s.let(M,!0),h!==void 0&&s.if((0,i._)`${c}.length > 0`,f)):(s.let(M,!1),f()),r.result(M,()=>r.reset());function f(){const v=s.name("_valid"),y=s.let("count",0);d(v,()=>s.if(v,()=>_(y)))}function d(v,y){s.forRange("i",0,g,x=>{r.subschema({keyword:"contains",dataProp:x,dataPropType:e.Type.Num,compositeRule:!0},v),y()})}function _(v){s.code((0,i._)`${v}++`),h===void 0?s.if((0,i._)`${v} >= ${u}`,()=>s.assign(M,!0).break()):(s.if((0,i._)`${v} > ${h}`,()=>s.assign(M,!1).break()),u===1?s.assign(M,!0):s.if((0,i._)`${v} >= ${u}`,()=>s.assign(M,!0)))}}};return ts.default=n,ts}var Ba={},du;function tc(){return du||(du=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.validateSchemaDeps=i.validatePropertyDeps=i.error=void 0;const e=Be(),t=Xe(),n=sn();i.error={message:({params:{property:c,depsCount:l,deps:u}})=>{const h=l===1?"property":"properties";return(0,e.str)`must have ${h} ${u} when property ${c} is present`},params:({params:{property:c,depsCount:l,deps:u,missingProperty:h}})=>(0,e._)`{property: ${c},
    missingProperty: ${h},
    depsCount: ${l},
    deps: ${u}}`};const r={keyword:"dependencies",type:"object",schemaType:"object",error:i.error,code(c){const[l,u]=s(c);a(c,l),o(c,u)}};function s({schema:c}){const l={},u={};for(const h in c){if(h==="__proto__")continue;const p=Array.isArray(c[h])?l:u;p[h]=c[h]}return[l,u]}function a(c,l=c.schema){const{gen:u,data:h,it:p}=c;if(Object.keys(l).length===0)return;const m=u.let("missing");for(const g in l){const M=l[g];if(M.length===0)continue;const f=(0,n.propertyInData)(u,h,g,p.opts.ownProperties);c.setParams({property:g,depsCount:M.length,deps:M.join(", ")}),p.allErrors?u.if(f,()=>{for(const d of M)(0,n.checkReportMissingProp)(c,d)}):(u.if((0,e._)`${f} && (${(0,n.checkMissingProp)(c,M,m)})`),(0,n.reportMissingProp)(c,m),u.else())}}i.validatePropertyDeps=a;function o(c,l=c.schema){const{gen:u,data:h,keyword:p,it:m}=c,g=u.name("valid");for(const M in l)(0,t.alwaysValidSchema)(m,l[M])||(u.if((0,n.propertyInData)(u,h,M,m.opts.ownProperties),()=>{const f=c.subschema({keyword:p,schemaProp:M},g);c.mergeValidEvaluated(f,g)},()=>u.var(g,!0)),c.ok(g))}i.validateSchemaDeps=o,i.default=r})(Ba)),Ba}var ns={},hu;function pv(){if(hu)return ns;hu=1,Object.defineProperty(ns,"__esModule",{value:!0});const i=Be(),e=Xe(),n={keyword:"propertyNames",type:"object",schemaType:["object","boolean"],error:{message:"property name must be valid",params:({params:r})=>(0,i._)`{propertyName: ${r.propertyName}}`},code(r){const{gen:s,schema:a,data:o,it:c}=r;if((0,e.alwaysValidSchema)(c,a))return;const l=s.name("valid");s.forIn("key",o,u=>{r.setParams({propertyName:u}),r.subschema({keyword:"propertyNames",data:u,dataTypes:["string"],propertyName:u,compositeRule:!0},l),s.if((0,i.not)(l),()=>{r.error(!0),c.allErrors||s.break()})}),r.ok(l)}};return ns.default=n,ns}var is={},fu;function Fd(){if(fu)return is;fu=1,Object.defineProperty(is,"__esModule",{value:!0});const i=sn(),e=Be(),t=rn(),n=Xe(),s={keyword:"additionalProperties",type:["object"],schemaType:["boolean","object"],allowUndefined:!0,trackErrors:!0,error:{message:"must NOT have additional properties",params:({params:a})=>(0,e._)`{additionalProperty: ${a.additionalProperty}}`},code(a){const{gen:o,schema:c,parentSchema:l,data:u,errsCount:h,it:p}=a;if(!h)throw new Error("ajv implementation error");const{allErrors:m,opts:g}=p;if(p.props=!0,g.removeAdditional!=="all"&&(0,n.alwaysValidSchema)(p,c))return;const M=(0,i.allSchemaProperties)(l.properties),f=(0,i.allSchemaProperties)(l.patternProperties);d(),a.ok((0,e._)`${h} === ${t.default.errors}`);function d(){o.forIn("key",u,E=>{!M.length&&!f.length?y(E):o.if(_(E),()=>y(E))})}function _(E){let b;if(M.length>8){const I=(0,n.schemaRefOrVal)(p,l.properties,"properties");b=(0,i.isOwnProperty)(o,I,E)}else M.length?b=(0,e.or)(...M.map(I=>(0,e._)`${E} === ${I}`)):b=e.nil;return f.length&&(b=(0,e.or)(b,...f.map(I=>(0,e._)`${(0,i.usePattern)(a,I)}.test(${E})`))),(0,e.not)(b)}function v(E){o.code((0,e._)`delete ${u}[${E}]`)}function y(E){if(g.removeAdditional==="all"||g.removeAdditional&&c===!1){v(E);return}if(c===!1){a.setParams({additionalProperty:E}),a.error(),m||o.break();return}if(typeof c=="object"&&!(0,n.alwaysValidSchema)(p,c)){const b=o.name("valid");g.removeAdditional==="failing"?(x(E,b,!1),o.if((0,e.not)(b),()=>{a.reset(),v(E)})):(x(E,b),m||o.if((0,e.not)(b),()=>o.break()))}}function x(E,b,I){const A={keyword:"additionalProperties",dataProp:E,dataPropType:n.Type.Str};I===!1&&Object.assign(A,{compositeRule:!0,createErrors:!1,allErrors:!1}),a.subschema(A,b)}}};return is.default=s,is}var rs={},pu;function mv(){if(pu)return rs;pu=1,Object.defineProperty(rs,"__esModule",{value:!0});const i=ir(),e=sn(),t=Xe(),n=Fd(),r={keyword:"properties",type:"object",schemaType:"object",code(s){const{gen:a,schema:o,parentSchema:c,data:l,it:u}=s;u.opts.removeAdditional==="all"&&c.additionalProperties===void 0&&n.default.code(new i.KeywordCxt(u,n.default,"additionalProperties"));const h=(0,e.allSchemaProperties)(o);for(const f of h)u.definedProperties.add(f);u.opts.unevaluated&&h.length&&u.props!==!0&&(u.props=t.mergeEvaluated.props(a,(0,t.toHash)(h),u.props));const p=h.filter(f=>!(0,t.alwaysValidSchema)(u,o[f]));if(p.length===0)return;const m=a.name("valid");for(const f of p)g(f)?M(f):(a.if((0,e.propertyInData)(a,l,f,u.opts.ownProperties)),M(f),u.allErrors||a.else().var(m,!0),a.endIf()),s.it.definedProperties.add(f),s.ok(m);function g(f){return u.opts.useDefaults&&!u.compositeRule&&o[f].default!==void 0}function M(f){s.subschema({keyword:"properties",schemaProp:f,dataProp:f},m)}}};return rs.default=r,rs}var ss={},mu;function _v(){if(mu)return ss;mu=1,Object.defineProperty(ss,"__esModule",{value:!0});const i=sn(),e=Be(),t=Xe(),n=Xe(),r={keyword:"patternProperties",type:"object",schemaType:"object",code(s){const{gen:a,schema:o,data:c,parentSchema:l,it:u}=s,{opts:h}=u,p=(0,i.allSchemaProperties)(o),m=p.filter(y=>(0,t.alwaysValidSchema)(u,o[y]));if(p.length===0||m.length===p.length&&(!u.opts.unevaluated||u.props===!0))return;const g=h.strictSchema&&!h.allowMatchingProperties&&l.properties,M=a.name("valid");u.props!==!0&&!(u.props instanceof e.Name)&&(u.props=(0,n.evaluatedPropsToName)(a,u.props));const{props:f}=u;d();function d(){for(const y of p)g&&_(y),u.allErrors?v(y):(a.var(M,!0),v(y),a.if(M))}function _(y){for(const x in g)new RegExp(y).test(x)&&(0,t.checkStrictMode)(u,`property ${x} matches pattern ${y} (use allowMatchingProperties)`)}function v(y){a.forIn("key",c,x=>{a.if((0,e._)`${(0,i.usePattern)(s,y)}.test(${x})`,()=>{const E=m.includes(y);E||s.subschema({keyword:"patternProperties",schemaProp:y,dataProp:x,dataPropType:n.Type.Str},M),u.opts.unevaluated&&f!==!0?a.assign((0,e._)`${f}[${x}]`,!0):!E&&!u.allErrors&&a.if((0,e.not)(M),()=>a.break())})})}}};return ss.default=r,ss}var as={},_u;function gv(){if(_u)return as;_u=1,Object.defineProperty(as,"__esModule",{value:!0});const i=Xe(),e={keyword:"not",schemaType:["object","boolean"],trackErrors:!0,code(t){const{gen:n,schema:r,it:s}=t;if((0,i.alwaysValidSchema)(s,r)){t.fail();return}const a=n.name("valid");t.subschema({keyword:"not",compositeRule:!0,createErrors:!1,allErrors:!1},a),t.failResult(a,()=>t.reset(),()=>t.error())},error:{message:"must NOT be valid"}};return as.default=e,as}var os={},gu;function vv(){if(gu)return os;gu=1,Object.defineProperty(os,"__esModule",{value:!0});const e={keyword:"anyOf",schemaType:"array",trackErrors:!0,code:sn().validateUnion,error:{message:"must match a schema in anyOf"}};return os.default=e,os}var cs={},vu;function yv(){if(vu)return cs;vu=1,Object.defineProperty(cs,"__esModule",{value:!0});const i=Be(),e=Xe(),n={keyword:"oneOf",schemaType:"array",trackErrors:!0,error:{message:"must match exactly one schema in oneOf",params:({params:r})=>(0,i._)`{passingSchemas: ${r.passing}}`},code(r){const{gen:s,schema:a,parentSchema:o,it:c}=r;if(!Array.isArray(a))throw new Error("ajv implementation error");if(c.opts.discriminator&&o.discriminator)return;const l=a,u=s.let("valid",!1),h=s.let("passing",null),p=s.name("_valid");r.setParams({passing:h}),s.block(m),r.result(u,()=>r.reset(),()=>r.error(!0));function m(){l.forEach((g,M)=>{let f;(0,e.alwaysValidSchema)(c,g)?s.var(p,!0):f=r.subschema({keyword:"oneOf",schemaProp:M,compositeRule:!0},p),M>0&&s.if((0,i._)`${p} && ${u}`).assign(u,!1).assign(h,(0,i._)`[${h}, ${M}]`).else(),s.if(p,()=>{s.assign(u,!0),s.assign(h,M),f&&r.mergeEvaluated(f,i.Name)})})}}};return cs.default=n,cs}var ls={},yu;function xv(){if(yu)return ls;yu=1,Object.defineProperty(ls,"__esModule",{value:!0});const i=Xe(),e={keyword:"allOf",schemaType:"array",code(t){const{gen:n,schema:r,it:s}=t;if(!Array.isArray(r))throw new Error("ajv implementation error");const a=n.name("valid");r.forEach((o,c)=>{if((0,i.alwaysValidSchema)(s,o))return;const l=t.subschema({keyword:"allOf",schemaProp:c},a);t.ok(a),t.mergeEvaluated(l)})}};return ls.default=e,ls}var us={},xu;function Sv(){if(xu)return us;xu=1,Object.defineProperty(us,"__esModule",{value:!0});const i=Be(),e=Xe(),n={keyword:"if",schemaType:["object","boolean"],trackErrors:!0,error:{message:({params:s})=>(0,i.str)`must match "${s.ifClause}" schema`,params:({params:s})=>(0,i._)`{failingKeyword: ${s.ifClause}}`},code(s){const{gen:a,parentSchema:o,it:c}=s;o.then===void 0&&o.else===void 0&&(0,e.checkStrictMode)(c,'"if" without "then" and "else" is ignored');const l=r(c,"then"),u=r(c,"else");if(!l&&!u)return;const h=a.let("valid",!0),p=a.name("_valid");if(m(),s.reset(),l&&u){const M=a.let("ifClause");s.setParams({ifClause:M}),a.if(p,g("then",M),g("else",M))}else l?a.if(p,g("then")):a.if((0,i.not)(p),g("else"));s.pass(h,()=>s.error(!0));function m(){const M=s.subschema({keyword:"if",compositeRule:!0,createErrors:!1,allErrors:!1},p);s.mergeEvaluated(M)}function g(M,f){return()=>{const d=s.subschema({keyword:M},p);a.assign(h,p),s.mergeValidEvaluated(d,h),f?a.assign(f,(0,i._)`${M}`):s.setParams({ifClause:M})}}}};function r(s,a){const o=s.schema[a];return o!==void 0&&!(0,e.alwaysValidSchema)(s,o)}return us.default=n,us}var ds={},Su;function Mv(){if(Su)return ds;Su=1,Object.defineProperty(ds,"__esModule",{value:!0});const i=Xe(),e={keyword:["then","else"],schemaType:["object","boolean"],code({keyword:t,parentSchema:n,it:r}){n.if===void 0&&(0,i.checkStrictMode)(r,`"${t}" without "if" is ignored`)}};return ds.default=e,ds}var Mu;function kd(){if(Mu)return Jr;Mu=1,Object.defineProperty(Jr,"__esModule",{value:!0});const i=Ud(),e=dv(),t=Od(),n=hv(),r=fv(),s=tc(),a=pv(),o=Fd(),c=mv(),l=_v(),u=gv(),h=vv(),p=yv(),m=xv(),g=Sv(),M=Mv();function f(d=!1){const _=[u.default,h.default,p.default,m.default,g.default,M.default,a.default,o.default,s.default,c.default,l.default];return d?_.push(e.default,n.default):_.push(i.default,t.default),_.push(r.default),_}return Jr.default=f,Jr}var hs={},Ei={},Eu;function $d(){if(Eu)return Ei;Eu=1,Object.defineProperty(Ei,"__esModule",{value:!0}),Ei.dynamicAnchor=void 0;const i=Be(),e=rn(),t=Zs(),n=Qo(),r={keyword:"$dynamicAnchor",schemaType:"string",code:o=>s(o,o.schema)};function s(o,c){const{gen:l,it:u}=o;u.schemaEnv.root.dynamicAnchors[c]=!0;const h=(0,i._)`${e.default.dynamicAnchors}${(0,i.getProperty)(c)}`,p=u.errSchemaPath==="#"?u.validateName:a(o);l.if((0,i._)`!${h}`,()=>l.assign(h,p))}Ei.dynamicAnchor=s;function a(o){const{schemaEnv:c,schema:l,self:u}=o.it,{root:h,baseId:p,localRefs:m,meta:g}=c.root,{schemaId:M}=u.opts,f=new t.SchemaEnv({schema:l,schemaId:M,root:h,baseId:p,localRefs:m,meta:g});return t.compileSchema.call(u,f),(0,n.getValidate)(o,f)}return Ei.default=r,Ei}var bi={},bu;function Bd(){if(bu)return bi;bu=1,Object.defineProperty(bi,"__esModule",{value:!0}),bi.dynamicRef=void 0;const i=Be(),e=rn(),t=Qo(),n={keyword:"$dynamicRef",schemaType:"string",code:s=>r(s,s.schema)};function r(s,a){const{gen:o,keyword:c,it:l}=s;if(a[0]!=="#")throw new Error(`"${c}" only supports hash fragment reference`);const u=a.slice(1);if(l.allErrors)h();else{const m=o.let("valid",!1);h(m),s.ok(m)}function h(m){if(l.schemaEnv.root.dynamicAnchors[u]){const g=o.let("_v",(0,i._)`${e.default.dynamicAnchors}${(0,i.getProperty)(u)}`);o.if(g,p(g,m),p(l.validateName,m))}else p(l.validateName,m)()}function p(m,g){return g?()=>o.block(()=>{(0,t.callRef)(s,m),o.let(g,!0)}):()=>(0,t.callRef)(s,m)}}return bi.dynamicRef=r,bi.default=n,bi}var fs={},wu;function Ev(){if(wu)return fs;wu=1,Object.defineProperty(fs,"__esModule",{value:!0});const i=$d(),e=Xe(),t={keyword:"$recursiveAnchor",schemaType:"boolean",code(n){n.schema?(0,i.dynamicAnchor)(n,""):(0,e.checkStrictMode)(n.it,"$recursiveAnchor: false is ignored")}};return fs.default=t,fs}var ps={},Tu;function bv(){if(Tu)return ps;Tu=1,Object.defineProperty(ps,"__esModule",{value:!0});const i=Bd(),e={keyword:"$recursiveRef",schemaType:"string",code:t=>(0,i.dynamicRef)(t,t.schema)};return ps.default=e,ps}var Au;function wv(){if(Au)return hs;Au=1,Object.defineProperty(hs,"__esModule",{value:!0});const i=$d(),e=Bd(),t=Ev(),n=bv(),r=[i.default,e.default,t.default,n.default];return hs.default=r,hs}var ms={},_s={},Ru;function Tv(){if(Ru)return _s;Ru=1,Object.defineProperty(_s,"__esModule",{value:!0});const i=tc(),e={keyword:"dependentRequired",type:"object",schemaType:"object",error:i.error,code:t=>(0,i.validatePropertyDeps)(t)};return _s.default=e,_s}var gs={},Pu;function Av(){if(Pu)return gs;Pu=1,Object.defineProperty(gs,"__esModule",{value:!0});const i=tc(),e={keyword:"dependentSchemas",type:"object",schemaType:"object",code:t=>(0,i.validateSchemaDeps)(t)};return gs.default=e,gs}var vs={},Cu;function Rv(){if(Cu)return vs;Cu=1,Object.defineProperty(vs,"__esModule",{value:!0});const i=Xe(),e={keyword:["maxContains","minContains"],type:"array",schemaType:"number",code({keyword:t,parentSchema:n,it:r}){n.contains===void 0&&(0,i.checkStrictMode)(r,`"${t}" without "contains" is ignored`)}};return vs.default=e,vs}var Du;function Pv(){if(Du)return ms;Du=1,Object.defineProperty(ms,"__esModule",{value:!0});const i=Tv(),e=Av(),t=Rv(),n=[i.default,e.default,t.default];return ms.default=n,ms}var ys={},xs={},Iu;function Cv(){if(Iu)return xs;Iu=1,Object.defineProperty(xs,"__esModule",{value:!0});const i=Be(),e=Xe(),t=rn(),r={keyword:"unevaluatedProperties",type:"object",schemaType:["boolean","object"],trackErrors:!0,error:{message:"must NOT have unevaluated properties",params:({params:s})=>(0,i._)`{unevaluatedProperty: ${s.unevaluatedProperty}}`},code(s){const{gen:a,schema:o,data:c,errsCount:l,it:u}=s;if(!l)throw new Error("ajv implementation error");const{allErrors:h,props:p}=u;p instanceof i.Name?a.if((0,i._)`${p} !== true`,()=>a.forIn("key",c,f=>a.if(g(p,f),()=>m(f)))):p!==!0&&a.forIn("key",c,f=>p===void 0?m(f):a.if(M(p,f),()=>m(f))),u.props=!0,s.ok((0,i._)`${l} === ${t.default.errors}`);function m(f){if(o===!1){s.setParams({unevaluatedProperty:f}),s.error(),h||a.break();return}if(!(0,e.alwaysValidSchema)(u,o)){const d=a.name("valid");s.subschema({keyword:"unevaluatedProperties",dataProp:f,dataPropType:e.Type.Str},d),h||a.if((0,i.not)(d),()=>a.break())}}function g(f,d){return(0,i._)`!${f} || !${f}[${d}]`}function M(f,d){const _=[];for(const v in f)f[v]===!0&&_.push((0,i._)`${d} !== ${v}`);return(0,i.and)(..._)}}};return xs.default=r,xs}var Ss={},Lu;function Dv(){if(Lu)return Ss;Lu=1,Object.defineProperty(Ss,"__esModule",{value:!0});const i=Be(),e=Xe(),n={keyword:"unevaluatedItems",type:"array",schemaType:["boolean","object"],error:{message:({params:{len:r}})=>(0,i.str)`must NOT have more than ${r} items`,params:({params:{len:r}})=>(0,i._)`{limit: ${r}}`},code(r){const{gen:s,schema:a,data:o,it:c}=r,l=c.items||0;if(l===!0)return;const u=s.const("len",(0,i._)`${o}.length`);if(a===!1)r.setParams({len:l}),r.fail((0,i._)`${u} > ${l}`);else if(typeof a=="object"&&!(0,e.alwaysValidSchema)(c,a)){const p=s.var("valid",(0,i._)`${u} <= ${l}`);s.if((0,i.not)(p),()=>h(p,l)),r.ok(p)}c.items=!0;function h(p,m){s.forRange("i",m,u,g=>{r.subschema({keyword:"unevaluatedItems",dataProp:g,dataPropType:e.Type.Num},p),c.allErrors||s.if((0,i.not)(p),()=>s.break())})}}};return Ss.default=n,Ss}var Nu;function Iv(){if(Nu)return ys;Nu=1,Object.defineProperty(ys,"__esModule",{value:!0});const i=Cv(),e=Dv(),t=[i.default,e.default];return ys.default=t,ys}var Ms={},Es={},Uu;function Lv(){if(Uu)return Es;Uu=1,Object.defineProperty(Es,"__esModule",{value:!0});const i=Be(),t={keyword:"format",type:["number","string"],schemaType:"string",$data:!0,error:{message:({schemaCode:n})=>(0,i.str)`must match format "${n}"`,params:({schemaCode:n})=>(0,i._)`{format: ${n}}`},code(n,r){const{gen:s,data:a,$data:o,schema:c,schemaCode:l,it:u}=n,{opts:h,errSchemaPath:p,schemaEnv:m,self:g}=u;if(!h.validateFormats)return;o?M():f();function M(){const d=s.scopeValue("formats",{ref:g.formats,code:h.code.formats}),_=s.const("fDef",(0,i._)`${d}[${l}]`),v=s.let("fType"),y=s.let("format");s.if((0,i._)`typeof ${_} == "object" && !(${_} instanceof RegExp)`,()=>s.assign(v,(0,i._)`${_}.type || "string"`).assign(y,(0,i._)`${_}.validate`),()=>s.assign(v,(0,i._)`"string"`).assign(y,_)),n.fail$data((0,i.or)(x(),E()));function x(){return h.strictSchema===!1?i.nil:(0,i._)`${l} && !${y}`}function E(){const b=m.$async?(0,i._)`(${_}.async ? await ${y}(${a}) : ${y}(${a}))`:(0,i._)`${y}(${a})`,I=(0,i._)`(typeof ${y} == "function" ? ${b} : ${y}.test(${a}))`;return(0,i._)`${y} && ${y} !== true && ${v} === ${r} && !${I}`}}function f(){const d=g.formats[c];if(!d){x();return}if(d===!0)return;const[_,v,y]=E(d);_===r&&n.pass(b());function x(){if(h.strictSchema===!1){g.logger.warn(I());return}throw new Error(I());function I(){return`unknown format "${c}" ignored in schema at path "${p}"`}}function E(I){const A=I instanceof RegExp?(0,i.regexpCode)(I):h.code.formats?(0,i._)`${h.code.formats}${(0,i.getProperty)(c)}`:void 0,w=s.scopeValue("formats",{key:c,ref:I,code:A});return typeof I=="object"&&!(I instanceof RegExp)?[I.type||"string",I.validate,(0,i._)`${w}.validate`]:["string",I,w]}function b(){if(typeof d=="object"&&!(d instanceof RegExp)&&d.async){if(!m.$async)throw new Error("async format in sync schema");return(0,i._)`await ${y}(${a})`}return typeof v=="function"?(0,i._)`${y}(${a})`:(0,i._)`${y}.test(${a})`}}}};return Es.default=t,Es}var Ou;function zd(){if(Ou)return Ms;Ou=1,Object.defineProperty(Ms,"__esModule",{value:!0});const e=[Lv().default];return Ms.default=e,Ms}var Yn={},Fu;function Hd(){return Fu||(Fu=1,Object.defineProperty(Yn,"__esModule",{value:!0}),Yn.contentVocabulary=Yn.metadataVocabulary=void 0,Yn.metadataVocabulary=["title","description","default","deprecated","readOnly","writeOnly","examples"],Yn.contentVocabulary=["contentMediaType","contentEncoding","contentSchema"]),Yn}var ku;function Nv(){if(ku)return Or;ku=1,Object.defineProperty(Or,"__esModule",{value:!0});const i=Ld(),e=Nd(),t=kd(),n=wv(),r=Pv(),s=Iv(),a=zd(),o=Hd(),c=[n.default,i.default,e.default,(0,t.default)(!0),a.default,o.metadataVocabulary,o.contentVocabulary,r.default,s.default];return Or.default=c,Or}var bs={},Ki={},$u;function Uv(){if($u)return Ki;$u=1,Object.defineProperty(Ki,"__esModule",{value:!0}),Ki.DiscrError=void 0;var i;return(function(e){e.Tag="tag",e.Mapping="mapping"})(i||(Ki.DiscrError=i={})),Ki}var Bu;function Vd(){if(Bu)return bs;Bu=1,Object.defineProperty(bs,"__esModule",{value:!0});const i=Be(),e=Uv(),t=Zs(),n=rr(),r=Xe(),a={keyword:"discriminator",type:"object",schemaType:"object",error:{message:({params:{discrError:o,tagName:c}})=>o===e.DiscrError.Tag?`tag "${c}" must be string`:`value of tag "${c}" must be in oneOf`,params:({params:{discrError:o,tag:c,tagName:l}})=>(0,i._)`{error: ${o}, tag: ${l}, tagValue: ${c}}`},code(o){const{gen:c,data:l,schema:u,parentSchema:h,it:p}=o,{oneOf:m}=h;if(!p.opts.discriminator)throw new Error("discriminator: requires discriminator option");const g=u.propertyName;if(typeof g!="string")throw new Error("discriminator: requires propertyName");if(u.mapping)throw new Error("discriminator: mapping is not supported");if(!m)throw new Error("discriminator: requires oneOf keyword");const M=c.let("valid",!1),f=c.const("tag",(0,i._)`${l}${(0,i.getProperty)(g)}`);c.if((0,i._)`typeof ${f} == "string"`,()=>d(),()=>o.error(!1,{discrError:e.DiscrError.Tag,tag:f,tagName:g})),o.ok(M);function d(){const y=v();c.if(!1);for(const x in y)c.elseIf((0,i._)`${f} === ${x}`),c.assign(M,_(y[x]));c.else(),o.error(!1,{discrError:e.DiscrError.Mapping,tag:f,tagName:g}),c.endIf()}function _(y){const x=c.name("valid"),E=o.subschema({keyword:"oneOf",schemaProp:y},x);return o.mergeEvaluated(E,i.Name),x}function v(){var y;const x={},E=I(h);let b=!0;for(let U=0;U<m.length;U++){let $=m[U];if($?.$ref&&!(0,r.schemaHasRulesButRef)($,p.self.RULES)){const H=$.$ref;if($=t.resolveRef.call(p.self,p.schemaEnv.root,p.baseId,H),$ instanceof t.SchemaEnv&&($=$.schema),$===void 0)throw new n.default(p.opts.uriResolver,p.baseId,H)}const B=(y=$?.properties)===null||y===void 0?void 0:y[g];if(typeof B!="object")throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${g}"`);b=b&&(E||I($)),A(B,U)}if(!b)throw new Error(`discriminator: "${g}" must be required`);return x;function I({required:U}){return Array.isArray(U)&&U.includes(g)}function A(U,$){if(U.const)w(U.const,$);else if(U.enum)for(const B of U.enum)w(B,$);else throw new Error(`discriminator: "properties/${g}" must have "const" or "enum"`)}function w(U,$){if(typeof U!="string"||U in x)throw new Error(`discriminator: "${g}" values must be unique strings`);x[U]=$}}}};return bs.default=a,bs}var ws={};const Ov="https://json-schema.org/draft/2020-12/schema",Fv="https://json-schema.org/draft/2020-12/schema",kv={"https://json-schema.org/draft/2020-12/vocab/core":!0,"https://json-schema.org/draft/2020-12/vocab/applicator":!0,"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0,"https://json-schema.org/draft/2020-12/vocab/validation":!0,"https://json-schema.org/draft/2020-12/vocab/meta-data":!0,"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0,"https://json-schema.org/draft/2020-12/vocab/content":!0},$v="meta",Bv="Core and Validation specifications meta-schema",zv=[{$ref:"meta/core"},{$ref:"meta/applicator"},{$ref:"meta/unevaluated"},{$ref:"meta/validation"},{$ref:"meta/meta-data"},{$ref:"meta/format-annotation"},{$ref:"meta/content"}],Hv=["object","boolean"],Vv="This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",Gv={definitions:{$comment:'"definitions" has been replaced by "$defs".',type:"object",additionalProperties:{$dynamicRef:"#meta"},deprecated:!0,default:{}},dependencies:{$comment:'"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',type:"object",additionalProperties:{anyOf:[{$dynamicRef:"#meta"},{$ref:"meta/validation#/$defs/stringArray"}]},deprecated:!0,default:{}},$recursiveAnchor:{$comment:'"$recursiveAnchor" has been replaced by "$dynamicAnchor".',$ref:"meta/core#/$defs/anchorString",deprecated:!0},$recursiveRef:{$comment:'"$recursiveRef" has been replaced by "$dynamicRef".',$ref:"meta/core#/$defs/uriReferenceString",deprecated:!0}},Wv={$schema:Ov,$id:Fv,$vocabulary:kv,$dynamicAnchor:$v,title:Bv,allOf:zv,type:Hv,$comment:Vv,properties:Gv},qv="https://json-schema.org/draft/2020-12/schema",jv="https://json-schema.org/draft/2020-12/meta/applicator",Xv={"https://json-schema.org/draft/2020-12/vocab/applicator":!0},Yv="meta",Kv="Applicator vocabulary meta-schema",Zv=["object","boolean"],Jv={prefixItems:{$ref:"#/$defs/schemaArray"},items:{$dynamicRef:"#meta"},contains:{$dynamicRef:"#meta"},additionalProperties:{$dynamicRef:"#meta"},properties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},patternProperties:{type:"object",additionalProperties:{$dynamicRef:"#meta"},propertyNames:{format:"regex"},default:{}},dependentSchemas:{type:"object",additionalProperties:{$dynamicRef:"#meta"},default:{}},propertyNames:{$dynamicRef:"#meta"},if:{$dynamicRef:"#meta"},then:{$dynamicRef:"#meta"},else:{$dynamicRef:"#meta"},allOf:{$ref:"#/$defs/schemaArray"},anyOf:{$ref:"#/$defs/schemaArray"},oneOf:{$ref:"#/$defs/schemaArray"},not:{$dynamicRef:"#meta"}},Qv={schemaArray:{type:"array",minItems:1,items:{$dynamicRef:"#meta"}}},ey={$schema:qv,$id:jv,$vocabulary:Xv,$dynamicAnchor:Yv,title:Kv,type:Zv,properties:Jv,$defs:Qv},ty="https://json-schema.org/draft/2020-12/schema",ny="https://json-schema.org/draft/2020-12/meta/unevaluated",iy={"https://json-schema.org/draft/2020-12/vocab/unevaluated":!0},ry="meta",sy="Unevaluated applicator vocabulary meta-schema",ay=["object","boolean"],oy={unevaluatedItems:{$dynamicRef:"#meta"},unevaluatedProperties:{$dynamicRef:"#meta"}},cy={$schema:ty,$id:ny,$vocabulary:iy,$dynamicAnchor:ry,title:sy,type:ay,properties:oy},ly="https://json-schema.org/draft/2020-12/schema",uy="https://json-schema.org/draft/2020-12/meta/content",dy={"https://json-schema.org/draft/2020-12/vocab/content":!0},hy="meta",fy="Content vocabulary meta-schema",py=["object","boolean"],my={contentEncoding:{type:"string"},contentMediaType:{type:"string"},contentSchema:{$dynamicRef:"#meta"}},_y={$schema:ly,$id:uy,$vocabulary:dy,$dynamicAnchor:hy,title:fy,type:py,properties:my},gy="https://json-schema.org/draft/2020-12/schema",vy="https://json-schema.org/draft/2020-12/meta/core",yy={"https://json-schema.org/draft/2020-12/vocab/core":!0},xy="meta",Sy="Core vocabulary meta-schema",My=["object","boolean"],Ey={$id:{$ref:"#/$defs/uriReferenceString",$comment:"Non-empty fragments not allowed.",pattern:"^[^#]*#?$"},$schema:{$ref:"#/$defs/uriString"},$ref:{$ref:"#/$defs/uriReferenceString"},$anchor:{$ref:"#/$defs/anchorString"},$dynamicRef:{$ref:"#/$defs/uriReferenceString"},$dynamicAnchor:{$ref:"#/$defs/anchorString"},$vocabulary:{type:"object",propertyNames:{$ref:"#/$defs/uriString"},additionalProperties:{type:"boolean"}},$comment:{type:"string"},$defs:{type:"object",additionalProperties:{$dynamicRef:"#meta"}}},by={anchorString:{type:"string",pattern:"^[A-Za-z_][-A-Za-z0-9._]*$"},uriString:{type:"string",format:"uri"},uriReferenceString:{type:"string",format:"uri-reference"}},wy={$schema:gy,$id:vy,$vocabulary:yy,$dynamicAnchor:xy,title:Sy,type:My,properties:Ey,$defs:by},Ty="https://json-schema.org/draft/2020-12/schema",Ay="https://json-schema.org/draft/2020-12/meta/format-annotation",Ry={"https://json-schema.org/draft/2020-12/vocab/format-annotation":!0},Py="meta",Cy="Format vocabulary meta-schema for annotation results",Dy=["object","boolean"],Iy={format:{type:"string"}},Ly={$schema:Ty,$id:Ay,$vocabulary:Ry,$dynamicAnchor:Py,title:Cy,type:Dy,properties:Iy},Ny="https://json-schema.org/draft/2020-12/schema",Uy="https://json-schema.org/draft/2020-12/meta/meta-data",Oy={"https://json-schema.org/draft/2020-12/vocab/meta-data":!0},Fy="meta",ky="Meta-data vocabulary meta-schema",$y=["object","boolean"],By={title:{type:"string"},description:{type:"string"},default:!0,deprecated:{type:"boolean",default:!1},readOnly:{type:"boolean",default:!1},writeOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0}},zy={$schema:Ny,$id:Uy,$vocabulary:Oy,$dynamicAnchor:Fy,title:ky,type:$y,properties:By},Hy="https://json-schema.org/draft/2020-12/schema",Vy="https://json-schema.org/draft/2020-12/meta/validation",Gy={"https://json-schema.org/draft/2020-12/vocab/validation":!0},Wy="meta",qy="Validation vocabulary meta-schema",jy=["object","boolean"],Xy={type:{anyOf:[{$ref:"#/$defs/simpleTypes"},{type:"array",items:{$ref:"#/$defs/simpleTypes"},minItems:1,uniqueItems:!0}]},const:!0,enum:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/$defs/nonNegativeInteger"},minLength:{$ref:"#/$defs/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},maxItems:{$ref:"#/$defs/nonNegativeInteger"},minItems:{$ref:"#/$defs/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},maxContains:{$ref:"#/$defs/nonNegativeInteger"},minContains:{$ref:"#/$defs/nonNegativeInteger",default:1},maxProperties:{$ref:"#/$defs/nonNegativeInteger"},minProperties:{$ref:"#/$defs/nonNegativeIntegerDefault0"},required:{$ref:"#/$defs/stringArray"},dependentRequired:{type:"object",additionalProperties:{$ref:"#/$defs/stringArray"}}},Yy={nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{$ref:"#/$defs/nonNegativeInteger",default:0},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},Ky={$schema:Hy,$id:Vy,$vocabulary:Gy,$dynamicAnchor:Wy,title:qy,type:jy,properties:Xy,$defs:Yy};var zu;function Zy(){if(zu)return ws;zu=1,Object.defineProperty(ws,"__esModule",{value:!0});const i=Wv,e=ey,t=cy,n=_y,r=wy,s=Ly,a=zy,o=Ky,c=["/properties"];function l(u){return[i,e,t,n,r,h(this,s),a,h(this,o)].forEach(p=>this.addMetaSchema(p,void 0,!1)),this;function h(p,m){return u?p.$dataMetaSchema(m,c):m}}return ws.default=l,ws}var Hu;function Jy(){return Hu||(Hu=1,(function(i,e){Object.defineProperty(e,"__esModule",{value:!0}),e.MissingRefError=e.ValidationError=e.CodeGen=e.Name=e.nil=e.stringify=e.str=e._=e.KeywordCxt=e.Ajv2020=void 0;const t=Id(),n=Nv(),r=Vd(),s=Zy(),a="https://json-schema.org/draft/2020-12/schema";class o extends t.default{constructor(m={}){super({...m,dynamicRef:!0,next:!0,unevaluated:!0})}_addVocabularies(){super._addVocabularies(),n.default.forEach(m=>this.addVocabulary(m)),this.opts.discriminator&&this.addKeyword(r.default)}_addDefaultMetaSchema(){super._addDefaultMetaSchema();const{$data:m,meta:g}=this.opts;g&&(s.default.call(this,m),this.refs["http://json-schema.org/schema"]=a)}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(a)?a:void 0)}}e.Ajv2020=o,i.exports=e=o,i.exports.Ajv2020=o,Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var c=ir();Object.defineProperty(e,"KeywordCxt",{enumerable:!0,get:function(){return c.KeywordCxt}});var l=Be();Object.defineProperty(e,"_",{enumerable:!0,get:function(){return l._}}),Object.defineProperty(e,"str",{enumerable:!0,get:function(){return l.str}}),Object.defineProperty(e,"stringify",{enumerable:!0,get:function(){return l.stringify}}),Object.defineProperty(e,"nil",{enumerable:!0,get:function(){return l.nil}}),Object.defineProperty(e,"Name",{enumerable:!0,get:function(){return l.Name}}),Object.defineProperty(e,"CodeGen",{enumerable:!0,get:function(){return l.CodeGen}});var u=Ks();Object.defineProperty(e,"ValidationError",{enumerable:!0,get:function(){return u.default}});var h=rr();Object.defineProperty(e,"MissingRefError",{enumerable:!0,get:function(){return h.default}})})(Dr,Dr.exports)),Dr.exports}var Qy=Jy();const ex=Ad(Qy);var Ts={exports:{}},za={},Vu;function tx(){return Vu||(Vu=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.formatNames=i.fastFormats=i.fullFormats=void 0;function e(U,$){return{validate:U,compare:$}}i.fullFormats={date:e(s,a),time:e(c(!0),l),"date-time":e(p(!0),m),"iso-time":e(c(),u),"iso-date-time":e(p(),g),duration:/^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,uri:d,"uri-reference":/^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,"uri-template":/^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,url:/^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,email:/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,hostname:/^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,ipv4:/^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,ipv6:/^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,regex:w,uuid:/^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,"json-pointer":/^(?:\/(?:[^~/]|~0|~1)*)*$/,"json-pointer-uri-fragment":/^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,"relative-json-pointer":/^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,byte:v,int32:{type:"number",validate:E},int64:{type:"number",validate:b},float:{type:"number",validate:I},double:{type:"number",validate:I},password:!0,binary:!0},i.fastFormats={...i.fullFormats,date:e(/^\d\d\d\d-[0-1]\d-[0-3]\d$/,a),time:e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,l),"date-time":e(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,m),"iso-time":e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,u),"iso-date-time":e(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,g),uri:/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,"uri-reference":/^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,email:/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i},i.formatNames=Object.keys(i.fullFormats);function t(U){return U%4===0&&(U%100!==0||U%400===0)}const n=/^(\d\d\d\d)-(\d\d)-(\d\d)$/,r=[0,31,28,31,30,31,30,31,31,30,31,30,31];function s(U){const $=n.exec(U);if(!$)return!1;const B=+$[1],H=+$[2],te=+$[3];return H>=1&&H<=12&&te>=1&&te<=(H===2&&t(B)?29:r[H])}function a(U,$){if(U&&$)return U>$?1:U<$?-1:0}const o=/^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;function c(U){return function(B){const H=o.exec(B);if(!H)return!1;const te=+H[1],Q=+H[2],oe=+H[3],K=H[4],de=H[5]==="-"?-1:1,R=+(H[6]||0),T=+(H[7]||0);if(R>23||T>59||U&&!K)return!1;if(te<=23&&Q<=59&&oe<60)return!0;const N=Q-T*de,P=te-R*de-(N<0?1:0);return(P===23||P===-1)&&(N===59||N===-1)&&oe<61}}function l(U,$){if(!(U&&$))return;const B=new Date("2020-01-01T"+U).valueOf(),H=new Date("2020-01-01T"+$).valueOf();if(B&&H)return B-H}function u(U,$){if(!(U&&$))return;const B=o.exec(U),H=o.exec($);if(B&&H)return U=B[1]+B[2]+B[3],$=H[1]+H[2]+H[3],U>$?1:U<$?-1:0}const h=/t|\s/i;function p(U){const $=c(U);return function(H){const te=H.split(h);return te.length===2&&s(te[0])&&$(te[1])}}function m(U,$){if(!(U&&$))return;const B=new Date(U).valueOf(),H=new Date($).valueOf();if(B&&H)return B-H}function g(U,$){if(!(U&&$))return;const[B,H]=U.split(h),[te,Q]=$.split(h),oe=a(B,te);if(oe!==void 0)return oe||l(H,Q)}const M=/\/|:/,f=/^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;function d(U){return M.test(U)&&f.test(U)}const _=/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;function v(U){return _.lastIndex=0,_.test(U)}const y=-2147483648,x=2**31-1;function E(U){return Number.isInteger(U)&&U<=x&&U>=y}function b(U){return Number.isInteger(U)}function I(){return!0}const A=/[^\\]\\Z/;function w(U){if(A.test(U))return!1;try{return new RegExp(U),!0}catch{return!1}}})(za)),za}var Ha={},As={exports:{}},Rs={},Gu;function nx(){if(Gu)return Rs;Gu=1,Object.defineProperty(Rs,"__esModule",{value:!0});const i=Ld(),e=Nd(),t=kd(),n=zd(),r=Hd(),s=[i.default,e.default,(0,t.default)(),n.default,r.metadataVocabulary,r.contentVocabulary];return Rs.default=s,Rs}const ix="http://json-schema.org/draft-07/schema#",rx="http://json-schema.org/draft-07/schema#",sx="Core schema meta-schema",ax={schemaArray:{type:"array",minItems:1,items:{$ref:"#"}},nonNegativeInteger:{type:"integer",minimum:0},nonNegativeIntegerDefault0:{allOf:[{$ref:"#/definitions/nonNegativeInteger"},{default:0}]},simpleTypes:{enum:["array","boolean","integer","null","number","object","string"]},stringArray:{type:"array",items:{type:"string"},uniqueItems:!0,default:[]}},ox=["object","boolean"],cx={$id:{type:"string",format:"uri-reference"},$schema:{type:"string",format:"uri"},$ref:{type:"string",format:"uri-reference"},$comment:{type:"string"},title:{type:"string"},description:{type:"string"},default:!0,readOnly:{type:"boolean",default:!1},examples:{type:"array",items:!0},multipleOf:{type:"number",exclusiveMinimum:0},maximum:{type:"number"},exclusiveMaximum:{type:"number"},minimum:{type:"number"},exclusiveMinimum:{type:"number"},maxLength:{$ref:"#/definitions/nonNegativeInteger"},minLength:{$ref:"#/definitions/nonNegativeIntegerDefault0"},pattern:{type:"string",format:"regex"},additionalItems:{$ref:"#"},items:{anyOf:[{$ref:"#"},{$ref:"#/definitions/schemaArray"}],default:!0},maxItems:{$ref:"#/definitions/nonNegativeInteger"},minItems:{$ref:"#/definitions/nonNegativeIntegerDefault0"},uniqueItems:{type:"boolean",default:!1},contains:{$ref:"#"},maxProperties:{$ref:"#/definitions/nonNegativeInteger"},minProperties:{$ref:"#/definitions/nonNegativeIntegerDefault0"},required:{$ref:"#/definitions/stringArray"},additionalProperties:{$ref:"#"},definitions:{type:"object",additionalProperties:{$ref:"#"},default:{}},properties:{type:"object",additionalProperties:{$ref:"#"},default:{}},patternProperties:{type:"object",additionalProperties:{$ref:"#"},propertyNames:{format:"regex"},default:{}},dependencies:{type:"object",additionalProperties:{anyOf:[{$ref:"#"},{$ref:"#/definitions/stringArray"}]}},propertyNames:{$ref:"#"},const:!0,enum:{type:"array",items:!0,minItems:1,uniqueItems:!0},type:{anyOf:[{$ref:"#/definitions/simpleTypes"},{type:"array",items:{$ref:"#/definitions/simpleTypes"},minItems:1,uniqueItems:!0}]},format:{type:"string"},contentMediaType:{type:"string"},contentEncoding:{type:"string"},if:{$ref:"#"},then:{$ref:"#"},else:{$ref:"#"},allOf:{$ref:"#/definitions/schemaArray"},anyOf:{$ref:"#/definitions/schemaArray"},oneOf:{$ref:"#/definitions/schemaArray"},not:{$ref:"#"}},lx={$schema:ix,$id:rx,title:sx,definitions:ax,type:ox,properties:cx,default:!0};var Wu;function ux(){return Wu||(Wu=1,(function(i,e){Object.defineProperty(e,"__esModule",{value:!0}),e.MissingRefError=e.ValidationError=e.CodeGen=e.Name=e.nil=e.stringify=e.str=e._=e.KeywordCxt=e.Ajv=void 0;const t=Id(),n=nx(),r=Vd(),s=lx,a=["/properties"],o="http://json-schema.org/draft-07/schema";class c extends t.default{_addVocabularies(){super._addVocabularies(),n.default.forEach(g=>this.addVocabulary(g)),this.opts.discriminator&&this.addKeyword(r.default)}_addDefaultMetaSchema(){if(super._addDefaultMetaSchema(),!this.opts.meta)return;const g=this.opts.$data?this.$dataMetaSchema(s,a):s;this.addMetaSchema(g,o,!1),this.refs["http://json-schema.org/schema"]=o}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(o)?o:void 0)}}e.Ajv=c,i.exports=e=c,i.exports.Ajv=c,Object.defineProperty(e,"__esModule",{value:!0}),e.default=c;var l=ir();Object.defineProperty(e,"KeywordCxt",{enumerable:!0,get:function(){return l.KeywordCxt}});var u=Be();Object.defineProperty(e,"_",{enumerable:!0,get:function(){return u._}}),Object.defineProperty(e,"str",{enumerable:!0,get:function(){return u.str}}),Object.defineProperty(e,"stringify",{enumerable:!0,get:function(){return u.stringify}}),Object.defineProperty(e,"nil",{enumerable:!0,get:function(){return u.nil}}),Object.defineProperty(e,"Name",{enumerable:!0,get:function(){return u.Name}}),Object.defineProperty(e,"CodeGen",{enumerable:!0,get:function(){return u.CodeGen}});var h=Ks();Object.defineProperty(e,"ValidationError",{enumerable:!0,get:function(){return h.default}});var p=rr();Object.defineProperty(e,"MissingRefError",{enumerable:!0,get:function(){return p.default}})})(As,As.exports)),As.exports}var qu;function dx(){return qu||(qu=1,(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.formatLimitDefinition=void 0;const e=ux(),t=Be(),n=t.operators,r={formatMaximum:{okStr:"<=",ok:n.LTE,fail:n.GT},formatMinimum:{okStr:">=",ok:n.GTE,fail:n.LT},formatExclusiveMaximum:{okStr:"<",ok:n.LT,fail:n.GTE},formatExclusiveMinimum:{okStr:">",ok:n.GT,fail:n.LTE}},s={message:({keyword:o,schemaCode:c})=>(0,t.str)`should be ${r[o].okStr} ${c}`,params:({keyword:o,schemaCode:c})=>(0,t._)`{comparison: ${r[o].okStr}, limit: ${c}}`};i.formatLimitDefinition={keyword:Object.keys(r),type:"string",schemaType:"string",$data:!0,error:s,code(o){const{gen:c,data:l,schemaCode:u,keyword:h,it:p}=o,{opts:m,self:g}=p;if(!m.validateFormats)return;const M=new e.KeywordCxt(p,g.RULES.all.format.definition,"format");M.$data?f():d();function f(){const v=c.scopeValue("formats",{ref:g.formats,code:m.code.formats}),y=c.const("fmt",(0,t._)`${v}[${M.schemaCode}]`);o.fail$data((0,t.or)((0,t._)`typeof ${y} != "object"`,(0,t._)`${y} instanceof RegExp`,(0,t._)`typeof ${y}.compare != "function"`,_(y)))}function d(){const v=M.schema,y=g.formats[v];if(!y||y===!0)return;if(typeof y!="object"||y instanceof RegExp||typeof y.compare!="function")throw new Error(`"${h}": format "${v}" does not define "compare" function`);const x=c.scopeValue("formats",{key:v,ref:y,code:m.code.formats?(0,t._)`${m.code.formats}${(0,t.getProperty)(v)}`:void 0});o.fail$data(_(x))}function _(v){return(0,t._)`${v}.compare(${l}, ${u}) ${r[h].fail} 0`}},dependencies:["format"]};const a=o=>(o.addKeyword(i.formatLimitDefinition),o);i.default=a})(Ha)),Ha}var ju;function hx(){return ju||(ju=1,(function(i,e){Object.defineProperty(e,"__esModule",{value:!0});const t=tx(),n=dx(),r=Be(),s=new r.Name("fullFormats"),a=new r.Name("fastFormats"),o=(l,u={keywords:!0})=>{if(Array.isArray(u))return c(l,u,t.fullFormats,s),l;const[h,p]=u.mode==="fast"?[t.fastFormats,a]:[t.fullFormats,s],m=u.formats||t.formatNames;return c(l,m,h,p),u.keywords&&(0,n.default)(l),l};o.get=(l,u="full")=>{const p=(u==="fast"?t.fastFormats:t.fullFormats)[l];if(!p)throw new Error(`Unknown format "${l}"`);return p};function c(l,u,h,p){var m,g;(m=(g=l.opts.code).formats)!==null&&m!==void 0||(g.formats=(0,r._)`require("ajv-formats/dist/formats").${p}`);for(const M of u)l.addFormat(M,h[M])}i.exports=e=o,Object.defineProperty(e,"__esModule",{value:!0}),e.default=o})(Ts,Ts.exports)),Ts.exports}var fx=hx();const px=Ad(fx);class mx{constructor(){this.ajv=new ex({allErrors:!0,strict:!1}),px(this.ajv),this.telemetrySchema=null,this.alertSchema=null,this.feedbackSchema=null,this.telemetryValidate=null,this.alertValidate=null,this.feedbackValidate=null,this.initSchemas()}initSchemas(){this.telemetrySchema={$schema:"https://json-schema.org/draft/2020-12/schema",type:"object",required:["schema_version","node_id","lgd_gp_code","scheme_id","ts","seq","type","values","battery_v","rssi_dbm","fw"],properties:{schema_version:{type:"string",const:"1.0"},node_id:{type:"string",pattern:"^JS-[A-Z]{2}-[0-9]+-N[0-9]{3}$"},lgd_gp_code:{oneOf:[{type:"string",pattern:"^[0-9]{4,8}$"},{type:"integer",minimum:1e3,maximum:99999999}]},scheme_id:{type:"string",pattern:"^SCH-[A-Z]{2}-[0-9A-Z_]+$"},ts:{type:"string",format:"date-time"},seq:{type:"integer",minimum:0},type:{type:"string",enum:["pump","esr_level","flow","pressure","quality"]},values:{type:"object"},battery_v:{type:"number",minimum:2,maximum:16},rssi_dbm:{type:"integer",minimum:-140,maximum:0},fw:{type:"string",pattern:"^v?[0-9]+\\.[0-9]+\\.[0-9]+(-[a-zA-Z0-9.]+)?$"}},allOf:[{if:{properties:{type:{const:"pump"}}},then:{properties:{values:{type:"object",required:["current_a","voltage_v"],properties:{current_a:{type:"number",minimum:0,maximum:200},voltage_v:{type:"number",minimum:0,maximum:600},state:{type:"integer",enum:[0,1]},frequency_hz:{type:"number",minimum:0,maximum:70}},additionalProperties:!1}}}},{if:{properties:{type:{const:"esr_level"}}},then:{properties:{values:{type:"object",required:["level_cm"],properties:{level_cm:{type:"number",minimum:0,maximum:3e3},level_pct:{type:"number",minimum:0,maximum:100}},additionalProperties:!1}}}},{if:{properties:{type:{const:"flow"}}},then:{properties:{values:{type:"object",required:["flow_lpm"],properties:{flow_lpm:{type:"number",minimum:0,maximum:2e4},totalizer_l:{type:"number",minimum:0}},additionalProperties:!1}}}},{if:{properties:{type:{const:"pressure"}}},then:{properties:{values:{type:"object",required:["pressure_kpa"],properties:{pressure_kpa:{type:"number",minimum:0,maximum:2500}},additionalProperties:!1}}}},{if:{properties:{type:{const:"quality"}}},then:{properties:{values:{type:"object",required:["turbidity_ntu","chlorine_mgl"],properties:{turbidity_ntu:{type:"number",minimum:0,maximum:200},chlorine_mgl:{type:"number",minimum:0,maximum:15},ph:{type:"number",minimum:0,maximum:14},tds_ppm:{type:"number",minimum:0,maximum:5e3}},additionalProperties:!1}}}}],additionalProperties:!1},this.alertSchema={$schema:"https://json-schema.org/draft/2020-12/schema",type:"object",required:["alert_id","type","severity","scope","reason","created_ts","status"],properties:{alert_id:{type:"string",pattern:"^ALT-[A-Za-z0-9_-]+$"},type:{type:"string",enum:["no_supply","low_pressure","leakage","quality","node_offline","chronic_nonfunctional"]},severity:{type:"string",enum:["low","medium","high"]},scope:{type:"object",required:["gp","branch"],properties:{gp:{oneOf:[{type:"string",pattern:"^[0-9]{4,8}$"},{type:"integer",minimum:1e3,maximum:99999999}]},branch:{type:"string",minLength:1,maxLength:100},fhtc_id:{type:"string",pattern:"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$"}},additionalProperties:!1},reason:{type:"string",minLength:5,maxLength:500},created_ts:{type:"string",format:"date-time"},status:{type:"string",enum:["active","acknowledged","resolved"]}},additionalProperties:!1},this.feedbackSchema={$schema:"https://json-schema.org/draft/2020-12/schema",type:"object",required:["feedback_id","fhtc_id","channel","category","lang","ts"],properties:{feedback_id:{type:"string",pattern:"^FB-[A-Za-z0-9_-]+$"},fhtc_id:{type:"string",pattern:"^FHTC-[A-Z]{2}-[0-9]+-[0-9]{4,}$"},channel:{type:"string",enum:["app","qr","whatsapp","ivr"]},category:{type:"string",enum:["no_water","low_pressure","dirty_water","leakage","other"]},text:{type:"string",maxLength:1e3},photo_url:{type:"string",format:"uri"},lat:{type:"number",minimum:-90,maximum:90},lon:{type:"number",minimum:-180,maximum:180},lang:{type:"string",pattern:"^[a-z]{2}(-[A-Z]{2})?$"},ts:{type:"string",format:"date-time"}},additionalProperties:!1},this.telemetryValidate=this.ajv.compile(this.telemetrySchema),this.alertValidate=this.ajv.compile(this.alertSchema),this.feedbackValidate=this.ajv.compile(this.feedbackSchema)}validateTelemetry(e){return{valid:!!this.telemetryValidate(e),errors:this.telemetryValidate.errors||[]}}validateAlert(e){const t={alert_id:e.alert_id,type:e.type,severity:e.severity,scope:{gp:e.scope.gp,branch:e.scope.branch,...e.scope.fhtc_id?{fhtc_id:e.scope.fhtc_id}:{}},reason:e.reason,created_ts:e.created_ts,status:e.status};return{valid:!!this.alertValidate(t),errors:this.alertValidate.errors||[]}}validateFeedback(e){const t={feedback_id:e.feedback_id,fhtc_id:e.fhtc_id,channel:e.channel,category:e.category,lang:e.lang,ts:e.ts,...e.text?{text:e.text}:{},...e.lat?{lat:e.lat}:{},...e.lon?{lon:e.lon}:{}};return{valid:!!this.feedbackValidate(t),errors:this.feedbackValidate.errors||[]}}}class _x{constructor(e={}){this.brokerUrl=e.brokerUrl||hl.broker_url,this.topicPrefix=e.topicPrefix||hl.topic_prefix,this.connected=!1,this.ws=null,this.buffer=[],this.maxBufferSize=200,this.isMockMode=!1,this.onStatusChange=e.onStatusChange||(()=>{}),this.connect()}connect(){if(typeof window>"u"||typeof WebSocket>"u"){this.isMockMode=!0,this.onStatusChange("Mock Mode (Offline)",!1);return}try{this.ws=new WebSocket(this.brokerUrl,["mqtt"]),this.ws.binaryType="arraybuffer",this.ws.onopen=()=>{this.connected=!0,this.isMockMode=!1,this.onStatusChange("Connected (Live MQTT/WS)",!0),this.flushBuffer()},this.ws.onclose=()=>{this.connected=!1,this.isMockMode=!0,this.onStatusChange("Disconnected (Mock Mode Active)",!1)},this.ws.onerror=()=>{this.connected=!1,this.isMockMode=!0,this.onStatusChange("Broker Error (Mock Mode Active)",!1)}}catch{this.connected=!1,this.isMockMode=!0,this.onStatusChange("Offline (Mock Mode Active)",!1)}}publishTelemetry(e){const t=`${this.topicPrefix}/${e.lgd_gp_code}/${e.node_id}/telemetry`,n=JSON.stringify(e);if(this.connected&&this.ws&&this.ws.readyState===WebSocket.OPEN)try{this.ws.send(n)}catch{this.bufferPacket(t,n)}else this.bufferPacket(t,n);typeof window<"u"&&typeof fetch=="function"&&fetch("/api/v1/telemetry/ingest",{method:"POST",headers:{"Content-Type":"application/json"},body:n}).catch(()=>{})}bufferPacket(e,t){this.buffer.push({topic:e,payload:t,timestamp:Date.now()}),this.buffer.length>this.maxBufferSize&&this.buffer.shift()}flushBuffer(){if(this.connected&&this.ws&&this.ws.readyState===WebSocket.OPEN)for(;this.buffer.length>0;){const e=this.buffer.shift();try{this.ws.send(e.payload)}catch{break}}}getBufferedCount(){return this.buffer.length}}function gx(i,e){if(typeof window>"u"||typeof document>"u")return;const t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),s=document.createElement("a");s.href=r,s.download=i,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)}function vx({telemetryHistory:i=[],alertsHistory:e=[],feedbackLog:t=[]}){const n={export_metadata:{exported_at:new Date().toISOString(),scheme_id:"SCH-UP-245123",village:"Gram Panchayat Badepur",counts:{telemetry:i.length,alerts:e.length,feedback:t.length}},telemetry:i,alerts:e,feedback:t};gx(`jalsetu_contracts_bundle_${Date.now()}.json`,n)}class yx{constructor(){this.isRecording=!1,this.isReplaying=!1,this.frames=[],this.replayIndex=0}startRecording(){this.isRecording=!0,this.isReplaying=!1,this.frames=[]}stopRecording(){return this.isRecording=!1,this.frames.length}captureFrame(e,t,n,r){this.isRecording&&this.frames.push({simMinutes:e,level:t.level,pumpOn:t.pumpOn,pumpCurrent:t.pumpCurrent,trunkFlow:n.trunkFlow,cl:t.cl,tu:t.tu,faults:{...t.faults},activeAlertsCount:r.length,timestamp:Date.now()})}startReplay(){return this.frames.length===0?!1:(this.isReplaying=!0,this.isRecording=!1,this.replayIndex=0,!0)}stopReplay(){this.isReplaying=!1}getNextReplayFrame(){return!this.isReplaying||this.replayIndex>=this.frames.length?(this.isReplaying=!1,null):this.frames[this.replayIndex++]}}const xx=[{key:"pump",title:"Pump Failure",desc:"Motor thermal trip: current drops to 0 A, pump ceases filling ESR",severity:"high",location:[-14,4,-9]},{key:"leak",title:"Slow Leak, Branch B",desc:"Hidden subterranean loss (~35 LPM) near household B3 on the ridge",severity:"medium",location:[15,6,0]},{key:"burst",title:"Pipe Burst, Branch A",desc:"Catastrophic rupture (~120 LPM) near household A2: fountain & rapid tank drain",severity:"high",location:[-10.5,3.8,0]},{key:"choke",title:"Choked Pipe, Branch C",desc:"Severe silt/scale deposition in Branch C header starves tail-end taps",severity:"medium",location:[0,3.8,6]},{key:"rain",title:"Monsoon Contamination",desc:"Surface runoff ingress: turbidity spikes >5 NTU, chlorine washes out <0.20 mg/L",severity:"high",location:[0,8,-9]}],Sx=[{id:"monsoon_week",name:"Monsoon Week Scenario",description:"Heavy rain triggers turbidity surge at dawn, followed by ground saturation pipeline burst in Ward 1.",durationMinutes:1440,timeline:[{minute:60,action:"fault_on",fault:"rain",notice:"Heavy rainfall starts: runoff into shallow borewell aquifer."},{minute:360,action:"notice",notice:"Morning supply begins: turbid water reaches household taps."},{minute:600,action:"fault_on",fault:"burst",notice:"Soil displacement causes pipe rupture on Branch A."}]},{id:"summer_shortage",name:"Summer Shortage & Choke",description:"Reservoir depleted during peak heatwave; sediment choke starves tail-end households.",durationMinutes:1440,timeline:[{minute:30,action:"fault_on",fault:"choke",notice:"Sediment buildup restricts Branch C transmission header."},{minute:360,action:"notice",notice:"Morning supply: Ward 3 tail end receives zero water."}]},{id:"dawn_pump_trip",name:"Pump Trip at Dawn",description:"Electrical transformer trip at 05:45 AM before morning supply causes reservoir starvation.",durationMinutes:720,timeline:[{minute:345,action:"fault_on",fault:"pump",notice:"Transformer fault trips submersible pump starter at 05:45 AM."},{minute:360,action:"notice",notice:"Morning supply opens: tank drains rapidly without refill."}]}];class Mx{constructor(e,t={}){this.container=document.getElementById(e),this.onToggleFault=t.onToggleFault||(()=>{}),this.onClearFaults=t.onClearFaults||(()=>{}),this.onSpeedChange=t.onSpeedChange||(()=>{}),this.onJumpSupply=t.onJumpSupply||(()=>{}),this.onToggleCutaway=t.onToggleCutaway||(()=>{}),this.onSelectPreset=t.onSelectPreset||(()=>{}),this.render(),this.attachEventListeners()}render(){if(!this.container)return;const e=xx.map(n=>`
      <button class="fault-btn" data-fault="${n.key}">
        <b>${n.title}</b>
        <small>${n.desc}</small>
      </button>
    `).join(""),t=Sx.map(n=>`
      <option value="${n.id}">${n.name}</option>
    `).join("");this.container.innerHTML=`
      <div class="section-card">
        <h2>Inject A Problem</h2>
        <div id="faults-list">
          ${e}
          <button class="btn-block" id="btn-clear-faults" style="margin-top:8px;">
            Clear All Problems
          </button>
        </div>
      </div>

      <div class="section-card">
        <h2>Scenario Presets</h2>
        <select id="preset-select" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--line); background:var(--panel); color:var(--ink); font-size:12px; margin-bottom:8px;">
          <option value="">-- Choose a Preset Scenario --</option>
          ${t}
        </select>
        <button class="btn-block btn-sm" id="btn-load-preset">Run Preset Scenario</button>
      </div>

      <div class="section-card">
        <h2>Simulation Clock</h2>
        <div class="btn-row" id="speed-buttons">
          <button data-speed="0">Pause</button>
          <button data-speed="2" class="active">2x (Normal)</button>
          <button data-speed="8">8x (Fast)</button>
        </div>
        <button class="btn-block btn-sm" id="btn-jump-supply" style="margin-top:8px;">
          Jump To Next Supply Window
        </button>
      </div>

      <div class="section-card">
        <h2>3D Views & Inspection</h2>
        <button class="btn-block" id="btn-toggle-xray" style="margin-bottom:8px;">
          Trench Cutaway (X-Ray View): OFF
        </button>
        <div class="legend-grid">
          <div class="legend-item"><span class="legend-color" style="background:#dfe9e4;"></span>Water OK</div>
          <div class="legend-item"><span class="legend-color" style="background:#f59e0b;"></span>Low Pressure</div>
          <div class="legend-item"><span class="legend-color" style="background:#ef4444;"></span>No Water</div>
          <div class="legend-item"><span class="legend-color" style="background:#9333ea;"></span>Unsafe Quality</div>
        </div>
      </div>
    `}attachEventListeners(){this.container.querySelectorAll("[data-fault]").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.fault;this.onToggleFault(o)})});const e=this.container.querySelector("#btn-clear-faults");e&&e.addEventListener("click",()=>this.onClearFaults()),this.container.querySelectorAll("[data-speed]").forEach(a=>{a.addEventListener("click",()=>{const o=Number(a.dataset.speed);this.container.querySelectorAll("[data-speed]").forEach(c=>c.classList.remove("active")),a.classList.add("active"),this.onSpeedChange(o)})});const t=this.container.querySelector("#btn-jump-supply");t&&t.addEventListener("click",()=>this.onJumpSupply());const n=this.container.querySelector("#btn-toggle-xray");if(n){let a=!1;n.addEventListener("click",()=>{a=!a,n.classList.toggle("active",a),n.textContent=`Trench Cutaway (X-Ray View): ${a?"ON":"OFF"}`,this.onToggleCutaway(a)})}const r=this.container.querySelector("#btn-load-preset"),s=this.container.querySelector("#preset-select");r&&s&&r.addEventListener("click",()=>{s.value&&this.onSelectPreset(s.value)})}updateFaultButtons(e){this.container.querySelectorAll("[data-fault]").forEach(t=>{const n=t.dataset.fault;t.classList.toggle("active",!!e[n])})}}class Ex{constructor(e,t={}){this.container=document.getElementById(e),this.onFocusAlert=t.onFocusAlert||(()=>{}),this.onDownloadBundle=t.onDownloadBundle||(()=>{}),this.mqttStatus="Offline Mock Mode",this.renderSkeleton()}renderSkeleton(){if(!this.container)return;this.container.innerHTML=`
      <div class="sensor-card">
        <h2>Live IoT Sensors</h2>
        <div id="tank-gauge-slot"></div>
        <div id="pump-quality-slot" style="font-size:12px; margin:8px 0; color:var(--muted);"></div>
        <table class="sensor-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Inflow</th>
              <th>Tail P</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="branch-table-body"></tbody>
        </table>
      </div>

      <div class="section-card">
        <h2>
          Active Incident Alerts
          <span id="alert-count-badge" class="inspector-status-badge" style="background:var(--ok-bg); color:var(--ok);">0 Active</span>
        </h2>
        <div id="alerts-list">
          <p style="font-size:12px; color:var(--muted); margin:4px 0;">No active alerts. All systems normal.</p>
        </div>
      </div>

      <div class="section-card">
        <h2>Citizen Grievances</h2>
        <div id="grievance-feed" style="max-height:160px; overflow-y:auto; font-size:12px; color:var(--muted);">
          <p style="margin:4px 0;">No complaints reported today.</p>
        </div>
      </div>

      <div class="section-card" style="padding:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--muted); margin-bottom:8px;">
          <span>MQTT WebSocket:</span>
          <b id="mqtt-status-tag" style="color:var(--ok);">${this.mqttStatus}</b>
        </div>
        <button class="btn-block btn-sm" id="btn-export-bundle">
          Download Contracts JSON Bundle
        </button>
      </div>
    `;const e=this.container.querySelector("#btn-export-bundle");e&&e.addEventListener("click",()=>this.onDownloadBundle())}updateSensors(e,t,n){const r=this.container.querySelector("#tank-gauge-slot"),s=this.container.querySelector("#pump-quality-slot"),a=this.container.querySelector("#branch-table-body");if(r){const o=Math.min(100,Math.round(e.level/4*100));r.innerHTML=`
        <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
          <span>Elevated Tank Level: <b>${e.level.toFixed(1)} m</b> (50k L)</span>
          <b>${o}%</b>
        </div>
        <div class="tank-gauge-bar">
          <div class="tank-gauge-fill" style="width:${o}%;"></div>
        </div>
      `}if(s){const o=e.pumpOn?`<b style="color:var(--ok);">Running (${e.pumpCurrent.toFixed(1)} A)</b>`:e.pumpCmd?'<b style="color:var(--bad);">FAULT (Tripped)</b>':"<span>Off (Idle)</span>";s.innerHTML=`
        <div>Pump: ${o} | Inflow: <b>${Math.round(t.trunkFlow)} lpm</b></div>
        <div style="margin-top:2px;">Chlorine: <b>${e.cl.toFixed(2)} mg/L</b> | Turbidity: <b>${e.tu.toFixed(1)} NTU</b></div>
      `}if(a){const o=n.nodes.map((c,l)=>{const u=c[0].branchId,h=Math.round(t.branchFlows[l][0]),p=c[4].P.toFixed(1),m=c[4].P_kpa,g=c.filter(M=>M.P>=7.14).length;return`
          <tr>
            <td><b>${u}</b></td>
            <td>${h} lpm</td>
            <td>${p}m (${m}k)</td>
            <td>${g}/5 OK</td>
          </tr>
        `}).join("");a.innerHTML=o}}updateAlerts(e,t){const n=this.container.querySelector("#alerts-list"),r=this.container.querySelector("#alert-count-badge");if(!n)return;if(r&&(r.textContent=`${e.length} Active`,r.style.backgroundColor=e.length>0?"var(--bad-bg)":"var(--ok-bg)",r.style.color=e.length>0?"var(--bad)":"var(--ok)"),e.length===0){n.innerHTML='<p style="font-size:12px; color:var(--muted); margin:4px 0;">No active alerts. All systems normal.</p>';return}const s=[...e].sort((a,o)=>(a.severity==="high"?0:1)-(o.severity==="high"?0:1));n.innerHTML=s.map(a=>{const o=Td.getEscalation(a,t),c=Math.round(t-a.t0);return`
        <div class="alert-card ${a.severity}">
          <div class="alert-card-header">
            <span class="alert-type">${a.type.replace("_"," ").toUpperCase()}</span>
            <span class="alert-scope">${a.scope.branch}</span>
          </div>
          <p class="alert-reason">${a.reason}</p>
          <div class="alert-footer">
            <span>${o} (${c}m open)</span>
            <button class="btn-focus" data-focus-scope="${a.scope.branch}">Focus 🎯</button>
          </div>
        </div>
      `}).join(""),n.querySelectorAll("[data-focus-scope]").forEach(a=>{a.addEventListener("click",()=>{this.onFocusAlert(a.dataset.focusScope)})})}updateGrievances(e){const t=this.container.querySelector("#grievance-feed");if(t){if(!e||e.length===0){t.innerHTML='<p style="margin:4px 0;">No complaints reported today.</p>';return}t.innerHTML=e.slice(0,6).map(n=>`
      <div style="border-bottom:1px solid var(--line); padding:4px 0;">
        <div style="display:flex; justify-content:space-between; font-weight:600; font-size:11px;">
          <span>${n.displayTime} ${n.nodeId} (${n.channel.toUpperCase()})</span>
          <span style="color:var(--bad);">${n.category.replace("_"," ")}</span>
        </div>
        <div style="color:var(--ink); font-style:italic;">"${n.text}"</div>
      </div>
    `).join("")}}setMqttStatus(e,t){this.mqttStatus=e;const n=this.container?.querySelector("#mqtt-status-tag");n&&(n.textContent=e,n.style.color=t?"var(--ok)":"var(--warn)")}}class bx{constructor(e){this.container=document.getElementById(e),this.historyLength=30,this.tankLevelHistory=new Array(this.historyLength).fill(3),this.inflowHistory=new Array(this.historyLength).fill(75),this.tailPressureHistory=new Array(this.historyLength).fill(12),this.renderSkeleton()}renderSkeleton(){if(!this.container)return;this.container.innerHTML=`
      <div class="sparkline-group">
        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Tank Level</span>
            <b id="val-spark-tank">3.0 m</b>
          </div>
          <svg id="svg-spark-tank" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>

        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Bulk Flow</span>
            <b id="val-spark-flow">75 LPM</b>
          </div>
          <svg id="svg-spark-flow" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>

        <div class="sparkline-box">
          <div class="sparkline-label">
            <span>Tail Pressure</span>
            <b id="val-spark-pressure">12.0 m</b>
          </div>
          <svg id="svg-spark-pressure" viewBox="0 0 160 28" preserveAspectRatio="none"></svg>
        </div>
      </div>

      <div class="service-index-widget">
        <div class="index-gauge" id="service-index-val">98.4%</div>
        <div class="index-breakdown">
          <div><b>JJM FHTC Service Index</b></div>
          <div style="font-size:10px; color:var(--muted);">0.30Reg + 0.20Adeq + 0.20Qual + 0.15Press + 0.15Griev</div>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <button class="btn-sm" id="btn-show-before-after" style="font-size:11px;">
          Before / After Comparison ⚖️
        </button>
      </div>
    `;const e=this.container.querySelector("#btn-show-before-after");e&&e.addEventListener("click",()=>this.showBeforeAfterModal())}update(e,t,n){this.tankLevelHistory.shift(),this.tankLevelHistory.push(e.level),this.inflowHistory.shift(),this.inflowHistory.push(t.trunkFlow);const r=n.nodes[1][4].P;this.tailPressureHistory.shift(),this.tailPressureHistory.push(r),this.renderSvgPolyline("svg-spark-tank",this.tankLevelHistory,0,4,"#0284c7"),this.renderSvgPolyline("svg-spark-flow",this.inflowHistory,0,400,"#38bdf8"),this.renderSvgPolyline("svg-spark-pressure",this.tailPressureHistory,0,25,"#22c55e");const s=this.container.querySelector("#val-spark-tank"),a=this.container.querySelector("#val-spark-flow"),o=this.container.querySelector("#val-spark-pressure");s&&(s.textContent=`${e.level.toFixed(1)} m`),a&&(a.textContent=`${Math.round(t.trunkFlow)} LPM`),o&&(o.textContent=`${r.toFixed(1)} m`);const c=n.households,l=c.length,u=e.pumpOn||e.level>1?1:.2,p=c.filter(x=>t.isSupply?x.q>=10:!0).length/l,g=c.filter(x=>x.cl>=.2&&x.tu<=5).length/l,f=c.filter(x=>t.isSupply?x.P>=7.14:!0).length/l,_=1-c.filter(x=>x.reported).length/l,v=(.3*u+.2*p+.2*g+.15*f+.15*_)*100,y=this.container.querySelector("#service-index-val");y&&(y.textContent=`${v.toFixed(1)}%`,v>=85?y.style.color="var(--ok)":v>=65?y.style.color="var(--warn)":y.style.color="var(--bad)")}renderSvgPolyline(e,t,n,r,s){const a=this.container.querySelector(`#${e}`);if(!a)return;const o=160,c=28,l=r-n||1,u=t.map((h,p)=>{const m=p/(t.length-1)*o,g=Math.max(0,Math.min(1,(h-n)/l)),M=c-g*(c-6)-3;return`${m.toFixed(1)},${M.toFixed(1)}`}).join(" ");a.innerHTML=`
      <polyline
        fill="none"
        stroke="${s}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        points="${u}"
      />
    `}showBeforeAfterModal(){let e=document.getElementById("before-after-modal");e||(e=document.createElement("div"),e.id="before-after-modal",e.style.cssText=`
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center; z-index: 100;
      `,e.innerHTML=`
        <div style="background:var(--panel); border:1px solid var(--line); border-radius:12px; max-width:680px; width:90%; padding:24px; box-shadow:var(--shadow-lg);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h2 style="margin:0; font-size:18px;">⚖️ Before vs After: JalSetu Impact</h2>
            <button id="btn-close-modal" style="padding:4px 8px;">✕</button>
          </div>
          <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead>
              <tr style="border-bottom:2px solid var(--line); text-align:left;">
                <th style="padding:8px;">Metric</th>
                <th style="padding:8px; color:var(--bad);">Monthly Manual Inspection</th>
                <th style="padding:8px; color:var(--ok);">JalSetu Digital Twin</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Outage Discovery</td>
                <td style="padding:8px;">15 to 30 Days (waits for paper complaint)</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">&lt; 15 Minutes (automatic alert)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Pipe Leak Visibility</td>
                <td style="padding:8px;">Zero visibility (35% physical water lost)</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Isolated to branch within 24h</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Water Contamination</td>
                <td style="padding:8px;">Grab-sample sent to lab every 3-6 months</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Continuous in-line probe telemetry</td>
              </tr>
              <tr style="border-bottom:1px solid var(--line);">
                <td style="padding:8px; font-weight:600;">Household Visibility</td>
                <td style="padding:8px;">Village assumed 100% functional on paper</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Granular FHTC status for all 15 houses</td>
              </tr>
              <tr>
                <td style="padding:8px; font-weight:600;">Maintenance Dispatch</td>
                <td style="padding:8px;">Subjective technician callout</td>
                <td style="padding:8px; font-weight:600; color:var(--ok);">Automated administrative escalation</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,document.body.appendChild(e),e.querySelector("#btn-close-modal").addEventListener("click",()=>{e.style.display="none"}),e.addEventListener("click",t=>{t.target===e&&(e.style.display="none")})),e.style.display="flex"}}class wx{constructor(e){this.container=document.getElementById(e),this.selectedNode=null}show(e){this.selectedNode=e,this.container&&(this.container.classList.remove("hidden"),this.render())}hide(){this.selectedNode=null,this.container&&this.container.classList.add("hidden")}render(){if(!this.container||!this.selectedNode)return;const e=this.selectedNode,t=js.getHouseholdStatus(e),n={ok:'<span class="inspector-status-badge" style="background:var(--ok-bg); color:var(--ok);">Water OK</span>',low:'<span class="inspector-status-badge" style="background:var(--warn-bg); color:var(--warn);">Low Pressure (&lt;70 kPa)</span>',none:'<span class="inspector-status-badge" style="background:var(--bad-bg); color:var(--bad);">No Water (Dry)</span>',unsafe:'<span class="inspector-status-badge" style="background:var(--unsafe-bg); color:var(--unsafe);">Unsafe Quality</span>'}[t];this.container.innerHTML=`
      <div class="inspector-header">
        <div>
          <b>${e.siteLabel}</b>
          <div style="font-size:11px; color:var(--muted);">${e.fhtc_id}</div>
        </div>
        <div>${n}</div>
      </div>
      <div style="font-size:12px; display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
        <div>Ward: <b>${e.ward}</b></div>
        <div>Elevation: <b>${e.elevation.toFixed(1)} m</b></div>
        <div>Pressure: <b>${e.P.toFixed(1)} m (${e.P_kpa} kPa)</b></div>
        <div>Tap Flow: <b>${e.q.toFixed(1)} LPM</b></div>
        <div>Chlorine: <b>${e.cl.toFixed(2)} mg/L</b></div>
        <div>Turbidity: <b>${e.tu.toFixed(1)} NTU</b></div>
      </div>
      <div style="border-top:1px solid var(--line); padding-top:6px; font-size:11px; color:var(--muted); display:flex; justify-content:space-between; align-items:center;">
        <span>${e.reported?"⚠️ Citizen grievance registered":"No citizen grievances filed"}</span>
        <button id="btn-close-inspector" style="padding:2px 8px; font-size:11px;">Close</button>
      </div>
    `;const r=this.container.querySelector("#btn-close-inspector");r&&r.addEventListener("click",s=>{s.stopPropagation(),this.hide()})}}class Tx{constructor(){this.canvas=document.getElementById("canvas3d"),this.container=document.getElementById("viewport-container"),this.model=d0(),this.engine=new js(this.model),this.state={simTimeMinutes:330,speed:2,level:3,pumpCmd:!1,pumpOn:!1,pumpCurrent:0,pumpFlow:0,cl:.48,tu:1.1,nodes:this.model.nodes,faults:{pump:0,leak:0,burst:0,choke:0,rain:0},currentTheme:"light"},this.scene=new ff,this.renderer=new f0(this.canvas),this.cameraManager=new R0(this.canvas,this.container.clientWidth/this.container.clientHeight),this.lighting=new P0(this.scene),this.terrain=new C0(this.scene),this.buildings=new D0(this.scene,this.model),this.pipes=new I0(this.scene,this.model),this.water=new L0(this.scene,this.pipes,this.buildings),this.alertEngine=new Td(this.model),this.grievanceSimulator=new O0(this.model),this.telemetryManager=new F0,this.validator=new mx,this.recorder=new yx,this.mqtt=new _x({onStatusChange:(e,t)=>{this.panelRight?.setMqttStatus(e,t)}}),this.telemetryHistory=[],this.alertsHistory=[],this.inspector=new wx("house-inspector"),this.panelLeft=null,this.panelRight=null,this.panelAnalytics=null,this.raycaster=new bf,this.mouse=new Ue,this.lastFrameTime=performance.now(),this.init()}init(){this.initThemeAndHeader(),this.initPanels(),this.initInteraction(),this.initResizeHandler();const e=this.engine.step(this.state,.1);this.updateVisuals(e,.016),requestAnimationFrame(t=>this.loop(t))}initThemeAndHeader(){const e=document.getElementById("btn-theme-toggle");e&&e.addEventListener("click",()=>{this.state.currentTheme=this.state.currentTheme==="light"?"dark":"light",document.documentElement.setAttribute("data-theme",this.state.currentTheme),this.lighting.updateDayNightCycle(this.state.simTimeMinutes,this.state.currentTheme)});const t=document.getElementById("quality-selector");t&&t.addEventListener("change",r=>{this.renderer.setQuality(r.target.value)});const n=document.getElementById("btn-reset-view");n&&n.addEventListener("click",()=>this.cameraManager.resetView())}initPanels(){this.panelLeft=new Mx("panel-left",{onToggleFault:e=>{if(this.state.faults[e]=this.state.faults[e]?0:1,this.panelLeft.updateFaultButtons(this.state.faults),e==="burst"&&this.state.faults.burst){this.cameraManager.triggerShake(.55,1.5);const t=this.model.nodes[0][1].pos;this.cameraManager.flyTo(new V(...t),18)}},onClearFaults:()=>{Object.keys(this.state.faults).forEach(e=>this.state.faults[e]=0),this.panelLeft.updateFaultButtons(this.state.faults)},onSpeedChange:e=>{this.state.speed=e},onJumpSupply:()=>{const e=this.state.simTimeMinutes/60%24;let t=6;e<5.8?t=6:e<16.8?t=17:t=30;const n=Math.floor(this.state.simTimeMinutes/1440)*1440;this.state.simTimeMinutes=n+t*60},onToggleCutaway:e=>{this.terrain.setTrenchCutaway(e)},onSelectPreset:e=>{this.loadScenarioPreset(e)}}),this.panelRight=new Ex("panel-right",{onFocusAlert:e=>{this.focusCameraOnScope(e)},onDownloadBundle:()=>{vx({telemetryHistory:this.telemetryHistory.slice(-50),alertsHistory:this.alertsHistory,feedbackLog:this.grievanceSimulator.feedbackLog})}}),this.panelAnalytics=new bx("analytics-bar")}initInteraction(){this.canvas.addEventListener("pointerup",e=>{const t=this.canvas.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.cameraManager.camera);const n=this.raycaster.intersectObjects(this.buildings.houseMeshes);if(n.length>0){const s=n[0].object.userData.node;s&&(this.inspector.show(s),this.cameraManager.flyTo(new V(...s.housePos),14))}})}focusCameraOnScope(e){if(e.includes("Branch A")){const t=this.model.nodes[0][1].pos;this.cameraManager.flyTo(new V(...t),18)}else if(e.includes("Branch B")){const t=this.model.nodes[1][2].pos;this.cameraManager.flyTo(new V(...t),18)}else if(e.includes("Branch C")){const t=this.model.nodes[2][2].pos;this.cameraManager.flyTo(new V(...t),18)}else e.includes("Pump")?this.cameraManager.flyTo(new V(...this.model.PUMP_POS),18):(e.includes("Reservoir")||e.includes("Tank"))&&this.cameraManager.flyTo(new V(...this.model.ESR_POS),22)}loadScenarioPreset(e){e==="monsoon_week"?(this.state.faults.rain=1,this.state.faults.burst=1):e==="summer_shortage"?(this.state.faults.choke=1,this.state.level=.8):e==="dawn_pump_trip"&&(this.state.faults.pump=1,this.state.simTimeMinutes=350),this.panelLeft?.updateFaultButtons(this.state.faults)}initResizeHandler(){const e=()=>{const t=this.container.clientWidth,n=this.container.clientHeight;t>0&&n>0&&(this.renderer.resize(t,n),this.cameraManager.resize(t/n))};window.addEventListener("resize",e),new ResizeObserver(e).observe(this.container)}loop(e){const t=Math.min(.1,(e-this.lastFrameTime)/1e3);if(this.lastFrameTime=e,this.state.speed>0){const n=t*this.state.speed,r=this.engine.step(this.state,n),s=this.alertEngine.evaluate(this.state,r);this.grievanceSimulator.step(this.state,n),this.telemetryManager.emitLiveTelemetry(this.state,r).forEach(o=>{this.validator.validateTelemetry(o).valid&&(this.mqtt.publishTelemetry(o),this.telemetryHistory.push(o))}),this.telemetryHistory.length>200&&this.telemetryHistory.splice(0,50),this.alertsHistory=s.active,this.updateUI(r,s.active),this.updateVisuals(r,t)}this.cameraManager.update(),this.renderer.render(this.scene,this.cameraManager.camera),requestAnimationFrame(n=>this.loop(n))}updateUI(e,t){const n=document.getElementById("clock-display"),r=document.getElementById("supply-tag");if(n){const s=Math.floor(this.state.simTimeMinutes/1440)+1,a=this.alertEngine.formatTime(this.state.simTimeMinutes);n.textContent=`Day ${s}, ${a}`}r&&(r.style.display=e.isSupply?"inline-block":"none"),this.panelRight?.updateSensors(this.state,e,this.model),this.panelRight?.updateAlerts(t,this.state.simTimeMinutes),this.panelRight?.updateGrievances(this.grievanceSimulator.feedbackLog),this.panelAnalytics?.update(this.state,e,this.model),this.inspector?.selectedNode&&this.inspector.render()}updateVisuals(e,t){this.lighting.updateDayNightCycle(this.state.simTimeMinutes,this.state.currentTheme),this.buildings.update(this.state),this.pipes.update(this.state,e),this.water.update(this.state,e,t)}}window.addEventListener("DOMContentLoaded",()=>{window.jalSetuApp=new Tx});
