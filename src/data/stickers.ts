export interface Sticker {
  id: string;
  number: string;
  team: string;
  name?: string;
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  stickers: Sticker[];
}

const teamInfo: Record<string, { name: string; flag: string }> = {
  FWC: { name: "FIFA World Cup", flag: "🏆" },
  // Group A
  MEX: { name: "México", flag: "🇲🇽" },
  KOR: { name: "Corea del Sur", flag: "🇰🇷" },
  CZE: { name: "Chequia", flag: "🇨🇿" },
  RSA: { name: "Sudáfrica", flag: "🇿🇦" },
  // Group B
  SUI: { name: "Suiza", flag: "🇨🇭" },
  CAN: { name: "Canadá", flag: "🇨🇦" },
  QAT: { name: "Qatar", flag: "🇶🇦" },
  BIH: { name: "Bosnia y Herz.", flag: "🇧🇦" },
  // Group C
  BRA: { name: "Brasil", flag: "🇧🇷" },
  MAR: { name: "Marruecos", flag: "🇲🇦" },
  SCO: { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  HAI: { name: "Haití", flag: "🇭🇹" },
  // Group D
  USA: { name: "Estados Unidos", flag: "🇺🇸" },
  TUR: { name: "Turquía", flag: "🇹🇷" },
  AUS: { name: "Australia", flag: "🇦🇺" },
  PAR: { name: "Paraguay", flag: "🇵🇾" },
  // Group E
  GER: { name: "Alemania", flag: "🇩🇪" },
  ECU: { name: "Ecuador", flag: "🇪🇨" },
  CIV: { name: "Costa de Marfil", flag: "🇨🇮" },
  CUW: { name: "Curazao", flag: "🇨🇼" },
  // Group F
  NED: { name: "Países Bajos", flag: "🇳🇱" },
  JPN: { name: "Japón", flag: "🇯🇵" },
  SWE: { name: "Suecia", flag: "🇸🇪" },
  TUN: { name: "Túnez", flag: "🇹🇳" },
  // Group G
  BEL: { name: "Bélgica", flag: "🇧🇪" },
  IRN: { name: "Irán", flag: "🇮🇷" },
  EGY: { name: "Egipto", flag: "🇪🇬" },
  NZL: { name: "Nueva Zelanda", flag: "🇳🇿" },
  // Group H
  ESP: { name: "España", flag: "🇪🇸" },
  URU: { name: "Uruguay", flag: "🇺🇾" },
  KSA: { name: "Arabia Saudita", flag: "🇸🇦" },
  CPV: { name: "Cabo Verde", flag: "🇨🇻" },
  // Group I
  FRA: { name: "Francia", flag: "🇫🇷" },
  SEN: { name: "Senegal", flag: "🇸🇳" },
  NOR: { name: "Noruega", flag: "🇳🇴" },
  IRQ: { name: "Irak", flag: "🇮🇶" },
  // Group J
  ARG: { name: "Argentina", flag: "🇦🇷" },
  AUT: { name: "Austria", flag: "🇦🇹" },
  ALG: { name: "Argelia", flag: "🇩🇿" },
  JOR: { name: "Jordania", flag: "🇯🇴" },
  // Group K
  POR: { name: "Portugal", flag: "🇵🇹" },
  COL: { name: "Colombia", flag: "🇨🇴" },
  COD: { name: "RD Congo", flag: "🇨🇩" },
  UZB: { name: "Uzbekistán", flag: "🇺🇿" },
  // Group L
  ENG: { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  CRO: { name: "Croacia", flag: "🇭🇷" },
  PAN: { name: "Panamá", flag: "🇵🇦" },
  GHA: { name: "Ghana", flag: "🇬🇭" },
};

const teams: Team[] = [];

// Special Stickers (FWC)
const fwcStickers: Sticker[] = [];
for (let i = 0; i <= 19; i++) {
  const num = i === 0 ? "00" : i.toString();
  fwcStickers.push({ id: `FWC_${num}`, number: num, team: "FWC" });
}
teams.push({ 
  id: "FWC", 
  name: teamInfo["FWC"].name, 
  flag: teamInfo["FWC"].flag,
  stickers: fwcStickers 
});

// Team Stickers
const teamCodes = Object.keys(teamInfo).filter(code => code !== "FWC");

teamCodes.forEach(code => {
  const stickers: Sticker[] = [];
  
  // 1: Escudo
  stickers.push({ id: `${code}_1`, number: "1 (🛡️)", team: code });
  
  // 2-12: Jugadores (11 jugadores)
  for (let i = 2; i <= 12; i++) {
    stickers.push({ id: `${code}_${i}`, number: i.toString(), team: code });
  }

  // 13: Foto Grupal
  stickers.push({ id: `${code}_13`, number: "13 (👥)", team: code });

  // 14-20: Jugadores (7 jugadores)
  for (let i = 14; i <= 20; i++) {
    stickers.push({ id: `${code}_${i}`, number: i.toString(), team: code });
  }
  
  teams.push({ 
    id: code, 
    name: teamInfo[code].name, 
    flag: teamInfo[code].flag,
    stickers 
  });
});

export const ALL_TEAMS = teams;
export const TOTAL_STICKERS = teams.reduce((acc, team) => acc + team.stickers.length, 0);
