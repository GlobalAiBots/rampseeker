const fs = require('fs');
const path = require('path');

// All 46 states we now have
const allStates = [
  {slug:'oklahoma',code:'OK',name:'Oklahoma',color:'#E65100'},
  {slug:'texas',code:'TX',name:'Texas',color:'#1E6493'},
  {slug:'missouri',code:'MO',name:'Missouri',color:'#2D6A4F'},
  {slug:'arkansas',code:'AR',name:'Arkansas',color:'#8B5E3C'},
  {slug:'kansas',code:'KS',name:'Kansas',color:'#B8860B'},
  {slug:'florida',code:'FL',name:'Florida',color:'#0077B6'},
  {slug:'michigan',code:'MI',name:'Michigan',color:'#003366'},
  {slug:'minnesota',code:'MN',name:'Minnesota',color:'#003865'},
  {slug:'north-carolina',code:'NC',name:'North Carolina',color:'#4B0082'},
  {slug:'new-york',code:'NY',name:'New York',color:'#1C2951'},
  {slug:'illinois',code:'IL',name:'Illinois',color:'#5C4033'},
  {slug:'ohio',code:'OH',name:'Ohio',color:'#C41E3A'},
  {slug:'washington',code:'WA',name:'Washington',color:'#2E5A3A'},
  {slug:'alabama',code:'AL',name:'Alabama',color:'#9E1B32'},
  {slug:'georgia',code:'GA',name:'Georgia',color:'#BA0C2F'},
  {slug:'maryland',code:'MD',name:'Maryland',color:'#C8102E'},
  {slug:'oregon',code:'OR',name:'Oregon',color:'#234236'},
  {slug:'tennessee',code:'TN',name:'Tennessee',color:'#FF8200'},
  // New 28 states
  {slug:'alaska',code:'AK',name:'Alaska',color:'#003B5C'},
  {slug:'arizona',code:'AZ',name:'Arizona',color:'#CC5500'},
  {slug:'california',code:'CA',name:'California',color:'#003262'},
  {slug:'colorado',code:'CO',name:'Colorado',color:'#1B365D'},
  {slug:'connecticut',code:'CT',name:'Connecticut',color:'#004C97'},
  {slug:'delaware',code:'DE',name:'Delaware',color:'#00529B'},
  {slug:'hawaii',code:'HI',name:'Hawaii',color:'#CE1126'},
  {slug:'idaho',code:'ID',name:'Idaho',color:'#003366'},
  {slug:'indiana',code:'IN',name:'Indiana',color:'#003057'},
  {slug:'iowa',code:'IA',name:'Iowa',color:'#FFB81C'},
  {slug:'kentucky',code:'KY',name:'Kentucky',color:'#003865'},
  {slug:'louisiana',code:'LA',name:'Louisiana',color:'#461D7C'},
  {slug:'maine',code:'ME',name:'Maine',color:'#002776'},
  {slug:'massachusetts',code:'MA',name:'Massachusetts',color:'#1C2F5A'},
  {slug:'mississippi',code:'MS',name:'Mississippi',color:'#14213D'},
  {slug:'montana',code:'MT',name:'Montana',color:'#003B5C'},
  {slug:'nebraska',code:'NE',name:'Nebraska',color:'#D00000'},
  {slug:'new-hampshire',code:'NH',name:'New Hampshire',color:'#003B6F'},
  {slug:'new-jersey',code:'NJ',name:'New Jersey',color:'#1B1E6E'},
  {slug:'new-mexico',code:'NM',name:'New Mexico',color:'#CC0000'},
  {slug:'north-dakota',code:'ND',name:'North Dakota',color:'#009A44'},
  {slug:'pennsylvania',code:'PA',name:'Pennsylvania',color:'#003DA5'},
  {slug:'south-carolina',code:'SC',name:'South Carolina',color:'#73000A'},
  {slug:'south-dakota',code:'SD',name:'South Dakota',color:'#003B6F'},
  {slug:'utah',code:'UT',name:'Utah',color:'#BE0000'},
  {slug:'virginia',code:'VA',name:'Virginia',color:'#002B5C'},
  {slug:'west-virginia',code:'WV',name:'West Virginia',color:'#002855'},
  {slug:'wyoming',code:'WY',name:'Wyoming',color:'#492F24'},
];

// 1. Update StatesDropdown
const dropdownPath = path.join(__dirname, '..', 'src', 'components', 'StatesDropdown.tsx');
let dropdown = fs.readFileSync(dropdownPath, 'utf-8');
const stateEntries = allStates.map(s => `  { name: "${s.name}", href: "/${s.slug}" },`).join('\n');
dropdown = dropdown.replace(
  /const states = \[[\s\S]*?\];/,
  `const states = [\n${stateEntries}\n];`
);
fs.writeFileSync(dropdownPath, dropdown);
console.log('Updated StatesDropdown with ' + allStates.length + ' states');

// 2. Update about page
const aboutPath = path.join(__dirname, '..', 'src', 'app', 'about', 'page.tsx');
let about = fs.readFileSync(aboutPath, 'utf-8');
about = about.replace(
  /We now cover \d+ states[^.]*\./,
  `We now cover ${allStates.length} states with thousands of boat ramps across the United States.`
);
fs.writeFileSync(aboutPath, about);
console.log('Updated about page');

console.log('Done. Homepage needs manual update for state cards.');
