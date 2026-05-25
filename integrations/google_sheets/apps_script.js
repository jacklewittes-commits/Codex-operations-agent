
var FOLDER_ID = "1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV";
var NAV="#1F3864",RED="#922B21",ORG="#F4B942",YEL="#FFF2CC",SAL="#FCE4D6",LGR="#D9D9D9",SPC="#EBEBEB",PUR="#6B5B8B",LAV="#D9D2E9",WHI="#FFFFFF",WRN="#FFF2CC",F5="#F5F5F5",INP="#EBF5FB",FIX="#F2F3F4",SEC="#2E4057",GRN="#C6EFCE",SRD="#FADADD";

function wrap(){return SpreadsheetApp.WrapStrategy.WRAP;}
function hdr(sh,r1,c1,r2,c2,val,bg){
  if(r1!==r2||c1!==c2) sh.getRange(r1,c1,r2-r1+1,c2-c1+1).merge();
  sh.getRange(r1,c1).setValue(val).setBackground(bg).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
}
function lbl(sh,r,c,v){sh.getRange(r,c).setValue(v).setBackground(FIX).setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");}
function inp(sh,r,c,v,bg){sh.getRange(r,c).setValue(v||"").setBackground(bg||INP).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());}
function ntt(sh,r,c,v){sh.getRange(r,c).setValue(v||"").setBackground("#FAFAFA").setFontColor("#888888").setFontSize(9).setVerticalAlignment("middle");}
function spc(sh,r,n){sh.getRange(r,1,1,n).setBackground(SPC);sh.setRowHeight(r,6);}
function dc(sh,r,c,v,bg){sh.getRange(r,c).setValue(v||"").setBackground(bg||WHI).setVerticalAlignment("middle").setWrapStrategy(wrap());}

function buildWeekSetup(ss,d){
  var sh=ss.insertSheet("Week Setup");
  sh.setColumnWidth(1,220);sh.setColumnWidth(2,300);sh.setColumnWidth(3,260);sh.setColumnWidth(4,200);sh.setColumnWidth(5,240);
  var row=1;
  hdr(sh,row,1,row,5,"WEEK SETUP  |  "+d.weekLabel,NAV);sh.setRowHeight(row,30);row++;
  spc(sh,row,5);row++;
  hdr(sh,row,1,row,5,"A  -  Week Details",SEC);sh.setRowHeight(row,22);row++;
  lbl(sh,row,1,"Start date");inp(sh,row,2,d.startDate||"");ntt(sh,row,3,"DD/MM/YY");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"End date");inp(sh,row,2,d.endDate||"");ntt(sh,row,3,"DD/MM/YY");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Week label");inp(sh,row,2,d.weekLabel||"");ntt(sh,row,3,"e.g. Week 3");sh.setRowHeight(row,18);row++;
  spc(sh,row,5);row++;
  hdr(sh,row,1,row,5,"B  -  Experiment Details",SEC);sh.setRowHeight(row,22);row++;
  lbl(sh,row,1,"Site");inp(sh,row,2,d.site||"");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Experiment Manager");inp(sh,row,2,d.experimentManager||"");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Safety Officer");inp(sh,row,2,d.safetyOfficer||"");sh.setRowHeight(row,18);row++;

  lbl(sh,row,1,"Overnight");inp(sh,row,2,d.overnight||"Yes");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Hostel");inp(sh,row,2,d.hostel||"");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Booked units");inp(sh,row,2,d.bookedUnits||"");sh.setRowHeight(row,18);row++;
  lbl(sh,row,1,"Trucks required");inp(sh,row,2,d.trucksRequired||"");sh.setRowHeight(row,18);row++;
  spc(sh,row,5);row++;
  hdr(sh,row,1,row,5,"C  -  Active Vehicles This Week",SEC);sh.setRowHeight(row,22);row++;
  var vh=["Vehicle","Active?","Trailer?","Commander","Notes"];
  for(var i=0;i<5;i++) sh.getRange(row,i+1).setValue(vh[i]).setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.setRowHeight(row,20);row++;
  var vl=[
    ["דוקאטו","Yes","No","שי ליסקובסקי",""],
    ["טנדר #1 + מתדלקת סולר","Yes","","",""],
    ["טנדר #2 + מתדלקת דסל - גדול","Yes","","",""],
    ["יונדאי I20 1","No","No","",""],
    ["יונדאי I20 2","No","No","",""],
    ["טויטה","Yes","No","",""],
    ["משאית 1 (hired)","Yes","No","","Driver + escort only"],
    ["מושכר 1 (rental)","No","No","",""],
    ["מושכר 2 (rental)","No","No","",""]
  ];
  for(var vi=0;vi<vl.length;vi++){
    var vr=vl[vi];
    lbl(sh,row,1,vr[0]);
    sh.getRange(row,2).setValue(vr[1]).setBackground(vr[1]==="Yes"?GRN:SRD).setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.getRange(row,3).setValue(vr[2]).setBackground(vr[2]!=="No"&&vr[2]!==""?WRN:INP).setHorizontalAlignment("center").setVerticalAlignment("middle");
    inp(sh,row,4,vr[3]);ntt(sh,row,5,vr[4]);sh.setRowHeight(row,18);row++;
  }
  spc(sh,row,5);row++;
  hdr(sh,row,1,row,5,"D  -  Rental Driving Restrictions",SEC);sh.setRowHeight(row,22);row++;
  lbl(sh,row,1,"Cannot drive rental:");
  sh.getRange(row,2).setValue("קירה פריגוז'ין").setBackground(WRN).setFontColor("#AA3300").setFontWeight("bold").setVerticalAlignment("middle");
  sh.setRowHeight(row,18);
}

function buildVehicles(ss,wl,days,vehicles){
  var sh=ss.insertSheet("Vehicle Plan");
  var nD=days.length,tc=2+nD*2,i,d,r;
  sh.setColumnWidth(1,200);sh.setColumnWidth(2,110);
  for(i=0;i<nD;i++){sh.setColumnWidth(3+i*2,180);sh.setColumnWidth(4+i*2,180);}
  var row=1;
  hdr(sh,row,1,row,tc,"VEHICLE PLAN  |  "+wl,RED);sh.setRowHeight(row,30);row++;
  sh.getRange(row,1).setValue("רכבים").setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.getRange(row,2).setValue("פרטים").setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  for(i=0;i<nD;i++) hdr(sh,row,3+i*2,row,4+i*2,days[i],RED);
  sh.setRowHeight(row,22);row++;
  sh.getRange(row,1).setBackground(RED);sh.getRange(row,2).setBackground(RED);
  for(i=0;i<nD;i++){
    sh.getRange(row,3+i*2).setValue("הלוך (Outbound)").setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.getRange(row,4+i*2).setValue("חזור (Return)").setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  }
  sh.setRowHeight(row,18);row++;
  var DL=["מסלול","שעות","מפקד רכב","נוסעים","נוסעים","הערות"];
  var DB=[ORG,LGR,SAL,YEL,YEL,F5];
  for(var vi=0;vi<vehicles.length;vi++){
    var v=vehicles[vi],vs=row;
    sh.getRange(vs,1,DL.length,1).merge();
    sh.getRange(vs,1).setValue(v.name).setBackground(v.trailerRequired?WRN:RED).setFontColor(v.trailerRequired?"#AA3300":WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
    for(var di=0;di<DL.length;di++){
      r=vs+di;
      sh.getRange(r,2).setValue(DL[di]).setBackground(SAL).setFontColor("#555555").setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");
      for(d=0;d<nD;d++){
        var dd=v.days[d]||{},oc=3+d*2,rc=4+d*2,ov="",rv="",ob=DB[di],rb=DB[di];
        if(DL[di]==="מסלול"){ov=dd.outRoute||"";rv=dd.retRoute||"";ob=ov?ORG:LGR;rb=rv?ORG:LGR;}
        else if(DL[di]==="שעות"){ov=dd.outTime||"";rv=dd.retTime||"";}
        else if(DL[di]==="מפקד רכב"){ov=dd.outCmd||"";rv=dd.retCmd||"";}
        else if(DL[di]==="נוסעים"){if(di===3){ov=dd.outP1||"";rv=dd.retP1||"";}else{ov=dd.outP2||"";rv=dd.retP2||"";}}
        else if(DL[di]==="הערות"){ov=dd.outNote||"";rv=dd.retNote||"";ob=rb=F5;}
        dc(sh,r,oc,ov,ob);dc(sh,r,rc,rv,rb);
      }
      sh.setRowHeight(r,18);
    }
    sh.getRange(row+DL.length,1,3,tc).setBackground(SPC);
    for(var s=0;s<3;s++) sh.setRowHeight(row+DL.length+s,6);
    row+=DL.length+3;
  }
  sh.setFrozenRows(3);
}

function buildStaffing(ss,wl,experiments){
  var sh=ss.insertSheet("איושים");
  var tdc=0,i,e,col;
  for(i=0;i<experiments.length;i++) tdc+=experiments[i].days.length;
  var tc=2+tdc;
  sh.setColumnWidth(1,170);sh.setColumnWidth(2,80);
  for(i=3;i<=tc;i++) sh.setColumnWidth(i,160);
  var row=1;
  hdr(sh,row,1,row,tc,wl,NAV);sh.setRowHeight(row,28);row++;
  sh.getRange(row,1).setBackground(NAV);sh.getRange(row,2).setBackground(NAV);
  col=3;
  for(i=0;i<experiments.length;i++){e=experiments[i];hdr(sh,row,col,row,col+e.days.length-1,e.name,NAV);col+=e.days.length;}
  sh.setRowHeight(row,22);row++;
  sh.getRange(row,1).setValue("תפקיד").setBackground(ORG).setFontColor("#000000").setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");
  sh.getRange(row,2).setValue("העמסות").setBackground(ORG).setFontColor("#000000").setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  col=3;
  for(i=0;i<experiments.length;i++){e=experiments[i];for(var di=0;di<e.days.length;di++){sh.getRange(row,col).setValue(e.days[di]).setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");col++;}}
  sh.setRowHeight(row,18);row++;
  var RL=["ניסוי מנהל","חוץ מטיס","חוץ מטיס","פנים מטיס","פנים מטיס","בקרה מהנדס","בקרה מהנדס","מוביל מהנדס","מהנדס","מטוסים טכנאי","מטוסים טכנאי","מטוסים טכנאי","בטיחות","אופרציה","אופרציה","אופרציה","לוגיסטיקה","לוגיסטיקה","לוגיסטיקה","קרקעי מערך","קרקעי מערך"];
  var LL=[false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,true,true,false,false,false];
  for(var ri=0;ri<RL.length;ri++){
    sh.getRange(row,1).setValue(RL[ri]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");
    sh.getRange(row,2).setValue(LL[ri]?"כן":"לא").setBackground(LL[ri]?ORG:LGR).setFontWeight(LL[ri]?"bold":"normal").setHorizontalAlignment("center").setVerticalAlignment("middle");
    col=3;
    for(i=0;i<experiments.length;i++){e=experiments[i];for(di=0;di<e.days.length;di++){
      var val="";
      if(e.prefill){for(var pi=0;pi<e.prefill.length;pi++){if(e.prefill[pi].role===RL[ri]&&e.prefill[pi].days[di]) val=e.prefill[pi].days[di];}}
      dc(sh,row,col,val,YEL);col++;
    }}
    sh.setRowHeight(row,18);row++;
  }
  sh.getRange(row,1).setValue('סה"כ').setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.getRange(row,2).setBackground(NAV);
  col=3;
  for(i=0;i<experiments.length;i++){e=experiments[i];for(di=0;di<e.days.length;di++){var cell=sh.getRange(row,col);cell.setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center");if(e.totals&&e.totals[di]) cell.setValue(e.totals[di]);col++;}}
  sh.setRowHeight(row,22);sh.setFrozenRows(3);
}

function buildAccommodation(ss,wl,acc){
  var sh=ss.insertSheet("שיבוצי לינה");
  var nN=acc.nights.length,tc=2+nN+1,i,n;
  sh.setColumnWidth(1,130);sh.setColumnWidth(2,100);
  for(n=0;n<nN;n++) sh.setColumnWidth(3+n,200);
  sh.setColumnWidth(3+nN,120);
  var row=1;
  hdr(sh,row,1,row,tc,"ACCOMMODATION  |  "+wl+"  |  "+acc.hostel,PUR);sh.setRowHeight(row,28);row++;
  sh.getRange(row,1).setValue("צימרים").setBackground(PUR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.getRange(row,2).setValue("חדרים").setBackground(PUR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  for(n=0;n<nN;n++) sh.getRange(row,3+n).setValue(acc.nights[n]).setBackground(PUR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.getRange(row,3+nN).setValue("ללא").setBackground(PUR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.setRowHeight(row,22);row++;
  for(i=0;i<acc.units.length;i++){
    var unit=acc.units[i],nr=unit.rooms.length;
    sh.getRange(row,1,nr,1).merge();
    sh.getRange(row,1).setValue(unit.name).setBackground(LAV).setFontColor("#3D2566").setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
    for(var ri=0;ri<unit.rooms.length;ri++){
      var room=unit.rooms[ri];
      sh.getRange(row,2).setValue(room.name+" (עד "+room.capacity+")").setBackground(LAV).setFontColor("#3D2566").setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
      for(n=0;n<nN;n++){var v=(room.nights&&room.nights[n])?room.nights[n].join("\n"):"";dc(sh,row,3+n,v,WHI);}
      dc(sh,row,3+nN,"",F5);sh.setRowHeight(row,20);row++;
    }
    spc(sh,row,tc);row++;
  }
  sh.getRange(row,1).setValue('סה"כ:').setFontWeight("bold").setBackground(LGR);
  sh.getRange(row,2).setBackground(LGR);
  for(n=0;n<nN;n++) sh.getRange(row,3+n).setValue(acc.nightTotals?acc.nightTotals[n]:0).setBackground(LGR).setFontWeight("bold").setHorizontalAlignment("center");
  sh.getRange(row,3+nN).setBackground(LGR);sh.setFrozenRows(2);
}


function buildTeamSheet(ss,wl){
  var sh=ss.insertSheet("צוות");
  sh.setColumnWidth(1,180);sh.setColumnWidth(2,160);sh.setColumnWidth(3,120);sh.setColumnWidth(4,90);sh.setColumnWidth(5,90);sh.setColumnWidth(6,90);
  var row=1;
  hdr(sh,row,1,row,6,"TEAM ROSTER  |  "+wl,NAV);sh.setRowHeight(row,28);row++;
  var hdrs=["שם מלא","תפקיד","צוות","העמסות","רשיון נגרר","מושכר"];
  for(var h=0;h<hdrs.length;h++){
    sh.getRange(row,h+1).setValue(hdrs[h]).setBackground(RED).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  }
  sh.setRowHeight(row,20);row++;

  // Full member DB from members.csv, grouped by team
  // [first, last, team, title, loads, trailer, rental]
  var MB=[
    ["ספי","","מנהלים ותפעול","","לא","לא","כן"],
    ["אופיר","דיין","מנהלים ותפעול","","לא","לא","כן"],
    ["ליאת","יניב","מנהלים ותפעול","","לא","לא","כן"],
    ["יוסף","בן יעקב","מנהלים ותפעול","","לא","לא","כן"],
    ["ליאור","השכל","מנהלים ותפעול","","לא","לא","כן"],
    ["שני","דושניק","מנהלים ותפעול","","לא","לא","כן"],
    ["רון","מרציאנו","מנהלים ותפעול","","לא","לא","כן"],
    ["נטע","אופיר הולטקוויסט","אופרציה","קצין בטיחות","כן","לא","כן"],
    ["יהב","גודל","אופרציה","","כן","כן","כן"],
    ["קירה","פריגוז'ין","אופרציה","","כן","לא","לא"],
    ["אריאל","אדרי","אופרציה","","לא","לא","כן"],
    ["תומר","דנגוט","לוגיסטיקה","","כן","כן","כן"],
    ["ג'ק","לויטס","לוגיסטיקה","","כן","לא","כן"],
    ["אברהם","רוטנר","לוגיסטיקה","","כן","כן","כן"],
    ["ארז","בן אורי","מהנדסים","","לא","לא","כן"],
    ["אסף","רוזן","מהנדסים","","לא","לא","כן"],
    ["רתם","לפיד","מהנדסים","","לא","לא","כן"],
    ["אסף","גרנות","מהנדסים","","לא","לא","כן"],
    ["אמיר","אבני","מהנדסים","","לא","לא","כן"],
    ["יריב","דה בוטון","מהנדסים","","לא","לא","כן"],
    ["נדב","מכבי","מהנדסים","","לא","לא","כן"],
    ["ניב","","מהנדסים","","לא","לא","כן"],
    ["בן","ארוטשס","מהנדסים","","לא","לא","כן"],
    ["עודד","וייס","מהנדסים","","לא","לא","כן"],
    ["רותם","מנור","מהנדסים","","לא","לא","כן"],
    ["שרון","רבינוביץ'","מהנדסים","","לא","לא","כן"],
    ["ירון","שולמי","מהנדסים","","לא","לא","כן"],
    ["אוהד","ענבר","מהנדסים","","לא","לא","כן"],
    ["אמיר","גבע","מהנדסים","","לא","לא","כן"],
    ["לאוניד","קוחנובסקי","מהנדסים","","לא","לא","כן"],
    ["טל","ריינדלר","מהנדסים","","לא","לא","כן"],
    ["נדב","דוד","מהנדסים","","לא","לא","כן"],
    ["שי","ליסקובסקי","אינטגרציה","טכנאי","כן","כן","כן"],
    ["עומר","שבירו","אינטגרציה","טכנאי","לא","לא","כן"],
    ["איתמר","זוכוביצקי","אינטגרציה","טכנאי","לא","לא","כן"],
    ["אסיף","שמש","אינטגרציה","טכנאי","כן","לא","כן"],
    ["אליאור","","אינטגרציה","טכנאי","כן","לא","כן"],
    ["מקסים","פלדמן","אינטגרציה","טכנאי","לא","לא","כן"],
    ["עומרי","אוזנה","אינטגרציה","טכנאי","לא","לא","כן"],
    ["גל","ליברמן","אינטגרציה","טכנאי","לא","לא","כן"],
    ["דניאל","מולגן","אינטגרציה","טכנאי","לא","לא","כן"],
    ["אסף","אלוש","מטיסים","מטיס חוץ","לא","לא","כן"],
    ["ליאור","זהבי","מטיסים","מטיס חוץ","לא","לא","כן"],
    ["רוי","שיבר","מטיסים","מטיס חוץ","לא","לא","כן"],
    ["אופיר","שטרנברג","מטיסים","מטיס חוץ","לא","לא","כן"],
    ["עומר","סלמנדר שבירו","מטיסים","מטיס חוץ","לא","לא","כן"],
    ["דן","שפית","מטיסים","מטיס פנים","לא","לא","כן"],
    ["תמיר","סננס","מטיסים","מטיס פנים","לא","לא","כן"],
    ["בר","שוורץ","מטיסים","מטיס פנים","לא","לא","כן"],
    ["עידן","נויברג","מטיסים","","לא","לא","כן"]
  ];

  var TEAMS=["מנהלים ותפעול","אופרציה","לוגיסטיקה","מהנדסים","אינטגרציה","מטיסים"];
  var TCOLORS=[NAV,RED,"#B7950B","#1E8449","#7D3C98","#1A5276"];

  for(var ti=0;ti<TEAMS.length;ti++){
    var team=TEAMS[ti],tcol=TCOLORS[ti];
    hdr(sh,row,1,row,6,team,tcol);sh.setRowHeight(row,20);row++;
    for(var mi=0;mi<MB.length;mi++){
      var m=MB[mi];
      if(m[2]!==team) continue;
      var fullName=(m[0]+(m[1]?" "+m[1]:"")).trim();
      sh.getRange(row,1).setValue(fullName).setBackground(WHI).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.getRange(row,2).setValue(m[3]||"").setBackground(YEL).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.getRange(row,3).setValue(m[2]).setBackground(INP).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.getRange(row,4).setValue(m[4]).setBackground(m[4]==="כן"?GRN:F5).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.getRange(row,5).setValue(m[5]).setBackground(m[5]==="כן"?GRN:F5).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.getRange(row,6).setValue(m[6]==="לא"?"לא (מושכר)":"כן").setBackground(m[6]==="לא"?SRD:GRN).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
      sh.setRowHeight(row,18);row++;
    }
    spc(sh,row,6);row++;
  }
  sh.setFrozenRows(2);
}

function doPost(e){
  try{
    var data=JSON.parse(e.postData.contents);
    var folder=DriveApp.getFolderById(FOLDER_ID);
    var ss=SpreadsheetApp.create(data.title||"Weekly Plan");
    DriveApp.getFileById(ss.getId()).moveTo(folder);
    var def=ss.getSheets()[0];
    buildWeekSetup(ss,data);
    if(data.vehicles) buildVehicles(ss,data.weekLabel,data.days,data.vehicles);
    if(data.staffing) buildStaffing(ss,data.weekLabel,data.staffing);
    if(data.accommodation) buildAccommodation(ss,data.weekLabel,data.accommodation);
    buildTeamSheet(ss,data.weekLabel);
    if(ss.getSheets().length>1) ss.deleteSheet(def);
    return ContentService.createTextOutput(JSON.stringify({status:"ok",url:ss.getUrl(),id:ss.getId()})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:"error",message:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function testCreate(){
  var data={
    title:"Ein_Yahav_01-06-26",weekLabel:"Ein Yahav  |  Sunday - Tuesday  |  01.06.26",
    startDate:"01/06/26",endDate:"03/06/26",site:"עין יהב",
    experimentManager:"ספי",safetyOfficer:"נטע אופיר הולטקוויסט",
    startDay:"ראשון",endDay:"שלישי",overnight:"Yes",
    hostel:"רגע בערבה",bookedUnits:"דירה, זוהר, בקתה 7, בקתה 8",trucksRequired:"1",
    days:["יום ראשון","יום שני","יום שלישי"],
    vehicles:[
      {name:"דוקאטו\nמספר רכב -",trailerRequired:false,days:[{outRoute:"תל אביב -> עין יהב",outTime:"ערב",outCmd:"שי ליסקובסקי",outP1:"אליאור"},{},{retRoute:"עין יהב -> תל אביב",retCmd:"שי ליסקובסקי",retP1:"אליאור"}]},
      {name:"טנדר #1\n+ מתדלקת סולר\nמספר רכב -",trailerRequired:true,days:[{outRoute:"תל אביב -> עין יהב",outTime:"ערב",outNote:"Trailer license required"},{},{retRoute:"עין יהב -> תל אביב",retNote:"Trailer license required"}]},
      {name:"טנדר #2\n+ מתדלקת דסל - גדול\nמספר רכב -",trailerRequired:true,days:[{outRoute:"תל אביב -> עין יהב",outTime:"ערב",outNote:"Trailer license required"},{},{retRoute:"עין יהב -> תל אביב",retNote:"Trailer license required"}]},
      {name:"טויטה\nמספר רכב -",trailerRequired:false,days:[{},{},{}]},
      {name:"משאית 1\nמושכרת",trailerRequired:false,days:[{outRoute:"תל אביב -> עין יהב",outNote:"Driver + escort only"},{},{retRoute:"עין יהב -> תל אביב",retNote:"Driver + escort only"}]},
      {name:"מושכר 1\nרכב רגיל",trailerRequired:false,days:[{outNote:"קירה cannot drive rental"},{},{}]}
    ],
    staffing:[{name:"עין יהב",days:["ראשון","שני","שלישי"],prefill:[{role:"ניסוי מנהל",days:["ספי","ספי","ספי"]},{role:"בטיחות",days:["נטע אופיר הולטקוויסט","נטע אופיר הולטקוויסט","נטע אופיר הולטקוויסט"]}],totals:[2,2,2]}],
    accommodation:{hostel:"רגע בערבה",nights:["לילה א (ראשון-שני)","לילה ב (שני-שלישי)"],nightTotals:[2,2],units:[
      {name:"דירה",rooms:[{name:"חדר 1",capacity:4,nights:[[],[]]},{name:"חדר 2",capacity:4,nights:[[],[]]},{name:"חדר 3",capacity:4,nights:[[],[]]},{name:"חדר 4",capacity:4,nights:[[],[]]}]},
      {name:"זוהר",rooms:[{name:"חדר 1",capacity:3,nights:[[],[]]},{name:"חדר 2",capacity:3,nights:[[],[]]},{name:"חדר 3",capacity:3,nights:[[],[]]}]},
      {name:"בקתה 7",rooms:[{name:"חדר 1",capacity:3,nights:[["ספי"],["ספי"]]},{name:"חדר 2",capacity:3,nights:[[],[]]}]},
      {name:"בקתה 8",rooms:[{name:"חדר 1",capacity:2,nights:[["נטע אופיר הולטקוויסט"],["נטע אופיר הולטקוויסט"]]},{name:"חדר 2",capacity:2,nights:[[],[]]}]},
      {name:"שיזף",rooms:[{name:"חדר 1",capacity:3,nights:[[],[]]},{name:"חדר 2",capacity:3,nights:[[],[]]}]}
    ]}
  };
  var folder=DriveApp.getFolderById(FOLDER_ID);
  var ss=SpreadsheetApp.create(data.title);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  var def=ss.getSheets()[0];
  buildWeekSetup(ss,data);
  buildVehicles(ss,data.weekLabel,data.days,data.vehicles);
  buildStaffing(ss,data.weekLabel,data.staffing);
  buildAccommodation(ss,data.weekLabel,data.accommodation);
  buildTeamSheet(ss,data.weekLabel);
  if(ss.getSheets().length>1) ss.deleteSheet(def);
  Logger.log("Created: "+ss.getUrl());
}