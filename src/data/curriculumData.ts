import { QuizQuestion, SlideCase } from '../types';

export const CURRICULUM_GOALS = [
  {
    code: 'LPD K2',
    title: 'Digitale presentaties creëren',
    description: 'De leerlingen gebruiken doelgericht basisfunctionaliteiten van toepassingen om digitale presentaties te creëren: indeling kiezen, opmaak aanpassen, multimedia integreren en vuistregels (KISS-principe) hanteren.'
  },
  {
    code: 'LPD 6',
    title: 'Ethische en legale regels',
    description: 'De leerlingen passen ethische en legale regels toe (auteursrecht, bronvermelding bij foto’s, rechtenvrij materiaal zoals Creative Commons, portretrecht).'
  },
  {
    code: 'LPD 5',
    title: 'Digitale inhouden creëren',
    description: 'Doelgericht functionaliteiten inzetten voor heldere communicatie afgestemd op de doelgroep.'
  }
];

export const KISS_PRINCIPLES = [
  {
    letter: 'K',
    word: 'Keep it Simple',
    subtitle: 'Houd het simpel & to the point',
    summary: 'Eén hoofdonderwerp per dia. Een dia is een billboard langs de snelweg: mensen moeten in 3 seconden snappen waar het over gaat.',
    keyRules: [
      'Jij bent de presentator, je dia is slechts het decor.',
      'Geen overbodige toeters en bellen of drukke animaties.',
      'Durf witruimte / rust over te laten op je scherm.'
    ],
    iconName: 'Sparkles'
  },
  {
    letter: 'I',
    word: 'Information: De 6x6 Regel',
    subtitle: 'Minder tekst = meer aandacht voor jou!',
    summary: 'Plaats nooit hele zinnen of gekopieerde lappen tekst van Wikipedia op een dia.',
    keyRules: [
      'Maximaal 6 regels per dia.',
      'Maximaal 6 woorden per regel (of steekwoorden).',
      'Gebruik bullet points (opsommingstekens) i.p.v. lange alinea’s.',
      'Lees NOOIT je dia letterlijk voor: het publiek leest sneller dan jij praat!'
    ],
    iconName: 'ListOrdered'
  },
  {
    letter: 'S',
    word: 'Style & Contrast',
    subtitle: 'Leesbaar tot op de achterste rij',
    summary: 'Kleur en typografie bepalen of je klasgenoten je dia kunnen lezen zonder een bril op te zetten.',
    keyRules: [
      'Groot contrast: donkere letters op lichte achtergrond (of omgekeerd). Geen gele letters op wit!',
      'Duidelijk lettertype: kies een schreefloos font (zoals Arial, Calibri, Trebuchet, Roboto) in plaats van onleesbare sierletters.',
      'Vaste stijl: beperk je tot 2 à 3 basiskleuren doorheen je hele presentatie.'
    ],
    iconName: 'Contrast'
  },
  {
    letter: 'S',
    word: 'Structure & Media',
    subtitle: 'Kwaliteitsbeelden met respect voor auteursrecht',
    summary: 'Eén sprekende afbeelding zegt meer dan 1000 woorden. Maar let op de regels van het internet!',
    keyRules: [
      'Behoud de verhouding: rek een foto NOOIT in de breedte of hoogte uit.',
      'Scherpe resolutie: geen wazige, gepixeleerde plaatjes.',
      'Auteursrecht (LPD 6): gebruik rechtenvrije beelden (Pixabay, Unsplash) en noteer altijd de bron!',
      'Grootte op opslag: een foto kleiner trekken op je dia maakt het bestand niet kleiner op schijf.'
    ],
    iconName: 'Image'
  }
];

export const SLIDE_CASES: SlideCase[] = [
  {
    id: 'case-dino',
    title: 'Opdracht 1: De Tyrannosaurus Rex',
    topic: 'Natuur & Wetenschap',
    badSlide: {
      headline: 'ALLES OVER DE TYRANNOSAURUS REX EN HOE HIJ LEEFDE IN DE PREHISTORIE',
      paragraphs: [
        'De Tyrannosaurus rex leefde ongeveer 68 tot 66 miljoen jaar geleden tijdens het late Krijt in wat nu Noord-Amerika is. Het was een van de grootste vleesetende landdieren aller tijden en hij kon wel 12 meter lang worden en woog wel 8000 kilo.',
        'Hij had reusachtige tanden waarmee hij botten kon kraken en zijn kaken waren supersterk. Maar wist je dat zijn voorpootjes heel erg klein waren? Niemand weet precies waarvoor hij die pootjes gebruikte. Sommige onderzoekers denken dat hij veren had.',
        'Hij kon rennen met een snelheid van ongeveer 20 tot 25 kilometer per uur en joeg op triceratopsen en andere planteneters die in kuddes leefden.'
      ],
      bgClass: 'bg-yellow-100',
      textClass: 'text-amber-300', // terrible contrast with yellow-100!
      fontClass: 'font-serif italic',
      imageSrc: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=300&auto=format&fit=crop&q=60',
      stretchedImage: true,
      distractions: ['Knipperende emoji 🦖🦖🦖', 'Gele tekst op beige achtergrond (onleesbaar)']
    },
    goodSlide: {
      headline: 'Tyrannosaurus Rex',
      bullets: [
        'Leefde 68 miljoen jaar geleden (Laat-Krijt)',
        'Lengte: tot 12 meter | Gewicht: 8.000 kg',
        'Krachtige kaken kraakten massieve botten',
        'Snelheid: ca. 20 - 25 km/u'
      ],
      bgClass: 'bg-stone-900',
      textClass: 'text-stone-50',
      fontClass: 'font-sans',
      imageSrc: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800&auto=format&fit=crop&q=80',
      imageAttribution: 'Foto: Unsplash (rechtenvrij)',
      speakerNotes: 'Vertel zelf over de mysterieuze korte voorpootjes en of T-Rex veren had. Die info hoort niet in tekst op de dia!'
    },
    errorsToFind: [
      {
        id: 'err-text-overload',
        label: 'Te veel tekst',
        description: 'Drie lange paragrafen i.p.v. kernachtige steekwoorden. Overtreedt de 6x6 regel.',
        category: 'tekst'
      },
      {
        id: 'err-contrast',
        label: 'Slecht kleurcontrast',
        description: 'Lichtgele tekst op een beige achtergrond. Vanaf rij 2 in het lokaal kan niemand dit lezen!',
        category: 'contrast'
      },
      {
        id: 'err-stretched-img',
        label: 'Vervormde / uitgerekte foto',
        description: 'De dino-afbeelding is platgedrukt en onscherp omdat de juiste verhouding niet behouden werd.',
        category: 'afbeelding'
      },
      {
        id: 'err-no-attribution',
        label: 'Geen bronvermelding',
        description: 'Er staat geen auteur of herkomst bij de foto (LPD 6 Auteursrecht).',
        category: 'auteursrecht'
      },
      {
        id: 'err-all-caps-title',
        label: 'Titel schreeuwerig & te lang',
        description: 'Titel in hoofdletters (caps lock) neemt twee regels in beslag en oogt onrustig.',
        category: 'lettertype'
      }
    ]
  },
  {
    id: 'case-mars',
    title: 'Opdracht 2: Missie naar Mars',
    topic: 'Ruimtevaart',
    badSlide: {
      headline: 'Mars: De Rode Planeet en waarom we er misschien ooit naartoe gaan wonen met SpaceX',
      paragraphs: [
        'Mars is de vierde planeet vanaf de zon geteld in ons zonnestelsel en de atmosfeer bestaat voor 95% uit koolstofdioxide waardoor mensen er niet kunnen ademen zonder speciaal ruimtepak.',
        'De gemiddelde temperatuur is -63 graden Celsius en er zijn enorme stofstormen die maandenlang de hele planeet kunnen bedekken.',
        'De hoogste vulkaan in ons zonnestelsel bevindt zich op Mars en heet Olympus Mons, die drie keer hoger is dan de Mount Everest op aarde.'
      ],
      bgClass: 'bg-red-900',
      textClass: 'text-red-600', // red on dark red, near zero readability!
      fontClass: 'font-mono text-xs',
      imageSrc: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=300&auto=format&fit=crop&q=60',
      stretchedImage: true
    },
    goodSlide: {
      headline: 'Mars: De Rode Planeet',
      bullets: [
        '4e planeet vanaf de zon',
        'Atmosfeer: 95% CO₂ (geen zuurstof)',
        'Gemiddelde temperatuur: -63 °C',
        'Olympus Mons: 3x Mount Everest'
      ],
      bgClass: 'bg-slate-900',
      textClass: 'text-white',
      fontClass: 'font-sans',
      imageSrc: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
      imageAttribution: 'Bron: NASA / Unsplash (Public Domain)',
      speakerNotes: 'Benoem mondeling SpaceX en astronautenreizen. Houd de dia beknopt en ademend.'
    },
    errorsToFind: [
      {
        id: 'err-mars-contrast',
        label: 'Onleesbare tekstkleur',
        description: 'Donkerrode tekst op donkerrode achtergrond heeft vrijwel geen contrast.',
        category: 'contrast'
      },
      {
        id: 'err-mars-wall',
        label: 'Lappen voorleestekst',
        description: 'Volledige bijzinnen en samengestelde zinnen die de spreker zou verleiden om af te lezen.',
        category: 'tekst'
      },
      {
        id: 'err-mars-font',
        label: 'Onhandig lettertype',
        description: 'Piepklein lettertype in typewriter-stijl zonder duidelijke hiërarchie.',
        category: 'lettertype'
      },
      {
        id: 'err-mars-copyright',
        label: 'Geen vermelding fotolicentie',
        description: 'Ruimtefoto’s van NASA of stockwebsites vereisen een correcte bronvermelding.',
        category: 'auteursrecht'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    curriculumCode: 'LPD K2 (KISS)',
    question: 'Waarvoor staat de afkorting "KISS" bij het maken van een presentatie?',
    context: 'Basisvuistregel voor digitale presentaties in de 1ste graad.',
    options: [
      'Know It, Say It, Show It',
      'Keep It Short & Simple',
      'Kopiëren, Invoegen, Slepen, Stoppen',
      'Kleurrijk, Interactief, Snel, Spectaculair'
    ],
    correctIndex: 1,
    explanation: 'Het KISS-principe betekent "Keep It Short & Simple" (of "Keep It Simple, Stupid"). Het herinnert je eraan dat je dia’s eenvoudig en to-the-point moeten zijn!',
    hint: 'Denk aan "Houd het kort en eenvoudig".'
  },
  {
    id: 2,
    curriculumCode: 'LPD K2 (Inhoud & Indeling)',
    question: 'Wat is de rol van jou als presentator tegenover de dia op het scherm?',
    context: 'Rol van de spreker vs. presentatiesoftware.',
    options: [
      'Je dia moet al je tekst bevatten zodat je die netjes van boven naar onder kunt voorlezen.',
      'Jij bent de presentator en vertelt het verhaal; de dia is slechts een visuele ondersteuning met kernwoorden.',
      'Hoe voller de dia staat, hoe minder je zelf hoeft te studeren.',
      'Je moet tijdens het praten continu naar het scherm kijken.'
    ],
    correctIndex: 1,
    explanation: 'Klopt! Jij bent het middelpunt van de presentatie. Als je gewoon voorleest wat op de dia staat, kan je publiek net zo goed zelf een blaadje lezen. Dia’s tonen alleen kernwoorden en beelden.',
    hint: 'Wie moet de aandacht van het publiek hebben: jij of het scherm?'
  },
  {
    id: 3,
    curriculumCode: 'LPD K2 (Vuistregels tekst)',
    question: 'Wat houdt de bekende "6x6-regel" in voor tekst op een dia?',
    context: 'Tekstopmaak en dosering.',
    options: [
      'Maximaal 6 dia’s per 6 minuten presentatietijd.',
      'Maximaal 6 regels per dia en maximaal 6 woorden per regel.',
      'Elke alinea moet minimaal 6 zinnen en 6 leestekens tellen.',
      'Je moet 6 verschillende kleuren en 6 verschillende lettertypes gebruiken.'
    ],
    correctIndex: 1,
    explanation: 'Uitstekend! De 6x6-regel voorkomt overvolle dia’s. Maximaal 6 regels en ongeveer 6 woorden per regel zorgt voor rust en overzicht.',
    hint: 'Kijk naar het aantal regels en het aantal woorden.'
  },
  {
    id: 4,
    curriculumCode: 'LPD K2 (Kleur & Contrast)',
    question: 'Welke kleurencombinatie is het MEEST leesbaar voor jouw publiek in een verlicht klaslokaal?',
    context: 'Stijl en contrast volgens de ontwerprichtlijnen.',
    options: [
      'Gele tekst op een witte achtergrond',
      'Lichtgrijze tekst op een witte achtergrond',
      'Donkerblauwe of zwarte tekst op een lichte achtergrond',
      'Rode tekst op een groene achtergrond'
    ],
    correctIndex: 2,
    explanation: 'Hoog contrast is cruciaal! Donker op licht (of zuiver wit op een donkere achtergrond) is makkelijk leesbaar. Geel op wit of rood op groen (denk ook aan kleurenblindheid) is een ramp voor je publiek.',
    hint: 'Zoek het grootste contrast tussen donker en licht.'
  },
  {
    id: 5,
    curriculumCode: 'LPD K2 & K3 (Multimedia integreren)',
    question: 'Je voegt een foto toe aan je dia, maar hij past niet helemaal in het vakje. Wat mag je NOOIT doen?',
    context: 'Afbeeldingen correct schalen en positioneren.',
    options: [
      'De hoekpunten gebruiken om de foto evenredig te vergroten of verkleinen.',
      'De foto bijsnijden (croppen) om storende randen weg te snijden.',
      'Aan de zijbolletjes trekken waardoor de afbeelding uitgerekt of platgedrukt wordt.',
      'De foto centreren en witruimte eromheen laten.'
    ],
    correctIndex: 2,
    explanation: 'Trek altijd aan de HOEKEN! Als je aan de zijkanten trekt, wordt de verhouding verpest en worden mensen of voorwerpen lachwekkend breed of platgedrukt.',
    hint: 'Wat gebeurt er als je alleen aan de breedte trekt?'
  },
  {
    id: 6,
    curriculumCode: 'LPD 6 (Auteursrecht & Mediawijsheid)',
    question: 'Mag je zomaar elke afbeelding die je via Google Afbeeldingen vindt kopiëren en in je presentatie plakken?',
    context: 'Ethische en legale regels (LPD 6 Katholiek Onderwijs Vlaanderen).',
    options: [
      'Ja, alles wat op internet staat is gratis openbaar bezit.',
      'Nee, foto’s kunnen beschermd zijn door auteursrecht; gebruik bij voorkeur rechtenvrije afbeeldingen (zoals Pixabay/Unsplash) en vermeld de bron.',
      'Ja, zolang je het logo van de fotograaf er met een schaar afknipt.',
      'Alleen als je presentatie korter dan 5 minuten duurt.'
    ],
    correctIndex: 1,
    explanation: 'Op foto’s rust auteursrecht (copyright). Een fotograaf heeft hard gewerkt voor die foto. Gebruik rechtenvrije beeldbanken (zoals Pixabay, Unsplash of Pexels) en noteer altijd de bron!',
    hint: 'Denk aan respect voor andermans werk en de wet.'
  },
  {
    id: 7,
    curriculumCode: 'LPD K2 (Lettertype keuze)',
    question: 'Welk type lettertype gebruik je bij voorkeur voor de tekst op een presentatiedia?',
    context: 'Typografie en doelgroepgericht ontwerpen.',
    options: [
      'Een schreefloos lettertype (sans-serif zoals Calibri, Arial, Verdana) met duidelijke, strakke letters.',
      'Een zwierig handschrift (bijvoorbeeld met veel krullen en lussen) voor een artistieke sfeer.',
      'Comic Sans met schaduw en regenboogkleuren.',
      'Een gotisch Middeleeuws lettertype.'
    ],
    correctIndex: 0,
    explanation: 'Schreefloze lettertypes (sans-serif) zijn op digitale schermen en beamers veel sneller en duidelijker te lezen vanaf afstand dan priegelige krulletters.',
    hint: 'Strak en zonder schreefjes (hoekjes).'
  },
  {
    id: 8,
    curriculumCode: 'LPD K2 & Opslag (Bestandsbeheer)',
    question: 'Wat gebeurt er met de bestandsgrootte van je presentatie als je een foto van 10 megabyte op je dia heel klein sleept?',
    context: 'Opslag en digitale efficiëntie volgens de leerplantoelichting.',
    options: [
      'Het bestand wordt automatisch 10x kleiner.',
      'De foto blijft even zwaar (10 MB) op de achtergrond, want je hebt hem enkel kleiner getoond, niet verkleind in opslag.',
      'De computer verwijdert de foto automatisch.',
      'De presentatie verandert in een tekstbestand.'
    ],
    correctIndex: 1,
    explanation: 'Een foto visueel kleiner slepen op je dia maakt de foto NIET kleiner in opslag! De volledige resolutie zit nog altijd in het bestand opgeslagen.',
    hint: 'Denk aan het verschil tussen wat je ziet en wat er opgeslagen is.'
  }
];

export const MAKEOVER_TEMPLATES = [
  {
    id: 'space',
    title: 'De Dwergplaneet Pluto',
    subject: 'Ruimtevaart & Wetenschap',
    badContent: {
      headline: 'PLUTO EN WAAROM HET GEEN ECHTE PLANEET MEER IS SINDS 2006 VOLGENS ASTRONOMEN',
      fullParagraph: 'Pluto werd ontdekt in het jaar 1930 door de Amerikaanse astronoom Clyde Tombaugh en werd toen gezien als de negende planeet vanaf de zon. Maar in 2006 besliste de Internationale Astronomische Unie dat Pluto niet langer een officiële planeet is maar een dwergplaneet omdat hij zijn baan rond de zon niet heeft schoongeveegd van ander ruimtepuin. Pluto is super koud, namelijk min 230 graden Celsius, en heeft 5 manen waarvan Charon de allerbekendste is.',
      suggestedBullets: [
        'Ontdekt in 1930 door Clyde Tombaugh',
        'Sinds 2006 geclassificeerd als dwergplaneet',
        'Gemiddelde temperatuur: -230 °C',
        'Heeft 5 manen (grootste is Charon)'
      ],
      defaultImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
      imageOptions: [
        {
          id: 'img1',
          url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
          label: 'Pluto & atmosfeer (Hoge resolutie)',
          credit: 'NASA / Unsplash (Rechtenvrij)'
        },
        {
          id: 'img2',
          url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
          label: 'Zonnestelsel overzicht',
          credit: 'ESA / Hubble (Rechtenvrij)'
        }
      ]
    }
  },
  {
    id: 'animals',
    title: 'De Reuzenpanda',
    subject: 'Biologie & Natuur',
    badContent: {
      headline: 'ALLES OVER DE REUZENPANDA IN CHINA EN WAT ZE ETEN DE HELE DAG DOOR',
      fullParagraph: 'De reuzenpanda is een van de zeldzaamste berensoorten op onze aarde en leeft voornamelijk in de bergachtige bossen van centraal China. Ze zijn bijna uitsluitend vegetariër en brengen maar liefst 12 tot 16 uur per dag door met het eten van bamboe, want bamboe bevat eigenlijk heel weinig voedingsstoffen. Een volwassen panda eet dagelijks wel tot 30 kilogram bamboe en ze kunnen heel goed in bomen klimmen ondanks hun zware gewicht van 100 kilo.',
      suggestedBullets: [
        'Leefgebied: bergbossen in centraal China',
        'Voedsel: eet 12 tot 16 uur per dag bamboe',
        'Hoeveelheid: tot 30 kg bamboe per dag',
        'Gewicht: ca. 100 kg | Kan goed klimmen'
      ],
      defaultImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=800&auto=format&fit=crop&q=80',
      imageOptions: [
        {
          id: 'img1',
          url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=800&auto=format&fit=crop&q=80',
          label: 'Panda eet bamboe (Kwaliteitsfoto)',
          credit: 'Unsplash (Rechtenvrij - CC0)'
        },
        {
          id: 'img2',
          url: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=800&auto=format&fit=crop&q=80',
          label: 'Panda in het groen',
          credit: 'Pexels (Rechtenvrij)'
        }
      ]
    }
  }
];
