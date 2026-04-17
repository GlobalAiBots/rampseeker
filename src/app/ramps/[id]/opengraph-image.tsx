import { ImageResponse } from "next/og";
import { getUnifiedRampById } from "@/data/all-ramps";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stNames: Record<string, string> = {AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"};

export default async function Image({ params }: { params: { id: string } }) {
  const ramp = getUnifiedRampById(params.id);
  const title = ramp?.name || "Boat Ramp";
  const subtitle = ramp ? `${ramp.city ? ramp.city + ", " : ""}${stNames[ramp.state] || ramp.state}` : "";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #1E6091, #134B70)", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.5)", marginBottom: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}>RampSeeker</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "white", textAlign: "center" as const, maxWidth: 900, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)", marginTop: 16 }}>{subtitle}</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>Boat Ramp · GPS Coordinates · Directions</div>
      </div>
    ),
    { ...size }
  );
}
