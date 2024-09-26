"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const uploadData = [
  {
    "submissionId": "pHWPso8w6SRS06dYJ3nI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727176060561_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727176038994_YouCut_20240923_175654334.mp4",
  },
  {
    "submissionId": "2drBeDMrLXP824eVUaY4",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727176006426_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175995367_1000635461.mp4",
  },
  {
    "submissionId": "fVKnf0SDjJL48V9heidB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175957304_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175870569_YouCut_20240924_162816773.mp4",
  },
  {
    "submissionId": "ogkzkTkx8mNazkKgdFmt",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175579069_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175560277_1000277903.mp4",
  },
  {
    "submissionId": "TJLTLR9S4pU3W8vOr9pr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175535217_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175508696_VID-20240924-WA0012.mp4",
  },
  {
    "submissionId": "R0bG75o6ea7XMcZJnvQA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175400972_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727175200983_1000111154.mp4",
  },
  {
    "submissionId": "Aaw1YUPtdbntK2f0X51O",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174755143_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174747564_1000635409.mp4",
  },
  {
    "submissionId": "3NGF17VOPx0EMGxlGyrO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174696852_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174549727_VID_20240923_175523364.mp4",
  },
  {
    "submissionId": "xAcudFoOndkDFx3gdWfW",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174696941_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174549436_VID_20240923_175523364.mp4",
  },
  {
    "submissionId": "KFwhXQznoSDZI7Tp9aJI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174694009_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174624241_VID_20240923_175523364.mp4",
  },
  {
    "submissionId": "2W6fF5cMM22e6jjVfuwZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174573775_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174565438_VID-20240924-WA0060.mp4",
  },
  {
    "submissionId": "ISWQiBhbt4reZqlVBiEM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174386547_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727174361621_VID-20240924-WA0025.mp4",
  },
  {
    "submissionId": "SKbi9CH7mop5sqZ7GbFs",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173674652_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173625422_20240924_150521.mp4",
  },
  {
    "submissionId": "OkRyv4bx8hBM0WGSrob6",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173454156_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173367227_InShot_20240924_154132039.mp4",
  },
  {
    "submissionId": "Uk8zkCqlTiN66Uk23udb",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173342054_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173316605_VID-20240924-WA0025.mp4",
  },
  {
    "submissionId": "ZAeF8X0sNi9ZX2HdId87",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173217043_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727173112528_VID_20240924_103459904.mp4",
  },
  {
    "submissionId": "fu6yIl6imYVpWGMGyyTg",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172899965_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172890057_1000635364.mp4",
  },
  {
    "submissionId": "uP040ld1lX3H3HMg75sz",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172704642_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172557832_VID20240924151920.mp4",
  },
  {
    "submissionId": "vTClrAkmB9F6FooCE86K",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172534001_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172515306_VID-20240924-WA0016.mp4",
  },
  {
    "submissionId": "ydevXDcEv03YQkf1BA1U",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172466482_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172440728_VID-20240924-WA0015.mp4",
  },
  {
    "submissionId": "FggnIhcLcii8p8uksOZ7",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172302699_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172284103_1000270707.mp4",
  },
  {
    "submissionId": "K9XdfzvOb7Tt2v33xlVM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172209314_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172194609_1000635329.mp4",
  },
  {
    "submissionId": "UzFzs9IBZu2HQn4ECgwu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727172026107_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171900592_1000158050.mp4",
  },
  {
    "submissionId": "jsebIzW5oAEtNkfMd7SY",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171791236_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171751296_1000006870.mp4",
  },
  {
    "submissionId": "CbZUFfi7DOAReSMfue4v",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171784743_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171728257_1000835831.mp4",
  },
  {
    "submissionId": "5JT7n7ktgDQKSZ0bzhWJ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171615660_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171598058_VID-20240924-WA0046.mp4",
  },
  {
    "submissionId": "n7Btfp0fNdUSVeUGfLIJ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171536445_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171487301_1000070287.mp4",
  },
  {
    "submissionId": "oW6GLV2SD7Y6U9oIJDQD",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171464575_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171445431_VID-20240924-WA0040.mp4",
  },
  {
    "submissionId": "RfmRH9AwQXJRU7rLHWrr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171442698_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171439068_1000635322.mp4",
  },
  {
    "submissionId": "7PCCPZyODoXGHOgeNGJS",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171138952_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727171130014_1000070152.mp4",
  },
  {
    "submissionId": "KBHeApE9pMUfk69jByb9",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727170812533_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727170803751_6FB7117C-CA4F-4A12-A617-CA965633D450.mp4",
  },
  {
    "submissionId": "hV2N2c02i0kC9bCsl06S",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727170466327_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727170454920_VID_20240924_143644.mp4",
  },
  {
    "submissionId": "0aEM10V52N6S3Svt4gIq",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727170071543_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169935976_VID20240918132913.mp4",
  },
  {
    "submissionId": "n1iqe5hQxbtslTMABwwy",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169845682_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169840443_VID-20240924-WA0007.mp4",
  },
  {
    "submissionId": "8vS71cUEBIr4aorymXnF",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169749139_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169735210_VID-20240924-WA0037.mp4",
  },
  {
    "submissionId": "VplnTowDZWIdb7vwChkn",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169690424_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169592951_VID20240924135654.mp4",
  },
  {
    "submissionId": "KP4D0YPPQsiVWvlXn2yI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169645138_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169558112_VID_20240924144530.mp4",
  },
  {
    "submissionId": "xIeTlp2djrLo9Bu7pB2D",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169322169_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169299820_1000470210.mp4",
  },
  {
    "submissionId": "jiyYhLtSiUb9PF5zebtT",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169204199_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169179510_video-output-5F7468B3-A824-4F41-890D-93A4C7BAB4A0.mp4",
  },
  {
    "submissionId": "FioWgWNPHQO4RmR4A2kn",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169192470_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169003421_VID-20240924-WA0014.mp4",
  },
  {
    "submissionId": "N6BH3yBPsBZamPBAucbO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169154945_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168931507_video_20240924_143211.mp4",
  },
  {
    "submissionId": "GzrbkhRUtlQD1b3AXEHQ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169145345_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169134788_1000635182.mp4",
  },
  {
    "submissionId": "O2q0YY27H8PXypMMwrnu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169118099_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169052792_1000470217.mp4",
  },
  {
    "submissionId": "K6NRBXWjuY6F9tNSmui4",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727169052773_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168983162_QV_1727166274672.mp4",
  },
  {
    "submissionId": "nzjRppJmjh17rXCaWvsl",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168697164_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168689412_VID-20240924-WA0005.mp4",
  },
  {
    "submissionId": "qPVblGzMZdnyo8XdzC99",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168695911_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168590199_VID-20240924-WA0017.mp4",
  },
  {
    "submissionId": "Fuyy8vcnLgaSyNmDW2uH",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168617020_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168524619_VID-20240918-WA0031.mp4",
  },
  {
    "submissionId": "KwlWY0n7Tb5691cI2L90",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168604011_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168471680_1000172891.mp4",
  },
  {
    "submissionId": "cwfT7uIRmXXc9ZZPpcIV",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168584563_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168468090_1000359065.mp4",
  },
  {
    "submissionId": "MtGuVIyTuM9dpvF6MSLA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168324277_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167588699_lv_0_20240924141237.mp4",
  },
  {
    "submissionId": "T5gJV1HJYZN42UKduFxL",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168117778_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727168038420_QV_1727166274672.mp4",
  },
  {
    "submissionId": "gwGPIyFhnGljWXBcuSO1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167947453_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167940925_88694862-6163-4ebb-b58e-73cb9a11f40d.mp4",
  },
  {
    "submissionId": "zkCOhnLhs1zlnjpOLYfZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167938050_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167925135_VID_20240924141059.mp4",
  },
  {
    "submissionId": "y3rGhkLgRMKhuEDy16aR",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167810490_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167747143_1000034279.mp4",
  },
  {
    "submissionId": "LhniCxIToeiu4UZc4ZGy",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167787472_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167597629_video_20240924_141241.mp4",
  },
  {
    "submissionId": "3ZbbJqaHIL0wUPWsEgh9",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167731081_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167700580_1000136242.mp4",
  },
  {
    "submissionId": "BaMh34t1ZVRbEZryGC8C",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167628204_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167617919_1000136278.mp4",
  },
  {
    "submissionId": "6OQEftH5RE6lwY7L4GeI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167547881_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167495521_VID-20240923-WA0018.mp4",
  },
  {
    "submissionId": "V4ICWhkiWLGR2UyO6ukW",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167526475_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167518535_47800199-ddf9-4b96-b30f-56b607907b90.mp4",
  },
  {
    "submissionId": "rWuSb3y7gxeLAozg2S58",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167378685_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167283283_1AFC23E1-0862-468C-88D8-02DE322FF3F1.mp4",
  },
  {
    "submissionId": "41k7AdVfrXXNkWWPuJMj",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167130696_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167095866_1000270675.mp4",
  },
  {
    "submissionId": "HtZ1mkocjFzOGoxDi9xO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167102164_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167088240_VID_20240924_124627.mp4",
  },
  {
    "submissionId": "nzkg8sg2gwnz1DIwAjLP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167060195_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167049414_VID_20240924_124627.mp4",
  },
  {
    "submissionId": "VXRVyEYWUr0VwWKFQ7Pf",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727167004006_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166994649_VID_20240924_124627.mp4",
  },
  {
    "submissionId": "xNwfV5XdpDce3lWQ90j6",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166769502_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166749095_1000470192.mp4",
  },
  {
    "submissionId": "LZo3zqtLhUVOO3GO6zxZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166725784_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166719763_1000230065.mp4",
  },
  {
    "submissionId": "gmMawIE2G72xGDGmPcMJ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166282347_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166229119_video_20240924_130812.mp4",
  },
  {
    "submissionId": "H8Jwibfb27s11wAXcm9m",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166112696_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166017400_video_20240924_123556.mp4",
  },
  {
    "submissionId": "YgQ9loR986S7dSQag2jS",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727166001337_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165993711_VID-20240924-WA0002.mp4",
  },
  {
    "submissionId": "t6v0gXvnjvA8jRNnloK0",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165904647_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165840805_VID20240924134100.mp4",
  },
  {
    "submissionId": "A3H8SqJXk1FLS3sjqdol",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165903706_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165893974_VID_20240924_115828.mp4",
  },
  {
    "submissionId": "oZukVZANUQq2hblhzpIA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165675327_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165333129_VID_20240924_101124.mp4",
  },
  {
    "submissionId": "uIbylNrZ2Ug0aWh6KH5L",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165219974_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165022422_km_20240924_1080p_60f_20240924_132830.mp4",
  },
  {
    "submissionId": "S5klZE1ZUjirCv2JaHM4",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165169202_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727165128064_1000470184.mp4",
  },
  {
    "submissionId": "BcsN7tutCsjTxqkP9RFQ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164773051_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164694854_1000035944.mp4",
  },
  {
    "submissionId": "LbvEcidrkdqQRo6s2BhP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164564963_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164538245_VID-20240921-WA0005.mp4",
  },
  {
    "submissionId": "O4ieclyepSMkAMrdy5wR",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164518165_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164511389_VID-20240924-WA0058.mp4",
  },
  {
    "submissionId": "RZ0AIgg7FXXWGcuRyWe5",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164389742_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164383319_VID-20240924-WA0018.mp4",
  },
  {
    "submissionId": "6PL7QAb8ZPZHKuGEV4vS",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164344851_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164319522_1000006852.mp4",
  },
  {
    "submissionId": "MzvBzbK2AQU4RQdT7OIO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164338323_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164250423_1000277851.mp4",
  },
  {
    "submissionId": "RbzhaACGupN7Vf3Xqqd8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164314101_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164308101_VID-20240924-WA0000.mp4",
  },
  {
    "submissionId": "tC8lfix5T3om2j5GVuhZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164239012_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164207433_1000171143.mp4",
  },
  {
    "submissionId": "dvonO8ouIvW2sFsQScBA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164236937_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164150988_1000171143.mp4",
  },
  {
    "submissionId": "q09vzFlVIikl4X3cyaJP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164140687_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727164098965_Adisesha Rao.mp4",
  },
  {
    "submissionId": "X313Fx9QhhB9Sir5ugVa",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163892690_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163884633_1000070152.mp4",
  },
  {
    "submissionId": "Bp3BC4AP4aNlmdMHNT3O",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163564499_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163557309_1000465978.mp4",
  },
  {
    "submissionId": "f4mTcRNxc58aw5FbhkgE",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163118039_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163082460_InShot_20240924_125334073.mp4",
  },
  {
    "submissionId": "20PzP5U9obnBmSPQU4wC",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727163021912_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162958688_VID-20240924-WA0020.mp4",
  },
  {
    "submissionId": "6HSY9jnN1TI5MkTkDA0D",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162888544_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162827714_InShot_20240924_123357689.mp4",
  },
  {
    "submissionId": "tH2xoe8hN7dyAAo6vUFp",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162736516_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162730496_1000198583.mp4",
  },
  {
    "submissionId": "H4sBYUAGRWgMmhfulSCS",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162399154_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162385936_1000173421.mp4",
  },
  {
    "submissionId": "EUc5KII2DuWEQoB5vIw1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727162070285_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161876942_VID-20240924-WA0012.mp4",
  },
  {
    "submissionId": "3fCdqON0M2AT2oVM8mSi",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161648011_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161626744_VID-20240924-WA0061.mp4",
  },
  {
    "submissionId": "okcbKJYdQ6L1EXDux1SM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161221279_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161067134_video-output-5085BFD2-BB1A-42BC-A818-48DABE021489.mp4",
  },
  {
    "submissionId": "0nLPKOVZSiDBHcaglnaN",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161196443_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160843263_video_20240924_122240_edit.mp4",
  },
  {
    "submissionId": "iL6NRTGROB6PlK09yuA1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161104003_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161069988_VID-20240924-WA0057.mp4",
  },
  {
    "submissionId": "69blBqB7MrV6RPG9KhmT",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727161006616_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160990738_1000358925.mp4",
  },
  {
    "submissionId": "iBO44fgL7z3yc5p0TUJX",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160648894_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160607048_1000464128.mp4",
  },
  {
    "submissionId": "x4MGRaDnm1R1npzFS9Df",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160588312_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160421536_VID20240924120746.mp4",
  },
  {
    "submissionId": "QFJl9Ljj4KiSY2SfO8uY",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160479108_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160472021_1000465539.mp4",
  },
  {
    "submissionId": "sXEo9TGG2gSiKy1jxw7K",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160328658_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160317623_1000465956.mp4",
  },
  {
    "submissionId": "1v5Yh3U1cBmyALF4FSsR",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160212847_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160187437_1000171096.mp4",
  },
  {
    "submissionId": "C0m6q6uBlBHfOAT7nNgt",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160118093_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160095788_VIDEO_7749bf5e-5b64-4537-a06f-8bc97419329d.mp4",
  },
  {
    "submissionId": "d4v7AUM1i1mZBgdEDi1S",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727160010421_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159978202_VID-20240924-WA0003.mp4",
  },
  {
    "submissionId": "jReGJKmegKMfuBfIFLi8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159938248_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159821812_1000070213.mp4",
  },
  {
    "submissionId": "48jCEK34xLPXkFNeE7xa",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159843920_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159823049_VID_20240924_114905.mp4",
  },
  {
    "submissionId": "VOaqL8n5lyvYEhzilsBV",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159553022_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159506896_1000045766.mp4",
  },
  {
    "submissionId": "SG0pCImHQHMGHNDl1D8A",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159263232_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159256117_VID-20240924-WA0017.mp4",
  },
  {
    "submissionId": "4fHa4q4wognjSKQjK3jS",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159078706_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727159072055_VID-20240924-WA0004.mp4",
  },
  {
    "submissionId": "VTHgEqaDMZKSw1eeAtG1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158991924_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158973211_VID-20240924-WA0005.mp4",
  },
  {
    "submissionId": "42BQZxyEkYGGxEhBJdPA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158631540_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158619189_3ef82426-2708-48b4-9cfb-d3b6364d4b1b 2 copy.mp4",
  },
  {
    "submissionId": "Ldw1IV9VgJzlSLYD9bmh",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158443363_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158388217_VID20240924104016.mp4",
  },
  {
    "submissionId": "YwU3Kf58gNE75kZNw79y",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158346419_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158308736_VID20240924104016.mp4",
  },
  {
    "submissionId": "a23MyzNaScJlq4C94Idj",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158331159_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727158324396_1000034145.mp4",
  },
  {
    "submissionId": "ZZPRK83Z9spfwCsqoFFW",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727157305681_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727157299263_VID-20240924-WA0009.mp4",
  },
  {
    "submissionId": "QJPN3CMhaVLq79T4CFeB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727156954174_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727156923869_VID-20240924-WA0011.mp4",
  },
  {
    "submissionId": "QLRzxbvZBLbz1ij1n1ik",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727156717767_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727156705622_VID-20240924-WA0004.mp4",
  },
  {
    "submissionId": "b0hpMeT887Tu7lVb88zJ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727156216625_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727155850417_lv_0_20240924095554.mp4",
  },
  {
    "submissionId": "MnE4yRtpEG0pKvFDExfu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727154960810_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727154912949_1000397543.mp4",
  },
  {
    "submissionId": "naCDNbCu7UPWCihNqqoo",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153585013_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153490003_1000086689.mp4",
  },
  {
    "submissionId": "KJpS7w3LoNwcEW6S11aP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153293817_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153283807_1000047014.mp4",
  },
  {
    "submissionId": "3jjNHgYwoZ00cjTwQWVu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153066750_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727153056990_1000469905.mp4",
  },
  {
    "submissionId": "Xhm8xb9bveTWS8szXO9b",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152712588_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152694994_VID-20240923-WA0022.mp4",
  },
  {
    "submissionId": "kK4IIvHyS41QUIJ54col",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152693827_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152400773_VID_20240923_205215.mp4",
  },
  {
    "submissionId": "OEeDk1bjXUIgwUTqy389",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152659411_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152650918_1000047004.mp4",
  },
  {
    "submissionId": "w3S2p8TMB9Vpjd1Oe5Jo",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152643797_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727152635317_VID-20240923-WA0026.mp4",
  },
  {
    "submissionId": "CMcz2J61o1SXLZQihaLQ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727151389901_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727151382844_VID-20240924-WA0001.mp4",
  },
  {
    "submissionId": "oQuGfEC5rXjRMqB4rWOi",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727150307974_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727150301431_VID-20240924-WA0003(1).mp4",
  },
  {
    "submissionId": "NFCHslEaUIFREnYB0HBi",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727150219910_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727150214471_QV_1727107177855.mp4",
  },
  {
    "submissionId": "moIj6PEQoTsyMmm7C53H",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146968114_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146799989_Vid_20240924_204455620.mp4",
  },
  {
    "submissionId": "OMegWFV4QLx92nZPhQ6C",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146527156_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146362901_Vid_20240923_181914675.mp4",
  },
  {
    "submissionId": "MbZi4SLMcWcGkdYWYX78",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146194292_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727146134228_Vid_20240923_163531881.mp4",
  },
  {
    "submissionId": "0iaVxPGEslrFIEccqsRy",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727145903740_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727145888249_VID-20240924-WA0005.mp4",
  },
  {
    "submissionId": "Zo7CensXoydnyeifee4J",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727144189373_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727143844181_lv_0_20240923190306.mp4",
  },
  {
    "submissionId": "CBErNAxdLvyZsWcY0hd6",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727142213044_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727141861056_1000017653.mp4",
  },
  {
    "submissionId": "pgwUtuqunM3UX91IK63N",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727138419864_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727138337633_VIDEO_315aa2c1-02a5-4483-8dd9-a590d1ecb9e2.mp4",
  },
  {
    "submissionId": "t7mg7HHIdJ9LKtpzKu4U",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727138174793_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727138065797_VIDEO_07910619-6936-46b6-a8f9-9c9076b1b0c2.mp4",
  },
  {
    "submissionId": "smS5udVd9fu59kdS8uhM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727119731599_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727119640698_YouCut_20240924_001644754.mp4",
  },
  {
    "submissionId": "vg6i4QEkmveCEBLWmtZp",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727119456439_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727119364454_VID20240923192822~3.mp4",
  },
  {
    "submissionId": "mnsjrU13YeMVv6vVPSmw",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727115517659_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727115450860_Vid_20240923_234522563.mp4",
  },
  {
    "submissionId": "jbC37wWTdfAzyocTAxcW",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727114293812_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727114198959_Vid_20240923_230923903.mp4",
  },
  {
    "submissionId": "Sn3Iq5alHTTOjB29JRap",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727114291021_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727113546972_Vid_20240923_230923903.mp4",
  },
  {
    "submissionId": "w6CQeWj5DLNpuoeS17v6",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727114057103_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727114036066_1000832081.mp4",
  },
  {
    "submissionId": "8ppx9kqUvwXxxDhVvW57",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727113987389_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727113976884_7b893e7f-6864-4552-81c1-02aa7b0a24df.mp4",
  },
  {
    "submissionId": "rjdNABbi03MEwKLzEUaZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111724276_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111661826_video_20240920_123305.mp4",
  },
  {
    "submissionId": "3SWsKaQHp8LcbYsRYKpw",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111517714_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111447509_video_20240920_154341.mp4",
  },
  {
    "submissionId": "WiSUmgXctm025QLpIBxT",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111467528_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111459656_VID-20240923-WA0010.mp4",
  },
  {
    "submissionId": "rzY2ZqqYWweOwFnnjOmL",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111405356_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727111357801_1000157768.mp4",
  },
  {
    "submissionId": "pNCVJo5uOYXMc2fhbetM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727110887670_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727110855343_1000110806.mp4",
  },
  {
    "submissionId": "lrfOwaSVOnSUdt2Dr96O",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109999559_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109946168_VID20240923182353.mp4",
  },
  {
    "submissionId": "tUxqIyuwTTXnC9VMxZy1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109909259_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109900784_VID-20240923-WA0008.mp4",
  },
  {
    "submissionId": "lM5qtnO1hW5n1ho7gE5s",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109538458_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109520702_VID_20240923_220733.mp4",
  },
  {
    "submissionId": "3pjCjQVsppEFfXtSEdk1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109460179_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109447000_VID-20240923-WA0017.mp4",
  },
  {
    "submissionId": "8XLCub6QPexrzsjniAvB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109181820_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727108856672_20240923_190053.mp4",
  },
  {
    "submissionId": "FkyA6bRfdL6SUrJHIhrP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109132974_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727109017694_Untitled 2024-09-23 21.55.55.mp4",
  },
  {
    "submissionId": "Jcus6SetM47nT3oOkTck",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727108647022_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727108601418_1000064310.mp4",
  },
  {
    "submissionId": "dIrsmka9nmLYZ0NNwxFu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727107650862_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727107536649_VID_20240923_210750.mp4",
  },
  {
    "submissionId": "PdpkL8J88U6EG4fcdvmD",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727107376677_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727107364440_1000835447.mp4",
  },
  {
    "submissionId": "GxYcCsvyb8ALWwDPnzw1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106862110_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106853296_1000469975.mp4",
  },
  {
    "submissionId": "zoJUqTFSuWU9v4fbY5xh",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106362044_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106348964_VID_20240920125421.mp4",
  },
  {
    "submissionId": "WL1AFguInLaDxSFkP7OZ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106059137_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727106051952_1000469966.mp4",
  },
  {
    "submissionId": "rWXk6CPJmRbHr6ZGl6OG",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105915517_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105887584_1000064293.mp4",
  },
  {
    "submissionId": "1uchPvnNFUeOCQTFViCb",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105796963_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105787159_5e266e6a-1bac-4c62-8eaf-3ad319aa72ae.mp4",
  },
  {
    "submissionId": "WHdkVeaDtkmi9oTLIfDB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105387090_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105332707_VID20240923200710.mp4",
  },
  {
    "submissionId": "jrhYX0dZrl4wMUKYCtMh",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105386593_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105381185_62fdb959-7868-4115-b13a-aeeedd1ea864.mp4",
  },
  {
    "submissionId": "C62qMiyh4QzLoz9UKQA1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105233518_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727105227378_1000358544.mp4",
  },
  {
    "submissionId": "U3gpCOEViQax9m4ucwh2",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104934525_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104928400_1000143020.mp4",
  },
  {
    "submissionId": "1ZJAYAXI4BCg22wo6Zt3",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104892998_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104792291_20240921_141310.mp4",
  },
  {
    "submissionId": "PmpTeHEXMvOlHIMahD7T",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104533069_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727104486918_InShot_20240923_202929895.mp4",
  },
  {
    "submissionId": "BFVPKRw37KziKGW5khNp",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103749861_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103704616_20240923_194159.mp4",
  },
  {
    "submissionId": "KPz601LYz396jZasJSkd",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103583516_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103579442_1000469917.mp4",
  },
  {
    "submissionId": "jmsduYm3amnuMIl3sdlI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103566282_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103535499_1000358462.mp4",
  },
  {
    "submissionId": "rVtQJzaFRd0OzWUhZ8rF",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103404154_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103368257_1000358496.mp4",
  },
  {
    "submissionId": "DCtSUw8aVWdCccnB2Zma",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727103202485_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102981804_video_20240923_195002.mp4",
  },
  {
    "submissionId": "t6D8zdbMhqvhwJnlAY4Z",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102946672_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102938780_30536619-0f60-4856-a837-9bc363cfbfcf.mp4",
  },
  {
    "submissionId": "xrz7wgpmuF2Dy32ifFtg",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102728461_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102720943_VID-20240923-WA0025.mp4",
  },
  {
    "submissionId": "GQeb0mOJPvKkJl8NsoOI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102292126_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727102235873_video-output-DEEF1EE8-7059-4D40-8843-CFB2EA13C2F4.mp4",
  },
  {
    "submissionId": "3oxddSEmhE8vTnCAQWmF",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101921387_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101915435_1000071278.mp4",
  },
  {
    "submissionId": "2xVzDf18DuAi1DAorPYj",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101809260_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101771586_video-output-0FA506BD-8250-414E-A40E-1AE53CE30CC0.mp4",
  },
  {
    "submissionId": "fKGxvEFzh5atmb5yiXuW",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101634018_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101627907_61392de4-d6ed-4272-b52e-1bd3c42cf5b7.mp4",
  },
  {
    "submissionId": "wOShT9UN8up8Nan2FzVV",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101225425_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100881088_video-output-51F95C09-DC1B-4ADC-A9E2-7EEFB5A8E3CA.mp4",
  },
  {
    "submissionId": "IbZwiENH47Rka2KI5R8V",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101132131_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727101123349_1000157635.mp4",
  },
  {
    "submissionId": "Q3dtF3uNR7OD2MlntHc8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100756791_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100700572_video_20240923_154456.mp4",
  },
  {
    "submissionId": "3rAeyJF2msaJHqgpheBQ",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100576428_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100512396_video_20240923_144246.mp4",
  },
  {
    "submissionId": "3RrtoEnjHyBXzG23WhWP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100463767_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100447083_video_20240923_160242.mp4",
  },
  {
    "submissionId": "joydUNMYLqYfGYHORtjy",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100409866_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100360765_video_20240923_141807.mp4",
  },
  {
    "submissionId": "GyGuYOcYDPyEWBBfeG01",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100234389_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727100152015_video_20240923_143002.mp4",
  },
  {
    "submissionId": "9WRWPlJSZzEsG8V4rlCn",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099976483_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099919645_20240923_164737_1.mp4",
  },
  {
    "submissionId": "v3jT4bHJ6FLXw5pE2LaY",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099692264_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099687292_1000173124.mp4",
  },
  {
    "submissionId": "D4UEHz84SiAv68FAFRcR",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099457234_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099398244_video_20240923_145307.mp4",
  },
  {
    "submissionId": "mBa61HzKyB9YbXL5PRTr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099343360_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099339208_1000033469.mp4",
  },
  {
    "submissionId": "DlqhHiojsOgMjaWB9eyf",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099278843_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099274717_1000033465.mp4",
  },
  {
    "submissionId": "BD0N9W1gBqESyL346Ovq",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099209720_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099205097_1000033464.mp4",
  },
  {
    "submissionId": "FWds5t37x2YhUBDL0F3q",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099191597_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727099142529_video_20240923_150550.mp4",
  },
  {
    "submissionId": "GFe0ma0Abyr48ilSJhhf",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727098549644_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727098517000_1000268466.mp4",
  },
  {
    "submissionId": "fprBq709izXQx1S2kzHz",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727097523017_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727097462634_1000012726.mp4",
  },
  {
    "submissionId": "x0aSUWJCdqyzzcOtUlRw",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727097338902_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727097250441_Video_20240923182457678_by_videoshow.mp4",
  },
  {
    "submissionId": "oWWgfC6Lq4lDlmELE0IB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727095371312_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727095366229_YouCut_20240923_150834228.mp4",
  },
  {
    "submissionId": "Nd9grKGEVNmXSzmN7FVq",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727095093846_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727095087417_VID-20240921-WA0010.mp4",
  },
  {
    "submissionId": "9XY7Yv151krbfsD5MFpN",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727094807234_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727094773740_VID_20240923_173428.mp4",
  },
  {
    "submissionId": "2qv8mEu5VFrFzuYunB5N",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727094693485_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727094650559_VID-20240923-WA0003_001.mp4",
  },
  {
    "submissionId": "aafTSE9uZ9RJrgGPZHqL",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093863708_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093849782_1000156455.mp4",
  },
  {
    "submissionId": "oyVfhMM2toybKUfYKVXj",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093581124_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093490351_Vid_20240923_171911118.mp4",
  },
  {
    "submissionId": "MKTQ7VnxJ6yIYnytJ4tn",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093522954_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093505944_1000172969.mp4",
  },
  {
    "submissionId": "aPV5n7eK1KOcelMtGQSr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093334595_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093065475_IMG_1913.mp4",
  },
  {
    "submissionId": "Hcd9zLAEGHgtnbWmlg8D",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727093164459_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092811073_Vid_20240923_172622405.mp4",
  },
  {
    "submissionId": "c57Y8M7j7Q5gZbWGD75j",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092518341_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092387632_VID20240923171851.mp4",
  },
  {
    "submissionId": "rnTY6QOcrXk6XYe985Af",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092351946_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092347046_1000229459.mp4",
  },
  {
    "submissionId": "2RsKExnb5lDnY5QcNxQP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727092013214_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727091960662_VN20240923_170823.mp4",
  },
  {
    "submissionId": "ujG0FL8ibbZeRwuTicKz",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727091662999_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727091658001_VID-20240923-WA0034.mp4",
  },
  {
    "submissionId": "hQwiChSVkJmVViVQns3d",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090936272_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090920521_VN20240923_103208.mp4",
  },
  {
    "submissionId": "a9bPgzlbLAArsfdUzBF5",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090664786_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090651824_VN20240923_165023.mp4",
  },
  {
    "submissionId": "JBiceHzWWqCEDEHvi1uA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090653573_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090642758_VID-20240923-WA0016.mp4",
  },
  {
    "submissionId": "LuiFO6egtVrm8Q6ULDf3",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090217388_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090209232_VID-20240923-WA0018.mp4",
  },
  {
    "submissionId": "tARGxbH1n9wKmo1M8LKV",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090071825_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727090060766_VID-20240923-WA0017.mp4",
  },
  {
    "submissionId": "ZIYunreeV51h0Jb0u2w0",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089927332_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089900805_1000215849.mp4",
  },
  {
    "submissionId": "5Y9bexu3LmaW8QrwApl8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089420367_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089412673_cb8d7463-587f-4cdb-b9c3-a3757fc9ad11.mp4",
  },
  {
    "submissionId": "0Nhdrx1wMNjPQDAz2fUu",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089028365_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727088958688_1000129717.mp4",
  },
  {
    "submissionId": "V0BhMAsNOsqQycPfVtpi",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089021405_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089010351_VID-20240923-WA0010.mp4",
  },
  {
    "submissionId": "ix6xfultdmQvRVb5Jk5D",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727089001868_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727088991701_VID_20240923_154310920.mp4",
  },
  {
    "submissionId": "ReozcHW2W0mQrR1jEGER",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727088272286_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727088220909_1000033311.mp4",
  },
  {
    "submissionId": "OAxIInIO7vukElkrwgEr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087987388_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087978510_VID-20240923-WA0030.mp4",
  },
  {
    "submissionId": "W2KyF3KymfN3h3T6GrRK",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087745527_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087354371_VID20240923155108.mp4",
  },
  {
    "submissionId": "IuyZIuX6T7LEciu2FCGC",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087497900_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087481123_1000172951.mp4",
  },
  {
    "submissionId": "COCxj8LFsm1pgs3bElHN",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087494871_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727087397814_VID_20240923_143226.mp4",
  },
  {
    "submissionId": "SWPrxjY6zzdIziJgX9gf",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727086680605_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727086222924_Vid_20240923_153507958.mp4",
  },
  {
    "submissionId": "xTgoPA9HRz0iUS1kAzGP",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727086332352_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727086305794_lv_0_20240923151230.mp4",
  },
  {
    "submissionId": "fzbaq8KpsaI1otKsG0eF",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085879893_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085873255_VID-20240923-WA0039.mp4",
  },
  {
    "submissionId": "YVAxvaSD500VXU4u1et1",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085213106_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085198084_1000039420.mp4",
  },
  {
    "submissionId": "uM8Ia0sRZduCroKN9ysU",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085085904_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727085024735_video-output-06044DBF-A643-4B3A-B531-1FDBA9AAD04B.mp4",
  },
  {
    "submissionId": "KIyGCN87PpBpjbmyO2TI",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084803231_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084754657_20240923_141121.mp4",
  },
  {
    "submissionId": "nNFfVPoYHYpAAyWfnBjx",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084573685_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084533550_20240921_150629.mp4",
  },
  {
    "submissionId": "Aa9vBt9nFUbcheD1MAe4",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084273370_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727084209892_20240921_1400142.mp4",
  },
  {
    "submissionId": "gqLYOaOX3FsRF30qnhxb",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727083538494_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727083445725_VID_20240923_154513049.mp4",
  },
  {
    "submissionId": "7NaJCvtXW8gVMeIIN3WD",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727083465190_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727083374160_VID_20240923_134409.mp4",
  },
  {
    "submissionId": "SKywoRS8Gdkdm5oIKzrb",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082959434_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082898024_VID20240923121816.mp4",
  },
  {
    "submissionId": "38dcSwsWFqSVtE4rKT2o",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082706668_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082591837_VID-20240923-WA0013.mp4",
  },
  {
    "submissionId": "RigpxkteFkStCMwtEBoM",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082683512_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082676044_VID-20240923-WA0035.mp4",
  },
  {
    "submissionId": "DC4pO6ryBVhyR2364mt3",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082635450_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727082269710_Vid_20240923_142427593.mp4",
  },
  {
    "submissionId": "mlQ56dZTwZ7JjvIz6eWV",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081724194_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081718405_1000469764.mp4",
  },
  {
    "submissionId": "dHQECAym4LgSTVdVShxN",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081669202_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081645683_a64d56ae-f6a3-4531-9646-2b01b0b5671c.mp4",
  },
  {
    "submissionId": "iAYAqHJJQOo7huHHZHoi",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081409708_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081363244_Vid_20240923_141535530.mp4",
  },
  {
    "submissionId": "0YUVXUUngvWIZe0A8JFx",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081381871_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727081370765_VID-20240923-WA0002.mp4",
  },
  {
    "submissionId": "DJyZYc2FVB2GmZuVu4aH",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080850003_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080649740_VID-20240923-WA0032.mp4",
  },
  {
    "submissionId": "KvlH7qedtRztuu9ylddr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080751475_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080685005_1000269799.mp4",
  },
  {
    "submissionId": "ek71sWCeT7TAfmD1CYPO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080639989_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727080350181_Vid_20240923_135443887.mp4",
  },
  {
    "submissionId": "M38ti2p8AybOy2caxzFr",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079915624_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079908466_VID-20240920-WA0059.mp4",
  },
  {
    "submissionId": "9Pc0gMzfSJlbAwAxasj9",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079859651_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079854791_1000215799.mp4",
  },
  {
    "submissionId": "KSp7hjLxkExiMVY7fUMg",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079837982_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079591603_VID_20240923_134409.mp4",
  },
  {
    "submissionId": "acxqXQihsnxqFWY52vIU",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079729462_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079708514_VID-20240923-WA0020.mp4",
  },
  {
    "submissionId": "xdQaaacdbXxNPlBnZyBt",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079604509_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079588441_1000215790.mp4",
  },
  {
    "submissionId": "p93MubAeBHu89wy3Czk8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079473067_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079464761_VID-20240923-WA0031.mp4",
  },
  {
    "submissionId": "IoVy62ReZkeSk3TD1TML",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079400165_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079381296_VID_20240920_133837.mp4",
  },
  {
    "submissionId": "ardIHKy7cuZWXVZySjP8",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727079136162_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727078986259_VID_20240923133807.mp4",
  },
  {
    "submissionId": "RLiqalVzRVF91jmMIGAA",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727078622445_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727078547468_1000038124.mp4",
  },
  {
    "submissionId": "TsmwRShRsSyH4IddovZ6",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727078234938_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727078201516_1000037565.mp4",
  },
  {
    "submissionId": "7As7mejJcT8F03EJd8Fk",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077575679_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077556832_FbVideo_1727024732737 (online-video-cutter.com) (1).mp4",
  },
  {
    "submissionId": "gMCc9KLM7J06YXRhiHIB",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077361973_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077335421_1000215749.mp4",
  },
  {
    "submissionId": "8RXZBgom2ITYJVX1Qc94",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077064194_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727077024267_InShot_20240923_130446566.mp4",
  },
  {
    "submissionId": "ywtB9fArYOrOcfCFxVaG",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727076737053_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727076572765_video_20240921_154446.mp4",
  },
  {
    "submissionId": "k910qxtOVVUaZQIF2gtO",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727074569253_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727074461704_km_20240919_1080p_60f_20240919_230209.mp4",
  },
  {
    "submissionId": "Gt0YQ2N4s9eEgINRkJvk",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727073647016_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727073581968_VID-20240923-WA0003.mp4",
  },
  {
    "submissionId": "i1WsgQ7QQScHte1WwuYL",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727071142147_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727071095131_VID20240923112235.mp4",
  },
  {
    "submissionId": "VR0vPqQMTChJMjdgaTuU",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906246259_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906119337_1000032146.mp4",
  },
  {
    "submissionId": "EM7KZXLivz8rs01Ygpnx",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726823014587_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822963470_1000046023.mp4",
  },
  {
    "submissionId": "CfC5Slbz9ioSBnXxYcyT",
    "imageUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818766735_undefined",
    "videoUrl": "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818588269_InShot_20240920_131554767.mp4",
  },
];
const ScriptPage = (props) => {
    // const [counter, setCounter] = useState(1);
  useEffect(() => {
    const uploadDataSequentially = async () => {
        let counter = 102;
      while (counter < uploadData.length) {
        console.log(counter);
        await uploadDataRequest(uploadData[counter]);
        console.log("happening")
        counter++;
        // setCounter((prevCounter) => prevCounter + 1); // Increment the counter after each upload
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 30 seconds
      }
    };

    uploadDataSequentially();
  }, []);

  async function uploadDataRequest(data) {
    console.log("-------------");
    try {
      const uploadRequest = await axios.post("http://localhost:8000/upload", data, {
        timeout: 10000,
      });
      console.log(uploadRequest.data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  }

  return (
    <>
      <h1>Welcome to Script Page</h1>
    </>
  );
};
export default ScriptPage;
