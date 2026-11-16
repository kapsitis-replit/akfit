/**
 * Service pages: Online Coaching, Treniņu Coaching, Konsultācija, Treniņu Plāni.
 * Generated once from the legacy HTML pages (Phase 3), now the source of truth.
 * Edit text, prices and images here; every page that shows them updates.
 * Strings marked "html" may contain inline markup and are rendered with set:html.
 */
import type { Service } from './types';

export const services = {
  "online-coaching": {
    "path": "/online-coaching.html",
    "meta": {
      "title": "Online Coaching | AK Fitness",
      "description": "AK Fitness Online Coaching — pilnībā individuāls treniņu un uztura plāns, nedēļas atskaites, video tehnikas analīze un pastāvīgs trenera atbalsts neatkarīgi no atrašanās vietas.",
      "ogTitle": "Online Coaching | AK Fitness",
      "ogDescription": "Visaptveroša tāldistances pieeja: individuāls plāns, nedēļas atskaites un video tehnikas analīze. Katrs treniņš ar mērķi.",
      "ogImage": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop"
    },
    "hero": {
      "image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop&sat=-100",
      "badge": "Populārākais · Visaptveroši",
      "title": "Online",
      "titleAccent": "Coaching",
      "lede": "Pilna trenera pieredze tavā kabatā. Individuāls plāns, nedēļas atskaites un tehnikas analīze — lai katrs treniņš virzītu tevi uz mērķi, neatkarīgi no tā, kur tu atrodies.",
      "price": {
        "amount": "€239",
        "unit": "/ mēnesī"
      },
      "primaryCta": {
        "label": "Pieteikties",
        "href": "#pieteikties"
      },
      "secondaryCta": {
        "label": "Kā tas strādā",
        "href": "#ka-strada"
      },
      "summaryTitle": "Īsumā",
      "summary": [
        "Individuāls treniņu + uztura plāns",
        "Nedēļas atskaites un korekcijas",
        "Video tehnikas analīze",
        "Atbalsts caur CoachRx aplikāciju"
      ]
    },
    "steps": {
      "id": "ka-strada",
      "tinted": true,
      "heading": "Kā tas strādā",
      "subheading": "No pieteikuma līdz pirmajam treniņam",
      "columns": 3,
      "items": [
        {
          "title": "Pieteikums",
          "text": "Aizpildi pieteikuma formu šajā lapā. Sazināmies 24 stundu laikā un pastāstām, vai un kā varam Tev palīdzēt."
        },
        {
          "title": "Anketa",
          "text": "Saņem e-pastā anketu — mērķi, treniņu pieredze, traumas, pieejamais inventārs, grafiks un veselības skrīnings. Aizpildīšana aizņem ap 20 minūtēm."
        },
        {
          "title": "Līgums un apmaksa",
          "text": "Tikai pēc tam, kad esam pārliecinājušies, ka pakalpojums Tev der, saņem līgumu un rēķinu. Nauda nav pirmais solis."
        },
        {
          "title": "Programma",
          "text": "Saņem uzaicinājumu uz CoachRx aplikāciju, informatīvos materiālus par treniņu procesu un savu pirmo individuālo treniņu un uztura plānu."
        },
        {
          "title": "Sadarbība",
          "text": "Trenējies, atzīmē izpildi un filmē norādītos vingrinājumus. Treniņus pārskatu 1–3 dienu laikā, un reizi nedēļā notiek check-in ar plāna korekcijām."
        }
      ]
    },
    "split": {
      "eyebrow": "Klients ↔ Treneris",
      "heading": "Nepārtraukta saikne, nevis PDF fails",
      "intro": "Online coaching atšķirība ir dzīvā komunikācija. Tu nekad neesi viens ar programmu — mēs esam komanda, kas strādā uz vienu mērķi. Katra mijiedarbība ir vērsta uz vienu jautājumu: vai šis solis tuvina tevi rezultātam?",
      "items": [
        {
          "icon": "solar:videocamera-record-linear",
          "title": "Video tehnikas analīze.",
          "text": "Tu filmē, es kadru pa kadram parādu, kā uzlabot izpildījumu un novērst traumas."
        },
        {
          "icon": "solar:chat-round-line-linear",
          "title": "Tiešā saziņa.",
          "text": "Jautājumi par uzturu, motivāciju vai grafiku — atbilde CoachRx aplikācijā, darba dienās 24 stundu laikā."
        },
        {
          "icon": "solar:tuning-square-linear",
          "title": "Iknedēļas korekcijas.",
          "text": "Plāns ir dzīvs dokuments, kas mainās līdz ar tevi, nevis fiksēts sarakts."
        }
      ],
      "image": {
        "src": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
        "alt": "Treniņš ar trenera atbalstu"
      }
    },
    "focus": {
      "icon": "solar:target-linear",
      "heading": "Fokuss katram treniņam",
      "body": "Mēs neticam \"vienkārši aiziet uz zāli\". Katram treniņam ir konkrēts mērķis, izmērāms uzdevums un vieta kopējā plānā. Tu vienmēr zini, <span class=\"text-zinc-900 dark:text-white font-medium\">kāpēc</span> dari to, ko dari — un tas ir tas, kas atšķir progresu no vienkāršas kustēšanās.",
      "cards": [
        {
          "title": "Mērķis",
          "text": "Katrai sesijai definēts fokuss — spēks, tehnika vai apjoms."
        },
        {
          "title": "Mērījums",
          "text": "Progresu izsekojam skaitļos, nevis sajūtās."
        },
        {
          "title": "Korekcija",
          "text": "Katra atskaite noslēdzas ar nākamo soli."
        }
      ]
    },
    "apply": {
      "eyebrow": "Pieteikums · Online Coaching",
      "heading": "Sāksim tavu ceļu",
      "text": "Aizpildi formu un mēs sazināsimies 24 stundu laikā.",
      "packageName": "Online Coaching",
      "messagePlaceholder": "Kādi ir tavi mērķi?",
      "buttonLabel": "Nosūtīt Pieteikumu",
      "backLabel": "← Salīdzināt visus pakalpojumus"
    }
  },
  "treninu-coaching": {
    "path": "/treninu-coaching.html",
    "meta": {
      "title": "Treniņu Coaching | AK Fitness",
      "description": "AK Fitness Treniņu Coaching — personalizētas programmas ar uzraudzību, regulāra programmu maiņa un atskaites stagnācijas novēršanai. Zinātnē balstīta programmēšana.",
      "ogTitle": "Treniņu Coaching | AK Fitness",
      "ogDescription": "Personalizētas programmas ar uzraudzību un regulāru progresu. Katrs treniņš plānots ar mērķi.",
      "ogImage": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
    },
    "hero": {
      "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1600&auto=format&fit=crop&sat=-100",
      "badge": "Programma · Ar uzraudzību",
      "title": "Treniņu",
      "titleAccent": "Coaching",
      "lede": "Strukturēta, pielāgota treniņu programma ar regulāru uzraudzību un korekcijām. Tev, kurš vēlas skaidru plānu un profesionālu aci, kas seko līdzi progresam.",
      "price": {
        "amount": "€135",
        "unit": "/ mēnesī"
      },
      "primaryCta": {
        "label": "Pieteikties",
        "href": "#pieteikties"
      },
      "secondaryCta": {
        "label": "Kā tas strādā",
        "href": "#ka-strada"
      },
      "summaryTitle": "Īsumā",
      "summary": [
        "Plāns pielāgots tavām spējām",
        "Regulāra programmu maiņa",
        "Atskaites stagnācijas novēršanai",
        "Zinātnē balstīta programmēšana"
      ]
    },
    "steps": {
      "id": "ka-strada",
      "tinted": true,
      "heading": "Kā tas strādā",
      "subheading": "No pieteikuma līdz pirmajam treniņam",
      "columns": 3,
      "items": [
        {
          "title": "Pieteikums",
          "text": "Aizpildi pieteikuma formu šajā lapā. Sazināmies 24 stundu laikā un pastāstām, vai un kā varam Tev palīdzēt."
        },
        {
          "title": "Anketa",
          "text": "Saņem e-pastā anketu — mērķi, treniņu pieredze, traumas, pieejamais inventārs, grafiks un veselības skrīnings. Tas ir pamats programmai."
        },
        {
          "title": "Līgums un apmaksa",
          "text": "Tikai pēc tam, kad esam pārliecinājušies, ka pakalpojums Tev der, saņem līgumu un rēķinu. Nauda nav pirmais solis."
        },
        {
          "title": "Programma",
          "text": "Saņem uzaicinājumu uz CoachRx aplikāciju, informatīvos materiālus par treniņu procesu un savu pirmo strukturēto treniņu programmu."
        },
        {
          "title": "Sadarbība",
          "text": "Trenējies un pieraksti rezultātus aplikācijā. Treniņus pārskatu 1–3 dienu laikā, un programma tiek atjaunota, balstoties uz Taviem rezultātiem."
        }
      ]
    },
    "split": {
      "eyebrow": "Klients ↔ Treneris",
      "heading": "Struktūra ar cilvēku aiz tās",
      "intro": "Treniņu Coaching ir ideāls, ja tev patīk trenēties patstāvīgi, bet tu vēlies zināt, ka programma ir pareiza un ka kāds seko līdzi tavam progresam. Katra atskaite ir saruna par to, kā virzīties tālāk.",
      "items": [
        {
          "icon": "solar:document-add-linear",
          "title": "Skaidra programma.",
          "text": "Zini precīzi, ko celt, cik reizes un ar kādu slodzi."
        },
        {
          "icon": "solar:refresh-linear",
          "title": "Regulāras korekcijas.",
          "text": "Programma nav iesalusi — tā mainās atkarībā no taviem rezultātiem."
        },
        {
          "icon": "solar:graph-up-linear",
          "title": "Progresa atskaites.",
          "text": "Redzi savu izaugsmi skaitļos un saproti, kas strādā."
        }
      ],
      "image": {
        "src": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
        "alt": "Strukturēts treniņš zālē"
      }
    },
    "focus": {
      "icon": "solar:target-linear",
      "heading": "Fokuss katram treniņam",
      "body": "Katrai treniņu dienai ir sava loma ciklā — smagā diena, tehnikas diena, apjoma diena. Tu nekad neej uz zāli bez plāna. Tāpēc pat patstāvīgi treniņi virzās uz priekšu ar <span class=\"text-zinc-900 dark:text-white font-medium\">mērķi</span>, nevis pēc noskaņojuma.",
      "cards": [
        {
          "title": "Periodizācija",
          "text": "Slodze plānota cikliski, lai augtu bez pārtrenēšanās."
        },
        {
          "title": "Uzskaite",
          "text": "Katrs piegājiens tiek pierakstīts un analizēts."
        },
        {
          "title": "Pielāgošana",
          "text": "Programma mainās, kad tavs ķermenis to prasa."
        }
      ]
    },
    "apply": {
      "eyebrow": "Pieteikums · Treniņu Coaching",
      "heading": "Sāksim tavu programmu",
      "text": "Aizpildi formu un mēs sazināsimies 24 stundu laikā.",
      "packageName": "Treniņu Coaching",
      "messagePlaceholder": "Kādi ir tavi mērķi?",
      "buttonLabel": "Nosūtīt Pieteikumu",
      "backLabel": "← Salīdzināt visus pakalpojumus"
    }
  },
  "fitnesa-konsultacija": {
    "path": "/fitnesa-konsultacija.html",
    "meta": {
      "title": "Fitnesa Konsultācija | AK Fitness",
      "description": "AK Fitness Fitnesa Konsultācija — padziļinātas profesionālas atbildes par uzturu un treniņiem, skaidrība par aktīva dzīvesveida tēmām un praktiski padomi tūlītējai rīcībai.",
      "ogTitle": "Fitnesa Konsultācija | AK Fitness",
      "ogDescription": "Vienreizēja padziļināta konsultācija — profesionālas atbildes uz taviem specifiskajiem jautājumiem.",
      "ogImage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"
    },
    "hero": {
      "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop&sat=-100",
      "badge": "Konsultācija · Vienreizēja",
      "title": "Fitnesa",
      "titleAccent": "Konsultācija",
      "lede": "Ir jautājumi, uz kuriem vajag skaidru, profesionālu atbildi — bez ilgtermiņa saistībām. Viena padziļināta saruna, kas dod tev virzienu un praktisku rīcības plānu.",
      "price": {
        "amount": "€89",
        "unit": "/ reize"
      },
      "primaryCta": {
        "label": "Pieteikties",
        "href": "#pieteikties"
      },
      "secondaryCta": {
        "label": "Kā tas notiek",
        "href": "#ka-strada"
      },
      "summaryTitle": "Īsumā",
      "summary": [
        "Padziļinātas atbildes par uzturu un treniņiem",
        "Skaidrība par aktīva dzīvesveida tēmām",
        "Praktiski padomi tūlītējai rīcībai",
        "Bez ilgtermiņa saistībām"
      ]
    },
    "steps": {
      "id": "ka-strada",
      "tinted": true,
      "heading": "Kā tas notiek",
      "subheading": "Viena saruna, skaidrs rezultāts",
      "columns": 4,
      "items": [
        {
          "title": "Pieteikums",
          "text": "Aizpildi formu un īsi pastāsti, par ko vēlies runāt. Sazināmies 24 stundu laikā un vienojamies par laiku."
        },
        {
          "title": "Sagatavošanās",
          "text": "Pirms sarunas atsūti savus jautājumus un pašreizējo situāciju, lai kopīgo laiku izmantotu maksimāli lietderīgi."
        },
        {
          "title": "Saruna",
          "text": "60 minūšu saruna video zvanā vai klātienē, kur ejam cauri Taviem jautājumiem ar zinātnē balstītām atbildēm."
        },
        {
          "title": "Rīcības plāns",
          "text": "Pēc sarunas saņem rakstisku kopsavilkumu ar konkrētiem nākamajiem soļiem, ko vari sākt pielietot uzreiz."
        }
      ]
    },
    "split": {
      "eyebrow": "Klients ↔ Treneris",
      "heading": "Atbildes, nevis pieņēmumi",
      "intro": "Internetā ir bezgalīgi daudz pretrunīgu padomu. Konsultācija ir tavs īsceļš pie skaidrības — profesionāla saruna, kur tu vari uzdot tieši savus jautājumus un saņemt atbildes, kas attiecas uz tavu situāciju.",
      "items": [
        {
          "icon": "solar:question-circle-linear",
          "title": "Tavi jautājumi.",
          "text": "Uzturs, treniņi, motivācija, traumas — nekas nav pārāk mazs."
        },
        {
          "icon": "solar:lightbulb-linear",
          "title": "Skaidri principi.",
          "text": "Ne tikai \"ko\", bet arī \"kāpēc\" — lai vari pieņemt lēmumus patstāvīgi."
        },
        {
          "icon": "solar:clipboard-check-linear",
          "title": "Tūlītēja rīcība.",
          "text": "Aizej ar konkrētiem soļiem, nevis vispārīgiem ieteikumiem."
        }
      ],
      "image": {
        "src": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
        "alt": "Konsultācija par uzturu un treniņiem"
      }
    },
    "focus": {
      "icon": "solar:target-linear",
      "heading": "Katra minūte ar mērķi",
      "body": "Konsultācija nav nejauša pļāpāšana. Mēs iepriekš sagatavojamies, lai visa saruna būtu vērsta uz tavu galveno jautājumu un tu aizietu ar <span class=\"text-zinc-900 dark:text-white font-medium\">skaidrību</span>, nevis vēl vairāk neziņas.",
      "cards": []
    },
    "apply": {
      "eyebrow": "Pieteikums · Konsultācija",
      "heading": "Uzdod savu jautājumu",
      "text": "Pastāsti, par ko vēlies runāt, un mēs vienosimies par laiku.",
      "packageName": "Fitnesa Konsultācija",
      "messagePlaceholder": "Tavs jautājums...",
      "buttonLabel": "Nosūtīt Pieteikumu",
      "backLabel": "← Salīdzināt visus pakalpojumus"
    }
  },
  "treninu-plani": {
    "path": "/treninu-plani.html",
    "meta": {
      "title": "Treniņu Plāni | AK Fitness",
      "description": "AK Fitness Treniņu Plāni — mērķim un pieredzes līmenim pielāgotas treniņu programmas, kas māca veidot un progresēt efektīvus plānus. Vienreizējs pirkums.",
      "ogTitle": "Treniņu Plāni | AK Fitness",
      "ogDescription": "Mērķim un līmenim pielāgotas treniņu programmas — periodizācija, progresija un specifiski mērķi. Vienreizējs pirkums.",
      "ogImage": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
    },
    "hero": {
      "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop&sat=-100",
      "badge": "Treniņu Plāni · Vienreizējs pirkums",
      "title": "Treniņu",
      "titleAccent": "Plāni",
      "lede": "Gatavi, strukturēti plāni katram mērķim un pieredzes līmenim — un, kas svarīgāk, tie tev iemāca <span class=\"text-zinc-900 dark:text-white font-medium\">kā</span> veidot un progresēt efektīvu treniņu programmu pašam.",
      "price": {
        "prefix": "no",
        "amount": "€39",
        "unit": "/ plāns"
      },
      "primaryCta": {
        "label": "Iegādāties",
        "href": "#pieteikties"
      },
      "secondaryCta": {
        "label": "Apskatīt plānus",
        "href": "#karte"
      },
      "summaryTitle": "Īsumā",
      "summary": [
        "Pielāgots tavam mērķim un līmenim",
        "Iebūvēta progresija — plāns aug līdzi tev",
        "Māca principus, ne tikai vingrojumus",
        "Vienreizējs pirkums, tavs uz visiem laikiem"
      ]
    },
    "steps": {
      "tinted": false,
      "heading": "Kā tas darbojas",
      "subheading": "No izvēles līdz rezultātam",
      "columns": 4,
      "items": [
        {
          "title": "Izvēlies mērķi",
          "text": "Apskati programmu karti un izvēlies plānu, kas atbilst tavam mērķim un pašreizējam pieredzes līmenim."
        },
        {
          "title": "Saņem plānu",
          "text": "Pēc pirkuma saņem strukturētu plānu ar vingrojumiem, sériju un atkārtojumu shēmu, un skaidrojumu, kāpēc tā."
        },
        {
          "title": "Seko progresijai",
          "text": "Plāns māca progresīvo slodzi un deload principus, lai tu zini tieši kad un kā palielināt slodzi."
        },
        {
          "title": "Kļūsti patstāvīgs",
          "text": "Beigās tu ne tikai izpildīji plānu — tu saproti, kā uzbūvēt nākamo. Tas ir mērķis."
        }
      ]
    },
    "programMap": {
      "heading": "Programmu arhitektūra",
      "subheading": "No pamatiem līdz sacensībām — izvēlies savu ceļu"
    },
    "apply": {
      "eyebrow": "Pieteikums · Treniņu Plāns",
      "heading": "Iegādājies savu plānu",
      "text": "Pastāsti, kurš plāns un mērķis tevi interesē, un mēs atsūtīsim maksājuma un piegādes detaļas.",
      "packageName": "Treniņu Plāni",
      "messagePlaceholder": "Pieredzes līmenis, pieejamais aprīkojums, jautājumi...",
      "buttonLabel": "Nosūtīt Pieteikumu",
      "backLabel": "← Salīdzināt visus pakalpojumus"
    }
  }
} satisfies Record<string, Service>;
