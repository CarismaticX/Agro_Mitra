// src/data.js

// IMPORTANT: For images to work, you must download them
// and place them in a folder like 'src/assets/images'.
// Then, import them individually as shown below.

// Example: import termite from './assets/images/wheat_termites.jpg';
// You will need to repeat this for all images.
// The image paths below are placeholders for this local structure.
// You must replace the string paths with your imported variables.

export const cropData = {
  Wheat: {
    pests: [
      {
        name: "Termites",
        scientificName: "Odontotermes obesus",
        image: "https://media.licdn.com/dms/image/v2/D4D12AQGNfuqCBjv25A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1687384572782?e=2147483647&v=beta&t=zPsJPznuxPLCQzPSAhejMQPzB1juVkTZ2G3RYp-864M",
        stage: "Seedlings to ripening",
        symptoms: ["Plants wilt and dry due to root feeding", "Yellowing in partially damaged roots"],
        preventiveMeasures: ["Sow at higher seed rate", "Field sanitation", "Avoid decaying wood near fields"],
        controlMeasures: ["Seed treatment with Fipronil", "Soil insecticide application"]
      },
      {
        name: "Pink Stem Borer",
        scientificName: "Sesamia inferens",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Sesamia_inferens_caterpillar.jpg",
        stage: "Seedling to tillering",
        symptoms: ["Dead hearts", "Withered top leaves"],
        preventiveMeasures: ["Destroy crop stubble", "Resistant varieties"],
        controlMeasures: ["Chlorantraniliprole spray", "Monitoring larval eggs"]
      },
      {
        name: "Aphids",
        scientificName: "Sitobion avenae",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Wheat_aphid.jpg",
        stage: "All stages",
        symptoms: ["Clusters on shoots", "Honeydew", "Leaf curling"],
        preventiveMeasures: ["Encourage ladybird beetles", "Balanced fertilization"],
        controlMeasures: ["Neem oil spray", "Insecticidal soap"]
      },
      {
        name: "Armyworm",
        scientificName: "Mythimna separata",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Mythimna_separata_larva.jpg",
        stage: "Vegetative growth",
        symptoms: ["Leaf defoliation", "Chewed margins"],
        preventiveMeasures: ["Night monitoring", "Birds as natural predators"],
        controlMeasures: ["Bt spray", "Chemical insecticides"]
      }
    ],
    diseases: [
      {
        name: "Wheat Rust",
        scientificName: "Puccinia graminis",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Wheat_stem_rust.jpg",
        stage: "After tillering to grain filling",
        symptoms: ["Orange pustules on leaves/stems", "Reduced photosynthesis"],
        preventiveMeasures: ["Resistant varieties", "Proper spacing", "Crop rotation"],
        controlMeasures: ["Fungicide sprays (e.g. Propiconazole)", "Remove infected debris"]
      },
      {
        name: "Loose Smut",
        scientificName: "Ustilago tritici",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Wheat_loose_smut.jpg",
        stage: "Flowering stage",
        symptoms: ["Spikes replaced by black spores", "Bare stems"],
        preventiveMeasures: ["Certified seed", "Seed treatment"],
        controlMeasures: ["Destroy infected spikes"]
      },
      {
        name: "Leaf Blight (Alternaria triticina)",
        scientificName: "Alternaria triticina",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Leaf_blight_wheat.jpg",
        stage: "Leaf growth stage",
        symptoms: ["Necrotic lesions on leaves", "Brown spots", "Leaf death in severe cases"],
        preventiveMeasures: ["Resistant varieties", "Adequate spacing", "Avoid overhead irrigation"],
        controlMeasures: ["Fungicides like Mancozeb or Copper", "Remove infected leaves"]
      }
    ]
  },

  Rice: {
    pests: [
      {
        name: "Brown Planthopper",
        scientificName: "Nilaparvata lugens",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Brown_planthopper.jpg",
        stage: "Tillering to maturity",
        symptoms: ["Hopper burn", "Stunted plants"],
        preventiveMeasures: ["Resistant varieties", "Balanced N application"],
        controlMeasures: ["Insecticide sprays", "Field flooding management"]
      },
      {
        name: "Leaf Folder",
        scientificName: "Cnaphalocrocis medinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Rice_Leaf_Folder_Damage.jpg",
        stage: "Vegetative to reproductive",
        symptoms: ["Leaves folded", "White stripes after folding", "Reduced photosynthesis"],
        preventiveMeasures: ["Plant early", "Remove weeds"],
        controlMeasures: ["Bt spray", "Chemical control when threshold exceeded"]
      },
      {
        name: "Stem Borer",
        scientificName: "Scirpophaga incertulas",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Rice_stem_borer_damage.jpg",
        stage: "Seedling to maturity",
        symptoms: ["Dead heart", "White earhead"],
        preventiveMeasures: ["Use resistant varieties", "Flooding after harvest"],
        controlMeasures: ["Carbofuran granules", "Pheromone traps"]
      }
    ],
    diseases: [
      {
        name: "Rice Blast",
        scientificName: "Magnaporthe oryzae",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Rice_blast_symptoms.jpg",
        stage: "All growth stages",
        symptoms: ["Diamond-shaped lesions", "Neck rot", "Spots with grey center"],
        preventiveMeasures: ["Resistant cultivars", "Avoid dense planting"],
        controlMeasures: ["Tricyclazole spray", "Copper-based fungicides"]
      },
      {
        name: "Sheath Blight",
        scientificName: "Rhizoctonia solani",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Rice_sheath_blight.jpg",
        stage: "Tillering onwards",
        symptoms: ["Lesions on sheath", "Lesions spread to leaves", "Lodging if severe"],
        preventiveMeasures: ["Proper nitrogen management", "Improve drainage"],
        controlMeasures: ["Fungicides like validamycin", "Reduce humidity around canopy"]
      },
      {
        name: "Bacterial Leaf Blight",
        scientificName: "Xanthomonas oryzae pv. oryzae",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bacterial_leaf_blight_of_rice.jpg",
        stage: "Tillering to heading",
        symptoms: ["Yellowish-white stripes on leaves", "Water-soaked lesions"],
        preventiveMeasures: ["Resistant varieties", "Drain field after flooding"],
        controlMeasures: ["Copper bactericides", "Proper field sanitation"]
      }
    ]
  },

  Maize: {
    pests: [
      {
        name: "Fall Armyworm",
        scientificName: "Spodoptera frugiperda",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Fall_armyworm_caterpillar.jpg",
        stage: "Seedling to cob stage",
        symptoms: ["Damage in whorl", "Leaf holes", "Reduced cob length"],
        preventiveMeasures: ["Early planting", "Intercropping with non-hosts"],
        controlMeasures: ["Bt formulations", "Insecticide sprays"]
      },
      {
        name: "Stem Borer",
        scientificName: "Chilo partellus",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Chilo_partellus_larva.jpg",
        stage: "Vegetative to flowering",
        symptoms: ["Dead hearts", "Stem tunneling", "Stunted growth"],
        preventiveMeasures: ["Crop rotation", "Destroy old stubble"],
        controlMeasures: ["Granular insecticide", "Monitoring"]
      },
      {
        name: "Maize Weevil",
        scientificName: "Sitophilus zeamais",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Sitophilus_zeamais.jpg",
        stage: "Post-harvest (storage)",
        symptoms: ["Holes in stored kernels", "Powdery droppings"],
        preventiveMeasures: ["Dry storage", "Clean grain storage"],
        controlMeasures: ["Fumigation", "Use airtight containers"]
      }
    ],
    diseases: [
      {
        name: "Turcicum Leaf Blight",
        scientificName: "Exserohilum turcicum",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Turcicum_leaf_blight.jpg",
        stage: "Vegetative to reproductive",
        symptoms: ["Gray-green lesions", "Elliptical shape", "Leaf drying"],
        preventiveMeasures: ["Resistant hybrids", "Balanced fertilization"],
        controlMeasures: ["Fungicide spray"]
      },
      {
        name: "Common Rust",
        scientificName: "Puccinia sorghi",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Common_Rust_Maize.jpg",
        stage: "After mid-growth",
        symptoms: ["Reddish pustules on leaves", "Reduced photosynthesis"],
        preventiveMeasures: ["Resistant varieties", "Adequate nutrition"],
        controlMeasures: ["Fungicide sprays", "Remove infected leaves"]
      }
    ]
  },

  Tomato: {
    pests: [
      {
        name: "Tomato Hornworm",
        scientificName: "Manduca quinquemaculata",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Tomato_hornworm_on_tomato_plant.jpg",
        stage: "Vegetative to flowering",
        symptoms: ["Large holes in leaves", "Crop damage"],
        preventiveMeasures: ["Hand-pick larvae", "Use Bt sprays"],
        controlMeasures: ["Sprays", "Barriers"]
      },
      {
        name: "Whitefly",
        scientificName: "Bemisia tabaci",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/31/Whitefly_on_tomato.jpg",
        stage: "All stages",
        symptoms: ["Yellow leaves", "Sooty mold", "Reduced growth"],
        preventiveMeasures: ["Sticky traps", "Natural predators like ladybugs"],
        controlMeasures: ["Neem oil", "Soap sprays"]
      },
      {
        name: "Tomato Fruitworm",
        scientificName: "Helicoverpa armigera",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Helicoverpa_armigera_larva.jpg",
        stage: "Flowering to fruiting",
        symptoms: ["Bores into fruit", "Fruit drop"],
        preventiveMeasures: ["Bagging fruits", "Use pheromone traps"],
        controlMeasures: ["Bt spray", "Chemical sprays timed to lifecycle"]
      }
    ],
    diseases: [
      {
        name: "Early Blight",
        scientificName: "Alternaria solani",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Early_blight_on_tomato_leaf.jpg",
        stage: "Fruit set onwards",
        symptoms: ["Dark concentric rings on leaves", "Leaf drop"],
        preventiveMeasures: ["Crop rotation", "Resistant varieties"],
        controlMeasures: ["Copper fungicides", "Remove affected leaves"]
      },
      {
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Late_blight_on_tomato.jpg",
        stage: "Cool, wet conditions",
        symptoms: ["Water soaked lesions", "Fruit rot"],
        preventiveMeasures: ["Avoid overhead watering", "Use disease-resistant hybrids"],
        controlMeasures: ["Fungicide like Mancozeb", "Remove infected foliage"]
      },
      {
        name: "Fusarium Wilt",
        scientificName: "Fusarium oxysporum",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Fusarium_wilt_tomato.jpg",
        stage: "Soil-borne stages",
        symptoms: ["Wilting", "Yellowing", "Vascular browning"],
        preventiveMeasures: ["Soil sterilization", "Resistant varieties"],
        controlMeasures: ["Fungicide soil drench", "Crop rotation"]
      }
    ]
  },

  Cotton: {
    pests: [
      {
        name: "Cotton Aphid",
        scientificName: "Aphis gossypii",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Aphis_gossypii_on_cotton_leaf.jpg",
        stage: "All growth stages",
        symptoms: ["Yellowing leaves", "Sticky honeydew", "Curling leaves"],
        preventiveMeasures: ["Natural predators", "Avoid nitrogen overuse"],
        controlMeasures: ["Soap sprays", "Neem oil", "Chemical insecticides if needed"]
      },
      {
        name: "Pink Bollworm",
        scientificName: "Pectinophora gossypiella",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Pink_bollworm_larvae_on_cotton.jpg",
        stage: "Flowering/boll formation",
        symptoms: ["Damaged bolls", "Lint damage", "Premature boll opening"],
        preventiveMeasures: ["Bt cotton", "Resistant hybrids"],
        controlMeasures: ["Targeted insecticide", "Monitoring phenology"]
      }
    ],
    diseases: [
      {
        name: "Cotton Leaf Curl Virus",
        scientificName: "CLCuV",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Cotton_leaf_curl_virus_infected_leaf.jpg",
        stage: "Vegetative to flowering",
        symptoms: ["Leaves curl upward", "Vein thickening"],
        preventiveMeasures: ["Virus-resistant varieties", "Control whitefly vectors"],
        controlMeasures: ["Remove infected plants", "Maintain crops free of alternate hosts"]
      },
      {
        name: "Bacterial Blight",
        scientificName: "Xanthomonas citri pv. malvacearum",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Cotton_bacterial_blight.jpg",
        stage: "All growth stages",
        symptoms: ["Water-soaked lesions", "Leaf drop", "Blackening of bolls"],
        preventiveMeasures: ["Use disease-free seeds", "Crop hygiene"],
        controlMeasures: ["Copper sprays", "Remove affected bolls"]
      }
    ]
  },

  Potato: {
    pests: [
      {
        name: "Colorado Potato Beetle",
        scientificName: "Leptinotarsa decemlineata",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Colorado_Potato_Beetle.jpg",
        stage: "Vegetative growth",
        symptoms: ["Leaf defoliation", "Yellow mottling"],
        preventiveMeasures: ["Hand-pick beetles", "Row covers"],
        controlMeasures: ["Neem or Bt sprays", "Chemical control if necessary"]
      },
      {
        name: "Potato Tuber Moth",
        scientificName: "Phthorimaea operculella",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Potato_Tuber_Moth_Larva.jpg",
        stage: "Tuber and foliage",
        symptoms: ["Tunnels in tubers", "Leaves damaged"],
        preventiveMeasures: ["Clean seed tubers", "Storage hygiene"],
        controlMeasures: ["Insecticide sprays", "Proper storage"]
      }
    ],
    diseases: [
      {
        name: "Late Blight",
        scientificName: "Phytophthora infestans",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Phytophthora_infestans_late_blight.jpg",
        stage: "Cool, wet weather",
        symptoms: ["Dark lesions on leaves", "Fruiting bodies", "Tubers rot"],
        preventiveMeasures: ["Use resistant varieties", "Proper spacing", "Avoid overhead watering"],
        controlMeasures: ["Copper fungicides", "Remove infected leaves and tubers"]
      },
      {
        name: "Black Scurf (Rhizoctonia solani)",
        scientificName: "Rhizoctonia solani",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Black_scurf_potato.jpg",
        stage: "Tuber formation/storage",
        symptoms: ["Black scurf patches on tuber surfaces", "Reduced market value"],
        preventiveMeasures: ["Clean seed tubers", "Soil solarisation"],
        controlMeasures: ["Fungicide seed treatment", "Crop rotation"]
      }
    ]
  },

  Brinjal: {
    pests: [
      {
        name: "Fruit and Shoot Borer",
        scientificName: "Leucinodes orbonalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Eggplant_shoot_borer.jpg",
        stage: "Flowering to fruiting",
        symptoms: ["Bores into shoots/fruits", "Fruit drop"],
        preventiveMeasures: ["Pheromone traps", "Resistant varieties"],
        controlMeasures: ["Spray insecticides", "Remove infested parts"]
      }
    ],
    diseases: [
      {
        name: "Little Leaf",
        scientificName: "Phytoplasma sp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Little_leaf_of_brinjal.jpg",
        stage: "Early to mid growth",
        symptoms: ["Small deformed leaves", "Short internodes", "Reduced flowering"],
        preventiveMeasures: ["Control leafhopper vectors", "Use healthy seedlings"],
        controlMeasures: ["Remove diseased plants", "Insect vector control"]
      }
    ]
  },

  Groundnut: {
    pests: [
      {
        name: "Aphids",
        scientificName: "Aphis craccivora",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Aphis_craccivora_on_groundnut.jpg",
        stage: "Seedling to flowering",
        symptoms: ["Stunted growth", "Leaf curling", "Honeydew secretion"],
        preventiveMeasures: ["Use resistant varieties", "Destroy infected plants"],
        controlMeasures: ["Neem oil spray", "Insecticidal soap", "Chemical sprays for heavy infestation"]
      },
      {
        name: "Leaf Miner",
        scientificName: "Aproaerema modicella",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Groundnut_leaf_miner.jpg",
        stage: "Vegetative stage",
        symptoms: ["Mines on leaflets", "Leaves turn dry and brown"],
        preventiveMeasures: ["Early sowing", "Encourage natural enemies"],
        controlMeasures: ["Spray with a systemic insecticide"]
      }
    ],
    diseases: [
      {
        name: "Early Leaf Spot",
        scientificName: "Cercospora arachidicola",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Early_leaf_spot_groundnut.jpg",
        stage: "Vegetative to reproductive",
        symptoms: ["Dark brown spots with yellow halo", "Premature leaf shedding"],
        preventiveMeasures: ["Crop rotation", "Use disease-free seeds"],
        controlMeasures: ["Fungicide sprays (e.g., Chlorothalonil)"]
      },
      {
        name: "Stem Rot",
        scientificName: "Sclerotium rolfsii",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Groundnut_stem_rot.jpg",
        stage: "Flowering to maturity",
        symptoms: ["Wilting of plants", "White fungal growth at collar region"],
        preventiveMeasures: ["Deep plowing", "Good drainage"],
        controlMeasures: ["Fungicide drench", "Soil treatment with bio-agents"]
      }
    ]
  },

  Sugarcane: {
    pests: [
      {
        name: "Shoot Borer",
        scientificName: "Chilo infuscatellus",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Sugarcane_shoot_borer_damage.jpg",
        stage: "Initial growth stage",
        symptoms: ["Dead heart in young shoots", "Side shoots from base"],
        preventiveMeasures: ["Setts from healthy cane", "Early sowing"],
        controlMeasures: ["Irrigation management", "Insecticide granules"]
      },
      {
        name: "White Grub",
        scientificName: "Holotrichia serrata",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/White_grub_on_sugarcane_roots.jpg",
        stage: "Root and stalk growth",
        symptoms: ["Wilting", "Stunted growth", "Easy uprooting of plants"],
        preventiveMeasures: ["Deep summer plowing", "Field sanitation"],
        controlMeasures: ["Soil application of insecticides"]
      }
    ],
    diseases: [
      {
        name: "Red Rot",
        scientificName: "Colletotrichum falcatum",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/df/Sugarcane_red_rot.jpg",
        stage: "All stages",
        symptoms: ["Reddening of midribs", "Stunted plants", "Internal red lesions"],
        preventiveMeasures: ["Use resistant varieties", "Hot water treatment of setts"],
        controlMeasures: ["Remove and destroy infected plants", "Avoidratooning"]
      },
      {
        name: "Wilt",
        scientificName: "Fusarium sacchari",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Sugarcane_wilt.jpg",
        stage: "Mature stage",
        symptoms: ["Wilting of leaves", "Stunted growth", "Hollow, discolored stalks"],
        preventiveMeasures: ["Planting healthy setts", "Proper drainage"],
        controlMeasures: ["Roguing (removing) infected plants", "Crop rotation"]
      }
    ]
  },

  Chickpea: {
    pests: [
      {
        name: "Gram Pod Borer",
        scientificName: "Helicoverpa armigera",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Chickpea_pod_borer_damage.jpg",
        stage: "Pod formation",
        symptoms: ["Larvae feeding on leaves", "Bores into pods"],
        preventiveMeasures: ["Hand-picking larvae", "Pheromone traps"],
        controlMeasures: ["Bt sprays", "Chemical insecticides"]
      },
      {
        name: "Aphids",
        scientificName: "Aphis craccivora",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Aphids_on_chickpea.jpg",
        stage: "Vegetative stage",
        symptoms: ["Yellowing of leaves", "Honeydew", "Stunted growth"],
        preventiveMeasures: ["Release of natural enemies", "Avoid excess nitrogen"],
        controlMeasures: ["Neem oil spray", "Insecticidal soap"]
      }
    ],
    diseases: [
      {
        name: "Ascochyta Blight",
        scientificName: "Ascochyta rabiei",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Ascochyta_blight_of_chickpea.jpg",
        stage: "All growth stages",
        symptoms: ["Dark lesions on leaves", "Lesions with black margins", "Stem cankers"],
        preventiveMeasures: ["Use resistant varieties", "Fungicide seed treatment"],
        controlMeasures: ["Fungicide sprays (e.g., Chlorothalonil)"]
      },
      {
        name: "Fusarium Wilt",
        scientificName: "Fusarium oxysporum f.sp. ciceri",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Fusarium_wilt_chickpea.jpg",
        stage: "Soil-borne",
        symptoms: ["Wilting and drying of plants", "Vascular browning"],
        preventiveMeasures: ["Crop rotation", "Resistant varieties"],
        controlMeasures: ["Fungicide soil drench", "Soil solarization"]
      }
    ]
  }
};