var gameOverModal = document.getElementById("game-over-modal");


/*****************************************************************************
 * Game levels
 *****************************************************************************/
var defaultChallengeSet = [
    {info: "INFO: V04-02-00-02-01 C00-00-06 D0000 T000001 E010 S00.000 #3x3=4-103130400"},
    {info: "INFO: V02-03-03-01-00 C00-00-06 D0000 T000001 E006 S00.026 #3x3=4-013012221"},
    {info: "INFO: V03-02-03-00-01 C00-00-06 D0000 T000001 E009 S00.000 #3x3=4-210210204"},

    {info: "INFO: N18-06-06-06 C00-00-36 D0000000000000000000000000000 T000001 #6x6=3-010012230102213231000003301300020000"},
    {info: "INFO: N12-12-12-00 C00-00-36 D0000000000000000000000000000 T000001 #6x6=3-122010001120120112202012011211220200"},
    {info: "INFO: N21-03-03-09 C00-15-36 D0001000000000000000000000000 T000001 #6x6=3-301220300010000000003303000300332103"},

    {info: "INFO: V40-16-10-15 C00-16-90 D0000000000000000000100000000 T000001 E000 S00.016 #9x9=3-033000102302021103030100200000031120102001013021303201030033000320200130010101130"}, // 7     1/7
    {info: "INFO: V39-17-11-14 C00-39-90 D0000001000000000000000000000 T000001 E001 S00.067 #9x9=3-021020111033313000000000103021031100213330103000002021302112211303002020000001300"}, // 8     1/7
    {info: "INFO: V42-12-12-15 C00-27-90 D0000001000000000000000000000 T000001 E001 S00.076 #9x9=3-100230001321300322021003100002100000210000333012233300210010030102030000201030300"}, // 9     1/7
    {info: "INFO: V29-28-19-05 C00-11-90 D0000000000000010000000000000 T000001 E009 S00.085 #9x9=3-010100220212131013202021020111000210002211101210311220110001300202311212012101001"}, // 10    2/7
    {info: "INFO: V31-25-19-06 C00-00-90 D0000000000000000000000000000 T000001 E023 S00.110 #9x9=3-210230202201001030112102021203121102100110121000100000302212112301031101020002211"}, // 11 ^  1/7
    {info: "INFO: V25-36-15-05 C04-29-86 D0000001000000032010201000000 T000010 E000 S00.122 #9x9=3-110022102121103001003001010033011122210111121111111003110220010120102211102201111"}, // 12 v  3/7
    {info: "INFO: V29-29-17-06 C00-17-90 D0000000000000100000000000000 T000001 E000 S00.146 #9x9=3-102101111221211202110011020100201011232112300100101001010202312232133011000000012"}, // 13 v  3/7
    {info: "INFO: V34-22-16-09 C00-00-90 D0000000000000000000000000000 T000001 E002 S00.198 #9x9=3-012303211000030100121000102211303123021011110001020200132002120231321102000000102"}, // 14 ^  2/7
    {info: "INFO: V30-27-18-06 C00-09-90 D0000000000000001000000000000 T000001 E034 S00.244 #9x9=3-121301012100020101111210223210101120002111010120222000012001031310301122003021020"}, // 15    3/7
    {info: "INFO: V36-21-12-12 C00-24-90 D0000000000000001000000000000 T000001 E002 S00.245 #9x9=3-102230000330000230000102121322201300000130011011003021011210303302010110011113020"}, // 16 ^  2/7
    {info: "INFO: V40-14-14-13 C01-10-89 D0000000000300000000000000000 T000005 E012 S00.254 #9x9=3-000121203323003000000121233012120100120032000031000120300201011001302200030230030"}, // 17    3/7
    {info: "INFO: V27-32-17-05 C00-13-90 D0000000000000000000010000000 T000001 E017 S00.271 #9x9=3-102111023002111120210311000101002121302031201020011002111110101131221201000220121"}, // 18    3/7
    {info: "INFO: V29-27-21-04 C01-06-89 D0000000030000000000000000000 T000002 E014 S00.289 #9x9=3-202021010110121022121211021100211101212010123001012200100201133022002000121310200"}, // 19    3/7
    {info: "INFO: V45-09-09-18 C00-44-90 D0010000000000000000010000000 T000001 E014 S00.316 #9x9=3-300300133030030200010203000002103030331002303000200120102031000221300003010003030"}, // 20    3/7
    {info: "INFO: V25-34-19-03 C02-14-88 D0000010000030000000000000000 T000004 E017 S00.390 #9x9=3-112122001102001212101211011020110121202121112112020101011101103210032203101201000"}, // 21 vv 5/7
    {info: "INFO: V38-16-16-11 C00-33-90 D0000010000000000000000000000 T000001 E021 S00.392 #9x9=3-102030211201300102312003020000230013302101000020102322001321001100000310230012002"}, // 22    4/7
    {info: "INFO: V27-33-15-06 C00-16-90 D0000000000000000000100000000 T000001 E017 S00.415 #9x9=3-111100211010321312223003001110010011200210301110022021121111002022101011101302110"}, // 23 ^  3/7
    {info: "INFO: V29-31-13-08 C00-06-90 D0000000000000000000000001000 T000001 E013 S00.462 #9x9=3-301102110012011123011121110132000120200111102100100300230130120112101112020031003"}, // 24    4/7
    {info: "INFO: V27-28-25-01 C02-08-88 D1200030000000000000000000000 T001717 E028 S00.499 #9x9=3-212010221001221100111101022210110201201012100102220132121102201000212010212020120"}, // 25 vv 5/7
    {info: "INFO: V31-24-21-05 C00-12-90 D0000000000000010000000000000 T000001 E024 S00.521 #9x9=3-211010012011223021120003001012320102021021030210201100102121320020100001021102212"}, // 26 ^  3/7
    {info: "INFO: V33-21-21-06 C00-36-90 D0100000000000000000000000000 T000001 E027 S00.527 #9x9=3-212030303102000300010102003121220102201012211102201002220120100101002030012211102"}, // 27 ^  3/7
    {info: "INFO: V22-39-18-02 C13-17-77 D0032232332000100202330000000 T028844 E024 S00.550 #9x9=3-110110211022121111201100011201122010102001330012210211210111011021112121102112001"}, // 28    5/7
    {info: "INFO: V23-37-19-02 C04-34-86 D0000000010030310010000000000 T000016 E042 S00.562 #9x9=3-210220210101101120021111021102121211111100110111210111210001202133222101000100122"}, // 29    5/7
    {info: "INFO: V43-11-11-16 C02-36-88 D0001000302000000100000000000 T000006 E017 S00.568 #9x9=3-022000033210130300121300100002002213001031200331303003000000302002003012303000001"}, // 30    5/7
    {info: "INFO: V29-25-25-02 C01-31-89 D0100000000000020000000000000 T000005 E009 S00.581 #9x9=3-021212120120102100012020013210211210102002100201112222002110021300212010002101212"}, // 31 ^  4/7
    {info: "INFO: V24-34-22-01 C01-13-89 D0100000001300000000000000000 T000014 E045 S00.657 #9x9=3-110212012111201202021110211201011012111210211020021020103120202202101110102012011"}, // 32 ^^ 3/7
    {info: "INFO: V22-38-20-01 C07-05-83 D0003300000000003020000000000 T005698 E041 S00.693 #9x9=3-210112121012200210111021201112010111110102211111220101103011010220011201011212022"}, // 33    6/7
    {info: "INFO: V43-12-09-17 C00-33-90 D0000000010000000000010000000 T000001 E037 S00.738 #9x9=3-003110130100202000230323103030000020001031200302300303031230000000000030111303210"}, // 34 ^  5/7
    {info: "INFO: V44-11-08-18 C05-09-85 D0012220000000000000000000000 T000402 E064 S00.934 #9x9=3-030003120003210000000030032330030001000000031330333002000211031301201102021030030"}, // 35 ^^ 4/7
    {info: "INFO: V45-10-07-19 C04-37-86 D0100000000000030012300000000 T000011 E051 S00.978 #9x9=3-230002133000311000100011300213032012000030003303321000030001200030003303300030000"}, // 36 ^  5/7
    {info: "INFO: V28-32-14-07 C02-14-88 D0000000000010032010000000000 T000005 E032 S01.005 #9x9=3-102012010121211002110211131202011102110101031021103020111110033032100200001210310"}, // 37    6/7
    {info: "INFO: V25-34-19-03 C09-06-81 D0000323203003220000000000000 T000019 E055 S01.030 #9x9=3-010212012211001021111022100122310121001011012211101210031121113011001200202102120"}, // 38    6/7
    {info: "INFO: V22-40-16-03 C09-21-81 D3302320000001000023300000000 T026199 E041 S01.093 #9x9=3-210111111022012011101211101012031112210001210103001202120031111121002011101212111"}, // 39 v  7/7
    {info: "INFO: V23-36-21-01 C06-08-84 D0320322000000000000000000000 T010880 E067 S02.004 #9x9=3-120110201002111122212010220110202012111120210112010111011112001311021022011201210"}, // 40 ^^ 5/7
];

var debugChallengeSet = [
    {info: "INFO: V38-19-10-14 C09-35-81 D0100000002230322210000000000 T000016 E000 S00.242 #9x9=3-012030302030300011001132120331300000001030130102030110110002122021310010012003030"},
];

var gameChallenges = defaultChallengeSet;

var manualChallenges = [];

/*****************************************************************************
 * Parse URL options
 *****************************************************************************/
var level_option = undefined;
var set_option   = undefined;
var storageName  = "divisium-4/game-level";
var level = 0;
function parseOptions() {
    let URL_option_string = window.location.href.split("?")[1];
    if (URL_option_string != undefined) {
        var URL_options = URL_option_string.split("&");

        /* Go through options */
        for (let i = 0; i < URL_options.length; i++) {
            /* Level option */
            if (URL_options[i].match("L[0-9]*$") != null) {
                level_option = URL_options[i].split("L")[1];
            }

            /* Challenge set option */
            if (URL_options[i].match("S[0-9]*$") != null) {
                set_option = URL_options[i].split("S")[1];
            }

            if (URL_options[i].match("#.*$") != null) {
                level_option = 1;
                set_option   = "#";
                manualChallenges.push({info: URL_options[i]});
            }
        }
//        window.history.pushState({}, null, window.location.href.split("?")[0]);
    }

    /* Option fallbacks */
    if (set_option == undefined || set_option == 0) {
        gameChallenges = defaultChallengeSet;
    } else {
        if (set_option == "#") {
            gameChallenges = manualChallenges;
            storageName    = storageName + "-#";
        } else {
            gameChallenges = debugChallengeSet;
            storageName    = storageName + "-S" + set_option;
        }
    }

    if (level_option == undefined) {
        /* Read from storage */
        level = JSON.parse(localStorage.getItem(storageName));
    } else {
        level = Number(level_option) - 1;
    }

}


/*****************************************************************************
 * Modal window handling (Game over)
 *****************************************************************************/
function modalClick(event) {
    event.preventDefault();

    gameOverModal.style.visibility = "hidden";
    gameBoard.style.visibility     = "visible";

    gameStart(game.level);
}

gameOverModal.addEventListener("click",      modalClick);
gameOverModal.addEventListener("touchend",   modalClick, {passive: true});


/*****************************************************************************
 * Game initialization
 *****************************************************************************/
function gameStart(level) {
    /* Check level value */
    if (level == undefined || level < 0) {
        level = 0;
    }

    if (level >= gameChallenges.length) {
        level = gameChallenges.length - 1;
    }

    /* Use predefined challenges */
    game.init(level, gameChallenges[level].info);
    if (gameChallenges == debugChallengeSet) {
        document.getElementById("debug-text").innerHTML = gameChallenges[level].info.split("#")[0];
    }


    /* Save game point */
    localStorage.setItem(storageName, JSON.stringify(game.level));

    /* Setup board */
    uiBoardSetup(game.board);
}


var game = undefined;
window.onload = function () {
    /* Parse options */
    parseOptions();

    /* Start game */
    game = new Game();
    gameStart(level);

    /* Show window */
    document.getElementById("game-screen").style.visibility = "visible";
}



