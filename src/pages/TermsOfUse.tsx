import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import cimedSymbol from '@/assets/cimed-symbol.png';

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <div className="flex items-center gap-1 px-4 py-3 bg-[#FFD400] shrink-0">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <img src={cimedSymbol} alt="Cimed" className="w-8 h-8 object-contain" />
        <span className="text-lg font-black text-black tracking-tight font-['Nunito']">CIMEDGO</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <h1 className="text-xl font-black text-black font-['Nunito'] mb-4">Termos de Uso — Programa de Influenciadores CIMED GO</h1>

        <div className="space-y-5 text-sm text-black/80 font-['Nunito'] leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-black mb-1">1. Objeto do Programa</h2>
            <p>
              O Programa de Influenciadores CIMED GO é uma iniciativa da <strong>Cimed Indústria de Medicamentos Ltda.</strong> ("Cimed") que visa estabelecer parcerias com criadores de conteúdo digital para a divulgação de produtos, campanhas e valores da marca Cimed. Ao se inscrever, o participante declara interesse em representar a marca de forma autêntica e responsável em suas plataformas digitais.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">2. Requisitos do Influenciador</h2>
            <p>
              Para participar do programa, o influenciador declara que:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Possui conhecimento prévio sobre a marca Cimed, seus produtos e posicionamento no mercado farmacêutico;</li>
              <li>Está alinhado com os valores de saúde, bem-estar, acessibilidade e inovação da Cimed;</li>
              <li>Possui perfil ativo e autêntico nas redes sociais indicadas no formulário de inscrição;</li>
              <li>Tem idade mínima de 18 anos e capacidade civil plena.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">3. Cessão de Direitos de Imagem</h2>
            <p>
              Ao aceitar estes Termos, o influenciador <strong>autoriza expressamente</strong> a Cimed a utilizar sua <strong>imagem, voz, nome, apelido e likeness</strong> (aparência) em materiais promocionais, publicitários e institucionais, incluindo, mas não se limitando a:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Publicações nas redes sociais oficiais da Cimed (Instagram, TikTok, YouTube, Facebook, LinkedIn e demais plataformas);</li>
              <li>Materiais de ponto de venda (PDV), embalagens especiais e campanhas promocionais;</li>
              <li>Peças publicitárias em meios digitais e offline (banners, vídeos, anúncios pagos);</li>
              <li>Comunicações internas e apresentações corporativas da Cimed.</li>
            </ul>
            <p className="mt-2">
              A cessão é concedida de forma <strong>gratuita, irrevogável durante a vigência da parceria</strong>, para uso em território nacional e internacional, pelo prazo de <strong>2 (dois) anos</strong> contados a partir da publicação do conteúdo, podendo ser renovada mediante acordo entre as partes. Após o término, a Cimed poderá manter o conteúdo já publicado em seus canais.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">4. Propriedade Intelectual</h2>
            <p>
              Todo conteúdo criado no âmbito do programa que utilize a marca, logotipos, embalagens ou produtos da Cimed é de <strong>propriedade compartilhada</strong>. O influenciador não poderá utilizar a marca Cimed, seus logotipos ou identidade visual fora do escopo acordado sem autorização prévia e por escrito. A Cimed reserva-se o direito de solicitar alterações ou remoção de conteúdo que não esteja em conformidade com suas diretrizes de marca.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">5. Conduta e Responsabilidades</h2>
            <p>O influenciador compromete-se a:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Representar a marca Cimed de forma ética, respeitosa e em conformidade com a legislação vigente;</li>
              <li>Não associar a marca a conteúdos ofensivos, discriminatórios, violentos, de cunho sexual explícito ou que promovam o uso indevido de medicamentos;</li>
              <li>Identificar claramente conteúdos patrocinados com as hashtags e marcações exigidas (ex: #publi, #parceriaCimed);</li>
              <li>Seguir as orientações da equipe CIMED GO sobre mensagens-chave, claims permitidos e restrições regulatórias (ANVISA);</li>
              <li>Não fazer alegações terapêuticas ou promessas de cura sobre os produtos divulgados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">6. Confidencialidade</h2>
            <p>
              O influenciador reconhece que poderá ter acesso a informações confidenciais da Cimed, incluindo <strong>lançamentos de produtos, estratégias de marketing, dados comerciais e briefings exclusivos</strong>. Todas essas informações devem ser mantidas em sigilo absoluto e não poderão ser compartilhadas com terceiros, concorrentes ou divulgadas publicamente antes da autorização expressa da Cimed. O descumprimento desta cláusula poderá resultar em rescisão imediata e responsabilização civil.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">7. Rescisão</h2>
            <p>
              A parceria poderá ser encerrada a qualquer momento por qualquer das partes, mediante comunicação prévia de <strong>15 (quinze) dias</strong>. A Cimed reserva-se o direito de desligar imediatamente o influenciador em caso de:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Violação de qualquer cláusula destes Termos;</li>
              <li>Conduta incompatível com os valores da marca;</li>
              <li>Envolvimento em escândalos, polêmicas ou situações que possam prejudicar a reputação da Cimed;</li>
              <li>Divulgação de informações confidenciais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-black mb-1">8. Política de Privacidade e LGPD</h2>
            <p>
              A Cimed coleta e trata os dados pessoais fornecidos neste formulário em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)</strong>. Os dados coletados (nome, CPF, contato, redes sociais, cidade e demais informações) serão utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Análise e seleção de candidatos ao programa de influenciadores;</li>
              <li>Comunicação relacionada ao programa CIMED GO;</li>
              <li>Cumprimento de obrigações legais e contratuais.</li>
            </ul>
            <p className="mt-2">
              Os dados não serão compartilhados com terceiros, exceto quando necessário para a operação do programa ou por exigência legal. O titular dos dados poderá, a qualquer momento, solicitar acesso, correção ou exclusão de seus dados pessoais, entrando em contato pelo e-mail <strong>privacidade@cimed.com.br</strong>.
            </p>
          </section>

          <div className="border-t border-gray-200 pt-4 mt-6">
            <p className="text-xs text-black/50 text-center">
              Última atualização: Março de 2026 — Cimed Indústria de Medicamentos Ltda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
