
var FOLDER_ID = "1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV";
var VEHICLE_SHEET_NAME = "שיבוצי רכבים";
var UPDATED_VEHICLE_SHEET_NAME = "מעודכן שיבוצי רכבים";
var ACCOMMODATION_SHEET_NAME = " שיבוצי לינה";
var FOOD_SHEET_NAME = "  הזמנות אוכל";
var PM_CHECKLIST_SHEET_NAME = "PM Checklist";
var NAV="#1F3864",RED="#922B21",ORG="#F4B942",YEL="#FFF2CC",SAL="#FCE4D6",LGR="#D9D9D9",SPC="#EBEBEB",PUR="#6B5B8B",LAV="#D9D2E9",WHI="#FFFFFF",WRN="#FFF2CC",F5="#F5F5F5",INP="#EBF5FB",FIX="#F2F3F4",SEC="#2E4057",GRN="#C6EFCE",SRD="#FADADD";

function wrap(){return SpreadsheetApp.WrapStrategy.WRAP;}
function getOrCreateSheet(ss,name){
  return ss.getSheetByName(name)||ss.insertSheet(name);
}
function resetSheet(sh,cols){
  sh.clear();
  sh.clearConditionalFormatRules();
  if(cols){
    for(var c=1;c<=cols;c++) sh.setColumnWidth(c,100);
  }
  sh.showSheet();
}
function hdr(sh,r1,c1,r2,c2,val,bg){
  if(r1!==r2||c1!==c2) sh.getRange(r1,c1,r2-r1+1,c2-c1+1).merge();
  sh.getRange(r1,c1).setValue(val).setBackground(bg).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
}
function lbl(sh,r,c,v){sh.getRange(r,c).setValue(v).setBackground(FIX).setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");}
function inp(sh,r,c,v,bg){sh.getRange(r,c).setValue(v||"").setBackground(bg||INP).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());}
function ntt(sh,r,c,v){sh.getRange(r,c).setValue(v||"").setBackground("#FAFAFA").setFontColor("#888888").setFontSize(9).setVerticalAlignment("middle");}
function spc(sh,r,n){sh.getRange(r,1,1,n).setBackground(SPC);sh.setRowHeight(r,6);}
function dc(sh,r,c,v,bg){sh.getRange(r,c).setValue(v||"").setBackground(bg||WHI).setVerticalAlignment("middle").setWrapStrategy(wrap());}
function foodItemName(item){return item.item||item.name||"";}
function foodItemPrice(item){
  return item.unitPrice!==undefined&&item.unitPrice!==""?item.unitPrice:(item.unit_price_nis!==undefined?item.unit_price_nis:"");
}
function foodItemUnit(item){return item.unit||"";}
function foodItemNotes(item){return item.notes||"";}
function defaultFoodCatalog(){
  return [
    {"item":"סיר ממולאים","unitPrice":330,"unit":"pot","notes":"בשרי/טבעוני; פלפל/כרוב"},
    {"item":"סיר יפרח","unitPrice":650,"unit":"pot","notes":"עלי גפן ובצלים ממולאים כל טוב; טבעוני"},
    {"item":"סיר קובה טבעוני/בשר","unitPrice":250,"unit":"pot","notes":"טבעוני/בשרי; 20 יחידות; מרק לבחירה"},
    {"item":"קוסקוס","unitPrice":250,"unit":"tray","notes":"4.5 ליטר מתאים לכ-10 סועדים"},
    {"item":"סיר מרק לקוסקוס","unitPrice":250,"unit":"pot","notes":""},
    {"item":"סיר מפרום","unitPrice":330,"unit":"pot","notes":"לצד הקוסקוס; תפוא ממולא בשר"},
    {"item":"סיר ירכי עוף עם גרגירי חומס","unitPrice":300,"unit":"pot","notes":"סיר 10 ירכי עוף עם גרגרי חומוס"},
    {"item":"סלט מיונז","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר; תפוא ביצה קשה ומלפפון חמוץ"},
    {"item":"סלט פלפל קלוי","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"מטבוחה","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"חצילים בטחינה/מיונז","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"סלק מרוקאי","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"גזק מרוקאי","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"חצילים בתחמיץ","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"סלט ביצים","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"כבד קצוץ","unitPrice":60,"unit":"box","notes":"סלטים מבושלים באריזה של חצי ליטר"},
    {"item":"צלי בקר","unitPrice":200,"unit":"liter","notes":"ליטר כ-4 פרוסות; גוש שלם 800 ש\"ח"},
    {"item":"שניצלים","unitPrice":17,"unit":"piece","notes":"מינימום 15 יחידות"},
    {"item":"קציצות בקר","unitPrice":300,"unit":"tray","notes":"ברוטב עגבניות עם שעועית ירוקה; מגש"},
    {"item":"פלוב בוכרי","unitPrice":550,"unit":"tray","notes":"4.5 ליטר"},
    {"item":"דגים מרוקאיים","unitPrice":250,"unit":"tray","notes":"250 ש\"ח ל-5 יחידות; תוספת דג 40 ש\"ח"},
    {"item":"סופריטו","unitPrice":300,"unit":"tray","notes":"תפוא וקציצות/עוף"},
    {"item":"פאי רועים","unitPrice":250,"unit":"tray","notes":""},
    {"item":"פדתאי תאילנדי צמחוני","unitPrice":150,"unit":"tray","notes":""},
    {"item":"פדתאי תאילנדי עוף","unitPrice":200,"unit":"tray","notes":""},
    {"item":"אורז/תפו\"א/פסטה ברוטב אדום","unitPrice":200,"unit":"tray","notes":"4.5 ליטר"},
    {"item":"מוקפץ איטריות אורז עוף/טופו","unitPrice":300,"unit":"tray","notes":"עוף או טופו לפי צורך"},
    {"item":"לביבות תפו\"א","unitPrice":150,"unit":"tray","notes":"15-20 יחידות"},
    {"item":"אורז פרסי ירוק","unitPrice":250,"unit":"tray","notes":"4.5 ליטר"},
    {"item":"סטייק פרגית","unitPrice":45,"unit":"piece","notes":"מינימום 8 יחידות"},
    {"item":"קובה","unitPrice":130,"unit":"piece","notes":"מינימום 10 יחידות"},
    {"item":"פשטידת מחמר מרוקאית","unitPrice":180,"unit":"tray","notes":""},
    {"item":"סלט ירקות","unitPrice":100,"unit":"tray","notes":"ליחידה"}
  ];
}
function mergedFoodCatalog(menu){
  var base=defaultFoodCatalog(),byName={},merged=[],i,name,item;
  for(i=0;i<base.length;i++){
    item=base[i];
    name=foodItemName(item);
    byName[name]=true;
    merged.push(item);
  }
  for(i=0;i<(menu||[]).length;i++){
    item=menu[i]||{};
    name=foodItemName(item);
    if(!name) continue;
    if(byName[name]){
      for(var mi=0;mi<merged.length;mi++){
        if(foodItemName(merged[mi])===name){
          merged[mi]={
            item:name,
            unitPrice:foodItemPrice(item)!==""?foodItemPrice(item):foodItemPrice(merged[mi]),
            unit:foodItemUnit(item)||foodItemUnit(merged[mi]),
            notes:foodItemNotes(item)||foodItemNotes(merged[mi])
          };
          break;
        }
      }
    }else{
      byName[name]=true;
      merged.push({
        item:name,
        unitPrice:foodItemPrice(item),
        unit:foodItemUnit(item),
        notes:foodItemNotes(item)
      });
    }
  }
  return merged;
}

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
    ["טויטה יאירס 1","No","No","",""],
    ["טויטה יאירס 2","No","No","",""],
    ["טויטה יאריס- יקנעם","No","No","",""],
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

function buildVehicles(ss,wl,days,vehicles,sheetName,hideSheetAfterBuild){
  var sh=getOrCreateSheet(ss,sheetName||VEHICLE_SHEET_NAME);
  resetSheet(sh,2+days.length*2);
  var nD=days.length,tc=2+nD*2,i,d,r;
  sh.setColumnWidth(1,200);sh.setColumnWidth(2,110);
  for(i=0;i<nD;i++){sh.setColumnWidth(3+i*2,180);sh.setColumnWidth(4+i*2,180);}
  var row=1;
  hdr(sh,row,1,row,tc,"📋  שיבוץ שבועי – הלוך / חזור ",RED);sh.setRowHeight(row,30);row++;
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
  if(hideSheetAfterBuild) sh.hideSheet();
  return sh;
}

function buildStaffing(ss,wl,experiments){
  var sh=getOrCreateSheet(ss,"איושים");
  resetSheet(sh,2+experiments.reduce(function(sum,e){return sum+e.days.length;},0));
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
  var bodyStartRow=row;
  var RL=["ניסוי מנהל","חוץ מטיס","חוץ מטיס","פנים מטיס","פנים מטיס","בקרה מהנדס","בקרה מהנדס","מוביל מהנדס","מהנדס","מטוסים טכנאי","מטוסים טכנאי","מטוסים טכנאי","בטיחות","אופרציה","אופרציה","אופרציה","לוגיסטיקה","לוגיסטיקה","לוגיסטיקה","קרקעי מערך","קרקעי מערך"];
  var LL=[false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,true,true,false,false,false];
  for(var ri=0;ri<RL.length;ri++){
    sh.getRange(row,1).setValue(RL[ri]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("right").setVerticalAlignment("middle");
    sh.getRange(row,2).setValue("").setBackground(YEL).setHorizontalAlignment("center").setVerticalAlignment("middle");
    col=3;
    for(i=0;i<experiments.length;i++){e=experiments[i];for(di=0;di<e.days.length;di++){
      var val="";
      if(e.prefill){for(var pi=0;pi<e.prefill.length;pi++){if(e.prefill[pi].role===RL[ri]&&e.prefill[pi].days[di]) val=e.prefill[pi].days[di];}}
      dc(sh,row,col,val,YEL);col++;
    }}
    sh.setRowHeight(row,18);row++;
  }
  var totalRow=row;
  sh.getRange(row,1).setValue('סה"כ').setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sh.getRange(row,2).setValue("").setBackground(NAV);
  col=3;
  for(i=0;i<experiments.length;i++){e=experiments[i];for(di=0;di<e.days.length;di++){var cell=sh.getRange(row,col);cell.setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center");if(e.totals&&e.totals[di]) cell.setValue(e.totals[di]);col++;}}
  if(tc>=3){
    sh.getRange(3,3,1,tc-2).setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.getRange(bodyStartRow,3,totalRow-bodyStartRow,tc-2).setBackground(YEL).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
    sh.getRange(totalRow,3,1,tc-2).setBackground(NAV).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  }
  sh.setRowHeight(row,22);sh.setFrozenRows(3);
}

function buildAccommodation(ss,wl,acc){
  var sh=getOrCreateSheet(ss,ACCOMMODATION_SHEET_NAME);
  resetSheet(sh,2+acc.nights.length+1);
  var nN=acc.nights.length,tc=2+nN+1,i,n;
  sh.setColumnWidth(1,130);sh.setColumnWidth(2,100);
  for(n=0;n<nN;n++) sh.setColumnWidth(3+n,200);
  sh.setColumnWidth(3+nN,120);
  var row=1;
  hdr(sh,row,1,row,tc,"צימרים",PUR);sh.setRowHeight(row,28);row++;
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
  for(n=0;n<nN;n++){
    var count=0;
    for(i=0;i<acc.units.length;i++){
      var rooms=acc.units[i].rooms||[];
      for(var roomIndex=0;roomIndex<rooms.length;roomIndex++){
        var roomNights=rooms[roomIndex].nights||[];
        var occupants=roomNights[n]||[];
        count+=occupants.length;
      }
    }
    sh.getRange(row,3+n).setValue(count).setBackground(LGR).setFontWeight("bold").setHorizontalAlignment("center");
  }
  sh.getRange(row,3+nN).setBackground(LGR);sh.setFrozenRows(2);
}

function buildFoodOrders(ss,wl,food){
  food=food||{};
  var sh=getOrCreateSheet(ss,FOOD_SHEET_NAME);
  resetSheet(sh,16);
  var tc=16,i,row;
  var widths=[220,170,90,18,90,110,90,90,160,220,90,90,110,120,110,260];
  for(i=0;i<widths.length;i++) sh.setColumnWidth(i+1,widths[i]);
  row=1;
  hdr(sh,row,1,row,tc,"הזמנות אוכל",SEC);sh.setRowHeight(row,28);row++;

  hdr(sh,row,1,row,3,"מיוחדים",RED);
  hdr(sh,row,5,row,16,"הזמנה",RED);
  sh.setRowHeight(row,22);row++;

  var shh=["הערות","Specials","Amount"];
  for(i=0;i<shh.length;i++) sh.getRange(row,1+i).setValue(shh[i]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  var oh=["תאריך","צהריים / ערב","אנשים","סטנדרטי","ספק","בחירת מנה","כמות","יחידה","מחיר ליחידה","סה\"כ","ערוץ הזמנה","הערות"];
  for(i=0;i<oh.length;i++) sh.getRange(row,5+i).setValue(oh[i]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  sh.setRowHeight(row,22);row++;

  var menu=mergedFoodCatalog(food.menuCatalog||food.fullMenu||food.menuItems||[]);
  var specials=food.specials||[];
  var orders=food.meals||food.orders||[];
  var orderStartRow=row;
  var maxRows=Math.max(specials.length,orders.length,8);
  for(i=0;i<maxRows;i++){
    if(specials[i]){
      dc(sh,row,1,specials[i].notes||"",WHI);
      dc(sh,row,2,specials[i].special||specials[i].Specials||"",specials[i].amount||specials[i].Amount?WRN:WHI);
      dc(sh,row,3,specials[i].amount||specials[i].Amount||0,specials[i].amount||specials[i].Amount?WRN:WHI);
    }
    if(orders[i]){
      var o=orders[i];
      var total=o.total||"";
      if(total===""&&o.amount&&o.unitPrice) total=Number(o.amount)*Number(o.unitPrice);
      dc(sh,row,5,o.date||"",WHI);
      dc(sh,row,6,o.meal||"",WHI);
      dc(sh,row,7,o.headcount||"",WHI);
      dc(sh,row,8,o.standardCount||"",WHI);
      dc(sh,row,9,o.vendor||"",WHI);
      dc(sh,row,10,o.item||"",WHI);
      dc(sh,row,11,o.amount||"",WHI);
      dc(sh,row,12,o.unit||"",WHI);
      dc(sh,row,13,o.unitPrice||"",WHI);
      dc(sh,row,14,total,WHI);
      dc(sh,row,15,o.orderChannel||o.channel||"",WHI);
      dc(sh,row,16,o.notes||"",WHI);
    }
    sh.setRowHeight(row,22);row++;
  }
  var catalogTitleRow=row+1;
  hdr(sh,catalogTitleRow,1,catalogTitleRow,4,"מחירון אוכל עין יהב",NAV);sh.setRowHeight(catalogTitleRow,24);
  var catalogHeaderRow=catalogTitleRow+1;
  var ch=["שם מנה","מחיר ליחידה","יחידה","הערות"];
  for(i=0;i<ch.length;i++) sh.getRange(catalogHeaderRow,1+i).setValue(ch[i]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  sh.setRowHeight(catalogHeaderRow,22);
  var catalogStartRow=catalogHeaderRow+1;
  for(i=0;i<menu.length;i++){
    dc(sh,catalogStartRow+i,1,foodItemName(menu[i]),WHI);
    dc(sh,catalogStartRow+i,2,foodItemPrice(menu[i]),WHI);
    dc(sh,catalogStartRow+i,3,foodItemUnit(menu[i]),WHI);
    dc(sh,catalogStartRow+i,4,foodItemNotes(menu[i]),WHI);
    sh.setRowHeight(catalogStartRow+i,22);
  }
  var catalogEndRow=catalogStartRow+Math.max(menu.length-1,0);
  if(menu.length){
    var itemValidation=SpreadsheetApp.newDataValidation().requireValueInRange(sh.getRange(catalogStartRow,1,menu.length,1),true).setAllowInvalid(true).build();
    sh.getRange(orderStartRow,10,maxRows,1).setDataValidation(itemValidation);
    for(i=0;i<maxRows;i++){
      var currentRow=orderStartRow+i;
      if(!sh.getRange(currentRow,12).getValue()) sh.getRange(currentRow,12).setFormula('=IF(J'+currentRow+'="","",IFERROR(VLOOKUP(J'+currentRow+',$A$'+catalogStartRow+':$D$'+catalogEndRow+',3,FALSE),""))');
      if(!sh.getRange(currentRow,13).getValue()) sh.getRange(currentRow,13).setFormula('=IF(J'+currentRow+'="","",IFERROR(VLOOKUP(J'+currentRow+',$A$'+catalogStartRow+':$D$'+catalogEndRow+',2,FALSE),""))');
      if(!sh.getRange(currentRow,14).getValue()) sh.getRange(currentRow,14).setFormula('=IF(OR(K'+currentRow+'="",M'+currentRow+'=""),"",K'+currentRow+'*M'+currentRow+')');
    }
  }
  sh.getRange(orderStartRow,13,maxRows,2).setNumberFormat('₪#,##0.00');
  if(menu.length) sh.getRange(catalogStartRow,2,menu.length,1).setNumberFormat('₪#,##0.00');
  sh.setFrozenRows(3);
}

function buildPmChecklist(ss,wl,items){
  items=items||[];
  var sh=getOrCreateSheet(ss,PM_CHECKLIST_SHEET_NAME);
  resetSheet(sh,9);
  var widths=[150,150,360,150,100,160,180,320,90];
  for(var i=0;i<widths.length;i++) sh.setColumnWidth(i+1,widths[i]);
  var row=1,tc=9;
  hdr(sh,row,1,row,tc,"PM CHECKLIST  |  "+wl,SEC);sh.setRowHeight(row,28);row++;
  var hh=["Category","Timing","Task","Owner","Status","Due / trigger","Related plan area","Notes","Blocking?"];
  for(i=0;i<hh.length;i++){
    sh.getRange(row,i+1).setValue(hh[i]).setBackground(ORG).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  }
  sh.setRowHeight(row,24);row++;
  if(items.length===0){
    dc(sh,row,1,"No checklist items provided",F5);
    sh.getRange(row,1,1,tc).merge().setHorizontalAlignment("center");
    sh.setRowHeight(row,24);
  }
  for(i=0;i<items.length;i++){
    var item=items[i]||{};
    var status=item.status||"Open";
    var isBlocking=item.blocking===true||String(item.blocking||"").toLowerCase()==="true"||String(item.blocking||"").toLowerCase()==="yes";
    var statusBg=status==="Done"?GRN:(status==="Blocked"?SRD:(status==="Verify"?WRN:WHI));
    dc(sh,row,1,item.category||"",WHI);
    dc(sh,row,2,item.timing||"",WHI);
    dc(sh,row,3,item.task||"",isBlocking?WRN:WHI);
    dc(sh,row,4,item.owner||"",WHI);
    dc(sh,row,5,status,statusBg);
    dc(sh,row,6,item.due||item.trigger||"",WHI);
    dc(sh,row,7,item.relatedPlanArea||"",F5);
    dc(sh,row,8,item.notes||"",WHI);
    dc(sh,row,9,isBlocking?"Yes":"No",isBlocking?SRD:GRN);
    sh.getRange(row,5).setHorizontalAlignment("center");
    sh.getRange(row,9).setHorizontalAlignment("center").setFontWeight("bold");
    sh.setRowHeight(row,28);row++;
  }
  sh.setFrozenRows(2);
  return sh;
}


function buildTeamSheet(ss,wl){
  var sh=getOrCreateSheet(ss,"צוות");
  resetSheet(sh,6);
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

var MONTH_NAMES_HE=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
var DAY_NAMES_HE=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
var CAL_BLUE="#315A89",CAL_HDR="#D3E2FF",CAL_DATE="#F8F8FF",CAL_LOC="#D9EAD3",CAL_ROW="#D9D9D9",CAL_GROUP="#CCCCCC",CAL_REQ="#D9D9D9",CAL_CONSTRAINT_LABEL="#E0E0E0",CAL_CONSTRAINT="#FAFAFA",CAL_WRAP="#A4C2F4",CAL_TASK_HDR="#4A525D",CAL_TASK_SUB="#E0E3E8";

function pad2(n){return n<10?"0"+n:String(n);}
function dateKey(d){return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate());}
function listText(v){
  if(!v) return "";
  if(Object.prototype.toString.call(v)==="[object Array]") return v.map(function(x){return "- "+String(x).replace(/^\s*-\s*/,"");}).join("\n");
  return String(v);
}
function indexByDate(items){
  var by={},i,it,k;
  for(i=0;i<(items||[]).length;i++){
    it=items[i]||{}; k=it.date||it.day||"";
    if(!k) continue;
    if(!by[k]) by[k]=[];
    by[k].push(it);
  }
  return by;
}
function itemsText(items,field){
  var out=[],i,j,v;
  for(i=0;i<(items||[]).length;i++){
    v=items[i][field];
    if(!v) continue;
    if(Object.prototype.toString.call(v)==="[object Array]"){
      for(j=0;j<v.length;j++) if(v[j]) out.push(v[j]);
    }else{
      out.push(v);
    }
  }
  return listText(out);
}
function monthCalendarDefaults(d){
  d=d||{};
  var now=new Date(),m=Number(d.month||now.getMonth()+1),y=Number(d.year||now.getFullYear());
  return {
    year:y,month:m,
    title:d.title||("חודש "+MONTH_NAMES_HE[m-1]+" - גאנט ניסויים"),
    tabName:d.tabName||(MONTH_NAMES_HE[m-1]+" Calendar"),
    airstrips:d.airstrips||[],
    envelopes:d.envelopes||[],
    tasks:d.tasks||[],
    entries:d.entries||[]
  };
}
function extractDriveFolderId(v){
  if(!v) return "";
  v=String(v);
  var m=v.match(/\/folders\/([A-Za-z0-9_-]+)/);
  if(m) return m[1];
  m=v.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if(m) return m[1];
  return v;
}
function buildMonthCalendar(ss,data){
  var d=monthCalendarDefaults(data),sh=getOrCreateSheet(ss,d.tabName),i,w,c,r,dt,k,entries,byDate=indexByDate(d.entries);
  resetSheet(sh,20);
  sh.getRange(1,1,60,20).breakApart();
  sh.setRightToLeft(true);
  sh.setColumnWidth(1,145);
  for(c=2;c<=8;c++) sh.setColumnWidth(c,140);
  sh.setColumnWidth(9,18);
  sh.setColumnWidths(10,2,118);
  sh.setColumnWidth(12,46);
  sh.setColumnWidth(13,118);
  sh.setColumnWidths(14,2,46);
  sh.setColumnWidth(16,190);sh.setColumnWidth(17,82);sh.setColumnWidth(18,180);
  sh.setColumnWidths(19,2,46);

  hdr(sh,2,2,2,8,d.title,CAL_BLUE);
  sh.getRange(3,1,1,8).setBackground(CAL_HDR).setFontWeight("bold");
  for(i=0;i<DAY_NAMES_HE.length;i++) sh.getRange(3,2+i).setValue(DAY_NAMES_HE[i]);
  sh.getRange(1,1,60,8).setHorizontalAlignment("right").setVerticalAlignment("middle").setWrapStrategy(wrap());

  var first=new Date(d.year,d.month-1,1),start=new Date(first);
  start.setDate(first.getDate()-first.getDay());
  var labels=["","מנחת","תכולות","דרישות","גופים","אילוצי אופרציה","","","מעטפת"];
  for(w=0;w<6;w++){
    r=4+w*9;
    for(i=0;i<labels.length;i++) sh.getRange(r+i,1).setValue(labels[i]);
    sh.getRange(r+5,1,3,1).merge().setValue("אילוצי אופרציה");
    sh.getRange(r,1,1,8).setBackground(CAL_DATE);
    sh.getRange(r+1,1,1,8).setBackground(WHI);
    sh.getRange(r+2,1,1,8).setBackground(WHI);
    sh.getRange(r+3,1,1,8).setBackground(WHI);
    sh.getRange(r+4,1,1,8).setBackground(WHI);
    sh.getRange(r+5,1,3,1).setBackground(CAL_CONSTRAINT_LABEL).setFontWeight("normal").setFontSize(9);
    sh.getRange(r+5,2,3,7).setBackground(CAL_CONSTRAINT).setFontWeight("normal");
    sh.getRange(r+8,1,1,8).setBackground(WHI);
    sh.getRange(r+1,1).setBackground("#EFEFEF");
    sh.getRange(r+2,1).setBackground(CAL_ROW);
    sh.getRange(r+3,1).setBackground(CAL_REQ);
    sh.getRange(r+4,1).setBackground(CAL_GROUP);
    sh.getRange(r+8,1).setBackground("#B7B7B7");
    sh.setRowHeight(r,22);
    sh.setRowHeight(r+1,30);
    sh.setRowHeight(r+2,78);
    sh.setRowHeight(r+3,66);
    sh.setRowHeight(r+4,66);
    sh.setRowHeights(r+5,3,34);
    sh.setRowHeight(r+8,34);
    for(c=0;c<7;c++){
      dt=new Date(start);dt.setDate(start.getDate()+w*7+c);k=dateKey(dt);entries=byDate[k]||[];
      sh.getRange(r,2+c).setValue(dt.getDate()).setBackground(dt.getMonth()+1===d.month?CAL_DATE:"#EFEFEF");
      sh.getRange(r+1,2+c).setValue(itemsText(entries,"airstrip")).setBackground(itemsText(entries,"airstrip")?CAL_LOC:WHI);
      sh.getRange(r+2,2+c).setValue(itemsText(entries,"contents"));
      sh.getRange(r+3,2+c).setValue(itemsText(entries,"requirements"));
      sh.getRange(r+4,2+c).setValue(itemsText(entries,"assets"));
      sh.getRange(r+5,2+c).setValue(itemsText(entries,"operationsConstraints"));
      sh.getRange(r+6,2+c).setValue(itemsText(entries,"operationsConstraints2")||itemsText(entries,"technicianConstraints"));
      sh.getRange(r+7,2+c).setValue(itemsText(entries,"operationsConstraints3")||itemsText(entries,"pilotConstraints"));
      sh.getRange(r+8,2+c).setValue(itemsText(entries,"envelope")).setBackground(itemsText(entries,"envelope")?CAL_WRAP:WHI);
    }
  }
  sh.getRange(1,1,60,8).setBorder(true,true,true,true,true,true,"#E5E5E5",SpreadsheetApp.BorderStyle.SOLID);

  sh.getRange(3,10,1,2).merge().setValue("מנחתים").setBackground(CAL_TASK_HDR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center");
  sh.getRange(4,10,3,2).setValues([[d.airstrips[0]||"עין יהב",d.airstrips[1]||"מטווח 24"],[d.airstrips[2]||"קציעות",d.airstrips[3]||"מבוא חורון"],["",""]]).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  sh.getRange(3,13).setValue("מעטפת").setBackground(CAL_TASK_HDR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center");
  sh.getRange(4,13,3,1).setValues([[(d.envelopes[0]||"רת״א")],[(d.envelopes[1]||"חיל אוויר")],[""]]).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(wrap());
  sh.getRange(2,16,1,3).merge().setValue("משימות פתוחות").setBackground(CAL_TASK_HDR).setFontColor(WHI).setFontWeight("bold").setHorizontalAlignment("center");
  sh.getRange(3,16,1,3).setValues([["משימה","שבוע","הערות"]]).setBackground(CAL_TASK_SUB).setFontWeight("bold").setHorizontalAlignment("center");
  var taskRows=[];
  for(i=0;i<31;i++){
    var t=(d.tasks||[])[i]||{};
    taskRows.push([t.task||t.name||"",t.week||"",t.notes||""]);
  }
  sh.getRange(4,16,31,3).setValues(taskRows).setHorizontalAlignment("right").setVerticalAlignment("middle").setWrapStrategy(wrap());
  sh.getRange(2,16,33,3).setBorder(true,true,true,true,true,true,"#D8D8D8",SpreadsheetApp.BorderStyle.SOLID);
  sh.getRange(3,10,4,2).setBorder(true,true,true,true,true,true,"#D8D8D8",SpreadsheetApp.BorderStyle.SOLID);
  sh.getRange(3,13,4,1).setBorder(true,true,true,true,true,true,"#D8D8D8",SpreadsheetApp.BorderStyle.SOLID);
  sh.setFrozenRows(3);
  return sh;
}

function renderPlan(data){
  data=data||{};
  var folderId=extractDriveFolderId(data.folderId||data.folderUrl||FOLDER_ID);
  var folder=DriveApp.getFolderById(folderId);
  var ss=SpreadsheetApp.create(data.title||"Weekly Plan");
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  var def=ss.getSheets()[0];
  if(data.monthCalendar) buildMonthCalendar(ss,data.monthCalendar);
  if(data.staffing) buildStaffing(ss,data.weekLabel,data.staffing);
  if(data.vehicles){
    buildVehicles(ss,data.weekLabel,data.days,data.vehicles,VEHICLE_SHEET_NAME,true);
    buildVehicles(ss,data.weekLabel,data.days,data.vehicles,UPDATED_VEHICLE_SHEET_NAME,false);
  }
  if(data.accommodation) buildAccommodation(ss,data.weekLabel,data.accommodation);
  if(data.foodOrders) buildFoodOrders(ss,data.weekLabel,data.foodOrders);
  if(data.pmChecklist) buildPmChecklist(ss,data.weekLabel,data.pmChecklist).hideSheet();
  if(ss.getSheetByName("Week Setup")) ss.deleteSheet(ss.getSheetByName("Week Setup"));
  if(ss.getSheetByName("Vehicle Plan")) ss.deleteSheet(ss.getSheetByName("Vehicle Plan"));
  if(ss.getSheetByName("צוות")) ss.deleteSheet(ss.getSheetByName("צוות"));
  if(ss.getSheets().length>1) ss.deleteSheet(def);
  return {url:ss.getUrl(),id:ss.getId()};
}

function doPost(e){
  try{
    var data=JSON.parse(e.postData.contents);
    var result=renderPlan(data);
    return ContentService.createTextOutput(JSON.stringify({status:"ok",url:result.url,id:result.id})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:"error",message:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function testCreate(){
  var data={
    title:"00-00.00_plan",weekLabel:"Template Week",
    startDate:"",endDate:"",site:"",
    experimentManager:"",safetyOfficer:"",
    overnight:"Yes",
    hostel:"",bookedUnits:"",trucksRequired:"",
    days:["יום ראשון","יום שני","יום שלישי"],
    vehicles:[
      {name:"דוקאטו\nמספר רכב -",trailerRequired:false,days:[{},{},{}]},
      {name:"טנדר #1\n+ מתדלקת סולר\nמספר רכב -",trailerRequired:true,days:[{},{},{}]},
      {name:"טנדר #2\n+ מתדלקת דסל - גדול\nמספר רכב -",trailerRequired:true,days:[{},{},{}]},
      {name:"טויטה\nמספר רכב -",trailerRequired:false,days:[{},{},{}]},
      {name:"משאית 1\nמושכרת",trailerRequired:false,days:[{},{},{}]},
      {name:"מושכר 1\nרכב רגיל",trailerRequired:false,days:[{},{},{}]}
    ],
    staffing:[{name:"אתר ניסוי",days:["ראשון","שני","שלישי"],prefill:[],totals:[]}],
    accommodation:{hostel:"רגע בערבה",nights:["לילה א (ראשון-שני)","לילה ב (שני-שלישי)"],nightTotals:[2,2],units:[
      {name:"דירה",rooms:[{name:"חדר 1",capacity:4,nights:[[],[]]},{name:"חדר 2",capacity:4,nights:[[],[]]},{name:"חדר 3",capacity:4,nights:[[],[]]},{name:"חדר 4",capacity:4,nights:[[],[]]}]},
      {name:"זוהר",rooms:[{name:"חדר 1",capacity:3,nights:[[],[]]},{name:"חדר 2",capacity:3,nights:[[],[]]},{name:"חדר 3",capacity:3,nights:[[],[]]}]},
      {name:"בקתה 7",rooms:[{name:"חדר 1",capacity:3,nights:[[],[]]},{name:"חדר 2",capacity:3,nights:[[],[]]}]},
      {name:"בקתה 8",rooms:[{name:"חדר 1",capacity:2,nights:[[],[]]},{name:"חדר 2",capacity:2,nights:[[],[]]}]},
      {name:"שיזף",rooms:[{name:"חדר 1",capacity:3,nights:[[],[]]},{name:"חדר 2",capacity:3,nights:[[],[]]}]}
    ]},
    foodOrders:{
      specials:[
        {special:"Vegan",amount:0},
        {special:"Vegetarian",amount:0},
        {special:"Pescatarian",amount:1},
        {special:"Gluten Free",amount:1},
        {special:"Keto",amount:1},
        {special:"Lactose Free",amount:0}
      ],
      menuItems:[
        {item:"שניצלים",unitPrice:17,notes:"מינימום 15 יחידות"},
        {item:"סטייק פרגית",unitPrice:45,notes:"מינימום 8 יחידות"},
        {item:"אורז/תפו\"א/פסטה ברוטב אדום",unitPrice:200,notes:"4.5 ליטר"},
        {item:"סלט ירקות",unitPrice:100,notes:"ליחידה"}
      ],
      meals:[]
    },
    pmChecklist:[]
  };
  var result=renderPlan(data);
  Logger.log("Created: "+result.url);
}
