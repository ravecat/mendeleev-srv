const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'mendeleev';
const collection = 'elements';

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err, client) {
  console.warn('Connected to server');

  const db = client.db(dbName);
  const bulk = db.collection(collection).initializeUnorderedBulkOp();

  bulk.find({}).update({
    $rename: {
      atomic_number: 'atomicNumber',
      atomic_weight: 'atomicWeight',
      'abundances.in_humans': 'abundances.inHumans',
      'abundances.in_earths_crust': 'abundances.inEarthsCrust',
      'abundances.in_universe': 'abundances.inUniverse',
      'abundances.in_sun': 'abundances.inSun',
      'abundances.in_meteorites': 'abundances.inMeteorites',
      'abundances.in_oceans': 'abundances.inOceans',
      'classification.gas_phase': 'classification.gasPhase',
      'classification.nsc_number': 'classification.nscNumber',
      'classification.alternate_names': 'classification.alternateNames',
      'classification.electron_configuration': 'classification.electronConfiguration',
      'classification.names_of_allotropes': 'classification.namesOfAllotropes',
      'classification.cid_number': 'classification.cidNumber',
      'classification.cas_number': 'classification.casNumber',
      'classification.gmelin_number': 'classification.gmelinNumber',
      'nuclear.neutron_cross_section': 'nuclear.neutronCrossSection',
      'nuclear.stable_isotopes': 'nuclear.stableIsotopes',
      'nuclear.isotopic_abundances': 'nuclear.isotopicAbundances',
      'nuclear.known_isotopes': 'nuclear.knownIsotopes',
      'nuclear.half_life': 'nuclear.halfLife',
      'nuclear.neutron_mass_absorption': 'nuclear.neutronMassAbsorption',
      'nuclear.decay_mode': 'nuclear.decayMode',
      'thermal.absolute_boiling_point': 'thermal.absoluteBoilingPoint',
      'thermal.heat_of_vaporization': 'thermal.heatOfVaporization',
      'thermal.adiabatic_index': 'thermal.adiabaticIndex',
      'thermal.critical_pressure': 'thermal.criticalPressure',
      'thermal.thermal_conductivity': 'thermal.thermalConductivity',
      'thermal.boiling_point': 'thermal.boilingPoint',
      'thermal.absolute_melting_point': 'thermal.absoluteMeltingPoint',
      'thermal.heat_of_fusion': 'thermal.heatOfFusion',
      'thermal.specific_heat': 'thermal.specificHeat',
      'thermal.critical_temperature': 'thermal.criticalTemperature',
      'thermal.thermal_expansion': 'thermal.thermalExpansion',
      'thermal.melting_point': 'thermal.meltingPoint',
      'thermal.neel_point': 'thermal.neelPoint',
      'thermal.heat_of_combustion': 'thermal.heatOfCombustion',
      'reactivity.ionization_energies': 'reactivity.ionizationEnergies',
      'safety.dot_numbers': 'safety.dotNumbers',
      'safety.nfpa_fire_rating': 'safety.nfpaFireRating',
      'safety.nfpa_reactivity_rating': 'safety.nfpaReactivityRating',
      'safety.nfpa_hazards': 'safety.nfpaHazards',
      'safety.autoignition_point': 'safety.autoignitionPoint',
      'safety.rtecs_number': 'safety.rtecsNumber',
      'safety.nfpa_health_rating': 'safety.nfpaHealthRating',
      'safety.dot_hazard_class': 'safety.dotHazardClass',
      'safety.eu_number': 'safety.euNumber',
      'atomic.space_group_number': 'atomic.spaceGroupNumber',
      'atomic.lattice_constants': 'atomic.latticeConstants',
      'atomic.lattice_angles': 'atomic.latticeAngles',
      'atomic.covalent_radius': 'atomic.covalentRadius',
      'atomic.crystal_structure': 'atomic.crystalStructure',
      'atomic.van_der_waals_radius': 'atomic.vanDerWaalsRadius',
      'atomic.space_group_name': 'atomic.spaceGroupName',
      'atomic.atomic_radius': 'atomic.atomicRadius',
      'electrical.electrical_type': 'electrical.electricalType',
      'electrical.electrical_conductivity': 'electrical.electricalConductivity',
      'electrical.superconducting_point': 'electrical.superconductingPoint',
      'magnetic.magnetic_type': 'magnetic.magneticType',
      'magnetic.molar_magnetic_susceptibility': 'magnetic.molarMagneticSusceptibility',
      'magnetic.curie_point': 'magnetic.curiePoint',
      'magnetic.volume_magnetic_susceptibility': 'magnetic.volumeMagneticSusceptibility',
      'magnetic.mass_magnetic_susceptibility': 'magnetic.massMagneticSusceptibility',
      'physical.brinell_hardness': 'physical.brinellHardness',
      'physical.shear_modulus': 'physical.shearModulus',
      'physical.mohs_hardness': 'physical.mohsHardness',
      'physical.molar_volume': 'physical.molarVolume',
      'physical.bulk_modulus': 'physical.bulkModulus',
      'physical.vickers_hardness': 'physical.vickersHardness',
      'physical.young_modulus': 'physical.youngModulus',
      'physical.speed_of_sound': 'physical.speedOfSound',
      'physical.poisson_ratio': 'physical.poissonRatio',
      'physical.refractive_index': 'physical.refractiveIndex',
    },
  });

  bulk.execute().then(() => {
    console.warn('Close connection');

    client.close();
  });
});
