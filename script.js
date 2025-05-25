const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
});

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

document.getElementById('form-churrasco').addEventListener('submit', function (e) {
    e.preventDefault();

    const adultos = parseInt(document.getElementById('adultos').value) || 0;
    const criancas = parseInt(document.getElementById('criancas').value) || 0;
    const vegetarianos = parseInt(document.getElementById('vegetarianos').value) || 0;

    const duracao = parseInt(document.getElementById('duracao').value) || 4;

    const cerveja = document.getElementById('cerveja').checked;
    const refrigerante = document.getElementById('refrigerante').checked;
    const paoAlho = document.getElementById('pao-alho').checked;
    const farofa = document.getElementById('farofa').checked;

    const calculosPorPessoa = {
        carnePorAdulto: 400, 
        carnePorCrianca: 200,
        linguicaPorPessoa: 200,
        frangoPorPessoa: 250,
        paoDeAlhoPorPessoa: 2, 
        farofaPorPessoa: 100, 
        cervejaPorAdulto: 1200, 
        refrigerantePorPessoa: 500, 
        geloPorPessoa: 800, 
        carvao: 1000, 
        guardanapos: 4 
    };

    const fatorDuracao = Math.min(2, duracao / 4);

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

    const formatarPeso = (gramas) => {
        return gramas >= 1000 ? `${(gramas/1000).toFixed(1)} kg` : `${gramas} g`;
    };

    const formatarVolume = (ml) => {
        return ml >= 1000 ? `${(ml/1000).toFixed(1)} L` : `${ml} ml`;
    };

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
