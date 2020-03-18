const optionsGame = [
    { key: 'pedra', displayName:'Pedra',   win:['tesoura'] },
    { key: 'tesoura', displayName:'Tesoura', win:['papel'] },
    { key: 'papel', displayName:'Papel',   win:['pedra'] }
];

const randonComputer = () => {
    return optionsGame[Math.floor(Math.random() * optionsGame.length)];
};

const checkWins = ( user = randonComputer() , computer = randonComputer()  ) => {

    if ( computer.win.includes(user.key) ) 
        return 'computer';
        
    else if ( user.win.includes(computer.key) ) 
        return 'user';   

    else if ( user.key == computer.key )
        return 'empate';

    return 'bug';    
}

const getUser = ( filter ) => {
    for (let i = 0; i < optionsGame.length; i++) 
        if (optionsGame[i].key == filter)
            return optionsGame[i];
}

module.exports = { 
    options: optionsGame, 
    computerOption: randonComputer,  
    wins: checkWins, 
    user:getUser   
};