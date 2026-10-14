const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { EdgeTTS } = require('@andresaya/edge-tts');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio', 'pronunciations');
const MANIFEST_PATH = path.join(process.cwd(), 'public', 'audio', 'manifest.json');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getAudioFileName(text) {
  const clean = text.trim().toLowerCase();
  const md5 = crypto.createHash('md5').update(clean).digest('hex').slice(0, 10);
  const slug = clean
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 25);
  return `${slug || 'phrase'}_${md5}.mp3`;
}

// All phrases across LearnYorubaEasily
const ALL_PHRASES = [
  // Flashcards (Greetings)
  "Báwo ni?",
  "Báwo ni",
  "Ẹ káàárọ̀",
  "Ẹ káàsán",
  "Ẹ káalẹ́",
  "O dábọ̀",
  "Ó dàbọ̀",
  "Ẹ kúulé",
  "Ẹ káàbọ̀",
  "Ẹ káàbọ̀ o!",
  "O dárọ̀",
  "Pẹ̀lẹ́",
  "Ṣé dáadáa ni?",
  "Ṣé àlàáfíà ni?",
  "Àlàáfíà ni",

  // Flashcards (Politeness & Common)
  "Ẹ ṣé",
  "O ṣé",
  "Ẹ ṣeun o",
  "Jọ̀wọ́",
  "Ẹ pẹ̀lẹ́",
  "Mi o bínú",
  "Kò tọ́pẹ́",
  "Ẹ má bínú",
  "Ẹ kú iṣẹ́",
  "Mo dúpẹ́",
  "Inú mi dùn",

  // Flashcards (Basics)
  "Bẹ́ẹ̀ni",
  "Rárá",
  "Kí ni?",
  "Níbo?",
  "Ta ni?",
  "Báwo?",
  "Nígbà wo?",
  "Kí nìdí?",
  "Ó kéré",
  "Ó pọ̀",

  // Flashcards (Everyday)
  "Omi",
  "Oúnjẹ",
  "Ọjà",
  "Ilé",
  "Owó",
  "Aṣọ",
  "Bàtà",
  "Oòrùn",
  "Òjò",
  "Ilẹ̀",

  // Flashcards (Family)
  "Ọ̀rẹ́",
  "Ìyá",
  "Bàbá",
  "Ọmọ",
  "Ẹ̀gbọ́n",
  "Àbúrò",
  "Ọkọ",
  "Ìyàwó",
  "Ẹbí",
  "Àwọn òbí",

  // Flashcards (Travel)
  "Ọkọ̀",
  "Ọ̀nà",
  "Rìn",
  "Lọ",
  "Wá",
  "Ìrìn-àjò",
  "Ọkọ̀ ojú irin",
  "Dúró",
  "Níbo ni a ń lọ?",
  "Mo ti dé",

  // Numbers (Flashcards & Safari)
  "Ọ̀kan / Ení",
  "Ọ̀kan",
  "Ení",
  "Oókan",
  "Èjì",
  "Méjì",
  "Ẹta",
  "Mẹ́ta",
  "Ẹ̀rin",
  "Mẹ́rin",
  "Àrún",
  "Márùn",
  "Ẹ̀fà",
  "Mẹ́fà",
  "Èje",
  "Méje",
  "Ẹjọ",
  "Mẹ́jọ",
  "Ẹ̀sán",
  "Mẹ́sàn",
  "Ẹ̀wá",
  "Mẹ́wà",

  // Time
  "Òní",
  "Ọ̀la",
  "Àná",
  "Àárọ̀",
  "Ọ̀sán",
  "Ìrọ̀lẹ́",
  "Òru",
  "Ọ̀sẹ̀",
  "Oṣù",
  "Ọdún",

  // Food
  "Ìrẹsì",
  "Ẹ̀wà",
  "Ẹran",
  "Ẹja",
  "Ọbẹ̀",
  "Iṣu",
  "Àmàlà",
  "Ebi ń pa mí",
  "Oùngbẹ ń gbẹ mí",
  "Ó dùn",

  // Tone Playground Chameleon Words
  "Owó",
  "Ọwọ́",
  "Owo",
  "Òwò",
  "Igbá",
  "Igba",
  "Ìgbà",
  "Igbà",
  "Ẹgbẹ́",
  "Ẹ̀gbẹ́",
  "Egbe",

  // Kids Safari Animals
  "Kìnìún",
  "Erin",
  "Ẹkùn",
  "Ẹdun",
  "Ìjàpá",
  "Ẹyẹ",
  "Aguntan",

  // Yoruba Names
  "Ayọ̀kúnlé",
  "Adérónkẹ́",
  "Ọlọ́ládé",
  "Tèmítọ́pẹ́",
  "Babátúndé",
  "Ayọ̀mídé",
  "Adéwálé",
  "Fọláṣadé",
  "Olúwaṣeun",
  "Àbíkẹ́",
  "Damilọ́lá",
  "Ìfẹ́olúwa",
  "Tìwalọlá",
  "Káyọ̀dé",
  "Moróunmúbọ̀",

  // Proverbs
  "Àgbájọ ọwọ́ la fi ń sọ̀yà; àjèjé ọwọ́ kan kò gbégbá dé orí.",
  "Ilé la ti ń kọ́ ẹ̀ṣọ́ ròde.",
  "Bí ẹ̀mí bá wà, ìrètí ń bẹ.",
  "Ọmọ tí a kò kọ́, ni yóò gbé ilé tí a kọ́ tà.",
  "Ọwọ́ ọmọdé kò tó pẹpẹ, ti àgbàlagbà kò wọ kèrègbè.",
  "A kì í fi ojú olójú ríran.",

  // Talking Drum & Special
  "Káàbọ̀ o",
  "Ẹ kú àárọ̀ o",
  "Àyàn-àgalú gbè wá",
  "Ká rìn ká pọ̀, yíyẹ ní ń yẹ ni"
];

// Deduplicate phrases preserving original case
const uniquePhrases = Array.from(new Set(ALL_PHRASES.map(p => p.trim())));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`Starting audio generation for ${uniquePhrases.length} Yoruba phrases using en-NG-AbeoNeural...`);
  
  let manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch (e) {
      manifest = {};
    }
  }

  const tts = new EdgeTTS();
  let generatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < uniquePhrases.length; i++) {
    const phrase = uniquePhrases[i];
    const key = phrase.toLowerCase();
    const filename = getAudioFileName(phrase);
    const filepath = path.join(OUTPUT_DIR, filename);

    // Always update manifest map
    manifest[key] = filename;
    manifest[phrase] = filename;

    // Check if already generated and non-empty
    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
      skippedCount++;
      continue;
    }

    console.log(`[${i + 1}/${uniquePhrases.length}] Generating Abeo audio for: "${phrase}" -> ${filename}`);

    let success = false;
    let attempts = 0;

    while (!success && attempts < 3) {
      attempts++;
      try {
        const result = await tts.generate(phrase, 'en-NG-AbeoNeural', {
          rate: -4, // Slightly relaxed natural cadence
          pitch: -2 // Grounded baritone
        });

        if (result && result.audio && result.audio.length > 500) {
          fs.writeFileSync(filepath, result.audio);
          generatedCount++;
          success = true;
          console.log(`  ✓ Saved ${filename} (${result.audio.length} bytes)`);
        } else {
          throw new Error('Empty audio received');
        }
      } catch (err) {
        console.warn(`  ⚠ Attempt ${attempts} failed for "${phrase}": ${err.message}`);
        if (attempts < 3) {
          console.log(`  ...backing off for 3 seconds before retry...`);
          await sleep(3000);
        } else {
          errorCount++;
        }
      }
    }

    // Polite delay between successful requests to prevent rate limiting
    await sleep(1400);

    // Save manifest incrementally every 5 phrases
    if (i % 5 === 0) {
      fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    }
  }

  // Final manifest save
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n===========================================`);
  console.log(`Audio Generation Completed!`);
  console.log(`- Total Unique Phrases: ${uniquePhrases.length}`);
  console.log(`- Newly Generated: ${generatedCount}`);
  console.log(`- Existing Skipped: ${skippedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log(`- Manifest saved to ${MANIFEST_PATH}`);
  console.log(`===========================================\n`);
}

main().catch(console.error);
