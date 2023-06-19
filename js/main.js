// let config = {
//     text:{
//         mobile:{},
//         desktop:{}
//     },
//     total_text_Row:0,
//     // totalCta:0,  
//     // titleRow:[]
// }


let config = {
    desktop:{
        text:{},
        cta:{}
    },
    mobile:{
        text:{},
        cta:{}
    },    
    total_text_Row:0,
    total_cta_Row:0,  
    // titleRow:[]
}

let tableConatiner = document.getElementById("tableBlock");


// =============================== Common Functions =====================================


// const css = {
//     text: {
//        head1: {
//           fontSize: "50",
//           lineHeight: "70",
//           fontWeight: 'bold',
//           color: '#dadada'
//        },
//        head2: {
//           fontSize: "33",
//           lineHeight: "44"
//        }
//     },
 
//     cta: {
//        cta1: {
//           fontSize: "60",
//           lineHeight: "50"
//        }
//     }
//  };
 
// let loadInFrame = document.getElementById('loadInFrame').innerHTML;
// let iframe = document.getElementById('iframe').src = loadInFrame ;


 const isObject = (val) => {
    if (val === null) {
       return false;
    }
    return typeof val === 'object';
 };

 const mobileMediaCss = (obj) => {
    let getFinalCss = null;
    let mobileCss = '';

    const appendCSS = () => {
       let finalAppendCss = document.getElementById('mobileMedia').innerHTML = `  ${getFinalCss}  `
       console.log(finalAppendCss, 'finalAppendCss')
    };

    for (const key in obj) {
       if (isObject(obj[key])) {
          /* console.log(obj, 'obj[key]') */
          for (const innerKey in obj[key]) {
             /* console.log(innerKey, 'inner+' ); */
             const styleToString = Object.entries(obj[key][innerKey]).map(([k, v]) => `${k.split(/(?=[A-Z])/).join('-').toLowerCase()}: ${isNaN(v) ? v : `${v}px` } !important`).join(';')
 
            //  console.log(styleToString , 'styleToString')

              mobileCss +=  '.isMobile ' + `#${innerKey}{` + styleToString + `} \n` 
             let appendMobileCss = document.getElementById('mobileMedia').innerHTML = mobileCss
             getFinalCss = appendMobileCss

            //  console.log(getFinalCss , 'getFinalCss')
          }
       }
       /* else {console.log(`${key} : ${obj[key]}`);} */
    }
    appendCSS()

 };
 

function innerText (id,currentActiveEle){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.cta') : document.getElementById(currentActiveEle);
    currentEle.innerHTML = txtInput.value 
    // updateObj();
}

function cssChange (id,currentActiveEle, getCssProp,row_count,section,innerClass){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.cta') : document.getElementById(currentActiveEle);

    if(tableConatiner.style.width == '600px') currentEle.style[getCssProp] = txtInput.value + "px"


    if(id == 'cta_Size'){
        // alert('hi');
        updateObj(id,currentActiveEle, getCssProp,row_count,section, innerClass);
    }else{
        updateObj(id,currentActiveEle,getCssProp,row_count,section);
    }
}

function textTransform(id,currentActiveEle,getCssProp,row_count,section){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.cta')  : document.getElementById(currentActiveEle) ;
    currentEle.innerHTML = txtInput.value === "Yes" ? currentEle.innerHTML.toUpperCase() : currentEle.innerHTML.toLowerCase();
    
    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}

function textItalic(id,currentActiveEle,getCssProp,row_count,section){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.cta')  : document.getElementById(currentActiveEle) ;
    currentEle.style[getCssProp] = txtInput.value == "Yes" ? "Italic" : "inherit";
    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}

// text/cta color and wrapper table/ cta background change
function color_bg_change(id,currentActiveEle,getCssProp,hex_inpput,row_count,section){
    let txtInput = document.getElementById(id);
    let hexInput = document.getElementById(hex_inpput);
    let color = txtInput.value;
    hexInput.value = color;

    if(txtInput.id.startsWith('cta')){
        let currentEle = document.getElementById(currentActiveEle).querySelector('.cta')
        currentEle.style[getCssProp] = color;
        console.log('.cta');
    }else if (txtInput.id.startsWith('bgCta')){
        let currentEle = document.getElementById(currentActiveEle).querySelector('.ctaWrap')
        currentEle.style[getCssProp] = color;
        console.log('.ctaWrap');
    }else{  
        let currentEle =  document.getElementById(currentActiveEle)
        // currentEle.style[getCssProp] = color;
        if(tableConatiner.style.width == '600px') currentEle.style[getCssProp] = color
        console.log('default');
    }
   
    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}

function gredientBg (id,currentActiveEle,getCssProp,row_count,section){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta') ? document.getElementById(currentActiveEle_cta).querySelector('.ctaWrap') : document.getElementById(currentActiveEle);
    currentEle.style.cssText += txtInput.value ;

    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}

// background image 
function bgImage(id,currentActiveEle,getCssProp,row_count,section){
    let txtInput = document.getElementById(id);
    let [file] = txtInput.files
    if (file) {
        let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.cta') :  document.getElementById(currentActiveEle);
        currentEle.style[getCssProp]  =  "url(" + URL.createObjectURL(file) + ") no-repeat" 
    };
    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}

function bgPos (id,currentActiveEle,getCssProp,posId,row_count,section){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ?  document.getElementById(currentActiveEle).querySelector('.cta') :  document.getElementById(currentActiveEle) ;
    let pos_unit = document.getElementById(posId);
    let pos = pos_unit.value;
    currentEle.style[getCssProp] = txtInput.value + pos

    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}
function bgPosUnit (currentActiveEle,getCssProp,posId,row_count,section){
    let txt_id = document.getElementById(currentActiveEle);
    let getStyle_txt = getComputedStyle(txt_id);     
    let pos_unit = document.getElementById(posId);
    let get_unit_Val = getStyle_txt[getCssProp];
    let get_unit = get_unit_Val.replace(/\d/g, "");
    pos_unit.value = get_unit;

    updateObj(currentActiveEle,getCssProp,row_count,section);

}
// background image  end

function imgSrc(id,currentActiveEle){
    let txtInput = document.getElementById(id);
    let [file] = txtInput.files
    if (file) {
        let currentEle = txtInput.id.startsWith('cta') ? document.getElementById(currentActiveEle).querySelector('.arrowImage') :  document.getElementById(currentActiveEle);
        currentEle.src  =  URL.createObjectURL(file) 
    };
    // updateObj();
}

function imgAttr (id,currentActiveEle,getCssProp,row_count,section){
    let txtInput = document.getElementById(id);
    let currentEle = txtInput.id.startsWith('cta_') ? document.getElementById(currentActiveEle).querySelector('.arrowImage') : document.getElementById(currentActiveEle);
    currentEle[getCssProp] = txtInput.value 
    
    updateObj(id,currentActiveEle,getCssProp,row_count,section);
}


function toggleView (id,txtInputVal,currentActiveEle, getCssProp,section){
    // let getAllEleMob = Object.keys(config.text.mobile)
        let contWrap = document.querySelectorAll(".mobWrp");
        // let getActiveEleOnSwitch = document.getElementById(currentActiveEle);
    
        if(id == 'mobView'){

            contWrap.forEach(cls => {
                cls.style.width = '320px';
    
                document.getElementsByTagName('body')[0].classList = ' isMobile '

                // if(!txtInputVal.files) {
                //     txtInputVal.value = !config.mobile[section][currentActiveEle] ? config.desktop[section][currentActiveEle][getCssProp] :  config.mobile[section][currentActiveEle][getCssProp];
                // }
                // getActiveEleOnSwitch.style[getCssProp] = txtInputVal.value + "px" 
    
            });
        } else{
            contWrap.forEach(cls => {
                cls.style.width = '600px';
    
                document.getElementsByTagName('body')[0].classList = '  '


                // if(!txtInputVal.files) {
                //     txtInputVal.value = config.desktop[section][currentActiveEle][getCssProp];
                // }
    
                // let getAllEleDesk = config.text.desktop ;
                // let getKey = Object.keys(getAllEleDesk)
    
                // for (var i = 0; i < getKey.length; i++) {
                //     // let getActiveEleOnSwitch = document.querySelectorAll('head'[i]);
                //     // console.log(getKey.length);
                //     getKey.forEach(arrayEle => {
                //         arrayEle.style[getCssProp] = txtInputVal.value + "px"
                //     });
                // }
    
                    
            });
    
        }   
    }

    function updateObj(id,currentActiveEle,getCssProp,row_count,section) { 
        
        let mobWidth;
        let mobView = document.querySelectorAll(".mobWrp");
        mobView.forEach(e => {mobWidth = e.style.width;});

        let txtInput = document.getElementById(id);

        for(i = 1; i <= config[row_count]; i++){

            if (mobWidth == '320px'){

                    if(!config.mobile[section][currentActiveEle]) config.mobile[section][currentActiveEle] = {}
                    config.mobile[section][currentActiveEle][getCssProp] = txtInput.value ;

                    // if(config.mobile[section][currentActiveEle][innerClass]) config.mobile[section][currentActiveEle][innerClass] = {}
                    // config.mobile[section][currentActiveEle][innerClass][getCssProp] = txtInput.value ;

                    mobileMediaCss(config.mobile);

                }
             else{
                    if(!config.desktop[section][currentActiveEle]) config.desktop[section][currentActiveEle] = {}
                    config.desktop[section][currentActiveEle][getCssProp] = txtInput.value;
            }    
        }

    }        

    
// =============================== Common Functions End =====================================


// =============================== Current Active  =====================================
function ele_active (){    
    let activeEdit = document.querySelectorAll('.active_edit');
    activeEdit.forEach(active_edit => {
        active_edit.addEventListener('click', function () {
            activeEdit.forEach(btnClick => btnClick.classList.remove('active'));
            this.classList.add('active');
        });
    });  
}
// =============================== Current Active  =====================================

// =============================== Wrapper Bg =====================================
let wrapperBg = document.getElementById("wrapBg").addEventListener("change", () => { bgImage('wrapBg','tableBlock','background')});
let wrapBg_pos_x = document.getElementById("wrapBg_posx").addEventListener("change", () => { bgPos('wrapBg_posx','tableBlock','backgroundPositionX', 'wrapBgPos_x_drop')});
let wrapBg_pos_y = document.getElementById("wrapBg_posy").addEventListener("change", () => { bgPos('wrapBg_posy','tableBlock','backgroundPositionY', 'wrapBgPos_y_drop')});
// =============================== Wrapper Bg End  =====================================

// =============================== Vertical Space  =====================================
function vSpace() {
    //    
    let newHTMLTOappend = `<tr><td align="left" height="30" class="extSpace v_space active_edit" id="spacer" onClick="get_vSpace_id(this.id)" style="position:relative" data-toggle="collapse" data-target="#collapseTwo"></td></tr>`
    let currentHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentHTML + newHTMLTOappend;
    //
    let trs = document.getElementsByClassName("v_space");
    for (let i = 0; i < trs.length; i++) {
        let tr = trs[i] ;
        tr.setAttribute("id", "spacer"+ ( i + 1 ));
    }     

}

let lastUsed = null;
function get_vSpace_id(clicked_id) {
    lastUsed = clicked_id;
    ele_active();

    // Height Change
    let spaceInput = document.getElementById("spacerInput");
    spaceInput.addEventListener('input', () => {
        let v_spacer = document.getElementById(lastUsed);
        console.log(v_spacer);
        v_spacer.height = spaceInput.value;
    });

    let get_spaceInput = document.getElementById(lastUsed);
    let set_spaceInput = getComputedStyle(get_spaceInput);   
    spaceInput.value = parseInt(set_spaceInput.height); 
}

// =============================== Vertical Space End =====================================


// =============================== Txt Block =====================================

function txtBlock() {
    let newTextAppend = `<tr>
                <td align="center" class="active_edit">
                    <span class="topSize" id="head1" style="font-size:36px;color:#000000;font-weight:700;letter-spacing:normal;font-family:Poppins,Arial,sans-serif;line-height:54px;text-decoration: none;display: block;padding:0 10px;position: relative;text-transform: none;" onClick="get_mHead_id(this.id)" data-toggle="collapse" data-target="#collapseThree">Job Opportunity at Hilton</span>
                </td>
            </tr>`
    let currentTextHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentTextHTML + newTextAppend;

    let head_txt = document.getElementsByClassName("topSize");
    for (let i = 0; i < head_txt.length; i++) {
        let tr = head_txt[i] ;
        tr.setAttribute("id", "head"+ ( i + 1 ));
        config.total_text_Row = ( i + 1 );
        // console.log(config)
    }     
}

let currentActiveEle_txt = null;
function get_mHead_id(clicked_id_txt){
    // prevClickedHead = currentActiveEle_txt;

    ele_active();

    currentActiveEle_txt = clicked_id_txt;
    fontPreview = document.getElementById(currentActiveEle_txt);
    
    let txt_id = document.getElementById(currentActiveEle_txt);
    let getStyle_txt = getComputedStyle(txt_id); 



    function updatecssValue (id, getCssProp){

        let mob_View = document.getElementById("mobView")
        mob_View.addEventListener("click", function() {toggleView('mobView')});
        let desk_view = document.getElementById("deskView")
        desk_view.addEventListener("click", function() {toggleView('deskView')});
        
        
        let txtInput = document.getElementById(id);
        txtInput.addEventListener('input', (e) => {
            if(e.currentTarget.id == "fSize1") cssChange('fSize1',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "lHeight") cssChange('lHeight',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "lSpacing") cssChange('lSpacing',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "paddTop") cssChange('paddTop',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "paddBtm") cssChange('paddBtm',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "paddLeft") cssChange('paddLeft',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "paddRight") cssChange('paddRight',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "uCase") textTransform('uCase',currentActiveEle_txt,'textTransform','total_text_Row','text');
            if(e.currentTarget.id == "txtBg") bgImage('txtBg',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "bg_pos_x")bgPos ('bg_pos_x',currentActiveEle_txt, getCssProp,'pos_x_drop','total_text_Row','text');
            if(e.currentTarget.id == "bg_pos_y")bgPos ('bg_pos_y',currentActiveEle_txt, getCssProp,'pos_y_drop','total_text_Row','text');
            if(e.currentTarget.id == "tItalic") textItalic('tItalic',currentActiveEle_txt, getCssProp,'total_text_Row','text');
            if(e.currentTarget.id == "color") color_bg_change('color',currentActiveEle_txt, getCssProp,'hex','total_text_Row','text');
            if(e.currentTarget.id == "txtInput") innerText('txtInput',currentActiveEle_txt);
        });

        if(id == "fSize1") { txtInput.value = parseInt(getStyle_txt.fontSize);}
        if(id == "lHeight") txtInput.value = parseInt(getStyle_txt.lineHeight);
        if(id == "lSpacing") txtInput.value = parseInt(getStyle_txt.letterSpacing);
        if(id == "paddTop") txtInput.value = parseInt(getStyle_txt.paddingTop);
        if(id == "paddBtm") txtInput.value = parseInt(getStyle_txt.paddingBottom);
        if(id == "paddLeft") txtInput.value = parseInt(getStyle_txt.paddingLeft);
        if(id == "paddRight") txtInput.value = parseInt(getStyle_txt.paddingRight);
        if(id == "uCase") txtInput.value = getStyle_txt.textTransform === "none" ? "select" : "yes";
        if(id == "txtBg") txtInput.file = getStyle_txt.background;
        if(id == "bg_pos_x") {txtInput.value = parseInt(getStyle_txt.backgroundPositionX);
            bgPosUnit (currentActiveEle_txt,getCssProp,'pos_x_drop');
        };
        if(id == "bg_pos_y") {txtInput.value = parseInt(getStyle_txt.backgroundPositionY);
            bgPosUnit (currentActiveEle_txt,getCssProp,'pos_y_drop');
        }
        if(id == "tItalic") txtInput.value = getStyle_txt.fontStyle == "italic" ? "Yes" : "No";;
        if(id == "color") txtInput.value = getStyle_txt.color;
        if(id == "txtInput") txtInput.value = txt_id.innerHTML;
        // console.log(txtInput.value)

    }
    updatecssValue("fSize1", 'fontSize');
    updatecssValue("lHeight", 'lineHeight');
    updatecssValue("lSpacing", 'letterSpacing');
    updatecssValue("paddTop", 'paddingTop');
    updatecssValue("paddBtm", 'paddingBottom');
    updatecssValue("paddLeft", 'paddingLeft');
    updatecssValue("paddRight", 'paddingRight');  
    updatecssValue("uCase", "textTransform"); 
    updatecssValue("txtBg", "background");
    updatecssValue("bg_pos_x", "backgroundPositionX");
    updatecssValue("bg_pos_y", "backgroundPositionY");
    updatecssValue("tItalic", "fontStyle");
    updatecssValue("color", "color");
    updatecssValue("txtInput");
    
 
}

// =============================== Txt Block End =====================================


// =============================== CTA Block  =====================================

function ctaBlock() {
    let newCtaAppend = `<tr data-toggle="collapse" data-target="#collapseFour" onClick="get_cta_id(this.id)" class="ctaBlock active_edit">
                            <td align="center">
                                <!--[if mso]>
                                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{campaign_publisher_url}}" style="height:90px; width:410px;v-text-anchor:middle;font-family:Arial,sans-serif" stroke="f" fillcolor="#ffc400">
                                <center>
                                    <![endif]-->
                                    <a href="{{campaign_publisher_url}}" class="ctaWrap" title="UPS JOB LISTINGS" style="background:#ffc400;border-radius:5px;display: inline-block; font-family:sans-serif;font-weight:400; text-decoration:none;  -webkit-text-size-adjust:none; vertical-align: middle;width: 400px;"  >
                                        <span style="height:22px;width: 100%;display:block" class="reduceHeight"></span>
                                        <span class="cta" style="font-size:25px; line-height:32px;color:#000000; font-family:Poppins, sans-serif;width:345px;text-align: left;display: inline-block;font-weight:800" align="left">UPS JOB LISTINGS </span>
                                        <span align="right" style="text-align: right;display: inline-block;vertical-align: top;" >
                                            <img class="arrowImage" src="https://eoa-editor.s3.amazonaws.com/081ef8fc986d5577a27b8cf21eb5d0e656203a97%2FEmail-UPS+Jobs-v1-Jun22%2Farrow.png" align="center" style="border:none; vertical-align:middle; outline:none;text-align:right;" >
                                        </span>
                                        <span style="height:22px;width: 100%;display:block" class="reduceHeight"></span></a>
                                    <!--[if mso]>
                                </center>
                                </v:rect>
                                <![endif]-->
                            </td>
                        </tr>`
    
    let currentCtaHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentCtaHTML + newCtaAppend;

    let cta_block = document.getElementsByClassName("ctaBlock");
    for (let i = 0; i < cta_block.length; i++) {
        let cta = cta_block[i] ;
        cta.setAttribute("id", "cta"+ ( i + 1 ));
        config.total_cta_Row = ( i + 1 );
    }   

}

let currentActiveEle_cta = null;
function get_cta_id(clicked_id_cta) {
    
    currentActiveEle_cta = clicked_id_cta;

    let txt_id = document.getElementById(currentActiveEle_cta).querySelector('.cta');
    let getStyle_txt = getComputedStyle(txt_id); 

    ele_active();

    fontPreview = document.getElementById(currentActiveEle_cta).querySelector('.cta');

    let ctaWidth = document.getElementById("cta_width");
    ctaWidth.addEventListener('input', () => {
        let cta_width = document.getElementById(currentActiveEle_cta).querySelector('.ctaWrap');
        cta_width.style.width = ctaWidth.value + "px";
    });
    ctaWidth.value = parseInt(getStyle_txt.width);; 

    let ctatxtWidth = document.getElementById("cta_tWidth");
    ctatxtWidth.addEventListener('input', () => {
        let cta_txtWidth = document.getElementById(currentActiveEle_cta).querySelector('.cta');
        cta_txtWidth.style.width = ctatxtWidth.value + "px"; 
    });
    ctatxtWidth.value = parseInt(getStyle_txt.width);

    let ctaVspace = document.getElementById("cta_vspace");
    ctaVspace.addEventListener('input', () => {
        let cta_vSpace = document.getElementById(currentActiveEle_cta).querySelectorAll('.reduceHeight');
        cta_vSpace.forEach(el => {
            el.style.height = ctaVspace.value + "px";
          });
    });

    // cta clone
    let cloneEle = document.getElementById("clone_cta");
    cloneEle.addEventListener('click', () => {
        let clonecta_id = document.getElementById(currentActiveEle_cta);
        let clone_ele = clonecta_id.cloneNode(true);
        clone_ele.classList.add('cloneCta');
        tableConatiner.appendChild(clone_ele);

        let cta_blockID = document.getElementsByClassName("cloneCta");
        for (let i = 0; i < cta_blockID.length; i++) {
            let clone_ele1 = cta_blockID[i] ;
            clone_ele1.setAttribute("id", "cloned_cta"+ ( i + 1 ));            
        }   

    });

    function updateCtaCssValue (id, getCssProp){

        let txtInput = document.getElementById(id);

        let mob_View = document.getElementById("mobView")
        mob_View.addEventListener("click", function() {toggleView('mobView')});
        let desk_view = document.getElementById("deskView")
        desk_view.addEventListener("click", function() {toggleView('deskView')});

       
        txtInput.addEventListener('input', (e) => {
            if(e.currentTarget.id == "cta_Size") cssChange('cta_Size',currentActiveEle_cta, getCssProp, 'total_cta_Row','cta',  'cta');
            if(e.currentTarget.id == "cta_lHeight") cssChange('cta_lHeight',currentActiveEle_cta, getCssProp,'total_cta_Row','cta');
            if(e.currentTarget.id == "ctacolor") color_bg_change('ctacolor',currentActiveEle_cta, getCssProp,'ctahex');
            if(e.currentTarget.id == "bgCta") color_bg_change('bgCta',currentActiveEle_cta, getCssProp,'ctabghex');
            if(e.currentTarget.id == "cta_grad") gredientBg('cta_grad',currentActiveEle_cta, );
            if(e.currentTarget.id == "cta_txt") innerText('cta_txt',currentActiveEle_cta);
            if(e.currentTarget.id == "cta_arrImg") imgSrc('cta_arrImg',currentActiveEle_cta);

        });

        if(id == "cta_Size") txtInput.value = parseInt(getStyle_txt.fontSize);
        if(id == "cta_lHeight") txtInput.value = parseInt(getStyle_txt.lineHeight);
        if(id == "ctacolor") txtInput.value = getStyle_txt.color;
        if(id == "bgCta") txtInput.value = getStyle_txt.color;
        if(id == "cta_txt") txtInput.value = txt_id.innerHTML;
        // if(id == "cta_arrImg") txtInput.file = getStyle_txt.background;
    }
    updateCtaCssValue("cta_Size", 'fontSize');
    updateCtaCssValue("cta_lHeight", 'lineHeight');
    updateCtaCssValue("ctacolor", 'color');
    updateCtaCssValue("bgCta", 'background');
    updateCtaCssValue("cta_grad");
    updateCtaCssValue("cta_txt");
    updateCtaCssValue("cta_arrImg");

}
// =============================== CTA Block End =====================================

// =============================== Img Block  =====================================

function imgBlock() {
    let newImgAppend = `<tr data-toggle="collapse" data-target="#collapseFive">
                            <td align="center" class="active_edit">
                            <img src="https://eoa-editor.s3.amazonaws.com/081ef8fc986d5577a27b8cf21eb5d0e656203a97%2FEmail-Chevrolet+Blazer-DF-v1-March21%2Fmain.jpg"  style="border:none;outline:none;height: auto;font-size: 25px; color: #000000;font-weight: bold;" border="0" align="center" class="bgPic" alt="Hilton Jobs" vspace="0" hspace="0" id="imgCont"  onclick="get_img_id(this.id)">
                            </td>
                        </tr>`
    let currentImgHTML = tableConatiner.getInnerHTML();
    tableConatiner.innerHTML = currentImgHTML + newImgAppend;


    let img_block = document.getElementsByClassName("bgPic");
    for (let i = 0; i < img_block.length; i++) {
        let tr = img_block[i] ;
        tr.setAttribute("id", "imgCont"+ ( i + 1 ));
    }   
}

let lastUsed_img = null;
function get_img_id(clicked_id_img) {
    
    lastUsed_img = clicked_id_img;
    // alert(lastUsed_img);
    ele_active();

    let get_img = document.getElementById(lastUsed_img);
    // let imgStyle = getComputedStyle(get_img);   

    function updateImgValue (id, getCssProp){

        let txtInput = document.getElementById(id);
       
        txtInput.addEventListener('input', (e) => {
            if(e.currentTarget.id == "img_url") imgSrc('img_url',lastUsed_img);
            if(e.currentTarget.id == "img_width") imgAttr('img_width',lastUsed_img,'width');
            if(e.currentTarget.id == "img_alt") imgAttr('img_alt',lastUsed_img,'alt');
        });

        if(id == "img_width") txtInput.value = get_img[getCssProp];
        if(id == "img_alt") txtInput.value = get_img[getCssProp];

    }
    updateImgValue("img_url");
    updateImgValue("img_width", 'width');
    updateImgValue("img_alt", 'alt');

}

// =============================== Img Block End =====================================


// Google Font api 

let selectFont = document.querySelectorAll(".fontFamily");
let selectVariant = document.querySelectorAll(".fontVariants");

function getData(){
   let url = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCcyENRATfAMaX75oUYf12Ll2WVJxqtyRw&sort=popularity";
   fetch(url).then((response) => {
       return response.json();
   }).then((data)=>{
       for (let i = 0; i < data.items.length; i++) {  
            selectFont.forEach(function(font) {
                let option = document.createElement('option');
                option.textContent = data.items[i].family;
                option.value = data.items[i].family;
                font.add(option);
            });

       }
   });
}
getData();

selectFont.forEach(fontChange => {
fontChange.addEventListener('change', (e) => {

   let FValue = e.target.value;
   console.log(FValue);

   let apiUrl = [];
   apiUrl.push('https://fonts.googleapis.com/css2?family=' + FValue.replace(/ /g, '+') );
  
   let urls = apiUrl.join('');
   let links = urls;
   let fontLink = document.createElement("link");
   fontLink.setAttribute("href", links);
   fontLink.setAttribute("rel", 'stylesheet');
   fontLink.setAttribute("class", 'font_link');
   document.body.appendChild(fontLink);    

   function getVariants(){
       let urlvariant = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCcyENRATfAMaX75oUYf12Ll2WVJxqtyRw&sort=popularity";
       fetch(urlvariant).then((res) => {
           return res.json();
       }).then((variant)=>{

           for (let i = 0; i < variant.items.length; i++) {  
               // console.log(variant.items[i].family);
               if (FValue === variant.items[i].family) {
               
                    let fv = variant.items[i].variants;
                    fv.splice(fv.indexOf('regular'), 1, '400');
                    selectVariant.forEach(function(val) {
                        val.innerHTML = "";
                        fv.forEach(function(variants) {
                            let option = document.createElement('option');
                            option.textContent = variants;
                            option.value = variants;
                            val.appendChild(option);
                        });
                    }); 

                   let variantArray = [];
                   selectVariant.forEach(fontVariant => {
                    fontVariant.addEventListener('change', (e) => {                   
                        let variantVal = e.target.value;;
                        fontPreview.style.fontWeight = variantVal;
                    
                        variantArray.push(variantVal);

                        let uniqueVariants = [...new Set(variantArray)];
                        uniqueVariants.sort()
                        let u_vari = uniqueVariants.join(";");
                        
                        let lastLink = document.getElementsByClassName("font_link");
                        let last_fontLink = lastLink[lastLink.length - 1];
                        last_fontLink.setAttribute("href", apiUrl + ':wght@'  + u_vari);
                      
                        });
                    });
                   
               }

           }
       });
   }
   getVariants();

   fontPreview.style.fontFamily = fontChange.value;

}); 
});



// Copy code
let copyCode = document.getElementById('copy');
copyCode.addEventListener('click', () => {

    // let fincalcss = genrateFinalcss();
    // document.getElementById('mobStyle').innerHTML = fincalcss;

    let emailPanel = document.getElementById('copy_code').innerHTML;
    let txtArea = document.getElementById('codeAppend');
    txtArea.value =  emailPanel;
    txtArea.select();

    let copied;
    try {copied = document.execCommand('copy');} 
    catch (ex){
      copied = false;  
    }

    if(copied){
        let copyAlert =  document.getElementById('copyStatus'); 
        copyAlert.style.display = 'block'
        setTimeout(() => {
            copyAlert.style.display = 'none';
          }, 3000);     
    }
});




