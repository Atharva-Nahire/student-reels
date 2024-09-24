"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const uploadData = [
    {
      submissionId: "P5YG7Z5CgU4JGDf8GqDV",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727059502457_VID20240920110506.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727059606529_undefined",
    },
    {
      submissionId: "Il9ErWzvyEadzKas1bLd",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727059495898_VID20240920110506.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727059604432_undefined",
    },
    {
      submissionId: "bgiw6Y8YBsIPtkAYO830",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727058285769_lv_0_20240922113419.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727058569788_undefined",
    },
    {
      submissionId: "NxUeSQTF4frj1vMeOd2W",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727056110184_VID20240921141931.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727056263822_undefined",
    },
    {
      submissionId: "MGZjnuydzcoG4uIAP5yh",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727055259827_1000012153.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727055305517_undefined",
    },
    {
      submissionId: "pozIa2Mi2HW5aO51SFTi",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727025905150_VID20240921134707.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1727026041113_undefined",
    },
    {
      submissionId: "4q1qFAv343TpwveYWgWZ",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726981822430_YouCut_20240921_141842354.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726981866943_undefined",
    },
    {
      submissionId: "A9KGmOtm60WuZtEFeZBA",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726931621013_VID20240921163423.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726931681545_undefined",
    },
    {
      submissionId: "fK9DGbabVPsL8gacsJQ9",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921694082_1000070819.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921700110_undefined",
    },
    {
      submissionId: "MWXUWNhqW5SGxkn0fTYT",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921395193_1000070816.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921399013_undefined",
    },
    {
      submissionId: "b6Z5YXWBqQktMJ5ChzCM",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921138280_1000070812.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726921144066_undefined",
    },
    {
      submissionId: "qN8IfjJfpAAOi4x0nQAX",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726920300515_20240921_153355.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726920368358_undefined",
    },
    {
      submissionId: "sieSiJFK5AQIw6c8dsDx",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918987489_VID-20240921-WA0020.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918994490_undefined",
    },
    {
      submissionId: "VnxqCYzSw0Q3l3VFK0PJ",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918574963_VID-20240921-WA0016.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918579928_undefined",
    },
    {
      submissionId: "9GiMqS61dw05Ddxu87j2",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918365879_video_20240921_165906_edit.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726918373114_undefined",
    },
    {
      submissionId: "XywvJzq25tpAEzMCdRMt",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726916545818_VID_20240921_145554.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726916775566_undefined",
    },
    {
      submissionId: "Fx0ydZzzhe532TWZymHt",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726916259667_VID_20240921_142150.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726916350051_undefined",
    },
    {
      submissionId: "LQLcUIGKqgy58cKJPWY0",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726915208562_1000032260.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726915463764_undefined",
    },
    {
      submissionId: "osM7jkHX02qEp44ffoA8",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726915209179_1000032260.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726915455167_undefined",
    },
    {
      submissionId: "wBYuuUnL4d1xMPY1HlK9",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726913344443_VID_20240921_152815.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726913521891_undefined",
    },
    {
      submissionId: "TT2JGNoTzQUeh6AuK6CH",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726913406794_20240920_123015.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726913517839_undefined",
    },
    {
      submissionId: "ClglDKvb8hbWDe9PZzvY",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726912396188_VID-20240921-WA0008.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726912416455_undefined",
    },
    {
      submissionId: "z11OuX4kC93A6voIVlDq",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726912033621_VID-20240921-WA0006.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726912048686_undefined",
    },
    {
      submissionId: "oohK13GIIcY8y3TDcIzZ",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726911333741_1001247190.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726911375390_undefined",
    },
    {
      submissionId: "WIcZzFV7yaUrRfjYpCjG",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726910402424_1000429519.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726910416264_undefined",
    },
    {
      submissionId: "ECLuXVk51Z7eNuQjuBGo",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909528047_VID_20240921_125711917.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909564328_undefined",
    },
    {
      submissionId: "vcuyDwwPh1UsqBXhntpV",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909087854_Karasani WHD.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909415490_undefined",
    },
    {
      submissionId: "x2hCbB8irbzu3b91sLik",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909386332_VIDEO_0866b297-7613-4369-a875-604dc2b87441.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909405457_undefined",
    },
    {
      submissionId: "yoo6Z7cW349Fnt1I8uM2",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909162674_VID-20240921-WA0016.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909211139_undefined",
    },
    {
      submissionId: "trGk5oq5CA7BiahykQdQ",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909171122_VID-20240921-WA0001.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726909180227_undefined",
    },
    {
      submissionId: "PTNUiinguNEUflyzdZQc",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908286415_VID-20240921-WA0033.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908335534_undefined",
    },
    {
      submissionId: "5XtNIQyIEnmOOWKvNJVT",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908153763_1000253120.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908158114_undefined",
    },
    {
      submissionId: "q984rPkyoBs94Lutt6ZY",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908082972_VID_20240921_132528.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726908090354_undefined",
    },
    {
      submissionId: "8sjVMPvPE2fDrOfBv1Si",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726907993824_1000171977.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726907999170_undefined",
    },
    {
      submissionId: "s5gsRD6p0ei2d7Lo1TQm",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906849563_1000187237.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906874348_undefined",
    },
    {
      submissionId: "VR0vPqQMTChJMjdgaTuU",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906119337_1000032146.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906246259_undefined",
    },
    {
      submissionId: "1hJDrqZ3no3Yr4Q6avuI",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726905627755_1000032144.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906003725_undefined",
    },
    {
      submissionId: "IQNufQWCoGz5ipQ1UpNk",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726905604801_1000032144.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906001679_undefined",
    },
    {
      submissionId: "6YagNqLYwZctxcqFT1km",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726905579950_1000032144.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726906000900_undefined",
    },
    {
      submissionId: "bZJavJ8ohfcrP6Hjeebs",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726905572756_1000032144.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726905999312_undefined",
    },
    {
      submissionId: "ZWhU1ZMjyKVIxDYWYCUV",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726904425906_VID-20240921-WA0016.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726904434593_undefined",
    },
    {
      submissionId: "VAkpIFf67LGkycGnkbWT",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726904295931_VID-20240921-WA0016.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726904411545_undefined",
    },
    {
      submissionId: "12qYmNsJfgyNp3dbv3Fk",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726903466533_1000141969.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726903471735_undefined",
    },
    {
      submissionId: "zrdD7zz0mFerqgUHkck3",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902955744_1001246943.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902963649_undefined",
    },
    {
      submissionId: "SiV3k5pu01CnXh3otwqI",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902601799_1001240072.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902612142_undefined",
    },
    {
      submissionId: "9b8RlEcwGkSZhakcqWxb",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902558462_1001240076.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902568753_undefined",
    },
    {
      submissionId: "Kfq8Aj8mpuip4u6gyuWu",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902399829_Precautions To be Taken for Healthy Heart , Heart Healthy Foods ,Healthy Diet , Heart Healthy meals~2.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902463536_undefined",
    },
    {
      submissionId: "AvHRHjWfqJ1AklCl6LuU",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902414782_1001240076.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726902424898_undefined",
    },
    {
      submissionId: "tZe3yi6J8l3tLAV6c8b6",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726900396529_video_20240921_115717.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726900528773_undefined",
    },
    {
      submissionId: "LWvZxLlGdDVEdVU1MkxI",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899595792_1000141899.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899603676_undefined",
    },
    {
      submissionId: "LBglYO01ltMAEjPPULou",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899308610_VID-20240921-WA0001.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899322328_undefined",
    },
    {
      submissionId: "TSkAErKddH126i4ky1fB",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899184981_1000141887.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899190822_undefined",
    },
    {
      submissionId: "mm68SoTgglLOA1MO49se",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899028699_1000141880.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726899033834_undefined",
    },
    {
      submissionId: "8NpIRRl682Piu9s3owwD",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726898237879_video_20240920_211658.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726898292974_undefined",
    },
    {
      submissionId: "v8fpgEdRqujmJgFWBeQe",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726896566031_1000227620.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726896578202_undefined",
    },
    {
      submissionId: "M9IRtsnYioahCSc4JmdI",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726896390137_1000069470.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726896406981_undefined",
    },
    {
      submissionId: "vKynS0UVBk7SOsDjccpc",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895763124_VID_20240920_123819528.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895914321_undefined",
    },
    {
      submissionId: "BteKkbc5U2Npb7Cvc7Mi",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895179675_VID_20240919_150600242.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895228904_undefined",
    },
    {
      submissionId: "j5PYLdjVM4cCmQVo2xA7",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895013187_VID-20240921-WA0002.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726895018896_undefined",
    },
    {
      submissionId: "1YKXMGDoBCJJp2TwnO39",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726891619271_VID_20240919_133358.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726891890770_undefined",
    },
    {
      submissionId: "TAyOUYySa28JlR8BsXVA",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726890916503_1000012737.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726890961636_undefined",
    },
    {
      submissionId: "ptVgiZayG2Mf34vgLQ2M",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726889082030_1000225838.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726889170925_undefined",
    },
    {
      submissionId: "U5YN4tbb7KTPEa1dbKiD",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831013555_e3a679f8-f5ab-4006-a511-16bba430a01d copy.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831022169_undefined",
    },
    {
      submissionId: "EM7KZXLivz8rs01Ygpnx",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822963470_1000046023.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726823014587_undefined",
    },
    {
      submissionId: "CfC5Slbz9ioSBnXxYcyT",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818588269_InShot_20240920_131554767.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818766735_undefined",
    },
    {
      submissionId: "yCE6FX7Kr7LuiyYvc3q5",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818311616_InShot_20240920_131413018.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818758982_undefined",
    },
    {
      submissionId: "J115jcXKNfFROqMfHxWq",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818008631_1000213904.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818013676_undefined",
    },
    {
      submissionId: "4iZNURT1Hwkjsq3DX6HW",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812997627_VID20240920114256.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726813255946_undefined",
    },
    {
      submissionId: "9eWI8kbVK42rrI480U2W",
      videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810573387_1000168714.mp4",
      imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810673478_undefined",
    },
    // {
    //   submissionId: "Zv2ZmOMgafeF0b8RizUC",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768439917_VID20240918142939.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768519172_undefined",
    // },
    // {
    //   submissionId: "EMu1M3w31e4Tj1BRaq9P",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766228298_VID_20240919224609.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766243882_undefined",
    // },
    // {
    //   submissionId: "h1QhCXri3uEgAnxNHk3E",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726760546912_VID_20240918_175756.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726760616384_undefined",
    // },
    // {
    //   submissionId: "Ua0w6mkjNg0hX7wpnUmw",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726751024858_VID20240919163022.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726751260045_undefined",
    // },
    // {
    //   submissionId: "QwMvkSeIyrRsEE7prhtv",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749651446_1000045786.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749689665_undefined",
    // },
    // {
    //   submissionId: "I2dUV0FxpXQ43CLIjepu",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749013101_VID_20240919_145950(0).mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749135951_undefined",
    // },
    // {
    //   submissionId: "eZ7XPTREMtlKNkKbywor",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726748083006_VID_20240919_141340(0).mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726748307875_undefined",
    // },
    // {
    //   submissionId: "faylKN434AVw93SZxvDg",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726737595079_b9316951-3180-4e8c-8a47-51506007f579-1_all_3086.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726737613404_undefined",
    // },
    // {
    //   submissionId: "EiPVTXxtBmXEUbx798ng",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726733477208_VID_20240919_133119.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726733561554_undefined",
    // },
    // {
    //   submissionId: "zK6vNSMppHu6gcn00gVp",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730223481_VID_20240919_114126.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730330639_undefined",
    // },
    // {
    //   submissionId: "5Vpuh2CFAESsP6kYzM4S",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730040095_VID_20240919_123911.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730095637_undefined",
    // },
    // {
    //   submissionId: "9DhymBPDHTlyUk8EMC79",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729094755_VID_20240919120253.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729295414_undefined",
    // },
    // {
    //   submissionId: "nyDFdGVYODmVR4VCYHnH",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726728794853_VID_20240919120253.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729029587_undefined",
    // },
    // {
    //   submissionId: "dYs32KuqkPUXsrckdGwy",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726664935724_VID20240918175758.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726664999275_undefined",
    // },
    // {
    //   submissionId: "tmzx1l6YrV2njxvw9Y9K",
    //   videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726649598163_VID_20240918_141307.mp4",
    //   imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726649680197_undefined",
    // }
];
const ScriptPage = (props) => {
    // const [counter, setCounter] = useState(1);
  useEffect(() => {
    const uploadDataSequentially = async () => {
        let counter = 68;
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
