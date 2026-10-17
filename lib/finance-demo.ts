export type Product = "Asset-backed" | "Dealer finance" | "Fleet finance" | "Property bridging" | "RAF advance";
export type Stage = "New" | "Documents" | "Assessment" | "Credit review" | "Approved" | "Disbursed" | "On hold";
export type Application = { id: string; applicant: string; product: Product; amount: number; stage: Stage; manager: string; date: string; reference: string; progress: number; notes: string };
export const applications: Application[] = [
{ id:"LF-1048",applicant:"Mokoena Luxury Motors",product:"Dealer finance",amount:1250000,stage:"Credit review",manager:"Thandi M.",date:"2026-10-16",reference:"Dealer facility / stock",progress:70,notes:"Dealer facility application awaiting credit committee review."},
{ id:"LF-1047",applicant:"Naledi Khumalo",product:"Asset-backed",amount:185000,stage:"Assessment",manager:"James P.",date:"2026-10-16",reference:"2022 Mercedes-Benz C-Class",progress:52,notes:"Asset valuation and ownership verification are in progress."},
{ id:"LF-1046",applicant:"Ubuntu Freight (Pty) Ltd",product:"Fleet finance",amount:2780000,stage:"Documents",manager:"Sarah K.",date:"2026-10-15",reference:"2 commercial trucks",progress:30,notes:"Outstanding insurance and company supporting documents."},
{ id:"LF-1045",applicant:"Sibusiso Dlamini",product:"RAF advance",amount:320000,stage:"Approved",manager:"Thandi M.",date:"2026-10-14",reference:"Legal settlement advance",progress:87,notes:"Approved for demonstration purposes only. No real funding is authorised."},
{ id:"LF-1044",applicant:"Pinnacle Property Group",product:"Property bridging",amount:670000,stage:"Disbursed",manager:"James P.",date:"2026-10-13",reference:"Property transfer proceeds",progress:100,notes:"Fictional disbursement recorded as a demonstration."},
{ id:"LF-1043",applicant:"Precious Ndlovu",product:"Asset-backed",amount:96000,stage:"New",manager:"Sarah K.",date:"2026-10-12",reference:"Luxury watch valuation",progress:12,notes:"New inquiry, awaiting customer onboarding."},
{ id:"LF-1042",applicant:"Mbatha Auto Traders",product:"Dealer finance",amount:540000,stage:"On hold",manager:"Thandi M.",date:"2026-10-11",reference:"Vehicle stock funding",progress:45,notes:"Further compliance documents requested."},
{ id:"LF-1041",applicant:"Lerato Molefe",product:"Property bridging",amount:410000,stage:"Assessment",manager:"James P.",date:"2026-10-10",reference:"Conveyancing matter",progress:55,notes:"Confirmation of expected transfer date outstanding."}
];
export const products: {name:Product;description:string; icon:string}[]=[
{name:"Asset-backed",description:"Luxury assets, vehicles and valuables",icon:"Gem"},
{name:"Dealer finance",description:"Floorplan facilities and vehicle stock",icon:"Car"},
{name:"Fleet finance",description:"Commercial trucks and trailers",icon:"Truck"},
{name:"Property bridging",description:"Property transfers and proceeds",icon:"House"},
{name:"RAF advance",description:"Settlement-linked funding",icon:"Scale"},
];
export const money=(v:number)=>new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",maximumFractionDigits:0}).format(v);
