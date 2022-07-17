const widgets = [
    { id: 1, color: 'niebieski' },
    { id: 2, color: 'czerwony' },
    { id: 3, color: 'żółty' },
    { id: 4, color: 'niebieski' },
];

console.log(`Czy są jakieś niebieskie elementy?`, widgets.some( item => item.color === 'niebieski'));

console.log(`Czy wszystkie elementy są niebieskie?`, widgets.every( item => item.color === 'niebieski'));