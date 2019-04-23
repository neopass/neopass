// From https://github.com/JohannesBuchner/PasswordTopologies/blob/master/report.rst

export interface ITopoData {
 [key: string]: number
}

export interface IOrganization {
  name: string,
  data: ITopoData
}

export const orgList: IOrganization[] = [
  {
    name: "abc",
    data: {
      llllll: 6278,
      llllllll: 4295,
      lllllll: 4006,
      lllllllll: 2422,
    },
  },
  {
    name: "aha",
    data: {
      llllll: 17230,
      llllllll: 15129,
      dddddd: 12470,
      lllllll: 11729,
    },
  },
  {
    name: "bfield",
    data: {
      llllll: 51601,
      llllllll: 40528,
      lllllll: 33740,
      lllllldd: 23747,
      dddddd: 23047,
      lllllllll: 20384,
      llllllllll: 13448,
      dddddddd: 13258,
      llllllld: 12221,
    },
  },
  {
    name: "bkav-1",
    data: {
      dddddd: 7521,
      dddddddd: 2706,
      llllllll: 2111,
      llllll: 1352,
    },
  },
  {
    name: "bkav-2",
    data: {
      dddddd: 3269,
      dddddddd: 1074,
      llllllll: 867,
      llllll: 662,
    },
  },
  {
    name: "blackstar",
    data: {
      dddddd: 1384,
      dddddddd: 859,
      llllll: 675,
      ddddddd: 640,
    },
  },
  {
    name: "casio",
    data: {
      dddddd: 5672,
      dddddddd: 2687,
      ddddddd: 1888,
      llllllll: 1037,
    },
  },
  {
    name: "dhool",
    data: {
      llllllll: 665,
      llllll: 524,
      dddddd: 392,
      lllllll: 377,
      dddddddddd: 368,
      ddddddddd: 336,
      dddddddd: 265,
      uulluuulul: 252,
      lllllllll: 159,
      lllll: 121,
      llllllllll: 103,
      llllddd: 84,
      lllllldddd: 81,
      ddddddd: 77,
      lllldddd: 75,
      lllllldd: 73,
      lllllllllll: 68,
      lllllddd: 61,
      lllllllld: 58,
      llllllddd: 54,
      lllllllddd: 52,
    },
  },
  {
    name: "dsl",
    data: {
      llllllllllll: 516,
      lllllllllllll: 492,
      llllllllllllll: 478,
      lllllllllllllll: 383,
    },
  },
  {
    name: "eharmony",
    data: {
      uuuuuuuu: 122153,
      uuuuuu: 101423,
      uuuuuuu: 88707,
      uuuuuuuuu: 66863,
      uuuuuuuuuu: 62324,
      uuudddd: 52709,
      uuuuuuuuuuu: 39967,
      uuuudd: 38789,
      uuuuudd: 32970,
      uudddd: 30246,
      uuuudddd: 28754,
      uuuuuuuuuuuu: 27173,
      uuuuuudd: 27160,
      uuuuuud: 26213,
      uuuuu: 25610,
      uuuuuuuudd: 25310,
      uuuuuuudd: 25149,
      uuuuudddd: 23539,
      uuuuuuuud: 23516,
      uuuddd: 22572,
      uuuuuuuuud: 21794,
      uuuuddd: 21172,
      uuuuuudddd: 17246,
      uuuuud: 16584,
      uuuuuuud: 16056,
      uuuuuuuuuuuuu: 15735,
      dddddddddd: 12444,
      uuuuuuuuudd: 12184,
      uuuuuuudddd: 11814,
      uuuuuuuuuuuuuu: 11792,
    },
  },
  {
    name: "ffgbeach",
    data: {
      llllll: 55298,
      lllllll: 36638,
      llllllll: 33333,
      lllllllll: 20717,
      lllll: 20350,
      dddddd: 18391,
      lllllldd: 15283,
      llllllllll: 14652,
      llllldd: 13527,
      llll: 13307,
      lllldd: 12151,
    },
  },
  {
    name: "gamigo",
    data: {
      llluuuddd: 191346,
      llllllll: 160810,
      lllllldd: 146976,
      llllll: 126637,
      lllllll: 115231,
      lllllllll: 114693,
      llllllllll: 107193,
      dddddddd: 92133,
      llllllldd: 84708,
      ddllllllll: 79531,
      llldldllll: 79075,
      llllddllll: 79006,
      lllldllldl: 78998,
      lllldldlll: 78849,
      lldllllldl: 78829,
      ldllldllll: 78803,
      ldllllldll: 78785,
      lllldlldll: 78650,
      llldlldlll: 78561,
      ldldllllll: 78502,
      ldlllldlll: 78425,
      ldlllllldl: 78379,
      llldlllldl: 78372,
      lllllddlll: 78357,
      llldllldll: 78357,
      llllldldll: 78350,
      lldllldlll: 78245,
      lllddlllll: 78204,
      lllllldldl: 78132,
      llllldlldl: 78045,
      dlllllldll: 78030,
      ldlldlllll: 77986,
      llllllddll: 77982,
      lldlldllll: 77937,
      lllllllddl: 77925,
      lldlllldll: 77919,
      dllllllldl: 77706,
      llddllllll: 77679,
      lldldlllll: 77618,
      dlllldllll: 77432,
      lddlllllll: 77249,
      dllllldlll: 77066,
      dllldlllll: 76979,
      dldlllllll: 76767,
      dlldllllll: 76469,
      dddddd: 75453,
      lllldddd: 74278,
      llllldd: 69365,
      lllllllldd: 68984,
      llllldddd: 65774,
      lllllldddd: 63482,
      lllllddd: 57690,
      lllllllllll: 57456,
      llllllddd: 54908,
      llllllllllll: 48446,
      lllldd: 47544,
      llllllld: 45253,
      ddddddd: 41220,
      lllllllld: 40421,
      lllllllddd: 34873,
      llllllllldd: 34456,
      llllllldddd: 31077,
      llllllllld: 29198,
      ddddddddd: 28642,
      dddddddddd: 28238,
      lllllld: 27483,
      lllll: 26162,
      llllddd: 24633,
      llllld: 23073,
      lllllllllldd: 22429,
      ullllldd: 22283,
      lllllllldddd: 22055,
      llllllllddd: 22044,
      lllllllllllll: 19914,
      llldddd: 19530,
      lllddd: 15494,
      lllllllllld: 15258,
      lllllllllddd: 14167,
      lldddddd: 13783,
      llllllllllllll: 13410,
      ulllllldd: 13137,
      ddddddddddd: 12670,
      ulllllll: 12270,
      lllldddddd: 11819,
      lldddd: 11747,
      ulllldddd: 11166,
      ulllll: 10880,
      lllllddddd: 10771,
      llldddddd: 10642,
      ullllllldd: 10515,
      ullllll: 10262,
      llllddddd: 10183,
      llllllllldddd: 10160,
      },
    },
    {
      name: "gaming",
      data: {
      llllll: 5296,
      lllllll: 3536,
      llllllll: 3401,
      dddddd: 2490,
    },
  },
  {
    name: "gawker",
    data: {
      llllllll: 255158,
      llllll: 100046,
      lllllll: 70693,
      lllllldd: 59300,
      llllllld: 48889,
      lllllddd: 30405,
      dddddd: 23184,
      lllll: 21715,
      lllldddd: 21573,
      dddddddd: 19020,
      llllldd: 17119,
      lllllld: 14489,
      lllldd: 13870,
      llllld: 13659,
      llll: 10695,
    },
  },
  {
    name: "hellfire",
    data: {
      dddsdddsddddlllllslllllllslll: 3756,
      d: 676,
      llllll: 624,
      llllllll: 615,
      lllllll: 561,
      lllllldd: 509,
      dddddd: 379,
    },
  },
  {
    name: "insidepro2012",
    data: {
      ullllldd: 646145,
      llllllddd: 570362,
      lllllllll: 566163,
      llllllll: 557424,
      llllllllll: 490057,
      ulllllldd: 445968,
      lllllllddd: 433298,
      ullllllld: 420464,
      ullllllldd: 412095,
      lllllddd: 363345,
      lllllldd: 347947,
      lllllllllll: 347910,
      ulllllld: 324408,
      llllllllddd: 323180,
      ulllllllld: 320886,
      ullldddd: 320113,
      ullllldddd: 318657,
      ulllldddd: 318062,
      lllllldddd: 313687,
      ulllllddd: 305491,
      ullllddd: 297610,
      llllllllllll: 268243,
      lllllll: 267169,
      llllllldd: 267064,
      ulllllllldd: 257774,
      ullllllllld: 246941,
      llllldddd: 229569,
      llllllldddd: 224819,
      lllllllldd: 218878,
      ullllllddd: 210881,
      ulllllldddd: 196284,
      lllllllllddd: 190492,
      lllllllldddd: 176332,
      lllldddd: 169439,
      ulllllllddd: 166742,
      ullllllllldd: 165715,
      ulllllllllld: 160468,
      llllllllldd: 157950,
      dddduuuu: 157733,
      lllllllllld: 152190,
      ullllllldddd: 140148,
      llllldd: 139330,
      lllllllld: 137445,
      dddduuuuu: 135730,
      llllllllld: 132464,
      uuuuuuuuud: 132354,
      llllllld: 128034,
      uuuuuuuuuud: 127945,
      uldddddddd: 126564,
      llllddd: 125652,
      lllllllllldd: 125285,
      uldddddd: 117601,
      ddddlllll: 114463,
      llllllllllld: 111508,
      ddddllll: 111464,
      lllllllllllll: 110037,
      uuuuuuuuuu: 105196,
      uuuuuuuud: 104854,
      ullllllllddd: 104711,
      ddddddddul: 104382,
      ddduuuu: 103466,
      uuuuuuuuu: 103289,
      ullllllllllld: 99667,
      ddduuuuu: 98943,
      llllllllllddd: 95514,
      uuuuuuuu: 95508,
      uuuuuuuuuuud: 92826,
      uuuuudddd: 90085,
      dddduuuuuu: 87895,
      llllllllldddd: 85675,
      ullldddddd: 83570,
      uuuuuuuuuuu: 82731,
      ulllllllllldd: 82517,
      ulldddddd: 82428,
      uuuuuuuuuuuu: 77594,
      ddddllllll: 76617,
      uuuudddd: 75058,
      ulllldddddd: 74481,
      ulllllllldddd: 72780,
      ddsddsdddd: 71256,
      uuuuuuuuuuuud: 70081,
      ulllllllll: 69016,
      ullllddddd: 67723,
      ddduuuuuu: 65956,
      ddddddul: 65085,
      lllll: 63595,
      llllllllllldd: 63509,
      uuuuuudddd: 63455,
      ullllldddddd: 63133,
      ullllllll: 62168,
      dllllllllld: 62118,
      lllllld: 62026,
      llllllllllllll: 60590,
      uuuuuuud: 60361,
      ulllllllllddd: 60354,
      ulllllddddd: 60139,
      ulllddddd: 58478,
      lllllllllllld: 58450,
      llllll: 58341,
      llll: 56692,
      ulllllllllll: 54852,
      ullddddd: 54099,
      ullllllllll: 53558,
      uuuuuuu: 50529,
      uuuuuuuuus: 50425,
      ullllllllllldd: 49073,
      ulllllllllllld: 48294,
      dddlllll: 48210,
      lllllllllldddd: 47835,
      uuuuuddd: 47800,
      dlllllllld: 46429,
      dlllllllllld: 45437,
      ddd: 45410,
      ulllllll: 45308,
      lllllllllllddd: 45091,
      uuuuuuuuuuuuud: 44655,
      uuuuuuuuuus: 44195,
      dddduuuuuuu: 43866,
      ullllllllldddd: 42983,
      lllllllllls: 42887,
      uuuuuuuus: 41629,
      ulddddddd: 41395,
      ddddddddlu: 39250,
      uuuuuuddd: 38288,
      ddddlllllll: 37477,
      dddllll: 37107,
      llllllllllllld: 36772,
      dddllllll: 36591,
      llllllsdd: 36535,
      uuuuuuuuuuuuu: 36042,
      ullllllddddd: 35374,
      dllllllllllld: 34669,
      lllllllllllldd: 34523,
      lllllllllllllll: 34305,
      llldddddd: 34256,
      llllllllls: 33987,
      uuuuuuudddd: 33532,
      uuuuuud: 33265,
      uddddddddl: 33055,
      ulllllldddddd: 32938,
      lllllsdd: 32483,
      ddduuuuuuu: 31895,
      ullllllllllddd: 31863,
      lllllllllu: 31504,
      d: 31423,
      dddddddul: 30796,
      ulldddddddd: 30643,
      uuuuuuuuuuus: 30354,
      uuuuddd: 29519,
      llllllllllls: 29489,
      lllllllls: 29143,
      lll: 29120,
      ddddddlu: 29071,
      lllddlll: 28935,
      uuuuuuuuuuuuuud: 28727,
      dd: 28456,
      llllllllu: 28427,
      uuuuuuus: 27879,
      ullldddddddd: 27801,
      llllllllllldddd: 27455,
      ullllllllllllld: 27436,
      ullllll: 26636,
      llldddd: 26608,
      dullllll: 26258,
      lllldddddd: 25439,
      ddddddlll: 25108,
      dulllllll: 24772,
      lllllllu: 23608,
      lllllllsdd: 23395,
      lllllllllllllld: 23256,
      ullllllllllll: 23101,
      ulllllllllllldd: 22950,
      uuuuuuuuuuuus: 22793,
      llllllsd: 22477,
      llllllllllu: 22268,
      ullllllllls: 22258,
      ulllllllllldddd: 22253,
      lllllldds: 22178,
      ddddulll: 21829,
      ulllldddddddd: 21328,
      ulllllllddddd: 21202,
      uuuuuuuuuuuuuu: 21047,
      lllllllllllls: 20548,
      dllllllld: 20229,
      llllllllllllddd: 20214,
      llllllls: 19811,
      uddddddl: 19587,
      llllldddddd: 19446,
      udddddddl: 19422,
      llllllllllllldd: 19377,
      ulllllllllllddd: 19125,
      dddddddddul: 19061,
      ullllllldddddd: 18891,
      dddlllllll: 18757,
      llllddddd: 18558,
      lllllldddddd: 18317,
      uuuuuuuddd: 18275,
      dddd: 18271,
      ddddddulll: 18249,
      ddulllll: 17998,
      uuuuuus: 17959,
      ullllldddddddd: 17838,
      llllsdddd: 17724,
      lllllllsd: 17716,
      lldddddd: 17707,
      llllllllds: 17648,
      lllllllldu: 17624,
      lllllsddd: 17568,
      udllllll: 17567,
      dddduuuuuuuu: 17543,
      llllsddd: 17480,
      ddddddull: 17401,
      lllllddddd: 17329,
      ullddddddd: 17304,
      lllllllllllu: 17209,
      llllllsddd: 17103,
      lllllllud: 16949,
      dullllllll: 16876,
      ulllddddddd: 16810,
      llllllllsd: 16789,
      dddddddlu: 16427,
      llllllud: 16020,
      llllllds: 16018,
      ddddddll: 15762,
      llllllllsdd: 15564,
      llllllddddd: 15526,
      lllllsdddd: 15493,
      ulllllllllls: 15286,
      ulllllllls: 15242,
      lllllllds: 15203,
      uuuuuuuuuuuuus: 15148,
      ddddullll: 15122,
      ullldlll: 14896,
      ddddllllllll: 14704,
      ullllldl: 14571,
      ullddlll: 14493,
      lllldlll: 14370,
      llllldds: 14222,
      llldllll: 14186,
      ulldllll: 14114,
      lllddddd: 13894,
      uuuuuuuudddd: 13751,
      llllllu: 13663,
      llllludd: 13660,
      ullllddddddd: 13654,
      ullldllll: 13646,
      llllllllllllls: 13353,
      ll: 13315,
      llllllsdddd: 13195,
      ddddddddddul: 13015,
      lllsdddd: 12963,
      ullllllls: 12944,
      ulllllllllllll: 12928,
      dlllllllllllld: 12893,
      llllllldds: 12827,
      llllllddu: 12801,
      ddddddullll: 12771,
      lllldllll: 12764,
      ddddulllll: 12733,
      ludddddddd: 12649,
      llllllllud: 12452,
      ullllsdd: 12427,
      ulddddddddd: 12370,
      uuudddd: 12301,
      ulllldll: 12229,
      ddduuuuuuuu: 11932,
      uulldddd: 11892,
      llllllddds: 11635,
      dlllllld: 11615,
      llllllllllllu: 11596,
      dddullll: 11579,
      dlllllll: 11554,
      lllllddds: 11542,
      ulllllsdd: 11527,
      uulllldd: 11270,
      luuuuudd: 11254,
      lllllllddddd: 11232,
      uuuuuudd: 11227,
      uuullldd: 11093,
      dulllllllll: 11073,
      lsllllllldd: 10949,
      ddddddddl: 10929,
      ullllllllddddd: 10786,
      ddullllll: 10756,
      ullulldd: 10751,
      ddullldd: 10749,
      dllllllll: 10586,
      dddddddl: 10484,
      dddulllll: 10471,
      lslllllllldd: 10440,
      dlllllllll: 10396,
      ullllllllllls: 10393,
      llllllllldu: 10313,
      lllllllllds: 10186,
      ulllllddddddd: 10029,
      ddddddddull: 10018,
    },
  },
  {
    name: "linkedin",
    data: {
      llllllll: 248471,
      lllllldd: 191927,
      lllllllll: 180129,
      llllll: 177271,
      llllllllll: 158641,
      lllllll: 150548,
      lllldddd: 107506,
      lllllllllll: 103513,
      llllllld: 87651,
      llllllldd: 85963,
      llllldd: 76020,
      dddddd: 73376,
      llllldddd: 71670,
      llllllllllll: 67719,
      lllllddd: 63869,
      lllllldddd: 61216,
      lllllllldd: 59844,
      llldddd: 55950,
      lllldd: 52919,
      lllllllld: 50125,
      dddddddd: 48037,
      ullllldd: 47115,
      lllllld: 43270,
      lldddd: 40985,
      llllllddd: 39880,
      lllllllllllll: 38020,
      llllld: 37956,
      llllllllld: 31733,
      lllddlll: 31313,
      ulllllld: 30514,
      ddddddd: 29990,
      lllddd: 28945,
      llllllldddd: 28025,
      ulllllldd: 27468,
      llllllllldd: 27366,
      llldddddd: 26340,
      llllllllllllll: 23438,
      llllddd: 23020,
      lllllllddd: 22118,
      ddddddddddddddd: 21387,
      ullllllld: 20624,
      ullllllldd: 20347,
      ullldddd: 19995,
      lldddddd: 18973,
      lllllllldddd: 17737,
      ulllllll: 17442,
      llldllll: 17355,
      ulllldddd: 17139,
      lllldlll: 16879,
      ullllldddd: 16442,
      lllllllllldd: 15200,
      lllllllllld: 15112,
      ullllddd: 13455,
      lllddddd: 13315,
      llllllllddd: 13066,
      ulllllllld: 12944,
      ddddllll: 12832,
      lllllllllllllll: 12628,
      ullllll: 12399,
      ulllll: 12372,
      dlllllll: 12327,
      ullllllll: 12058,
      ulllldd: 11992,
      lllldllll: 11988,
      ddddll: 10941,
    },
  },
  {
    name: "mayhem",
    data: {
      llllll: 2674,
      llllllll: 2485,
      lllllll: 2004,
      lllll: 1529,
      lllllllll: 1350,
      llllllllll: 910,
      dddddd: 693,
      lulul: 534,
      lulll: 527,
      llllu: 525,
      llull: 523,
      lllul: 507,
      ullll: 505,
      dddddddd: 496,
      luuul: 495,
      llulu: 491,
      luuuu: 488,
      uuuul: 487,
      ulluu: 485,
      lullu: 478,
      lllllldd: 478,
      uluul: 477,
      ulllu: 477,
      lluul: 477,
      ulull: 476,
      uuull: 475,
      ululu: 475,
      luulu: 474,
    },
  },
  {
    name: "misc2013",
    data: {
      dddddddddddddd: 59857,
      llllllllll: 15597,
      llllllll: 14557,
      lllllllllll: 13581,
      llllll: 12505,
      lllllllll: 11878,
      llllllllllll: 11821,
      lllllll: 10333,
      dddddd: 7960,
      lllllllllllll: 7412,
      lllllldd: 7145,
      lllllllldd: 6665,
      llllllllllllll: 5617,
      llllllldd: 5594,
      lllll: 5583,
      llllllllldd: 5469,
      lllllllld: 5211,
      llllllllld: 5168,
      lllllldddd: 4708,
      lllllllllld: 4331,
      llllllld: 4220,
      llll: 3934,
      dddddddd: 3880,
      lllllllllldd: 3870,
      llllllldddd: 3839,
      lllllllllllllll: 3817,
      lllllllldddd: 3565,
      lllllllddd: 3457,
      llllldd: 3382,
      lllldddd: 3272,
      ddddddddddddd: 3272,
      llllllllslllllslll: 3236,
      lllllddd: 3222,
      lllllllslllllslll: 3119,
      ddddddd: 3058,
      llllllllllllllll: 2891,
      llllldddd: 2889,
      llllllllddd: 2848,
      lllllld: 2844,
      llllllddd: 2803,
      lllllllllslllllslll: 2568,
      dddd: 2567,
      llllllllllld: 2562,
      lll: 2458,
      llllllllldddd: 2428,
      llllllllslllllllslll: 2237,
      llllllllllldd: 2060,
      lllllllllddd: 2051,
      lllllllslllllllslll: 2045,
      llllllllllslllllslll: 2028,
      ddddddddd: 2021,
      ddddddddddd: 1855,
      lllllllllldddd: 1749,
      llllllslllllslll: 1695,
      dddddddddd: 1631,
      lllllllllllslllllslll: 1612,
      llllllddslllllslll: 1607,
      lllllllllslllllllslll: 1587,
      llldddd: 1563,
      llllldddddd: 1557,
      lllllldddddd: 1515,
      lllllllddslllllslll: 1492,
      lllllllllllld: 1482,
      llllllllllddd: 1457,
      ll: 1407,
      llllllllllllslllllslll: 1347,
      llllllllllslllllllslll: 1315,
      lllllllllllldd: 1307,
      lllllllllllllllll: 1301,
      lllddd: 1272,
      lllllddslllllslll: 1248,
      llllddd: 1211,
      llllllllddslllllslll: 1197,
      uuuuuuuuuu: 1173,
      llllllslllllllslll: 1169,
      ddllllllll: 1158,
      lllldd: 1153,
      lllldddddddd: 1141,
      llllld: 1116,
      ullll: 1115,
      llllulll: 1045,
      ulllulll: 1044,
      llullllu: 1029,
      ullullll: 1027,
      lllllllllllslllllllslll: 1026,
      lulllull: 1025,
      llllllddslllllllslll: 1022,
      lllullll: 1011,
      llllllllllldddd: 1006,
      lllddlll: 1006,
      lllulllu: 995,
      llulllul: 982,
      lllluuuu: 977,
      ullllllldd: 976,
      lllullul: 976,
      lllllllu: 976,
      ullllull: 973,
      lllllull: 973,
      ullluull: 972,
      ululllll: 971,
      lulllluu: 971,
      lllllllllllllslllllslll: 971,
      ulululul: 968,
      lllllllllllddd: 961,
      lulullll: 958,
      llululll: 954,
      luulullu: 949,
      lluuulul: 949,
      ulllllul: 948,
      lluuulll: 948,
      lulullul: 945,
      lullulll: 944,
      luullulu: 941,
      lllululu: 939,
      luululll: 938,
      luulllul: 937,
      uuulllll: 935,
      lullllul: 934,
      llulllll: 933,
      ullluluu: 932,
      lullulul: 932,
      lullllll: 932,
      ddddllll: 932,
      lluullll: 929,
      uulllllu: 928,
      uuullull: 927,
      ullllllu: 926,
      llulluul: 925,
      luuulull: 924,
      uuuullll: 923,
      luuullll: 923,
      lululllu: 923,
      lullullu: 923,
      ullluuuu: 922,
      llululul: 922,
      llllulul: 922,
      luulllll: 921,
      ullulull: 920,
      lulululu: 920,
      llllluuu: 919,
      luullllu: 918,
      lululuul: 916,
      lululluu: 916,
      lluululu: 916,
      llullull: 914,
      ulullulu: 913,
      luluulll: 913,
      ulllullu: 912,
      lllllulu: 912,
      llluuulu: 911,
      lllllluu: 911,
      uuullluu: 909,
      uullulll: 909,
      lullluul: 906,
      llluulul: 906,
      uuululll: 905,
      uulllull: 905,
      ulllulul: 904,
      ulululll: 903,
      uullllul: 902,
      luullull: 902,
      lluullul: 902,
      ululluul: 900,
      ulluullu: 900,
      lluluulu: 900,
      ulullluu: 899,
      ullulllu: 899,
      llluulll: 899,
      uluullll: 898,
      ulullllu: 897,
      ulluulll: 895,
      luullluu: 894,
      llllluul: 894,
      uululllu: 893,
      llluluul: 893,
      lllluluu: 893,
      uulluulu: 892,
      luulluul: 892,
      uulululu: 891,
      llullulu: 891,
      ululuull: 890,
      lluuluul: 890,
      lllulull: 890,
      lllluulu: 890,
      uluulluu: 888,
      ululllul: 887,
      lluuuull: 887,
      ullllluu: 886,
      llllullu: 885,
      luululul: 884,
      lulllllu: 884,
      uuuluull: 883,
      uluuulll: 883,
      ulluuulu: 883,
      luuululu: 883,
      llllllul: 883,
      ulluluul: 882,
      llluullu: 882,
      uululull: 881,
      ullullul: 881,
      luluuuul: 881,
      uluullul: 879,
      ulullull: 879,
      luuuuuuu: 879,
      llluuull: 879,
      lllulluu: 879,
      uuuuulll: 877,
      lluuullu: 877,
      ulluuuul: 876,
      lluluuul: 876,
      luuullul: 875,
      ulllluul: 874,
      lulluull: 874,
      uluulull: 873,
      lulllulu: 873,
      uuuuulul: 872,
      luuuuuul: 872,
      lllluuul: 872,
      llulullu: 871,
      llullluu: 871,
      uululuul: 870,
      ululluuu: 870,
      lluuuuul: 870,
      uuullllu: 869,
      luluuull: 869,
      ulululuu: 868,
      uululluu: 867,
      lluulull: 867,
      ullulluu: 865,
      llllllllllllllllll: 865,
      llllddllll: 865,
      ulluulul: 863,
      llldllll: 863,
      uulllluu: 862,
      luluulul: 862,
      lluulluu: 862,
      ddlllllllll: 862,
      uuuulllu: 861,
      ullllulu: 861,
      luluuulu: 861,
      llulluuu: 861,
      uuluulul: 860,
      uulluuul: 860,
      lulluulu: 860,
      uulullll: 859,
      lulluuul: 859,
      uuulllul: 858,
      uullulul: 858,
      llluuluu: 857,
      uuluullu: 856,
      ulluuluu: 856,
      luuluull: 856,
      lllluull: 856,
      ullululu: 855,
    },
  },
  {
    name: "opisrael",
    data: {
      dddddddddddddd: 3020,
      dddddd: 619,
      dddddddd: 352,
      ddddddd: 294,
    },
  },
  {
    name: "opnkorea",
    data: {
      dddddd: 1864,
      dddd: 1051,
      ddddddd: 977,
      dddddddd: 668,
    },
  },
  {
    name: "opsea",
    data: {
      dddddddddd: 434,
      ddddddd: 248,
      dddddddd: 226,
      ddddddddd: 140,
      dddddddddddd: 81,
    },
  },
  {
    name: "rootkit",
    data: {
      llllll: 8238,
      llllllll: 6453,
      lllllll: 5513,
      dddddd: 4428,
    },
  },
  {
    name: "stratfor",
    data: {
      llllllll: 24686,
      llllll: 15395,
      lllllll: 10179,
      lllllldd: 5383,
      lllllllll: 4522,
      dddddd: 4237,
      uuddddd: 4018,
      llllllld: 3228,
      lllldddd: 3078,
      lllll: 3012,
      llllllllll: 2792,
      llllld: 2710,
      llllldd: 2326,
      dddd: 2188,
      lllllld: 2164,
      lllllddd: 1984,
      lllldd: 1919,
      dddddddd: 1863,
      llllllldd: 1820,
      lllllllld: 1807,
      llldddd: 1778,
      ulllllll: 1532,
      llllldddd: 1470,
      lllllllldd: 1467,
      lllddd: 1323,
      llll: 1257,
      lldddd: 1247,
      ullllldd: 1246,
      lllllldddd: 1238,
      lllllllllll: 1212,
      ulllllld: 1027,
      llllllddd: 1007,
      ddddddd: 954,
      ulllll: 936,
      llllllllslllllllslll: 863,
      lulllull: 840,
      llllllllllll: 838,
      lllllull: 834,
      lllllllu: 823,
      lllullll: 821,
      uullllll: 815,
      llllddd: 809,
      lllllulu: 801,
      ullullll: 799,
      llullllu: 797,
      lulllluu: 785,
      ullllull: 782,
      lllulllu: 782,
      luulllll: 777,
      llllulll: 775,
      llulllul: 772,
      ullllllu: 771,
      lllullul: 770,
      ulllulll: 766,
      ululllll: 764,
      lullullu: 764,
      lluuulll: 764,
      ullluull: 763,
      lllllluu: 763,
      lululllu: 759,
      lulullll: 756,
      uuuuuuuu: 754,
      llullull: 753,
      llllulul: 752,
      ulllllul: 750,
      lullulll: 748,
      uulllull: 747,
      luululll: 746,
      lullllul: 746,
      lullllll: 746,
      llululll: 744,
      lluullll: 743,
      llllluul: 741,
      llululul: 740,
      ulluullu: 739,
      llllluuu: 739,
      lluullul: 737,
      llllullu: 737,
      uullulll: 736,
      lllulull: 735,
      luulllul: 734,
      llluulul: 734,
      uluullul: 733,
      luullulu: 733,
      llllllul: 733,
      uuululll: 732,
      ullullul: 732,
      uuuullll: 731,
      uuulllll: 731,
      luulullu: 730,
      luullull: 730,
      lllluuul: 730,
      ulllulul: 729,
      llulllll: 728,
      llluuulu: 728,
      uulululu: 727,
      lluuulul: 727,
      uulllllu: 726,
      llluullu: 726,
      luullluu: 725,
      lullulul: 724,
      llluluul: 724,
      ulululll: 723,
      lulullul: 723,
      ullluluu: 722,
      luululul: 722,
      lllllllslllllllslll: 722,
      luuullll: 720,
      lululuul: 719,
      lllululu: 719,
      ullllluu: 718,
      lluululu: 718,
      llulullu: 716,
      llulluul: 715,
      ulullluu: 714,
      ullulull: 714,
      luuulull: 714,
      lluuuull: 714,
      uululull: 713,
      ululluul: 713,
      luluulll: 713,
      uulullll: 712,
      lullluul: 712,
      uuullull: 711,
      luullllu: 711,
      lulllllu: 711,
      lluluulu: 711,
      lllluuuu: 711,
      ullulllu: 710,
      ulllullu: 710,
      lulluull: 710,
      ullllll: 708,
      luuluull: 708,
      uululllu: 707,
      ullllulu: 706,
      lllluluu: 706,
      uuluulul: 705,
      uulllulu: 705,
      ulullull: 705,
      lulululu: 705,
      llluuuul: 705,
      lluuullu: 704,
      llullulu: 704,
      lllulluu: 704,
      luuululu: 703,
      ulluulll: 702,
      lulllulu: 702,
      llluulll: 702,
      ulullllu: 701,
      ullluuuu: 701,
      ululuull: 700,
      uullllul: 699,
      ulullulu: 699,
      lluulluu: 699,
      lluulull: 697,
      luluuuul: 696,
      uuuuulll: 694,
      uulluulu: 694,
      ulllluul: 693,
      uuullllu: 692,
      uulullul: 692,
      lululluu: 692,
      uullulul: 691,
      lllluulu: 691,
      lllluull: 691,
      uulluull: 690,
      uulllluu: 690,
      ulluuull: 690,
      ullululu: 690,
      lluluuul: 690,
      llluuull: 690,
      ululllul: 687,
      lulluuul: 687,
      lulluulu: 687,
      llluuluu: 687,
      lullluuu: 686,
      uullluul: 685,
      llullluu: 685,
      uuuulull: 683,
      luuuuuul: 683,
      ulululuu: 682,
      ulluuluu: 682,
      luluuull: 682,
      uluullll: 681,
      ululullu: 681,
      lululull: 681,
      lulluuuu: 681,
      uuullluu: 680,
      ulululul: 680,
      luuuulll: 680,
      lluuluul: 680,
      uuuulllu: 679,
      uuulllul: 679,
      lluluull: 678,
      ullulluu: 677,
      lululuuu: 677,
      uluulull: 676,
      lluulllu: 676,
      uluuulll: 674,
      ululluuu: 674,
      luuuuull: 674,
      luluullu: 674,
      lluluuuu: 674,
      llulluuu: 673,
      uululluu: 672,
      ulllluuu: 672,
      luuulllu: 672,
    },
  },
  {
    name: "sunrise",
    data: {
      ddddddddddddd: 14947,
      lllllll: 487,
      llllllll: 432,
      lllllllll: 194,
    },
  },
  {
    name: "tomsawyer",
    data: {
      llllllll: 1827,
      lllllllldddd: 1392,
      llllll: 1046,
      lllllll: 761,
    },
  },
  {
    name: "walla",
    data: {
      dddd: 32357,
      dddddd: 10971,
      llllll: 3242,
      dddddddd: 3098,
    },
  },
  {
    name: "whitefox",
    data: {
      llllll: 6374,
      lllllll: 3611,
      lllll: 3291,
      llllllll: 2677,
    },
  },
]
