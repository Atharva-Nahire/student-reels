"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const uploadData = [
  {
    submissionId: "uBqJPuLAuvlHoEID9Qnp",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726851303307_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726851253202_1000151705.mp4",
  },
  {
    submissionId: "zFVBJxtDf5sfAzPKW0Fg",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726844652329_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726844609427_VID-20240920-WA0022.mp4",
  },
  {
    submissionId: "gE5yivfIPeAwX53Z6c6T",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726844330351_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726844325983_VID_20240920_202712.mp4",
  },
  {
    submissionId: "tcc5ihgSwiDwigzEzIUv",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726843724924_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726843707213_VID_20240920_132614.mp4",
  },
  {
    submissionId: "Q6p6JCG5KxyUtt3pIsYl",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726843447738_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726843299887_VID20240920200638.mp4",
  },
  {
    submissionId: "QykpdJSZ0UiT6b5cf92S",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842874307_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842870181_VID_20240920_200046.mp4",
  },
  {
    submissionId: "fsRY70BTOqnLOMLLcgtX",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842769046_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842729516_20240920_192336.mp4",
  },
  {
    submissionId: "7oBjgzub5VF3Okg3S5Tz",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842304302_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842298917_VID_20240920_194222.mp4",
  },
  {
    submissionId: "HQVN5wbhqOsUcihPypbI",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842259340_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726842237413_20240920_194828.mp4",
  },
  {
    submissionId: "SoXkCqrDnCo1bCRIeQSo",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726841460778_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726841219386_MP4_20240920_165220VLOG.mp4",
  },
  {
    submissionId: "XkUC8EXGsMNjMGQQAYta",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726841038392_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726841025232_20240920_192609.mp4",
  },
  {
    submissionId: "H4k0AMHeSGTiduavWYaB",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840943482_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840931358_20240920_191944.mp4",
  },
  {
    submissionId: "RttxItwbQPK0wy7oZ81h",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840702668_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840502819_MP4_20240920_163235VLOG.mp4",
  },
  {
    submissionId: "biaCAq9HfXEXwCqFHm7E",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840679967_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840675302_VID_20240920_191812.mp4",
  },
  {
    submissionId: "ch5maTOz5Xm0L2Vj1TuT",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840356260_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840351375_1000031591.mp4",
  },
  {
    submissionId: "53WBCF4dqRxtlqFCyfJQ",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840284054_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726840278661_converted_1.mp4",
  },
  {
    submissionId: "ggJqCn0sGprBcPxW66YO",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726839664873_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726839621032_IMG_4637.mp4",
  },
  {
    submissionId: "bUZ1ZPkN64aPGnNQ9Mih",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726838844038_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726838766446_video_20240919_150336.mp4",
  },
  {
    submissionId: "SwOfPCWfe4ecArqdlhdx",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726838659575_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726838653525_1000171154.mp4",
  },
  {
    submissionId: "Z5iMscDjHLh4tkhVr4sp",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726837003093_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726836997923_1000214123.mp4",
  },
  {
    submissionId: "ixkRqHCfAC0NbAN05In6",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726836918345_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726836897515_VID-20240920-WA0004.mp4",
  },
  {
    submissionId: "fJcwIFHqztk1Y97kVgqq",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726836417405_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726836412388_1000195881.mp4",
  },
  {
    submissionId: "Bid7UsdVF77zoQ1GhwfY",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832772931_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832768621_1000214069.mp4",
  },
  {
    submissionId: "rBfWahQGa2mkYgd9fXGv",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832541487_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832536695_1000214071.mp4",
  },
  {
    submissionId: "i2uOr5uoYAdcgpZK8rwa",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832465518_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832456141_VID-20240920-WA0034.mp4",
  },
  {
    submissionId: "SfCTDjDG3fNDhi0uhsVU",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832353972_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726832340803_VID-20240920-WA0019.mp4",
  },
  {
    submissionId: "EJ7kmOL5EWtoerVYfNR1",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831823469_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831814418_VID-20240919-WA0004.mp4",
  },
  {
    submissionId: "fBECcdetGlYYS02iCkTy",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831471646_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831360810_VID20240920164759.mp4",
  },
  {
    submissionId: "BrxrGbMJIuwsul6fweGo",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831393609_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831273485_1000275424.mp4",
  },
  {
    submissionId: "U5YN4tbb7KTPEa1dbKiD",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831022169_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726831013555_e3a679f8-f5ab-4006-a511-16bba430a01d copy.mp4",
  },
  {
    submissionId: "zkdTMJ8AyusJEa0IfBpR",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726828497532_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726828388596_video_20240920_154341.mp4",
  },
  {
    submissionId: "U1ml4caNbxfbc5NrmCfi",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726828232327_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726828218222_VID-20240920-WA0020.mp4",
  },
  {
    submissionId: "WogADH54uyBySfmgOFMu",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726827983643_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726827971944_VID-20240920-WA0013.mp4",
  },
  {
    submissionId: "PfYDgzXh9Kc2TOWeQPso",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726826912266_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726826689744_VID_20240920_142932.mp4",
  },
  {
    submissionId: "Lt14im7BNrhFCXY6V8Xd",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726825656971_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726825489759_VID20240920133630.mp4",
  },
  {
    submissionId: "EM7KZXLivz8rs01Ygpnx",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726823014587_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822963470_1000046023.mp4",
  },
  {
    submissionId: "S8tsKDTTb5vsUvkyORZF",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822979280_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822956450_VID-20240920-WA0014.mp4",
  },
  {
    submissionId: "sl29yXSiHuQowPYLx4H7",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822150465_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726822108993_1000133887.mp4",
  },
  {
    submissionId: "Euk1KBYtgUZ8Gst1cI7Y",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726819541951_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726819462570_VID_20240919_162815.mp4",
  },
  {
    submissionId: "Cd6YJQQRRGap2QwO69kq",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726819321979_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726819277955_VID_20240919_150748.mp4",
  },
  {
    submissionId: "CfC5Slbz9ioSBnXxYcyT",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818766735_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818588269_InShot_20240920_131554767.mp4",
  },
  {
    submissionId: "yCE6FX7Kr7LuiyYvc3q5",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818758982_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818311616_InShot_20240920_131413018.mp4",
  },
  {
    submissionId: "HVGr9erDEuPZUt20c3qI",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818733583_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818658879_VID20240920131515.mp4",
  },
  {
    submissionId: "0ysBzKqtiQTfPkUlZQTv",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818454408_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818442188_1000031397.mp4",
  },
  {
    submissionId: "d6aBmqvSaJP68gg4QszO",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818454130_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818438197_1000031397.mp4",
  },
  {
    submissionId: "1aWd5489haLMXhGhG7fC",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818333429_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818249899_1000168746.mp4",
  },
  {
    submissionId: "J115jcXKNfFROqMfHxWq",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818013676_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726818008631_1000213904.mp4",
  },
  {
    submissionId: "Wht8iCfz5DMxEh2kPwPU",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817887331_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817718835_20240919_135836_001_001_001.mp4",
  },
  {
    submissionId: "2BD3CO6xSFw4oLxHZGuz",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817536437_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817528722_VID-20240920-WA0006.mp4",
  },
  {
    submissionId: "X89iuMLe3g1hVmi2m3AS",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817229063_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817157073_1000275342.mp4",
  },
  {
    submissionId: "0rV50IqHgMVgvKXAKmK4",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817020266_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726817012377_VID-20240920-WA0010.mp4",
  },
  {
    submissionId: "nuGdJWfm8YCNwpMmoLuc",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816721006_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816498679_20240918_133745_001_001.mp4",
  },
  {
    submissionId: "MSxu1p0GTzfdupwYHkRI",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816492139_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816447256_VID20240919140246.mp4",
  },
  {
    submissionId: "Gi3jS0rPykCHLphx3X3e",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816143981_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816097438_video_20240920_123305.mp4",
  },
  {
    submissionId: "RvbkB0hNv1lBAdEpI1zG",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816093455_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726816035953_1000106376.mp4",
  },
  {
    submissionId: "3o0pgpXTZOzuI2X5bnGm",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726815584228_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726815560415_1000069190.mp4",
  },
  {
    submissionId: "Rqq3kK0ZRtniLZoLzgpL",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726815506623_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726815460853_1000106373.mp4",
  },
  {
    submissionId: "stUir1Dy0IMfPnFM3cRx",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726814705494_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726814455028_1000213793.mp4",
  },
  {
    submissionId: "4iZNURT1Hwkjsq3DX6HW",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726813255946_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812997627_VID20240920114256.mp4",
  },
  {
    submissionId: "wupqWWddeUArHsvADuTZ",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812584940_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812568537_4e8226e0-31fc-416a-a300-ce4ed6af9b39.mp4",
  },
  {
    submissionId: "e24QpMxltMDgT79HUB9G",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812581240_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726812562934_4e8226e0-31fc-416a-a300-ce4ed6af9b39.mp4",
  },
  {
    submissionId: "4lPhCdRLsuNuOZt4WtDv",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811638549_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811633646_VID-20240920-WA0008.mp4",
  },
  {
    submissionId: "ZjR9YJ70uReXaYvPfu8m",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811526299_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811515971_VIDEO_790f211c-08fa-40a3-b3ea-a481fb1b16d0.mp4",
  },
  {
    submissionId: "GAT27AQi2hTUVmavY8MO",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811404120_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726811281162_1000106315.mp4",
  },
  {
    submissionId: "9eWI8kbVK42rrI480U2W",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810673478_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810573387_1000168714.mp4",
  },
  {
    submissionId: "gCwUFAdP06jIML34kWgS",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810537828_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726810454983_VID-20240919-WA0024.mp4",
  },
  {
    submissionId: "LaQ4BeamHAm1VaTRsuxJ",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726809396305_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726809371340_1000150461.mp4",
  },
  {
    submissionId: "fPwzFTZCyUiTMscaI96I",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726809276395_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726809256565_1000150690.mp4",
  },
  {
    submissionId: "efTnddgZ8E5BiEd2aNLL",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808646274_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808633970_VID-20240918-WA0028.mp4",
  },
  {
    submissionId: "qEu6LDtvtvo19YExrfFq",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808542474_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808536174_VID-20240920-WA0022.mp4",
  },
  {
    submissionId: "ppPW1zCsS0dwhnVbisVK",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808434517_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808425645_VID-20240918-WA0027.mp4",
  },
  {
    submissionId: "FSZboxWI5indu9SnINDz",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808238394_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726808222513_VID-20240918-WA0029.mp4",
  },
  {
    submissionId: "XWFF9EGCcqRs4C6q46nS",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726792255944_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726792230157_VID_20240919_121035168.mp4",
  },
  {
    submissionId: "SeMnQRQZCVFQgHsrETN3",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726791756693_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726791710012_VID_20240919_104847187.mp4",
  },
  {
    submissionId: "Zv2ZmOMgafeF0b8RizUC",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768519172_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768439917_VID20240918142939.mp4",
  },
  {
    submissionId: "mlaBfo2SmaoDnNaCzDmW",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768506467_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726768420242_VID20240918142939.mp4",
  },
  {
    submissionId: "iGbL8LozY2WXBPRCr7eI",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766926459_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766880977_1000170925.mp4",
  },
  {
    submissionId: "EMu1M3w31e4Tj1BRaq9P",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766243882_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726766228298_VID_20240919224609.mp4",
  },
  {
    submissionId: "scZcor6EhIFKkEbyoblT",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765747394_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765721870_VN20240919_132822.mp4",
  },
  {
    submissionId: "2iI3RiqJZN8jWrUHBgXB",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765671702_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765619514_lv_0_20240919223246.mp4",
  },
  {
    submissionId: "uKPHFiFHwuRHjmafJtxk",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765519823_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765497110_1000101991.mp4",
  },
  {
    submissionId: "ZEWIgwllaqas1ofGytrx",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765164288_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726765159041_1000211370.mp4",
  },
  {
    submissionId: "uHpuN5I1ST021wgRRuLR",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726764412615_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726764385504_video_20240919_122737.mp4",
  },
  {
    submissionId: "IuatNkIRS4vQP2UAizBq",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726763049995_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726762953901_1000266652.mp4",
  },
  {
    submissionId: "loxA5ITYrzN2AfQ71bYK",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726763047092_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726762941362_1000266652.mp4",
  },
  {
    submissionId: "h1QhCXri3uEgAnxNHk3E",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726760616384_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726760546912_VID_20240918_175756.mp4",
  },
  {
    submissionId: "nNsmqzkNxWWxpvNoSBFR",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726759253843_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726759236059_1000070194.mp4",
  },
  {
    submissionId: "OwiLaiSYhfKDZt2OqbZc",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726756708658_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726756696686_1000045808.mp4",
  },
  {
    submissionId: "E5dy7MOTBloUw0bNuA4z",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755707690_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755700719_1000213515.mp4",
  },
  {
    submissionId: "mqaRJDhx0bbj9Iab63B5",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755174419_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755169354_1000213507.mp4",
  },
  {
    submissionId: "LbX2DyjqRkkv8kq1z5E1",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755046387_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726755040968_1000213505.mp4",
  },
  {
    submissionId: "tDfvRoebNfM6RS8v5COJ",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726752334975_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726752098509_1000251277.mp4",
  },
  {
    submissionId: "Ua0w6mkjNg0hX7wpnUmw",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726751260045_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726751024858_VID20240919163022.mp4",
  },
  {
    submissionId: "QwMvkSeIyrRsEE7prhtv",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749689665_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749651446_1000045786.mp4",
  },
  {
    submissionId: "FpEqKwLySIixIOUr3fGJ",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749545882_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749412218_VID-20240919-WA0017.mp4",
  },
  {
    submissionId: "I2dUV0FxpXQ43CLIjepu",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749135951_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726749013101_VID_20240919_145950(0).mp4",
  },
  {
    submissionId: "eZ7XPTREMtlKNkKbywor",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726748307875_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726748083006_VID_20240919_141340(0).mp4",
  },
  {
    submissionId: "ZhvtIowBG1wdg20r2EZM",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726745326409_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726745316944_1000133487.mp4",
  },
  {
    submissionId: "nq6tISS6pjGEWUhn1nTL",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726744192761_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726744116160_VID-20240919-WA0038.mp4",
  },
  {
    submissionId: "hFrWA3raDB6YK9hWCVSu",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726744138594_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726744129970_VID-20240919-WA0019.mp4",
  },
  {
    submissionId: "1v0WA3QY2sZvaUBzNhuc",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726743278485_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726743242196_VID_20240919_162243.mp4",
  },
  {
    submissionId: "faylKN434AVw93SZxvDg",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726737613404_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726737595079_b9316951-3180-4e8c-8a47-51506007f579-1_all_3086.mp4",
  },
  {
    submissionId: "jgNeg3azu0A9gZSwcxZU",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726736178753_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726736082355_VID_20240919_142032.mp4",
  },
  {
    submissionId: "h4y1mI8G5KYoWnP3BT4G",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726735611371_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726735554147_VID-20240919-WA0013.mp4",
  },
  {
    submissionId: "jWjiyhIKbW8z5eyZuPmG",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726735395150_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726735361439_VID_20240919_140712.mp4",
  },
  {
    submissionId: "z1wzUPfk35xkeZnyLvBE",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726734675987_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726734663769_FbVideo_1726734209441.mp4",
  },
  {
    submissionId: "EiPVTXxtBmXEUbx798ng",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726733561554_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726733477208_VID_20240919_133119.mp4",
  },
  {
    submissionId: "iLTsdhxva6xqgU0yTG1L",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726732518744_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726732468888_VID-20240919-WA0009.mp4",
  },
  {
    submissionId: "6e7O8crOtBZfyrNPUMsu",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730509709_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730493013_VID-20240919-WA0015.mp4",
  },
  {
    submissionId: "zK6vNSMppHu6gcn00gVp",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730330639_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730223481_VID_20240919_114126.mp4",
  },
  {
    submissionId: "5Vpuh2CFAESsP6kYzM4S",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730095637_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726730040095_VID_20240919_123911.mp4",
  },
  {
    submissionId: "9DhymBPDHTlyUk8EMC79",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729295414_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729094755_VID_20240919120253.mp4",
  },
  {
    submissionId: "nyDFdGVYODmVR4VCYHnH",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726729029587_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726728794853_VID_20240919120253.mp4",
  },
  {
    submissionId: "XHxpFDe0NL1iS3EiHXL2",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726728645769_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726728634948_1000213161.mp4",
  },
  {
    submissionId: "C6idM9PexyXayplZtGdF",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726726848355_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726726783338_VID_20240919_114703.mp4",
  },
  {
    submissionId: "ildo0RRb2F4Em42xBogU",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726719677335_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726719657662_VID-20240919-WA0009.mp4",
  },
  {
    submissionId: "dYs32KuqkPUXsrckdGwy",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726664999275_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726664935724_VID20240918175758.mp4",
  },
  {
    submissionId: "iDzDLtlHfnzmC9lzHUEi",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726660376074_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726660370410_1000211200.mp4",
  },
  {
    submissionId: "0zK6pdFNPyJR00qomU9d",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726651246225_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726650777456_VID20240918124348.mp4",
  },
  {
    submissionId: "tmzx1l6YrV2njxvw9Y9K",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726649680197_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726649598163_VID_20240918_141307.mp4",
  },
  {
    submissionId: "aigypxT5TTpB8MosYT7O",
    imageUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726636079918_undefined",
    videoUrl: "https://medical-reels.nyc3.digitaloceanspaces.com/submissions/undefined/1726636074556_WhatsApp Video 2024-09-17 at 12.37.24.mp4",
  },
];
const ScriptPage = (props) => {
    // const [counter, setCounter] = useState(1);
  useEffect(() => {
    const uploadDataSequentially = async () => {
        let counter = 2;
      while (counter < uploadData.length) {
        console.log(counter);
        await uploadDataRequest(uploadData[counter]);
        console.log("happening")
        counter++;
        // setCounter((prevCounter) => prevCounter + 1); // Increment the counter after each upload
        await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds
      }
    };

    uploadDataSequentially();
  }, []);

  async function uploadDataRequest(data) {
    console.log("-------------");
    try {
      const uploadRequest = await axios.post("http://localhost:8000/upload", data, {
        timeout: 120000,
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
