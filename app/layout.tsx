import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
const manrope=Manrope({variable:"--font-manrope",subsets:["latin"],display:"swap"});
const instrument=Instrument_Serif({variable:"--font-instrument",subsets:["latin"],weight:"400",style:["normal","italic"],display:"swap"});
export const metadata:Metadata={title:{default:"Finance Experience | Independent Concept",template:"%s | Finance Experience"},description:"Independent full-service financial website and CRM design concept. Not affiliated with Lamna."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${manrope.variable} ${instrument.variable} antialiased`}><body>{children}</body></html>}
