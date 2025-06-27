import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts'
import { 
  BookOpen, Users, DollarSign, Scale, FileText, Award,
  ChevronRight, CheckCircle, TrendingUp, Calculator,
  Gavel, Shield, Building2, Eye, ArrowRight, Star
} from 'lucide-react'
import './App.css'

// Dados para os gráficos
const receitasData = [
  { name: 'Receitas Tributárias', valor: 568, responsavel: 'Auditores', cor: '#2E86AB' },
  { name: 'Autos de Infração', valor: 5.2, responsavel: 'Fiscais', cor: '#A23B72' }
]

const receitasDetalhadas = [
  { name: 'ISS', valor: 258.2, percentual: 45.4 },
  { name: 'VAF-ICMS', valor: 92.1, percentual: 16.2 },
  { name: 'COSIP', valor: 76.4, percentual: 13.4 },
  { name: 'Taxa Lixo', valor: 35.8, percentual: 6.3 },
  { name: 'IPTU', valor: 41.0, percentual: 7.2 },
  { name: 'ITBI', valor: 24.9, percentual: 4.4 },
  { name: 'Outras', valor: 40.2, percentual: 7.1 }
]

const autosInfracaoData = [
  { tipo: 'Trânsito', valor: 4.5, cor: '#F18F01' },
  { tipo: 'Obras', valor: 0.34, cor: '#C73E1D' },
  { tipo: 'Localização', valor: 0.19, cor: '#2E86AB' },
  { tipo: 'Posturas', valor: 0.08, cor: '#A23B72' },
  { tipo: 'Vigilância', valor: 0.04, cor: '#F18F01' },
  { tipo: 'Meio Ambiente', valor: 0.03, cor: '#C73E1D' }
]

const quizQuestions = [
  {
    pergunta: "Quem tem competência constitucional para arrecadar tributos municipais?",
    opcoes: ["Fiscais Municipais", "Auditores do Tesouro", "Ambos", "Secretário de Fazenda"],
    correta: 1,
    explicacao: "Somente os Auditores do Tesouro têm competência constitucional exclusiva para arrecadar tributos, conforme Art. 156 da CF."
  },
  {
    pergunta: "Qual a proporção entre receitas tributárias e autos de infração em Porto Velho?",
    opcoes: ["50:1", "75:1", "109:1", "200:1"],
    correta: 2,
    explicacao: "A proporção é de 109:1, ou seja, para cada R$ 1 em autos de infração, são arrecadados R$ 109 em tributos."
  },
  {
    pergunta: "O VAF-ICMS de R$ 92 milhões depende de qual atividade?",
    opcoes: ["Fiscalização de posturas", "Fiscalização tributária", "Autos de infração", "Licenciamento"],
    correta: 1,
    explicacao: "O VAF-ICMS depende diretamente da qualidade da fiscalização tributária realizada pelos Auditores do Tesouro."
  }
]

function App() {
  const [currentSection, setCurrentSection] = useState('inicio')
  const [progress, setProgress] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [badges, setBadges] = useState([])

  const sections = [
    { id: 'inicio', title: 'Início', icon: BookOpen },
    { id: 'fundamentos', title: 'Fundamentos', icon: Scale },
    { id: 'auditor', title: 'Auditor do Tesouro', icon: DollarSign },
    { id: 'fiscal', title: 'Fiscal Municipal', icon: Shield },
    { id: 'comparativo', title: 'Comparativo', icon: TrendingUp },
    { id: 'receitas', title: 'Receitas Detalhadas', icon: Calculator },
    { id: 'quiz', title: 'Quiz', icon: Award },
    { id: 'legislacao', title: 'Legislação', icon: FileText },
    { id: 'conclusao', title: 'Conclusão', icon: CheckCircle }
  ]

  useEffect(() => {
    const sectionIndex = sections.findIndex(s => s.id === currentSection)
    setProgress((sectionIndex + 1) / sections.length * 100)
  }, [currentSection])

  const addBadge = (badgeId, title) => {
    if (!badges.includes(badgeId)) {
      setBadges([...badges, badgeId])
    }
  }

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    if (answerIndex === quizQuestions[currentQuiz].correta) {
      setQuizScore(quizScore + 1)
    }
    
    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1)
        setSelectedAnswer(null)
        setShowAnswer(false)
      } else {
        setQuizCompleted(true)
        if (quizScore >= 2) {
          addBadge('quiz-expert', 'Expert em Competências')
        }
      }
    }, 3000)
  }

  const renderSection = () => {
    switch(currentSection) {
      case 'inicio':
        return (
          <div className="text-center space-y-8">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                  Cartilha Interativa
                </h1>
                <h2 className="text-2xl mb-6 opacity-90">
                  Auditores do Tesouro vs Fiscais Municipais
                </h2>
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300">R$ 568M</div>
                    <div className="text-sm opacity-80">Receitas Tributárias</div>
                  </div>
                  <div className="text-6xl opacity-50">vs</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-300">R$ 5,2M</div>
                    <div className="text-sm opacity-80">Autos de Infração</div>
                  </div>
                </div>
                <div className="text-xl mb-8">
                  <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                    Proporção: 109:1
                  </span>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setCurrentSection('fundamentos')}
                >
                  Começar Jornada <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Scale className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Base Constitucional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Entenda a separação clara de competências estabelecida pela Constituição Federal
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Dados Reais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Baseado no PLOA 2025 de Porto Velho com valores oficiais atualizados
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Award className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Interativo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Quiz, gráficos interativos e certificado de conclusão
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'fundamentos':
        addBadge('fundamentos', 'Conhece os Fundamentos')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">⚖️ Fundamento Constitucional</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A Constituição Federal de 1988 estabelece uma separação clara entre competências
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <DollarSign className="h-6 w-6" />
                    Competência Tributária
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Exclusiva dos Auditores do Tesouro
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Art. 156 da Constituição Federal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Lançamento e arrecadação de tributos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Competência indelegável
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Shield className="h-6 w-6" />
                    Poder de Polícia Administrativo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Exercido pelos Fiscais Municipais
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Códigos administrativos específicos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Autos de infração educativos
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Caráter preventivo e corretivo
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-orange-800">
                  🎯 Ponto Fundamental
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold text-orange-700">
                  "A separação de competências garante segurança jurídica, eficiência administrativa 
                  e proteção do interesse público"
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case 'auditor':
        addBadge('auditor', 'Especialista em Auditoria')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">👨‍💼 Auditor do Tesouro</h2>
              <p className="text-lg text-gray-600">
                Competências exclusivas e responsabilidades constitucionais
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">✅ Competências Exclusivas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Lançamento de tributos (ISS, IPTU, ITBI, Taxa Lixo, ITR, demais taxas)',
                      'A partir de 2026: lançamento do IBS',
                      'Constituição e revisão do crédito tributário',
                      'Gestão da créditos e cadastros tributários e rendas municipais',
                      'Fiscalização e auditoria tributários',
                      'Responsabilidade pelo VAF-ICMS'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">📋 Responsabilidades Financeiras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">R$ 568 milhões</div>
                      <div className="text-sm text-green-600">Receitas tributárias anuais</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">99,1%</div>
                      <div className="text-sm text-blue-600">Das receitas próprias analisadas</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-700">R$ 92 milhões</div>
                      <div className="text-sm text-purple-600">VAF-ICMS (depende da fiscalização)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-center">⚖️ Base Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Constituição Federal</h4>
                    <ul className="space-y-1 opacity-90">
                      <li>• Art. 156 - Competência tributária municipal</li>
                      <li>• Atividade vinculada e obrigatória</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legislação Municipal</h4>
                    <ul className="space-y-1 opacity-90">
                      <li>• Art. 9º do Código Tributário Municipal</li>
                      <li>• Competência constitucional exclusiva</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'fiscal':
        addBadge('fiscal', 'Conhece Fiscalização')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">👮‍♂️ Fiscal Municipal</h2>
              <p className="text-lg text-gray-600">
                Poder de polícia administrativo e competências específicas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">✅ Competências Específicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Aplicação de Autos de Infração de poder de polícia',
                      'Fiscalização de policiamento urbano',
                      'Exercício do poder de polícia administrativo',
                      'Controle de atividades econômicas',
                      'Verificação de licenças e autorizações'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">📋 Tipos de Autos de Infração</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {[
                      { tipo: 'Obras', lei: 'LC nº 560/2014' },
                      { tipo: 'Trânsito', lei: 'CTB + normas municipais' },
                      { tipo: 'Meio Ambiente', lei: 'LC nº 138/2001' },
                      { tipo: 'Localização e Funcionamento', lei: 'LC nº 873/2021' },
                      { tipo: 'Posturas', lei: 'LC nº 873/2021' },
                      { tipo: 'Vigilância Sanitária', lei: 'Lei nº 1.562/2003' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.tipo}</span>
                        <Badge variant="outline" className="text-xs">{item.lei}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-center text-orange-800">
                  🎯 Características dos Autos de Infração
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-700">Caráter Educativo</h4>
                    <p className="text-sm text-orange-600">Orientação e correção</p>
                  </div>
                  <div>
                    <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-700">Poder de Polícia</h4>
                    <p className="text-sm text-orange-600">Administrativo específico</p>
                  </div>
                  <div>
                    <Building2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-orange-700">Códigos Municipais</h4>
                    <p className="text-sm text-orange-600">Base legal específica</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'comparativo':
        addBadge('comparativo', 'Analista Comparativo')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">📊 Comparativo de Receitas</h2>
              <p className="text-lg text-gray-600">Valores reais do PLOA 2025</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Proporção 109:1 - Receitas vs Autos de Infração</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={receitasData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`R$ ${value} milhões`, 'Valor']}
                      labelFormatter={(label) => `Categoria: ${label}`}
                    />
                    <Bar dataKey="valor" fill="#2E86AB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700">Receitas Tributárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 mb-2">R$ 568M</div>
                  <div className="text-sm text-green-600 mb-4">99,1% das receitas</div>
                  <Badge className="bg-green-600">Auditores do Tesouro</Badge>
                </CardContent>
              </Card>

              <Card className="text-center bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-gray-700">Proporção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-6xl font-bold text-gray-600 mb-2">109:1</div>
                  <div className="text-sm text-gray-600">Para cada R$ 1 em multas</div>
                  <div className="text-sm text-gray-600">R$ 109 em tributos</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-700">Autos de Infração</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-purple-600 mb-2">R$ 5,2M</div>
                  <div className="text-sm text-purple-600 mb-4">0,9% das receitas</div>
                  <Badge className="bg-purple-600">Fiscais Municipais</Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>📈 Análise dos Dados Reais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">Receitas Tributárias</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Base absoluta do orçamento municipal
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        Financiamento essencial dos serviços públicos
                      </li>
                      <li className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-green-600" />
                        Competência constitucional exclusiva
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-purple-600">Autos de Infração</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-orange-600" />
                        Caráter educativo e preventivo
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-orange-600" />
                        Poder de polícia administrativo
                      </li>
                      <li className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-orange-600" />
                        Complementar às receitas tributárias
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'receitas':
        addBadge('receitas', 'Expert em Receitas')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">💰 Receitas Tributárias Detalhadas</h2>
              <p className="text-lg text-gray-600">Valores reais do orçamento 2025</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição das Receitas Tributárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={receitasDetalhadas}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="valor"
                        label={({name, percentual}) => `${name}: ${percentual}%`}
                      >
                        {receitasDetalhadas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`R$ ${value} milhões`, 'Valor']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detalhamento por Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {receitasDetalhadas.map((receita, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{receita.name}</div>
                          <div className="text-sm text-gray-600">{receita.percentual}% do total</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">R$ {receita.valor}M</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-orange-800">
                  💎 VAF-ICMS - Destaque Especial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-orange-700">R$ 92 milhões</div>
                  <div className="text-lg text-orange-600">16,2% das receitas tributárias</div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Quanto melhor a fiscalização tributária, maior o VAF-ICMS recebido!</strong>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✅ Depende da qualidade da fiscalização tributária municipal</li>
                      <li>✅ Responsabilidade exclusiva dos Auditores do Tesouro</li>
                      <li>✅ Impacto direto na receita municipal</li>
                      <li>✅ Competência técnica especializada</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Autos de Infração por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={autosInfracaoData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="tipo" type="category" width={100} />
                    <Tooltip formatter={(value) => [`R$ ${value} milhões`, 'Valor']} />
                    <Bar dataKey="valor" fill="#A23B72" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )

      case 'quiz':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🎯 Teste Seus Conhecimentos</h2>
              <p className="text-lg text-gray-600">Quiz interativo sobre competências</p>
            </div>

            {!quizCompleted ? (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Pergunta {currentQuiz + 1} de {quizQuestions.length}</CardTitle>
                    <Badge variant="outline">{quizScore} pontos</Badge>
                  </div>
                  <Progress value={(currentQuiz / quizQuestions.length) * 100} className="w-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    {quizQuestions[currentQuiz].pergunta}
                  </h3>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuiz].opcoes.map((opcao, index) => (
                      <Button
                        key={index}
                        variant={
                          showAnswer 
                            ? index === quizQuestions[currentQuiz].correta 
                              ? "default" 
                              : selectedAnswer === index 
                                ? "destructive" 
                                : "outline"
                            : "outline"
                        }
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => !showAnswer && handleQuizAnswer(index)}
                        disabled={showAnswer}
                      >
                        <span className="mr-3 font-bold">{String.fromCharCode(65 + index)})</span>
                        {opcao}
                      </Button>
                    ))}
                  </div>

                  {showAnswer && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-4">
                        <p className="text-sm text-blue-800">
                          <strong>Explicação:</strong> {quizQuestions[currentQuiz].explicacao}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">🎉 Quiz Concluído!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {quizScore} / {quizQuestions.length}
                    </div>
                    <div className="text-lg text-gray-600">
                      {quizScore >= 2 ? 'Excelente conhecimento!' : 'Continue estudando!'}
                    </div>
                  </div>
                  
                  {quizScore >= 2 && (
                    <div className="bg-yellow-50 border-yellow-200 border rounded-lg p-4">
                      <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="font-semibold text-yellow-800">
                        Parabéns! Você conquistou o badge "Expert em Competências"
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => {
                      setCurrentQuiz(0)
                      setQuizScore(0)
                      setQuizCompleted(false)
                      setSelectedAnswer(null)
                      setShowAnswer(false)
                    }}
                    variant="outline"
                  >
                    Refazer Quiz
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 'legislacao':
        addBadge('legislacao', 'Conhece a Legislação')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">📚 Códigos Municipais</h2>
              <p className="text-lg text-gray-600">Legislação de referência</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  titulo: 'Código Tributário Municipal',
                  lei: 'Lei Complementar 878/21',
                  descricao: 'Lançamento, fiscalização e arrecadação de tributos',
                  cor: 'blue'
                },
                {
                  titulo: 'Código de Obras',
                  lei: 'Lei Complementar nº 560/2014',
                  descricao: 'Autos de infração de obras e edificações',
                  cor: 'green'
                },
                {
                  titulo: 'Código Sanitário',
                  lei: 'Lei nº 1.562/2003',
                  descricao: 'Autos de infração de vigilância sanitária',
                  cor: 'purple'
                },
                {
                  titulo: 'Código Ambiental',
                  lei: 'Lei Complementar nº 138/2001',
                  descricao: 'Autos de infração ambientais',
                  cor: 'orange'
                },
                {
                  titulo: 'Código de Posturas',
                  lei: 'Lei Complementar nº 873/2021',
                  descricao: 'Autos de infração de posturas e localização',
                  cor: 'red'
                },
                {
                  titulo: 'Constituição Federal',
                  lei: 'Art. 156 - CF/88',
                  descricao: 'Competência tributária municipal',
                  cor: 'yellow'
                }
              ].map((codigo, index) => (
                <Card key={index} className={`border-${codigo.cor}-200 hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <CardTitle className={`text-${codigo.cor}-700`}>
                      <FileText className="inline h-5 w-5 mr-2" />
                      {codigo.titulo}
                    </CardTitle>
                    <CardDescription>
                      <Badge className={`bg-${codigo.cor}-100 text-${codigo.cor}-800`}>
                        {codigo.lei}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{codigo.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-center">📖 Fontes Utilizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Documentos Oficiais</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Constituição Federal de 1988</li>
                      <li>• Código Tributário Nacional</li>
                      <li>• PLOA 2025 - Porto Velho (Dados Oficiais)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legislação Municipal</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Código Tributário Municipal de Porto Velho</li>
                      <li>• Códigos Municipais Específicos</li>
                      <li>• Leis Complementares vigentes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'conclusao':
        addBadge('conclusao', 'Concluiu a Cartilha')
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🎯 Conclusão</h2>
              <p className="text-lg text-gray-600">Resumo executivo e certificado</p>
            </div>

            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  ⚖️ Separação de Competências
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div>
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-bold mb-2">Auditores do Tesouro</h3>
                    <p className="opacity-90">Competência constitucional exclusiva para arrecadar tributos</p>
                  </div>
                  <div>
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-bold mb-2">Fiscais Municipais</h3>
                    <p className="opacity-90">Poder de polícia através de autos de infração educativos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Scale className="h-8 w-8 text-blue-600 mx-auto" />
                  <CardTitle className="text-blue-600">Segurança Jurídica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Separação clara de competências garante segurança nas operações
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
                  <CardTitle className="text-green-600">Eficiência</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Especialização das funções aumenta a eficiência administrativa
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-8 w-8 text-purple-600 mx-auto" />
                  <CardTitle className="text-purple-600">Interesse Público</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Proteção do interesse público através de competências definidas
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-yellow-800">
                  🏆 Certificado de Conclusão
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-lg font-semibold">
                  Parabéns! Você concluiu a Cartilha Interativa
                </div>
                <div className="text-sm text-gray-600">
                  Agora você conhece as diferenças entre Auditores do Tesouro e Fiscais Municipais
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {badges.map((badge, index) => (
                    <Badge key={index} className="bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      {badge.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Badge>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-lg mt-4">
                  <div className="text-2xl font-bold text-yellow-700 mb-2">109:1</div>
                  <div className="text-sm text-gray-600">
                    Lembre-se: Para cada R$ 1 em autos de infração,<br />
                    são arrecadados R$ 109 em receitas tributárias
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Seção não encontrada</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Cartilha Interativa - Porto Velho/RO
              </h1>
              <p className="text-sm text-gray-600">
                Auditores do Tesouro vs Fiscais Municipais
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progresso: {Math.round(progress)}%
              </div>
              <Progress value={progress} className="w-24" />
              <Badge variant="outline">
                {badges.length} badges
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Navegação</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                          currentSection === section.id 
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                            : 'text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{section.title}</span>
                        {badges.includes(section.id) && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                        )}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="animate-fade-in">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Prefeitura Municipal de Porto Velho</h3>
            <p className="text-gray-400">Secretaria Municipal de Fazenda - SEMFAZ</p>
            <p className="text-gray-400">Administração Tributária Municipal</p>
          </div>
          <div className="text-sm text-gray-500">
            Esta cartilha foi elaborada com base nos dados reais do PLOA 2025 e tem caráter meramente informativo.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

