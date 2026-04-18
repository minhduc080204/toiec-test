import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EXAMS_DIR = path.join(__dirname, '../src/data/exams');

if (!fs.existsSync(EXAMS_DIR)) {
  fs.mkdirSync(EXAMS_DIR, { recursive: true });
}

// Pool of Part 5 questions
const part5Pool = [
  { q: "The manager ___ to the office every day.", o: ["go", "goes", "going", "gone"], c: 1, e: "Use 'goes' for third person singular." },
  { q: "Please submit the report ___ Friday.", o: ["in", "on", "by", "at"], c: 2, e: "'by' indicates a deadline." },
  { q: "Our profits have increased significantly ___ the past quarter.", o: ["over", "since", "until", "when"], c: 0, e: "'over' fits the duration of time." },
  { q: "The new software is expected to make our operations much more ___.", o: ["efficiency", "efficiently", "efficient", "efficiencies"], c: 2, e: "Adjective needed after 'more'." },
  { q: "Employees are required to attend the safety training ___ they have been here for years.", o: ["even if", "despite", "because", "due to"], c: 0, e: "'even if' introduces a concession." },
  { q: "___ the bad weather, the outdoor event was postponed.", o: ["Because", "Due to", "Although", "However"], c: 1, e: "'Due to' is followed by a noun phrase." },
  { q: "Ms. Lee was chosen for the promotion because of her ___ leadership skills.", o: ["exceptional", "exception", "exceptionally", "exceptions"], c: 0, e: "Adjective describing 'skills'." },
  { q: "The client ___ that the contract be revised before signing.", o: ["requested", "requesting", "to request", "request"], c: 0, e: "Past tense verb required." },
  { q: "All visitors must sign in at the front desk ___ entering the building.", o: ["after", "before", "while", "during"], c: 1, e: "Logical time sequence requires 'before'." },
  { q: "The company's new policy will be implemented ___ next month.", o: ["starting", "starts", "to start", "started"], c: 0, e: "Present participle as a preposition." }
];

// Pool of Part 6 passages
const part6Pool = [
  {
    p: "Dear Mr. Smith,\n\nWe are pleased to inform you that your application for the position has been ___(1)___. Our team was very impressed with your background. Please let us know ___(2)___ you are available for an interview next week. We look forward to ___(3)___ from you soon. If you have any questions, please feel free to contact us ___(4)___ anytime.\n\nSincerely,\nHR Dept",
    qs: [
      { q: "Blank (1)", o: ["accept", "accepting", "accepted", "acceptable"], c: 2, e: "Passive voice 'has been accepted'." },
      { q: "Blank (2)", o: ["when", "who", "what", "which"], c: 0, e: "'when' refers to time availability." },
      { q: "Blank (3)", o: ["hear", "hearing", "heard", "to hear"], c: 1, e: "'look forward to' + gerund." },
      { q: "Blank (4)", o: ["at", "in", "on", "by"], c: 0, e: "Idiomatic preposition 'at anytime'." }
    ]
  },
  {
    p: "Notice to All Staff:\n\nThe building's elevator will be out of service for maintenance on ___(1)___. This is necessary to ensure the continued safety and ___(2)___ of the equipment. We apologize for any inconvenience this may cause and appreciate your ___(3)___. The stairs located at the end of the hall will be open for use ___(4)___ the day.\n\nManagement",
    qs: [
      { q: "Blank (1)", o: ["Monday", "every day", "recently", "yesterday"], c: 0, e: "Specific future date needed." },
      { q: "Blank (2)", o: ["rely", "reliable", "reliability", "reliably"], c: 2, e: "Noun required after 'and'." },
      { q: "Blank (3)", o: ["patience", "patient", "patiently", "patients"], c: 0, e: "Noun required as object of 'appreciate'." },
      { q: "Blank (4)", o: ["throughout", "between", "among", "inside"], c: 0, e: "'throughout' indicates duration." }
    ]
  }
];

// Pool of Part 7 single passages
const part7SinglePool = [
  {
    p: "To: All Employees\nFrom: IT Support\nSubject: Scheduled Network Outage\n\nPlease be advised that there will be a scheduled network outage this Saturday from 10:00 PM to 2:00 AM on Sunday. During this time, you will not be able to access the company intranet or email servers. This outage is necessary to upgrade our security systems. If you have urgent work that requires network access, please plan accordingly. We apologize for the inconvenience.",
    qs: [
      { q: "What is the purpose of the memo?", o: ["To announce a new security system", "To notify staff of network downtime", "To schedule a maintenance meeting", "To apologize for a recent error"], c: 1, e: "The memo advises of a scheduled network outage." },
      { q: "When will the outage begin?", o: ["10:00 AM Saturday", "2:00 AM Sunday", "10:00 PM Saturday", "10:00 PM Sunday"], c: 2, e: "The memo states Saturday from 10:00 PM." },
      { q: "What will employees be unable to do?", o: ["Enter the building", "Use their phones", "Access company emails", "Contact IT support"], c: 2, e: "They cannot access the intranet or email servers." },
      { q: "Why is the outage happening?", o: ["To install new computers", "To upgrade security systems", "To fix a broken server", "To test the backup power"], c: 1, e: "Necessary to upgrade our security systems." }
    ]
  },
  {
    p: "Grand Opening Special!\n\nCome celebrate the opening of 'Bean & Leaf' café this Friday at 8:00 AM! The first 50 customers will receive a free travel mug and a complimentary pastry with any drink purchase. Enjoy live acoustic music from 6:00 PM to 8:00 PM. We offer a wide selection of organic coffees, artisan teas, and freshly baked goods. Located at 123 Main Street, next to the city library.",
    qs: [
      { q: "What event is being advertised?", o: ["A music concert", "A library opening", "A café grand opening", "A baking class"], c: 2, e: "Celebrate the opening of Bean & Leaf café." },
      { q: "What will the first 50 customers receive?", o: ["Free coffee for a month", "A travel mug and pastry", "A discount on all drinks", "A front-row seat for the music"], c: 1, e: "Receive a free travel mug and a complimentary pastry." },
      { q: "When does the live music start?", o: ["8:00 AM", "6:00 PM", "8:00 PM", "Friday morning"], c: 1, e: "Live acoustic music from 6:00 PM." },
      { q: "Where is the business located?", o: ["Inside the city library", "At 123 Main Street", "Across from the park", "Next to a music store"], c: 1, e: "Located at 123 Main Street." }
    ]
  }
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

for (let i = 1; i <= 5; i++) {
  const testData = {
    id: `test${i}`,
    title: `Official Practice Test ${i}`,
    part5: [],
    part6: [],
    part7: []
  };

  // Generate 30 Part 5 questions
  for (let j = 1; j <= 30; j++) {
    const q = getRandomItem(part5Pool);
    testData.part5.push({
      id: parseInt(`5${i}${j.toString().padStart(2, '0')}`),
      question: q.q,
      options: q.o,
      correctAnswer: q.c,
      explanation: q.e
    });
  }

  // Generate 16 Part 6 questions (4 passages * 4 qs)
  for (let j = 1; j <= 4; j++) {
    const p = getRandomItem(part6Pool);
    testData.part6.push({
      id: parseInt(`6${i}${j}`),
      passage: p.p,
      questions: p.qs.map((q, qIdx) => ({
        id: parseInt(`6${i}${j}${qIdx}`),
        question: q.q,
        options: q.o,
        correctAnswer: q.c,
        explanation: q.e
      }))
    });
  }

  // Generate 54 Part 7 questions (~13 passages * 4 qs + 1 with 2 qs)
  let p7QsCount = 0;
  let p7PassageCount = 1;
  while (p7QsCount < 54) {
    const p = getRandomItem(part7SinglePool);
    const qsNeeded = Math.min(4, 54 - p7QsCount); // Take up to 4, or whatever is left to hit 54
    
    testData.part7.push({
      id: parseInt(`7${i}${p7PassageCount}`),
      passage: p.p,
      questions: p.qs.slice(0, qsNeeded).map((q, qIdx) => ({
        id: parseInt(`7${i}${p7PassageCount}${qIdx}`),
        question: q.q,
        options: q.o,
        correctAnswer: q.c,
        explanation: q.e
      }))
    });
    
    p7QsCount += qsNeeded;
    p7PassageCount++;
  }

  fs.writeFileSync(path.join(EXAMS_DIR, `test${i}.json`), JSON.stringify(testData, null, 2));
  console.log(`Generated test${i}.json with ${testData.part5.length} P5, ${testData.part6.reduce((acc, p) => acc + p.questions.length, 0)} P6, and ${testData.part7.reduce((acc, p) => acc + p.questions.length, 0)} P7 questions.`);
}
