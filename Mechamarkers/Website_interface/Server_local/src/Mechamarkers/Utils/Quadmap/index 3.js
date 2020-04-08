import { vecSub, vecMag, vecMag2, vecDot } from '../Vec2';

// normalized based on image height

// const IMGW = 960;
// const IMGH = 540;

// const IMGW = 1120;
// const IMGH = 630;

const IMGW = 1280;
const IMGH = 720;

// const IMGW = 1920;
// const IMGH = 1080;

// paste calibration data into QUADS_CALIBRATED and CELLS_CALIBRATED
const QUADS_CALIBRATED = [[{"x":0.09672949002217295,"y":0.16157635467980297},{"x":0.10310421286031042,"y":0.2793103448275862},{"x":0.11086474501108648,"y":0.39704433497536945},{"x":0.12208980044345898,"y":0.50935960591133},{"x":0.13567073170731708,"y":0.6162561576354679},{"x":0.15008314855875832,"y":0.7123152709359606},{"x":0.16615853658536586,"y":0.8007389162561577},{"x":0.18140243902439024,"y":0.8810344827586207}],[{"x":0.13774944567627492,"y":0.14729064039408868},{"x":0.14273835920177383,"y":0.26995073891625615},{"x":0.1504988913525499,"y":0.3921182266009852},{"x":0.16172394678492238,"y":0.5083743842364532},{"x":0.17419623059866962,"y":0.6187192118226601},{"x":0.18860864745011086,"y":0.7187192118226601},{"x":0.20302106430155212,"y":0.8086206896551724},{"x":0.21771064301552107,"y":0.8889162561576355}],[{"x":0.18403547671840353,"y":0.1315270935960591},{"x":0.18860864745011086,"y":0.2603448275862069},{"x":0.19609201773835921,"y":0.3866995073891626},{"x":0.20579268292682926,"y":0.5071428571428571},{"x":0.2182649667405765,"y":0.6214285714285714},{"x":0.2318458980044346,"y":0.7241379310344828},{"x":0.24487250554323725,"y":0.8169950738916256},{"x":0.25803769401330334,"y":0.8982758620689655}],[{"x":0.23517184035476718,"y":0.11724137931034483},{"x":0.23960643015521063,"y":0.2504926108374384},{"x":0.2459811529933481,"y":0.3817733990147783},{"x":0.25457317073170727,"y":0.5071428571428571},{"x":0.26565964523281604,"y":0.6238916256157635},{"x":0.27702328159645234,"y":0.7293103448275862},{"x":0.28921840354767187,"y":0.8236453201970443},{"x":0.3009977827050998,"y":0.9061576354679803}],[{"x":0.291990022172949,"y":0.10443349753694581},{"x":0.29531596452328157,"y":0.241871921182266},{"x":0.3008592017738359,"y":0.3770935960591133},{"x":0.30834257206208426,"y":0.5056650246305419},{"x":0.31721175166297116,"y":0.6258620689655172},{"x":0.327189578713969,"y":0.7334975369458128},{"x":0.33716740576496673,"y":0.8295566502463054},{"x":0.3465909090909091,"y":0.9130541871921182}],[{"x":0.35338137472283815,"y":0.09334975369458128},{"x":0.3558758314855876,"y":0.23472906403940888},{"x":0.36003325942350334,"y":0.3733990147783251},{"x":0.36557649667405767,"y":0.5046798029556651},{"x":0.37250554323725055,"y":0.6270935960591133},{"x":0.3794345898004435,"y":0.7366995073891626},{"x":0.3871951219512195,"y":0.833743842364532},{"x":0.3946784922394678,"y":0.9184729064039409}],[{"x":0.41879157427937913,"y":0.08645320197044334},{"x":0.42031596452328157,"y":0.2293103448275862},{"x":0.42308758314855877,"y":0.370935960591133},{"x":0.4266906873614191,"y":0.5044334975369458},{"x":0.43112527716186255,"y":0.6278325123152709},{"x":0.4358370288248337,"y":0.7381773399014778},{"x":0.43999445676274945,"y":0.8362068965517241},{"x":0.44442904656319293,"y":0.920935960591133}],[{"x":0.4861419068736142,"y":0.08078817733990148},{"x":0.48697339246119736,"y":0.22610837438423645},{"x":0.4875277161862528,"y":0.36847290640394087},{"x":0.4891906873614191,"y":0.5029556650246306},{"x":0.49085365853658536,"y":0.6280788177339901},{"x":0.49251662971175164,"y":0.7391625615763546},{"x":0.49390243902439024,"y":0.8374384236453202},{"x":0.49528824833702884,"y":0.9224137931034483}],[{"x":0.5541851441241685,"y":0.0812807881773399},{"x":0.5536308203991132,"y":0.22586206896551725},{"x":0.5530764966740577,"y":0.36773399014778324},{"x":0.5519678492239468,"y":0.5024630541871922},{"x":0.550859201773836,"y":0.6270935960591133},{"x":0.5491962305986695,"y":0.7376847290640394},{"x":0.5478104212860311,"y":0.8362068965517241},{"x":0.5461474501108646,"y":0.9214285714285714}],[{"x":0.6215354767184036,"y":0.08472906403940887},{"x":0.6201496674057649,"y":0.22758620689655173},{"x":0.6176552106430155,"y":0.3682266009852217},{"x":0.6146064301552107,"y":0.5019704433497537},{"x":0.6105875831485588,"y":0.6253694581280789},{"x":0.6061529933481153,"y":0.7347290640394089},{"x":0.6017184035476718,"y":0.8325123152709359},{"x":0.5967294900221729,"y":0.9177339901477832}],[{"x":0.6859756097560976,"y":0.0916256157635468},{"x":0.6832039911308204,"y":0.23251231527093597},{"x":0.6793237250554324,"y":0.37019704433497536},{"x":0.6743348115299335,"y":0.5014778325123153},{"x":0.6676829268292683,"y":0.6229064039408867},{"x":0.6604767184035477,"y":0.7317733990147783},{"x":0.6532705099778271,"y":0.8285714285714286},{"x":0.6457871396895787,"y":0.9135467980295566}],[{"x":0.7458425720620843,"y":0.10295566502463054},{"x":0.7430709534368071,"y":0.23842364532019705},{"x":0.7378048780487805,"y":0.3724137931034483},{"x":0.7308758314855875,"y":0.5004926108374385},{"x":0.7220066518847007,"y":0.6194581280788177},{"x":0.7125831485587583,"y":0.7266009852216748},{"x":0.7028824833702882,"y":0.8214285714285714},{"x":0.6931818181818182,"y":0.9061576354679803}],[{"x":0.8007206208425721,"y":0.11428571428571428},{"x":0.7971175166297118,"y":0.2460591133004926},{"x":0.791019955654102,"y":0.3758620689655172},{"x":0.7825665188470067,"y":0.5002463054187192},{"x":0.7723115299334812,"y":0.6157635467980296},{"x":0.760670731707317,"y":0.7206896551724138},{"x":0.7493070953436807,"y":0.8150246305418719},{"x":0.7379434589800443,"y":0.8982758620689655}],[{"x":0.8507483370288248,"y":0.12660098522167487},{"x":0.8465909090909091,"y":0.2539408866995074},{"x":0.8393847006651884,"y":0.3795566502463054},{"x":0.8296840354767184,"y":0.49901477832512314},{"x":0.8183203991130821,"y":0.6118226600985222},{"x":0.8055709534368071,"y":0.7137931034482758},{"x":0.7925443458980045,"y":0.8061576354679802},{"x":0.7792405764966741,"y":0.8879310344827587}],[{"x":0.895509977827051,"y":0.14039408866995073},{"x":0.8913525498891353,"y":0.2625615763546798},{"x":0.8835920177383592,"y":0.3834975369458128},{"x":0.8736141906873615,"y":0.49926108374384237},{"x":0.8611419068736141,"y":0.6078817733990147},{"x":0.8475609756097561,"y":0.7073891625615764},{"x":0.8334257206208425,"y":0.7972906403940887},{"x":0.8185975609756098,"y":0.8766009852216748}]];
const CELLS_CALIBRATED = [[{"x":0,"y":1},{"x":0,"y":0.8571428571428571},{"x":0,"y":0.7142857142857142},{"x":0,"y":0.5714285714285714},{"x":0,"y":0.42857142857142855},{"x":0,"y":0.2857142857142857},{"x":0,"y":0.14285714285714285},{"x":0,"y":0}],[{"x":0.07142857142857142,"y":1},{"x":0.07142857142857142,"y":0.8571428571428571},{"x":0.07142857142857142,"y":0.7142857142857142},{"x":0.07142857142857142,"y":0.5714285714285714},{"x":0.07142857142857142,"y":0.42857142857142855},{"x":0.07142857142857142,"y":0.2857142857142857},{"x":0.07142857142857142,"y":0.14285714285714285},{"x":0.07142857142857142,"y":0}],[{"x":0.14285714285714285,"y":1},{"x":0.14285714285714285,"y":0.8571428571428571},{"x":0.14285714285714285,"y":0.7142857142857142},{"x":0.14285714285714285,"y":0.5714285714285714},{"x":0.14285714285714285,"y":0.42857142857142855},{"x":0.14285714285714285,"y":0.2857142857142857},{"x":0.14285714285714285,"y":0.14285714285714285},{"x":0.14285714285714285,"y":0}],[{"x":0.21428571428571427,"y":1},{"x":0.21428571428571427,"y":0.8571428571428571},{"x":0.21428571428571427,"y":0.7142857142857142},{"x":0.21428571428571427,"y":0.5714285714285714},{"x":0.21428571428571427,"y":0.42857142857142855},{"x":0.21428571428571427,"y":0.2857142857142857},{"x":0.21428571428571427,"y":0.14285714285714285},{"x":0.21428571428571427,"y":0}],[{"x":0.2857142857142857,"y":1},{"x":0.2857142857142857,"y":0.8571428571428571},{"x":0.2857142857142857,"y":0.7142857142857142},{"x":0.2857142857142857,"y":0.5714285714285714},{"x":0.2857142857142857,"y":0.42857142857142855},{"x":0.2857142857142857,"y":0.2857142857142857},{"x":0.2857142857142857,"y":0.14285714285714285},{"x":0.2857142857142857,"y":0}],[{"x":0.3571428571428571,"y":1},{"x":0.3571428571428571,"y":0.8571428571428571},{"x":0.3571428571428571,"y":0.7142857142857142},{"x":0.3571428571428571,"y":0.5714285714285714},{"x":0.3571428571428571,"y":0.42857142857142855},{"x":0.3571428571428571,"y":0.2857142857142857},{"x":0.3571428571428571,"y":0.14285714285714285},{"x":0.3571428571428571,"y":0}],[{"x":0.42857142857142855,"y":1},{"x":0.42857142857142855,"y":0.8571428571428571},{"x":0.42857142857142855,"y":0.7142857142857142},{"x":0.42857142857142855,"y":0.5714285714285714},{"x":0.42857142857142855,"y":0.42857142857142855},{"x":0.42857142857142855,"y":0.2857142857142857},{"x":0.42857142857142855,"y":0.14285714285714285},{"x":0.42857142857142855,"y":0}],[{"x":0.5,"y":1},{"x":0.5,"y":0.8571428571428571},{"x":0.5,"y":0.7142857142857142},{"x":0.5,"y":0.5714285714285714},{"x":0.5,"y":0.42857142857142855},{"x":0.5,"y":0.2857142857142857},{"x":0.5,"y":0.14285714285714285},{"x":0.5,"y":0}],[{"x":0.5714285714285714,"y":1},{"x":0.5714285714285714,"y":0.8571428571428571},{"x":0.5714285714285714,"y":0.7142857142857142},{"x":0.5714285714285714,"y":0.5714285714285714},{"x":0.5714285714285714,"y":0.42857142857142855},{"x":0.5714285714285714,"y":0.2857142857142857},{"x":0.5714285714285714,"y":0.14285714285714285},{"x":0.5714285714285714,"y":0}],[{"x":0.6428571428571428,"y":1},{"x":0.6428571428571428,"y":0.8571428571428571},{"x":0.6428571428571428,"y":0.7142857142857142},{"x":0.6428571428571428,"y":0.5714285714285714},{"x":0.6428571428571428,"y":0.42857142857142855},{"x":0.6428571428571428,"y":0.2857142857142857},{"x":0.6428571428571428,"y":0.14285714285714285},{"x":0.6428571428571428,"y":0}],[{"x":0.7142857142857142,"y":1},{"x":0.7142857142857142,"y":0.8571428571428571},{"x":0.7142857142857142,"y":0.7142857142857142},{"x":0.7142857142857142,"y":0.5714285714285714},{"x":0.7142857142857142,"y":0.42857142857142855},{"x":0.7142857142857142,"y":0.2857142857142857},{"x":0.7142857142857142,"y":0.14285714285714285},{"x":0.7142857142857142,"y":0}],[{"x":0.7857142857142857,"y":1},{"x":0.7857142857142857,"y":0.8571428571428571},{"x":0.7857142857142857,"y":0.7142857142857142},{"x":0.7857142857142857,"y":0.5714285714285714},{"x":0.7857142857142857,"y":0.42857142857142855},{"x":0.7857142857142857,"y":0.2857142857142857},{"x":0.7857142857142857,"y":0.14285714285714285},{"x":0.7857142857142857,"y":0}],[{"x":0.8571428571428571,"y":1},{"x":0.8571428571428571,"y":0.8571428571428571},{"x":0.8571428571428571,"y":0.7142857142857142},{"x":0.8571428571428571,"y":0.5714285714285714},{"x":0.8571428571428571,"y":0.42857142857142855},{"x":0.8571428571428571,"y":0.2857142857142857},{"x":0.8571428571428571,"y":0.14285714285714285},{"x":0.8571428571428571,"y":0}],[{"x":0.9285714285714285,"y":1},{"x":0.9285714285714285,"y":0.8571428571428571},{"x":0.9285714285714285,"y":0.7142857142857142},{"x":0.9285714285714285,"y":0.5714285714285714},{"x":0.9285714285714285,"y":0.42857142857142855},{"x":0.9285714285714285,"y":0.2857142857142857},{"x":0.9285714285714285,"y":0.14285714285714285},{"x":0.9285714285714285,"y":0}],[{"x":1,"y":1},{"x":1,"y":0.8571428571428571},{"x":1,"y":0.7142857142857142},{"x":1,"y":0.5714285714285714},{"x":1,"y":0.42857142857142855},{"x":1,"y":0.2857142857142857},{"x":1,"y":0.14285714285714285},{"x":1,"y":0}]];

const QUADSNORM = generateQuads(QUADS_CALIBRATED);

const QUADS = QUADSNORM.map(
  subset => subset.map(
    q => ({
      x: q.x * IMGW,
      y: q.y * IMGH,
    })
  )
);

const CELLS = generateQuads(CELLS_CALIBRATED);

const CELLS_SIMPLE = CELLS.map(c => ({
  corner: c[0],
  w: c[2].x - c[0].x,
  h: c[2].y - c[0].y,
}));

function generateQuads(q) {
  var a0 = shiftArray2D(q, -1, -1);
  var a1 = shiftArray2D(q, 1, -1);
  var a2 = shiftArray2D(q, 1, 1);
  var a3 = shiftArray2D(q, -1, 1);
  var quadArr = [];
  for (var i=0; i<a0.length; i++) {
    for (var j=0; j<a0[i].length; j++) {
      var temparr = [];
      temparr.push(a0[i][j]);
      temparr.push(a1[i][j]);
      temparr.push(a2[i][j]);
      temparr.push(a3[i][j]);
      quadArr.push(temparr);
    }
  }
  return quadArr;
}

function shiftArray(arr, index) {
  var newarr = [];
  if (index > 0) {
    for (var i=index; i<arr.length; i++) {
      newarr.push(arr[i]);
    }
  } else if (index < 0) {
    for (var i=0; i<arr.length+index; i++) {
      newarr.push(arr[i]);
    }
  }
  return newarr;
}

function shiftArray2D(arr, index1, index2) {
  var newarr = arr.map( a => shiftArray(a, index2));
  newarr = shiftArray(newarr, index1);
  return newarr;
}


// edge length from right angle triangle
function lenFromRATri(hyp, len) {
  return Math.pow(Math.pow(hyp, 2) - Math.pow(len, 2), 0.5);
}

// Line closest point
function lineCP(sP, eP, pt) {
  var sToPt = vecSub(sP, pt);
  var sToE = vecSub(sP, eP);
  var magSE = vecMag2(sToE);
  var t = vecDot(sToPt, sToE) / magSE;
  return {x: sP.x + sToE.x*t, y: sP.y + sToE.y*t};
}

// memoize this
function areaTriangle(p0, p1, p2) {
  return Math.abs(p0.x*(p1.y - p2.y) + p1.x*(p2.y - p0.y) + p2.x*(p0.y - p1.y))/2
}
// End Vector lib

function ptInQuad(pt, quadArr) {
  var quadArea = areaTriangle(quadArr[0], quadArr[1], quadArr[2]) + areaTriangle(quadArr[0], quadArr[2], quadArr[3]);
  var ptArea = 0;
  for (var i=0; i<quadArr.length; i++) {
      ptArea = ptArea + areaTriangle(pt, quadArr[i], quadArr[(i+1)%quadArr.length]);
  }
  var ratio = ptArea / quadArea;
  if (ratio <= 1.0001) {
      return true;
  } else {
      return false;
  }
}

const xaxis = {x:1, y:0};
const yaxis = {x:0, y:1};
const xaxisNeg = {x:-1, y:0};
const yaxisNeg = {x:0, y:-1};

function mapQuad(pt, quadArr) {
  // https://math.stackexchange.com/questions/13404/mapping-irregular-quadrilateral-to-a-rectangle
  const p0 = quadArr[0];
  const p1 = quadArr[1];
  const p2 = quadArr[2];
  const p3 = quadArr[3];
  const dU0 = vecMag(vecSub(lineCP(p0, p3, pt), pt));
  const dU1 = vecMag(vecSub(lineCP(p1, p2, pt), pt));
  const u = dU0 / (dU0 + dU1);
  const dV0 = vecMag(vecSub(lineCP(p0, p1, pt), pt));
  const dV1 = vecMag(vecSub(lineCP(p3, p2, pt), pt));
  const v = dV0 / (dV0 + dV1);

  return {u:u, v:v};
}

export function mapPointToUV(pt) {
  const quadindex = QUADS.findIndex(q => ptInQuad(pt, q));
  const quad = QUADS[quadindex];

  if (quad) {
    return {
      uv: mapQuad(pt, quad),
      uvindex: quadindex,
    };
  }
  // console.warn('Cannot find quad for given point in: mapPointToUV') // PETER CODE LAGS AROUND HERE
  // Probs should throw error
  return undefined;
}

export function mapUVtoCellCoord(pt) {
  // Bail if point is undefined
  if (!pt) return { x: -1, y: -1 };

  const cell = CELLS_SIMPLE[pt.uvindex];

  return {
    x: cell.corner.x + (pt.uv.u * cell.w),
    y: cell.corner.y + (pt.uv.v * cell.h),
  };
}