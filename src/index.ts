import { fetchLatestQuestions } from './services/stackoverflow.js'
import { formatBody } from './utils/htmlFormatter.js'
import { sendQuestion } from './services/notifier.js'
import { loadSentIds, saveSentIds } from './services/persistence.js'

const sent = await loadSentIds()
const questions = await fetchLatestQuestions()
const newQs = questions.filter((q) => !sent.has(q.question_id))

for (const q of newQs.reverse()) {
    const snippet = formatBody(q.body).split('\n').slice(0, 10).join('\n').substring(0, 1024)
    await sendQuestion(q, snippet)
    sent.add(q.question_id)
}

if (newQs.length > 0) {
    await saveSentIds(sent)
} else {
    console.log('No new questions.')
}