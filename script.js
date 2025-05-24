document.getElementById('form-churrasco').addEventListener('submit', function (e) {
    e.preventDefault();

    const adultos = parseInt(document.getElementById('adultos').value) || 0;
    const criancas = parseInt(document.getElementById('criancas').value) || 0;

    const carnePorAdulto = 400;
    const carnePorCrianca = 200;

    const refriPorAdulto = 750; 
    const refriPorCrianca = 300; 

    const salamePorAdulto = 150;
    const salamePorCrianca = 75;

    const totalCarne = adultos * carnePorAdulto + criancas * carnePorCrianca;
    const totalRefri = adultos * refriPorAdulto + criancas * refriPorCrianca;
    const totalSalame = adultos * salamePorAdulto + criancas * salamePorCrianca;

    const carneKg = (totalCarne / 1000).toFixed(2);
    const refriLitros = (totalRefri / 1000).toFixed(2);
    const salameKg = (totalSalame / 1000).toFixed(2);

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
      <div class="fogo"></div>
      <h2>Para seu churrasco, você vai precisar de:</h2>
      <ul>
        <li><strong>${carneKg} kg</strong> de carne</li>
        <li><strong>${refriLitros} L</strong> de refrigerante</li>
        <li><strong>${salameKg} kg</strong> de salame</li>
      </ul>
    `;
    resultado.classList.add('mostrar');
});
