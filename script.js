// Configurações do tema
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
});

// Dicas para o churrasco
const dicas = [
    {
        icon: '🔥',
        titulo: 'Temperatura Ideal',
        texto: 'Aguarde a brasa ficar com cor cinza para começar a assar.'
    },
    {
        icon: '⏰',
        titulo: 'Tempo de Preparo',
        texto: 'Prepare a churrasqueira 30 minutos antes de começar a assar.'
    },
    {
        icon: '🧂',
        titulo: 'Tempero',
        texto: 'Tempere a carne apenas com sal grosso antes de assar.'
    },
    {
        icon: '📋',
        titulo: 'Organização',
        texto: 'Comece assando as carnes mais gordurosas.'
    }
];

// Adiciona as dicas ao carrossel
const dicasCarousel = document.querySelector('.dicas-carousel');
dicas.forEach(dica => {
    const dicaCard = document.createElement('div');
    dicaCard.className = 'dica-card';
    dicaCard.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">${dica.icon}</div>
        <h4 style="margin-bottom: 10px; color: var(--primary-color);">${dica.titulo}</h4>
        <p>${dica.texto}</p>
    `;
    dicasCarousel.appendChild(dicaCard);
});

// Cálculos do churrasco
document.getElementById('form-churrasco').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pessoas
    const adultos = parseInt(document.getElementById('adultos').value) || 0;
    const criancas = parseInt(document.getElementById('criancas').value) || 0;
    const vegetarianos = parseInt(document.getElementById('vegetarianos').value) || 0;

    // Duração em horas
    const duracao = parseInt(document.getElementById('duracao').value) || 4;

    // Opções selecionadas
    const cerveja = document.getElementById('cerveja').checked;
    const refrigerante = document.getElementById('refrigerante').checked;
    const paoAlho = document.getElementById('pao-alho').checked;
    const farofa = document.getElementById('farofa').checked;

    // Cálculos base por pessoa
    const calculosPorPessoa = {
        carnePorAdulto: 400, // gramas
        carnePorCrianca: 200, // gramas
        linguicaPorPessoa: 200, // gramas
        frangoPorPessoa: 250, // gramas
        paoDeAlhoPorPessoa: 2, // unidades
        farofaPorPessoa: 100, // gramas
        cervejaPorAdulto: 1200, // ml
        refrigerantePorPessoa: 500, // ml
        geloPorPessoa: 800, // gramas
        carvao: 1000, // gramas
        guardanapos: 4 // unidades
    };

    // Fatores de duração
    const fatorDuracao = Math.min(2, duracao / 4);

    // Cálculos totais
    const totalPessoas = adultos + (criancas * 0.5) + vegetarianos;
    const totalCarneVermelha = ((adultos * calculosPorPessoa.carnePorAdulto) + (criancas * calculosPorPessoa.carnePorCrianca)) * fatorDuracao;
    const totalLinguica = (totalPessoas * calculosPorPessoa.linguicaPorPessoa) * fatorDuracao;
    const totalFrango = (totalPessoas * calculosPorPessoa.frangoPorPessoa) * fatorDuracao;
    const totalPaoDeAlho = paoAlho ? Math.ceil(totalPessoas * calculosPorPessoa.paoDeAlhoPorPessoa) : 0;
    const totalFarofa = farofa ? (totalPessoas * calculosPorPessoa.farofaPorPessoa) : 0;
    const totalCerveja = cerveja ? (adultos * calculosPorPessoa.cervejaPorAdulto * fatorDuracao) : 0;
    const totalRefrigerante = refrigerante ? (totalPessoas * calculosPorPessoa.refrigerantePorPessoa * fatorDuracao) : 0;
    const totalGelo = (totalCerveja > 0 || totalRefrigerante > 0) ? (totalPessoas * calculosPorPessoa.geloPorPessoa) : 0;
    const totalCarvao = Math.ceil((totalPessoas * calculosPorPessoa.carvao) * fatorDuracao);
    const totalGuardanapos = Math.ceil(totalPessoas * calculosPorPessoa.guardanapos);

    // Formata os resultados
    const formatarPeso = (gramas) => {
        return gramas >= 1000 ? `${(gramas/1000).toFixed(1)} kg` : `${gramas} g`;
    };

    const formatarVolume = (ml) => {
        return ml >= 1000 ? `${(ml/1000).toFixed(1)} L` : `${ml} ml`;
    };

    // Monta o grid de resultados
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h3 style="margin-bottom: 20px; color: var(--accent-color);">
            <i class="fas fa-clipboard-list"></i> Lista para o Churrasco
        </h3>
        <div class="resultado-grid">
            ${totalCarneVermelha > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-drumstick-bite"></i>
                    <h4>Carne Vermelha</h4>
                    <p>${formatarPeso(totalCarneVermelha)}</p>
                </div>
            ` : ''}
            
            ${totalLinguica > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-hotdog"></i>
                    <h4>Linguiça</h4>
                    <p>${formatarPeso(totalLinguica)}</p>
                </div>
            ` : ''}
            
            ${totalFrango > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-drumstick-bite"></i>
                    <h4>Frango</h4>
                    <p>${formatarPeso(totalFrango)}</p>
                </div>
            ` : ''}
            
            ${totalPaoDeAlho > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-bread-slice"></i>
                    <h4>Pão de Alho</h4>
                    <p>${totalPaoDeAlho} unidades</p>
                </div>
            ` : ''}
            
            ${totalFarofa > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-wheat"></i>
                    <h4>Farofa</h4>
                    <p>${formatarPeso(totalFarofa)}</p>
                </div>
            ` : ''}
            
            ${totalCerveja > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-beer"></i>
                    <h4>Cerveja</h4>
                    <p>${formatarVolume(totalCerveja)}</p>
                </div>
            ` : ''}
            
            ${totalRefrigerante > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-glass"></i>
                    <h4>Refrigerante</h4>
                    <p>${formatarVolume(totalRefrigerante)}</p>
                </div>
            ` : ''}
            
            ${totalGelo > 0 ? `
                <div class="resultado-item">
                    <i class="fas fa-cube"></i>
                    <h4>Gelo</h4>
                    <p>${formatarPeso(totalGelo)}</p>
                </div>
            ` : ''}
            
            <div class="resultado-item">
                <i class="fas fa-fire"></i>
                <h4>Carvão</h4>
                <p>${formatarPeso(totalCarvao)}</p>
            </div>
            
            <div class="resultado-item">
                <i class="fas fa-scroll"></i>
                <h4>Guardanapos</h4>
                <p>${totalGuardanapos} unidades</p>
            </div>
        </div>
    `;
    
    resultado.classList.add('mostrar');
});
