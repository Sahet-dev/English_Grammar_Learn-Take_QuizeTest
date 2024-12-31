<template>
    <div class="home">
        <h1 class="text-3xl font-bold underline">Welcome to the Home Page</h1>
        <router-link to="/test-form" class="text-blue-500 hover:underline">Go to Test Form</router-link>


        <!-- Button to send jsonData to backend -->
        <button
            @click="sendDataToBackend"
            class="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Send Data to Backend
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Sample JSON data
const jsonData = ref([
        {
            "unit":1,
            "details":[
                {
                    "id":1,
                    "title":"I AM DOING",
                    "section":"A",
                    "content":"Aşakdaky mysaly okaň we derňewini öwreniň:\n\nAnna awtoulagda otyr. Ol ishe baryar.",
                    "example":"She is driving to work. - Ol ishe mashynly gidip barýar."
                },
                {
                    "id":2,
                    "title":"Present continuous tense",
                    "section":"B",
                    "content":"Sözlem sözlenip durlan pursatda iş hereketiň dowam edip duranyny şekillendirmek üçin ulanylýar.",
                    "example":"I am doing something = Men bir zatlar edýärin."
                },
                {
                    "id":3,
                    "title":"Present continuous usage examples",
                    "section":" ",
                    "content":"Adatça iş hereket sözleşilýän pursatda bolup geçýär.",
                    "example":"\"Please, don't make so much noise. I am working.\""
                },
                {
                    "id":4,
                    "title":"Not used in certain contexts",
                    "section":" ",
                    "content":"Ýöne iş hereket sözleşilýän wagtda bolup geçmezligi mumkin.",
                    "example":"\"I'm reading an interesting book at the moment. I'll lend it to you when I’ve finished it.\""
                },
                {
                    "id":5,
                    "title":"Present continuous for ongoing actions",
                    "section":"C",
                    "content":"Häzirki wagta ýakyn pursatlar içinde (mys: today, this week, this evening) bolup geçýän iş-hereket we özgerişler hakynda gürrüň edilende ulanylýar.",
                    "example":"\"You're working hard today\" \"Yes, I have a lot to do\""
                },
                {
                    "id":6,
                    "title":"Present continuous examples for changes",
                    "section":" ",
                    "content":"Ýer ilatynyň sany gaty çalt ösýär.",
                    "example":"The population of the world is rising very fast."
                }
            ]
        },
        {
            "unit":2,
            "details":[
                {
                    "id":1,
                    "title":"I DO",
                    "section":"A",
                    "content":"Aşakdaky teksti öwreniň\n\nAleks awtobus sürüji, Ol şuwagt ýerinde ýatyr.",
                    "example":"He is not driving a bus. - Ol awtobus sürenak. (çünki ol uklap ýatyr)"
                },
                {
                    "id":2,
                    "title":"Present simple",
                    "section":"A",
                    "content":"Drive(s)/ work(s)/ do(es) - present simple'-yň ýasalma formasy.",
                    "example":"I/we/you/they drive/work/do and he/she/it drives/works/does"
                },
                {
                    "id":3,
                    "title":"Present Simple Usage",
                    "section":"B",
                    "content":"Present simple iş-herekt barada umumy gürrüň edilende ulanylýar, ondan häzirki pursatda bolup hereket barada nazarda tutmak üçin ulanylmaýar. Onda ýygy-ýygydan gaýtalanyp durýan herekti, hem-de umuman alnanda dogry (hakykata dogry gelýän) hereketi görkezmek üçin ulanylýar.",
                    "example":"The earth goes round the sun. - Ýer Günüň töwereginden aýlanýar."
                },
                {
                    "id":4,
                    "title":"Usage with Third Person",
                    "section":"B",
                    "content":"He/she/it bilen işlik ulanylanda 's'-i unutmaň.",
                    "example":"I work, but He works. / They teach, but My sister teaches."
                },
                {
                    "id":5,
                    "title":"Questions and Negatives",
                    "section":"C",
                    "content":"Sorag we ýokluk sözlemleri ýasamak üçin do/does ulanylýar.",
                    "example":"Do we/you/they work? Does he/she/it come? I/we/you/they don't work. He/she/it doesn't come."
                },
                {
                    "id":6,
                    "title":"Present Simple for Habitual Actions",
                    "section":"D",
                    "content":"Present simple iş-hereketiň hemişe gaýtalanyp durýanyny görkezmek üçin ulanylýar.",
                    "example":"I get up at 8 o'clock every morning. - Men her gün irden sagat 8-de turýaryn."
                },
                {
                    "id":7,
                    "title":"Expressing Habits and Frequency",
                    "section":"D",
                    "content":"How often do you go to the dentist? / Ann doesn't drink tea very often.",
                    "example":"In summer John usually plays tennis once or twice a week. - Tomusda Jon adatça hepdede bir gezek ýa-da iki gezek tennis oýnaýar."
                },
                {
                    "id":8,
                    "title":"Verbs Used in Present Simple",
                    "section":"E",
                    "content":"Apologise, promise, suggest, advise, insist, agree, refuse we şunuň ýaly iş-hereketi bildirmeýän işlikler diňe present simple'da ulanylýar.",
                    "example":"I promise I won't be late. - gijikmezlige wada berýärin."
                }
            ]
        },
        {
            "unit":3,
            "details":[
                {
                    "id":1,
                    "title":"I am doing vs I do",
                    "section":"A",
                    "content":"Mysallary okaň we deňeşdirmeleri öwreniň:",
                    "example":"The water is boiling. Can you turn it off? - Suw gaýnaýar. Ony öçürip bilersiňmi?"
                },
                {
                    "id":2,
                    "title":"Present Continuous (I am doing)",
                    "section":"A",
                    "content":"Present Continuous - I am doing.",
                    "example":"Listen to those people. What language are they speaking? - Hanha ol adamlary diňle. Olar haýsy dilde gürleşýärler?"
                },
                {
                    "id":3,
                    "title":"Present Simple (I do)",
                    "section":"A",
                    "content":"Present Simple - I do.",
                    "example":"Water boils at 100 degrees celsius. - Suw 100 Selsiýa gradusda gaýnaýar."
                },
                {
                    "id":4,
                    "title":"Present Continuous and Present Simple Comparison",
                    "section":"A",
                    "content":"Let's go out. It isn't raining now. - Ýörüň daşark çykalyň. Häzir ýagyş ýagmaýar.",
                    "example":"It doesn't rain very much in summer. - Tomusda gaty köp ýagyş ýagmaýar."
                },
                {
                    "id":5,
                    "title":"Present Continuous (Action happening now)",
                    "section":"A",
                    "content":"Present Continuous is used for actions happening at the moment.",
                    "example":"Don't disturb me. I'm busy: Why? What are you doing? - 'Maňa päsgel bermäň. Men işli.' 'Näm üçin? Name edýärsiňiz?'"
                },
                {
                    "id":6,
                    "title":"Present Simple (Routine or job)",
                    "section":"A",
                    "content":"Present Simple is used for habits or regular actions.",
                    "example":"What do you usually do at weekends? - Sen adatça hepde ahyrky günlerinde näme edýärsiň?"
                },
                {
                    "id":7,
                    "title":"Present Simple (Occupation)",
                    "section":"A",
                    "content":"What do you do? (= What's your job?) - Näme iş edýärsiň? (= Hünäriňiz näme?)",
                    "example":"I always go to bed before midnight. - Men hemişe gijäň ýaryndan öň uka gidýärin."
                },
                {
                    "id":8,
                    "title":"Present Continuous (Temporary situation)",
                    "section":"A",
                    "content":"Present Continuous is used for temporary actions or situations.",
                    "example":"Maria is in Britain at the moment. She's learning English. - Mariya edil şuwagt Britanýada. Ol iňlis dilini öwrenýär."
                },
                {
                    "id":9,
                    "title":"Present Simple for general truths",
                    "section":"A",
                    "content":"Most people learn to swim when they are children. - Köp adamlar ýüzmäni çagalygyndan öwrenýärler.",
                    "example":"My parents live in London. They have lived there all their lives. - Ata-enäm Londanda ýaşaýarlar. Olar ol ýer bütin ömri boýunça ýaşan."
                },
                {
                    "id":10,
                    "title":"Present Continuous vs Present Simple with 'Always'",
                    "section":"A",
                    "content":"'Always' is typically used with Present Simple. But we also use 'I'm always doing something' to express irritation or emphasize repetition.",
                    "example":"I always go to work by car. - Men işe hemişe maşynly gidýärin."
                },
                {
                    "id":11,
                    "title":"Present Continuous for Repeated Actions",
                    "section":"A",
                    "content":"We can use 'I'm always doing' for actions that repeat, often in a way that is annoying.",
                    "example":"I've lost my pen again. I'm always losing things. - Men ýene ruçkamy ýitirdim. Men hemişe zatlarymy ýitirýärin."
                },
                {
                    "id":12,
                    "title":"Present Simple vs Present Continuous with 'Always'",
                    "section":"A",
                    "content":"'You're always ...-ing' suggests that the action is repeated often, possibly to an annoying extent.",
                    "example":"John is never satisfied. He's always complaining. - Jon hiçem göwni ýetmeýär. Ol hemişe nägile."
                },
                {
                    "id":13,
                    "title":"Present Continuous for Actions Now",
                    "section":"A",
                    "content":"'You're always watching television' suggests that the action is done too much and might need to change.",
                    "example":"You're always watching television. You should do something more active. - Sen hemişe telewizor görýärsiň. Sen köpräk herekt etmegiň gerek."
                }
            ]
        },
        {
            "unit":4,
            "details":[
                {
                    "id":1,
                    "title":"Present Continuous Usage",
                    "section":"A",
                    "content":"Prezent Continuous iş-hereketleri we wakalary görkezmek üçin ulanylýar (they are eating/ it is raining we ş.m)",
                    "example":"I’m hungry. I want something to eat. - Men aç. Bir zatlar iýmek isleýän. ('l'm wanting' däl)"
                },
                {
                    "id":2,
                    "title":"Verbs not used in Present Continuous",
                    "section":"A",
                    "content":"Some verbs like 'know', 'like' do not describe actions and cannot be used in Present Continuous. Example: 'I am knowing' is incorrect.",
                    "example":"Do you understand what I mean? – Sen meniň näme diýjek bolýanyma düşünýäňmi?"
                },
                {
                    "id":3,
                    "title":"Verbs that cannot be used in Present Continuous",
                    "section":"A",
                    "content":"Verbs like 'like', 'love', 'hate', 'want', 'need', 'prefer', 'know' etc. are not used in Present Continuous.",
                    "example":"Ann doesn't seem very happy at the moment. - Anna buwagt juda şadyýan görnenak."
                },
                {
                    "id":4,
                    "title":"'Think' in Present Continuous",
                    "section":"A",
                    "content":"'Think' used for 'believe' is not used in Present Continuous. 'What do you think?' is correct, but 'What are you thinking?' is incorrect.",
                    "example":"What do you think (= believe) will happen? - Siziň pikiriňizçe näme bolar?"
                },
                {
                    "id":5,
                    "title":"Thinking in Present Continuous",
                    "section":"A",
                    "content":"'Thinking' used for 'to think, to consider' is used in Present Continuous.",
                    "example":"You look serious. What are you thinking about? - Siz gaharly görünýärsiňiz. Näme hakda pikir edýärsiňiz?"
                },
                {
                    "id":6,
                    "title":"'Have' in Present Continuous",
                    "section":"A",
                    "content":"'Have' used for possession is not used in Present Continuous.",
                    "example":"Do you have something to eat? – Sende iýmäge bir zatlar bamy?"
                },
                {
                    "id":7,
                    "title":"'Having' for activities in Present Continuous",
                    "section":"A",
                    "content":"'Having' used for activities can be used in Present Continuous.",
                    "example":"Where's Ann? 'She's having a bath' - Anna nirede? 'Ol duş kabul edýär'"
                },
                {
                    "id":8,
                    "title":"Verbs like See, Hear, Smell, Taste",
                    "section":"B",
                    "content":"Verbs like 'see', 'hear', 'smell', 'taste' are usually used in Present Simple, not Present Continuous.",
                    "example":"Do you see that man over there? – Sen ol ýerdäki adamy görýäňmi?"
                },
                {
                    "id":9,
                    "title":"'Seeing' in Present Continuous",
                    "section":"B",
                    "content":"'See' used for meeting or encountering can be used in Present Continuous.",
                    "example":"I'm seeing the manager tomorrow morning. – Men ertir menejer bilen görüşýärin."
                },
                {
                    "id":10,
                    "title":"'Be' Verb in Present Continuous",
                    "section":"C",
                    "content":"The verb 'be' in Present Continuous describes someone's state or behavior at the moment. Example: 'I am being selfish' shows a temporary behavior.",
                    "example":"I can't understand why he's being so selfish. - Men onuň şeýle özdiýenli bolşuna düşünip bilemok."
                },
                {
                    "id":11,
                    "title":"Behavior vs General State",
                    "section":"C",
                    "content":"'Being' shows temporary behavior, while 'is' or 'are' is used for general states.",
                    "example":"He is very selfish. - Ol örän özdiýenli."
                },
                {
                    "id":12,
                    "title":"General States vs Present Continuous",
                    "section":"C",
                    "content":"Present Continuous is not used for general states. Example: 'It is hot today' is correct, but 'It is being hot' is not.",
                    "example":"It's hot today. - Bugün yssy."
                },
                {
                    "id":13,
                    "title":"Verbs 'Look' and 'Feel' in Present Simple vs Present Continuous",
                    "section":"D",
                    "content":"Verbs 'look' and 'feel' can be used in both Present Simple and Present Continuous for appearance or state of being.",
                    "example":"You look well today. – Bugün oňat görünýärsiň."
                },
                {
                    "id":14,
                    "title":"Feeling and Appearance",
                    "section":"D",
                    "content":"'How do you feel now?' vs 'How are you feeling now?' Both are used to ask about someone's current state.",
                    "example":"How do you feel now? – Häzir özüňi nähili duýýarsyň?"
                }
            ]
        },
        {
            "unit":5,
            "details":[
                {
                    "id":1,
                    "title":"Past Simple - W.A. Mozart",
                    "section":"A",
                    "content":"Wolfgang Amadeus Mozart was an Austrian musician and composer. He lived from 1756 to 1791. He started composing at the age of five and wrote more than 600 pieces of music. He was only 35 years old when he died.",
                    "example":"Mozart wrote more than 600 pieces of music."
                },
                {
                    "id":2,
                    "title":"Past Simple Form of Verbs",
                    "section":"B",
                    "content":"In Past Simple, verbs usually end in –ed. Examples include 'stopped', 'studied', and 'wrote'. For irregular verbs, such as 'write' (wrote) or 'see' (saw), they change differently.",
                    "example":"Mozart wrote more than 600 pieces of music."
                },
                {
                    "id":3,
                    "title":"Questions and Negations with Past Simple",
                    "section":"C",
                    "content":"For forming questions or negatives, use 'did/didn't' followed by the base form of the verb. Examples: Did you enjoy? / Did they go? / They didn’t invite her to the party.",
                    "example":"Did you enjoy? / Did they go?"
                },
                {
                    "id":4,
                    "title":"'Be' Verb in Past Simple",
                    "section":"D",
                    "content":"In Past Simple, the verb 'be' changes to 'was' or 'were'. 'Was' is used with 'I', 'he', 'she', 'it'. 'Were' is used with 'you', 'we', 'they'.",
                    "example":"I was angry because they were late."
                }
            ]
        },
        {
            "unit":6,
            "details":[
                {
                    "id":1,
                    "title":"Past Continuous - Example",
                    "section":"A",
                    "content":"Yesterday Karen and Jim played tennis. They began at 10 o'clock and finished at 11:30. So, at 10:30 they were playing tennis.",
                    "example":"They were playing tennis."
                },
                {
                    "id":2,
                    "title":"Past Continuous Form",
                    "section":"A",
                    "content":"In Past Continuous, the structure is 'was/were + verb-ing'. Example: 'I was playing', 'They were doing'.",
                    "example":"I was playing."
                },
                {
                    "id":3,
                    "title":"Usage of Past Continuous",
                    "section":"B",
                    "content":"Past Continuous is used to show that an action was in progress at a particular time in the past. The action started and was still ongoing.",
                    "example":"I was doing."
                },
                {
                    "id":4,
                    "title":"Past Continuous for Actions at a Specific Time",
                    "section":"B",
                    "content":"For example, 'This time last year I was living in Brazil.' or 'What were you doing at 10 o'clock last night?'",
                    "example":"I was living in Brazil."
                },
                {
                    "id":5,
                    "title":"Past Continuous vs. Past Simple",
                    "section":"C",
                    "content":"Past Continuous (I was doing) shows an action in progress, while Past Simple (did) shows a completed action. Example: 'Ann was watching television when the phone rang.'",
                    "example":"Ann was watching television."
                },
                {
                    "id":6,
                    "title":"Past Continuous with Past Simple",
                    "section":"D",
                    "content":"Past Continuous is used to show an action in progress, and Past Simple is used to show a completed action. Example: 'Tom burnt his hand when he was cooking dinner.'",
                    "example":"Tom burnt his hand."
                },
                {
                    "id":7,
                    "title":"Past Continuous with Past Simple - Sequence of Events",
                    "section":"D",
                    "content":"When one action happened after another, we use Past Simple for the second action. Example: 'I was walking along the road when I saw Dave.'",
                    "example":"I saw Dave."
                },
                {
                    "id":8,
                    "title":"Examples of Past Continuous and Past Simple",
                    "section":"D",
                    "content":"Example 1: 'When Karen arrived, we were having dinner.' (The action was already in progress before Karen arrived.) Example 2: 'When Karen arrived, we had dinner.' (The action started after Karen arrived.)",
                    "example":"When Karen arrived, we were having dinner."
                },
                {
                    "id":9,
                    "title":"Verbs Not Used in Continuous Tenses",
                    "section":"E",
                    "content":"Some verbs are not used in the continuous form. For example, 'know', 'want', and 'believe'.",
                    "example":"We knew each other well."
                }
            ]
        },
        {
            "unit":7,
            "details":[
                {
                    "id":1,
                    "title":"Present Perfect Example",
                    "section":"A",
                    "content":"Tom is looking for his key. He can't find it. He has lost his key.",
                    "example":"He has lost his key."
                },
                {
                    "id":2,
                    "title":"Present Perfect Form",
                    "section":"A",
                    "content":"In Present Perfect, the structure is 'have/has + past participle'. For example: 'I have lost', 'She has done'.",
                    "example":"I have lost."
                },
                {
                    "id":3,
                    "title":"Present Perfect - Relation to Present",
                    "section":"B",
                    "content":"Present Perfect indicates a connection to the present. It is used to show the result of a past action. Example: 'I have lost it.' means that the key is still lost now.",
                    "example":"I have lost it."
                },
                {
                    "id":4,
                    "title":"Present Perfect for Recent Events",
                    "section":"B",
                    "content":"Present Perfect is used to introduce new information or to talk about a recent event. Example: 'Ow! I've cut my finger.' or 'The road is closed. There's been an accident.'",
                    "example":"I've cut my finger."
                },
                {
                    "id":5,
                    "title":"Present Perfect with Time Expressions",
                    "section":"C",
                    "content":"Present Perfect is often used with 'just', 'already', and 'yet'. These words give additional meaning to the time of the action.",
                    "example":"I've just had lunch."
                },
                {
                    "id":6,
                    "title":"Using 'Just' in Present Perfect",
                    "section":"C",
                    "content":"'Just' is used to describe something that happened very recently. Example: 'I've just had lunch.'",
                    "example":"I've just had lunch."
                },
                {
                    "id":7,
                    "title":"Using 'Already' in Present Perfect",
                    "section":"C",
                    "content":"'Already' is used to indicate that something has happened before the expected time. Example: 'I’ve already posted it.'",
                    "example":"I've already posted it."
                },
                {
                    "id":8,
                    "title":"Using 'Yet' in Present Perfect",
                    "section":"C",
                    "content":"'Yet' is used in negative sentences and questions, and it means 'still'. Example: 'Has it stopped raining yet?' or 'I haven't posted it yet.'",
                    "example":"Has it stopped raining yet?"
                },
                {
                    "id":9,
                    "title":"'Gone to' vs 'Been to'",
                    "section":"D",
                    "content":"'Gone to' is used when someone is still at the destination, while 'been to' indicates a visit that has already been completed. Example: 'Jim has gone to Spain.' vs 'Jane has been to Italy.'",
                    "example":"Jim has gone to Spain."
                },
                {
                    "id":10,
                    "title":"'Been to' vs 'Gone to' - More Examples",
                    "section":"D",
                    "content":"'Gone to' means someone has left for a destination and might still be there. 'Been to' means the visit is complete. Example: 'Jim is on holiday. He has gone to Spain.' vs. 'Jane has been to Italy.'",
                    "example":"Jane has been to Italy."
                }
            ]
        },
        {
            "unit":8,
            "details":[
                {
                    "id":1,
                    "title":"Present Perfect Example",
                    "section":"A",
                    "content":"Dave and Jane are talking about Jane's life experiences up to the present moment.",
                    "example":"Dave: Have you travelled a lot, Jane? / Jane: Yes, I've been to lots of places."
                },
                {
                    "id":2,
                    "title":"Have You Ever / Been to",
                    "section":"A",
                    "content":"The Present Perfect tense is used to talk about experiences up to the present. Examples: 'Have you ever eaten caviar?' or 'I’ve been to China twice.'",
                    "example":"Have you ever eaten caviar?"
                },
                {
                    "id":3,
                    "title":"Examples of Present Perfect",
                    "section":"A",
                    "content":"Examples showing use of Present Perfect for events that occurred in the past but have relevance to the present. 'We’ve never had a car.' or 'She’s seen that film eight times.'",
                    "example":"We've never had a car."
                },
                {
                    "id":4,
                    "title":"Past Experiences Related to Present",
                    "section":"A",
                    "content":"These examples indicate that the speaker is thinking about actions and experiences that occurred in the past but have some connection to the present. Example: 'What a boring film! It's the most boring film I’ve ever seen.'",
                    "example":"It's the most boring film I’ve ever seen."
                },
                {
                    "id":5,
                    "title":"Have You Heard From Someone Recently?",
                    "section":"A",
                    "content":"Present Perfect can also be used to talk about actions or events that have happened recently. Examples: 'Have you heard from George recently?' or 'I’ve met a lot of people in the last few days.'",
                    "example":"I’ve met a lot of people in the last few days."
                },
                {
                    "id":6,
                    "title":"Negative Sentences in Present Perfect",
                    "section":"A",
                    "content":"Present Perfect is used in negative sentences to show that something hasn't happened up to the present time. Example: 'We haven’t had any problems so far.' or 'I haven’t eaten anything since breakfast.'",
                    "example":"We haven’t had any problems so far."
                },
                {
                    "id":7,
                    "title":"Long Time Without Seeing Someone",
                    "section":"A",
                    "content":"Present Perfect can be used to express a long period without seeing someone. Example: 'We haven’t seen each other for a long time.'",
                    "example":"We haven’t seen each other for a long time."
                },
                {
                    "id":8,
                    "title":"Using Present Perfect for Ongoing Events",
                    "section":"B",
                    "content":"Present Perfect is used with time expressions like 'today', 'this morning', and 'this evening' to talk about actions that are still ongoing or unfinished. Example: 'I’ve drunk four cups of coffee today.'",
                    "example":"I’ve drunk four cups of coffee today."
                },
                {
                    "id":9,
                    "title":"Asking About Holidays",
                    "section":"B",
                    "content":"Present Perfect can also be used for asking about past holidays or vacations. Example: 'Have you had a holiday this year?' or 'I haven’t seen Tom this morning. Have you?'",
                    "example":"Have you had a holiday this year?"
                },
                {
                    "id":10,
                    "title":"Working Hours",
                    "section":"B",
                    "content":"Present Perfect can be used to talk about work or activity during a specific period. Example: 'Ron hasn’t worked very hard this term.'",
                    "example":"Ron hasn’t worked very hard this term."
                }
            ]
        },
        {
            "unit":9,
            "details":[
                {
                    "id":1,
                    "title":"Present Perfect Continuous Example",
                    "section":"A",
                    "content":"The Present Perfect Continuous is used to talk about actions that started in the past and are still continuing or have just finished.",
                    "example":"It has been raining."
                },
                {
                    "id":2,
                    "title":"Is it raining? / Have you been running?",
                    "section":"A",
                    "content":"Examples using Present Perfect Continuous to ask about ongoing actions. Examples: 'Is it raining?' and 'Have you been running?'",
                    "example":"Have you been running?"
                },
                {
                    "id":3,
                    "title":"Describing Ongoing Actions",
                    "section":"A",
                    "content":"The Present Perfect Continuous tense is used to describe ongoing actions that started in the past but are still happening or have just been completed. Example: 'Paul is very tired. He's been working very hard.'",
                    "example":"He's been working very hard."
                },
                {
                    "id":4,
                    "title":"Questioning Ongoing Actions",
                    "section":"A",
                    "content":"Present Perfect Continuous is often used to ask about activities that are still continuing. Example: 'Why are your clothes so dirty? What have you been doing?'",
                    "example":"What have you been doing?"
                },
                {
                    "id":5,
                    "title":"Ongoing Actions Over Time",
                    "section":"B",
                    "content":"Present Perfect Continuous can describe actions that started in the past and are continuing. Example: 'It has been raining for two hours.'",
                    "example":"It has been raining for two hours."
                },
                {
                    "id":6,
                    "title":"How Long / For / Since",
                    "section":"B",
                    "content":"Present Perfect Continuous is often used with time expressions like 'How long', 'for', and 'since'. Example: 'How long have you been learning English?'",
                    "example":"How long have you been learning English?"
                },
                {
                    "id":7,
                    "title":"Recent Ongoing Actions",
                    "section":"B",
                    "content":"Present Perfect Continuous is used to describe actions that started recently and continue until now. Example: 'George hasn’t been feeling well recently.'",
                    "example":"George hasn’t been feeling well recently."
                },
                {
                    "id":8,
                    "title":"Actions Continuing All Day",
                    "section":"B",
                    "content":"Present Perfect Continuous can describe activities that continue over a period of time. Example: 'Tim is still watching television. He's been watching television all day.'",
                    "example":"He's been watching television all day."
                },
                {
                    "id":9,
                    "title":"Since and For with Ongoing Actions",
                    "section":"B",
                    "content":"Present Perfect Continuous often goes with 'since' and 'for' to describe the duration of actions. Example: 'She's been playing tennis since she was eight.'",
                    "example":"She's been playing tennis since she was eight."
                },
                {
                    "id":10,
                    "title":"Comparing Present Continuous and Present Perfect Continuous",
                    "section":"B",
                    "content":"The Present Continuous describes actions happening right now, while the Present Perfect Continuous describes actions that started in the past and continue into the present. Example: 'I am working now' vs. 'I’ve been working hard, so I am tired.'",
                    "example":"I’ve been working hard, so I am tired."
                }
            ]
        },
        {
            "unit":10,
            "details":[
                {
                    "id":1,
                    "title":"Present Perfect Continuous vs. Present Perfect",
                    "section":"A",
                    "content":"The difference between 'I have been doing' (Present Perfect Continuous) and 'I have done' (Present Perfect). The Present Perfect Continuous is used for actions that are ongoing or recently completed, while the Present Perfect focuses on the result or completion of an action.",
                    "example":"She has been painting the ceiling."
                },
                {
                    "id":2,
                    "title":"Example: Ongoing vs Completed Actions",
                    "section":"A",
                    "content":"The Present Perfect Continuous is used for actions that are ongoing, while the Present Perfect focuses on the result of an action. Example: 'She has painted the ceiling' (completed action) vs 'She has been painting the ceiling' (ongoing action).",
                    "example":"She has painted the ceiling."
                },
                {
                    "id":3,
                    "title":"Examples with 'Been Doing' and 'Done'",
                    "section":"A",
                    "content":"Examples comparing the two tenses: 'I've been repairing the car' (ongoing action) vs 'I've repaired it' (completed action).",
                    "example":"I've been repairing the car."
                },
                {
                    "id":4,
                    "title":"Recent Actions and Results",
                    "section":"A",
                    "content":"Present Perfect Continuous is used to describe ongoing actions that are happening now or have just finished. The Present Perfect focuses on the completion of the action. Example: 'She's been smoking too much recently.' vs 'Somebody has smoked all my cigarettes.'",
                    "example":"She's been smoking too much recently."
                },
                {
                    "id":5,
                    "title":"Question Forms in Present Perfect Continuous and Present Perfect",
                    "section":"A",
                    "content":"The Present Perfect Continuous can be used for asking about activities that are ongoing. Example: 'What have you been doing since we last met?' vs the Present Perfect asking about completed actions: 'What have you done to it?'",
                    "example":"What have you been doing since we last met?"
                },
                {
                    "id":6,
                    "title":"Using 'How Long' and 'How Many' with Continuous Actions",
                    "section":"B",
                    "content":"The Present Perfect Continuous is used to express actions that have been ongoing for a period of time. Example: 'How long have you been reading that book?' vs 'How many pages have you read?' (completed action).",
                    "example":"How long have you been reading that book?"
                },
                {
                    "id":7,
                    "title":"Actions Continuing All Day vs Completed Actions",
                    "section":"B",
                    "content":"The Present Perfect Continuous describes actions continuing over time, while the Present Perfect focuses on completed actions. Example: 'She's been writing letters all day' vs 'She has written ten letters today.'",
                    "example":"She's been writing letters all day."
                },
                {
                    "id":8,
                    "title":"Comparing Frequency of Actions",
                    "section":"B",
                    "content":"The Present Perfect Continuous describes actions that have been occurring for a period of time, while the Present Perfect describes actions that have happened a certain number of times. Example: 'They've been playing tennis since 2 o'clock' vs 'They’ve played tennis three times this week.'",
                    "example":"They’ve played tennis three times this week."
                },
                {
                    "id":9,
                    "title":"Verbs Not Used in Continuous Tenses",
                    "section":"C",
                    "content":"Certain verbs are not used in continuous tenses. These include verbs like 'know', 'like', and 'believe'. Example: 'I've known about it for a long time' is correct, but 'I’ve been knowing' is incorrect.",
                    "example":"I've known about it for a long time."
                }
            ]
        },
        {
            "unit":11,
            "details":[
                {
                    "id":1,
                    "title":"How long",
                    "section":"A",
                    "content":"He has been married for 20 years. Present perfect is used to show an action that started in the past and continues up to now.",
                    "example":"He has been married for 20 years. – Ol 20 ýyldan bäri öýlenen."
                },
                {
                    "id":2,
                    "title":"Present Perfect",
                    "section":"A",
                    "content":"Present perfect is used to show actions that started in the past and are still continuing or have recently finished.",
                    "example":"How long has he been married? / Ol haçandan bäri öýlenen?"
                },
                {
                    "id":3,
                    "title":"I have been doing",
                    "section":"B",
                    "content":"Present perfect continuous is used for actions that started in the past and are still continuing.",
                    "example":"I’ve been learning English for a long time. / Men iňlis dilini köpden bäri öwrenýärin."
                },
                {
                    "id":4,
                    "title":"Time duration",
                    "section":"B",
                    "content":"Present perfect continuous can also show repeated actions or events. It's often used with 'for' and 'since'.",
                    "example":"Sorry I'm late. Have you been waiting long? / Bagyşlaň men gijikdim. Köpden bäri garaşýarmyň?"
                },
                {
                    "id":5,
                    "title":"I have done (simple) vs. I have been doing (continuous)",
                    "section":"C",
                    "content":"Present perfect simple or continuous can be used for actions that have happened over a long period or repeatedly.",
                    "example":"I've been learning English for a long time. / Men iňlis dilini köp wagtdan bäri öwrenýärin."
                },
                {
                    "id":6,
                    "title":"Live and Work",
                    "section":"C",
                    "content":"We use present perfect simple and continuous with 'live' and 'work' for actions that started in the past and continue.",
                    "example":"John has been living / has lived in London for a long time. - Jon Londonda köp wagt ýaşaýar."
                },
                {
                    "id":7,
                    "title":"Use of Always",
                    "section":"C",
                    "content":"We use present perfect simple with 'always', but not present perfect continuous.",
                    "example":"John has always lived in London. - Jon hemişe Londonda ýaşan."
                },
                {
                    "id":8,
                    "title":"Action Repeated Over Time",
                    "section":"C",
                    "content":"Continuous or simple can show actions that have repeated over time.",
                    "example":"I've been collecting/ I’ve collected stamps since I was a child. / Çagalygymdan bäri markalary ýygnap gelýärin."
                },
                {
                    "id":9,
                    "title":"Non-continuous Verbs",
                    "section":"C",
                    "content":"Some verbs like 'know', 'like', and 'believe' are not used in continuous tenses.",
                    "example":"How long have you known Jane? / Jeýni haçandan bäri bilýärsiň?"
                },
                {
                    "id":10,
                    "title":"Present Perfect Negative",
                    "section":"D",
                    "content":"Present perfect simple is used in negative sentences to show that an action has not happened for a specific period.",
                    "example":"I haven't seen Tom since Monday. / Duşanbeden bäri Tomy görmedim."
                },
                {
                    "id":11,
                    "title":"Negative Actions Over Time",
                    "section":"D",
                    "content":"Present perfect is used to indicate that something hasn't happened for a period.",
                    "example":"Jane hasn't phoned me for two weeks. / Jeýn maňa menga iki hepdeden bäri jaň etmedi."
                }
            ]
        },
        {
            "unit":12,
            "details":[
                {
                    "id":1,
                    "title":"When vs How long",
                    "section":"A",
                    "content":"When is used with the past simple tense to ask about a specific point in time, while How long is used with the present perfect tense to ask about the duration of an action.",
                    "example":"A: When did it start raining? – Ýagyş haçan başlady?\nB: It started raining an hour ago / at 1 o'clock. – Ýagyş bir sagat ozal başlady/ sagat 1de başlady."
                },
                {
                    "id":2,
                    "title":"How long (present perfect)",
                    "section":"A",
                    "content":"How long asks about the duration of an action that started in the past and continues up to the present.",
                    "example":"A: How long has it been raining? – Ýagyş haçandan bäri ýagyp dur?\nB: It's been raining for an hour / since 1 o'clock. Ýagyş bir sagat bäri ýagyp dur / sagat 1den bäri ýagyp dur."
                },
                {
                    "id":3,
                    "title":"Duration (for, since)",
                    "section":"B",
                    "content":"For and since are used to express the duration of an action. 'For' indicates a period of time, while 'since' refers to a specific starting point.",
                    "example":"I've been waiting for 2 hours. – Men iki sagat bäri garaşýaryn.\nI've been waiting since 8 o'clock. – Men sagat 8-den bäri garaşýaryn."
                },
                {
                    "id":4,
                    "title":"For and Since (continued)",
                    "section":"B",
                    "content":"For is used to indicate the duration of an action, and since is used to refer to the starting point of an action.",
                    "example":"Sally's been working here for six months. – Salli bu ýerde alty açdan bäri işleýär.\nI haven’t seen Tom for three days. Tomy üç günden bäri görmedim."
                },
                {
                    "id":5,
                    "title":"Using Since with Specific Time Points",
                    "section":"B",
                    "content":"Since is used with specific points in time (e.g., a clock time, a date, or an event).",
                    "example":"Sally's been working here since April. – Salli bu ýerde Aprel aýyndan bäri işleýär.\nI haven’t seen Tom since Monday. Men Tomy duşanbeden bäri görmedim."
                },
                {
                    "id":6,
                    "title":"For in Negative Sentences",
                    "section":"B",
                    "content":"In negative sentences, for is required to indicate a period of time.",
                    "example":"They haven’t had a holiday for ten years. – Olar on ýyldan bäri dynç alyşa çykmandyrlar."
                },
                {
                    "id":7,
                    "title":"Using For with All Day/My Life",
                    "section":"B",
                    "content":"For is not used in phrases like 'all day' or 'all my life'.",
                    "example":"I've lived here all my life. – Men bu ýerde bütin ömrüm boýy ýaşaýaryn."
                },
                {
                    "id":8,
                    "title":"It's been since",
                    "section":"C",
                    "content":"To indicate the amount of time that has passed since a specific event, we use the structure 'It's (a long time/two years) since something happened'.",
                    "example":"It's two years since I last saw Joe. – Jony soňky gezek görenime iki ýyl boldy.\nIt's ages since we went to the cinema. Kino soňky gezek baranymyz bäri asyrlar geçdi."
                },
                {
                    "id":9,
                    "title":"How long is it since?",
                    "section":"C",
                    "content":"The question 'How long is it since...' asks how much time has passed since a specific event occurred.",
                    "example":"How long is it since you last saw Joe? Jony soňky gezek göreniňe näçe wagt boldy?\nHow long is it since Mrs Hill died? Missis Hiliň ölenine näçe wagt boldy?"
                }
            ]
        },
        {
            "unit":13,
            "details":[
                {
                    "id":1,
                    "title":"I have done vs I did",
                    "section":"A",
                    "content":"Present perfect is used to describe actions that have an effect on the present moment. Past simple is used to describe actions that happened in the past, without regard to the present.",
                    "example":"Tom has lost his key. – Ol açary ýitiren. (This means he doesn’t have the key right now.)\nNow Tom has found his key. – Tom açary tapdy. (This means he has the key now.)"
                },
                {
                    "id":2,
                    "title":"Difference between Present Perfect and Past Simple",
                    "section":"A",
                    "content":"Present perfect provides information about the present situation, while past simple gives information about a completed action in the past without any reference to the present.",
                    "example":"Did he lose his key? – Ol açary ýitirdimi?\nYes, he did. – Howwa.\nHe lost his key, but now he has found it. – Ol açary ýitiripdi, ýöne häzir ol ony tapdy."
                },
                {
                    "id":3,
                    "title":"Present Perfect and Past Simple Contexts",
                    "section":"B",
                    "content":"Present perfect is not used to talk about events that happened a long time ago unless they are relevant to the present. Past simple is used to describe historical facts or actions that occurred in the past.",
                    "example":"The Chinese invented printing. – Hytaýalylar basyşy oýlap tapypdyrlar. ('have invented' is incorrect here.)\nHow many plays did Shakespeare write? – Şekspir näçe sany pise aýazypdyr? ('has he written' is incorrect here.)"
                },
                {
                    "id":4,
                    "title":"Present Perfect for New Information",
                    "section":"C",
                    "content":"Present perfect is used to provide new information, but when discussing the new information further, past simple is used.",
                    "example":"A: Ow! I've burnt my hand. – Wah, elimi ýakdym.\nB: How did you do that? – Nädip boldy?\nA: I picked up a hot dish. – Gyzgyn gazany tutdumy."
                },
                {
                    "id":5,
                    "title":"Further Information after New Information",
                    "section":"C",
                    "content":"After giving new information with present perfect, past simple is often used for further explanation.",
                    "example":"A: Look! Somebody has spilt milk on the carpet. – Seret! Kimdir biri hala süýt döküpdir.\nB: Well, it wasn't me. I didn't do it. – Bu men däl. Ony men edemak."
                }
            ]
        },
        {
            "unit":14,
            "details":[
                {
                    "id":1,
                    "title":"Present perfect (I have done) vs I did",
                    "section":"A",
                    "content":"Present perfect (I have done) tamamlanan döwür barada (mes: yesterday / 10 minutes ago in 1985/when I was a child we ş.m) gürrüň edilende ulanylmaýar simple past -y ulanyň.",
                    "example":"The weather was nice yesterday. – Düýn howa gowydy. ('has been nice' däl)\nThey arrived ten minutes ago. - Olar on minut mundan öň geldiler. ('have arrived' bolmaýar)\nI ate a lot of sweets when I was a child. Men çagalygymda köp süýji iýipdim. ('have eaten' däl)\nDid you see the news on television last night?- Sen düýn telewizorda täzelikleri gördüňmi?"
                },
                {
                    "id":2,
                    "title":"When...? or What time...? questions with past simple",
                    "section":"A",
                    "content":"When...? ýa-da What time...? soraglary bilen past simple-yň ulanylyşy:",
                    "example":"When did they arrive? – Olar haçan geldiler? ('have they arrived' däl)\nWhat time did you finish work? – Sen işiňi näwagt tamamladyň?"
                },
                {
                    "id":3,
                    "title":"Deňeşdiriň:",
                    "section":"B",
                    "content":"Present perfect:\nTom has lost his key. He can't get into the house. Tom açaryny ýitiren. Ol öýe girip bilenak. Munda ýerine ýetirlen iş-herekt barada dälde, eýsem iş-herektiň häzirki netijesi barada beýan edilýär: Tomda häzir açar ýok.\nPast simple:\nTom lost his key yesterday. He couldn't get into the house. Tom düýn açaryny ýitirdi. Ol öýe girip bilmedi.\nMunda gürrüň geçmişde bolan iş-hereket barada beýan edilýär. Bu sözlemde Tomda häzir açarynyň barlygy ýa-da ýoklugy beýan edilenak.",
                    "example":"Tom has lost his key. He can't get into the house.\nTom lost his key yesterday. He couldn't get into the house."
                },
                {
                    "id":4,
                    "title":"Present perfect and past simple comparison",
                    "section":"B",
                    "content":"Present perfect (I have done) we past simple –i (I did) deňeşdiriň:\nI've done a lot of work today. –Men bugün köp iş etdim. I did a lot of work yesterday. – Düýn men köp iş etdim.\nPresent perfect geçmişden häzire çenli dowam eden pursady görkezmek üçin ulanylýar. Mysall üçin today, this week, since 1985.\nPast simple geçmişde tamamlanan pusady görkezmek üçin ulanylýar. Mysal üçin yesterday, last week, from 1985 to 1991",
                    "example":"It hasn't rained this week. - Bu hepde ýagyş ýagmady. It didn’t rain last week. – Geçen hepde ýagyş ýagmady.\nHave you seen Ann this morning? Sen Eni bugün irden gördüňmi? (henizem ir säher)\nDid you see Ann this morning? - Sen Eni bugün irden gördüňmi? (häzir günortasy ýa-da agşam)\nHave you seen Ann recently?- Sen bu ýakynda Eni gördüňmi? Did you see Ann on Sunday?- Sen ýekşenbe güni Eni gördüňmi?"
                },
                {
                    "id":5,
                    "title":"Present perfect for actions lasting until now",
                    "section":"C",
                    "content":"I don't know where Ann is. I haven't seen her.- Eniň nirdedigini bilemak. Men ony görmedim. (bu ýakynda görmedim)\nA: Was Anna at the party yesterday? En düýn şagalaňda boldumy?\nB: I didn't see her. - Men ony görmedim.",
                    "example":"I don't know where Ann is. I haven't seen her.\nA: Was Anna at the party yesterday? B: I didn't see her."
                },
                {
                    "id":6,
                    "title":"Present perfect continuous vs past simple",
                    "section":"C",
                    "content":"We've been waiting for an hour. Biz bir sagatdan bäri garaşýarys. (häzir garaşýarys) We waited (ýa-da were waiting) for an hour. Biz bir sagat garaşdyk . (indi bolsa garaşamaýarys)",
                    "example":"We've been waiting for an hour.\nWe waited for an hour."
                },
                {
                    "id":7,
                    "title":"Usage of present perfect for ongoing situations",
                    "section":"D",
                    "content":"lan lives in London. He has lived there for 7 years. Aýen Londonda ýaşaýar. Ol ýerde 7 ýyldan bäri ýaşaýar. lan lived in Scotland for 10 years. Now he lives in London. Aýen 10 ýyl Şotlandiýada ýaşapdy. Häzir ol Londonda ýaşaýar.",
                    "example":"lan has lived in London for 7 years.\nlan lived in Scotland for 10 years."
                },
                {
                    "id":8,
                    "title":"Present perfect for experience",
                    "section":"D",
                    "content":"I have never played golf. - Men hiçem golf oýnamandym. (ömrümde) I didn’t play golf last summer. – Men geçen tomus golf oýnamadym.",
                    "example":"I have never played golf.\nI didn’t play golf last summer."
                },
                {
                    "id":9,
                    "title":"Present perfect related to the present time",
                    "section":"D",
                    "content":"Present perfect-iň hemişe häzirki zaman bilen bagly bolýar. (şeýlede unit 7-12-lerde berlen)\nPast simple diňe geçen zaman bilen bagly maglumat berýär. (Unit 5-6)",
                    "example":"Present perfect is related to the present time.\nPast simple is related to the past time."
                }
            ]
        },
        {
            "unit":15,
            "details":[
                {
                    "id":1,
                    "title":"Past perfect (I had done)",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\nSara geçen hepde bir şagalaňa bardy. Pol hem şol şagalaňa bardy, ýöne olar biri-birini görmediler. Pol öýüne sagat 10.30- da gitdi, Sara bolsa şagalaňa sagat 11-de geldi.\nDiýmek:\nWhen Sarah arrived at the party, Paul wasn't there. Sara şagalaňa gelende Pol ol ýerde ýokdy.\nHe had gone home. – Ol öýüne gidendi.",
                    "example":"When Sarah arrived at the party, Paul wasn't there. – Sara şagalaňa gelende Pol ol ýerde ýokdy.\nHe had gone home. – Ol öýüne gidendi."
                },
                {
                    "id":2,
                    "title":"Past perfect structure (had + past participle)",
                    "section":"A",
                    "content":"Had gone - past perfect-iň ýasalyş formasy:\nI he she it had gone / seen /finished we ş.m\nWe you they had gone / seen /finished we ş.m\nPast perfect simple yň gurluş formasy had +past participleb\nNädogry işlikleriň sanawyny gözden gecirin.",
                    "example":"I had gone / seen /finished\nWe had gone / seen /finished"
                },
                {
                    "id":3,
                    "title":"Past perfect for past actions",
                    "section":"A",
                    "content":"Käwagt gürrüň geçmişde bolan zatlar barada bolýar:\nSarah arrived at the party. - Sara şagalaňa geldi.\nBu ýerde wakany başlanýan nokady. Onda, bu wagtdan ozal abşalanan waka gürrüň edliende past perfect (had ..) ulanylýar:\nWhen Sarah arrived at the party, Paul had already gone home. – Haçanda Sara şagalaňa gelende Pol eýýam öýüne gidendi.",
                    "example":"When Sarah arrived at the party, Paul had already gone home. – Haçanda Sara şagalaňa gelende Pol eýýam öýüne gidendi."
                },
                {
                    "id":4,
                    "title":"More examples with past perfect",
                    "section":"A",
                    "content":"Ýene birnäçe mysallar:\nWhen we got home last night, we found that we had left the lights on. – Düýn agşam öýe gelenimizde biz çyalary ýakylgy galdyrandygymyzy gördük.\nKaren didn't want to come to the cinema with us because she had already seen the film. Karen biz bilen kino gelmegi islemedi, sebäbi ol filmi eýýäm gören eken.\nThe man sitting next to me on the plane was very nervous. He hadn't flown before /He had never flown before. Samolyotda gapdalymda oturan adma gaty biynjalyklydy. Ol munda ozal samolyotda uçmandyr.",
                    "example":"When we got home last night, we found that we had left the lights on.\nKaren didn't want to come to the cinema with us because she had already seen the film.\nHe hadn't flown before."
                },
                {
                    "id":5,
                    "title":"Have done vs had done comparison",
                    "section":"B",
                    "content":"Have done (present perfect) had done (past perfect)-da getirlen deňeşdirmeli mysallary okaň:\npresent perfect\nWho is that woman? I've never seen her before. - Ol ayal kim? Ony öň hiç görmändim.\nI didn't know who she was. I'd never seen her before. Onuň kimdigini bilmeýärdim. Ony ozal hiç görmändim. (şol wagtdan ozal)",
                    "example":"I've never seen her before.\nI'd never seen her before."
                },
                {
                    "id":6,
                    "title":"More examples with present perfect and past perfect",
                    "section":"B",
                    "content":"We aren't hungry. We've just had lunch. – Biz ajygamyzak. Biz ýaňyja abetlandyk.\nWe weren't hungry. We'd just had lunch. – Biz aç däldik. Biz abet edinipdik.\nThe house is dirty. You haven't cleaned it. Öý hapa. Ony arassalanmasyň.\nThe house was dirty. You hadn’t cleaned it. Öý hapady. Ony arassaçylyk etmändiň.",
                    "example":"We aren't hungry. We've just had lunch.\nWe weren't hungry. We'd just had lunch."
                },
                {
                    "id":7,
                    "title":"Past perfect and past simple comparison",
                    "section":"C",
                    "content":"Past perfect (I had done) we past simple (I did)-lary deňeşdiriň:\n\"Was Tom at the party when you arrived?\" \"Sen şagalaňa baraňda Tom şol ýerdemidi?\"\n\"No, he had already gone home.\" \"Ýok , ol eýýäm öýüne dolanan eken:\"\nÝöne :\n\"Was Tom there when you arrived?\" \"Sen ýetip geleniňde Tom şol ýerdemidi?\"\n\"Yes, but he went home soon afterwards\"\n\"Hawa, ýöne az salym soňra ol öýüne gitdi\"",
                    "example":"\"Was Tom at the party when you arrived?\" \"No, he had already gone home.\"\n\"Was Tom there when you arrived?\" \"Yes, but he went home soon afterwards.\"\n"
                }
            ]
        },
        {
            "unit":16,
            "details":[
                {
                    "id":1,
                    "title":"Past perfect continuous (I had been doing)",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\ndüýn men ukydan turdym we äpişgeden daşary seretdim. Gün nur saçyp durdy. Ýöne ýerler ö-öldi.\nIt had been raining. – Ýagyş ýagandy.\nMen äpişgeden daşary seredenimde ýagyş ýagmaýardy. Gün nur saçyp durdy. Ýöne ondan ozalrak ýagyş ýagan eken. Şonuň üçin yerler ööldi.",
                    "example":"It had been raining. – Ýagyş ýagandy."
                },
                {
                    "id":2,
                    "title":"Had been doing (past perfect continuous) structure",
                    "section":"A",
                    "content":"Had been-ing -past perfect-yň ýasalyş formasy.\nI/ he/ she it/ we/ you/ they had) been doing/ working we ş.m.",
                    "example":"I had been doing / working"
                },
                {
                    "id":3,
                    "title":"More examples with past perfect continuous",
                    "section":"A",
                    "content":"Ýene birnäçe mysallar:\nWhen the boys came into the house, their clothes were dirty, their hair was untidy and one of them had a black eye. They'd been fighting. - Oglanjyklar öýe gelende onların eşikleri kirdi biriniň hem bolsa gözi gögerendi. Olar uruşypdylar.\nI was very tired when I arrived home. I'd been working hard all day. Öýe gelenimde ýadowdym. Men gün uzyn köp işläpdim.",
                    "example":"When the boys came into the house, their clothes were dirty, their hair was untidy and one of them had a black eye. They'd been fighting."
                },
                {
                    "id":4,
                    "title":"Past perfect continuous for actions before another",
                    "section":"B",
                    "content":"Past perfect continuous nähilidir bir iş-hereket başlanýança nähilidir bir başga iş-herekt bolýandygyny ýa-da bolup geçendigini görkezmek üçin ulanylýar:\nWe'd been playing tennis for about half an hour when it started to rain heavily. – Haçanda güýçli ýagyş ýagyp başlanda biz ýarym sagat töweregi tenis oýnaýardyk.\nKen gave up smoking two years ago. He'd been smoking for 30 years. Ken iki ýyl ozal çilimi goýdy. Ol 30 ýyllap çilims çekendi.",
                    "example":"We'd been playing tennis for about half an hour when it started to rain heavily."
                },
                {
                    "id":5,
                    "title":"Have been doing vs Had been doing",
                    "section":"C",
                    "content":"Have been doing (present perfect continuous)-yň geçen zaman şekli had been doing (past perfect continuous). Deňeşdiriň:\nI hope the bus comes soon. I've been waiting for 20 minutes. - Awtobusning tizara geler diýip umyt edýän. Men 20 minutlap garaşyp durun.\nAt last the bus came. I'd been waiting for 20 minutes. Ahyry awtobus geldi. Men 20 minutlap garaşypdym. (awtobusning gelýänçä)\nHe's out of breath. He has been running. Ol haslap dur. Ol ygap ýör.\nHe was out of breath. He had been running. Ol haslap dem alýardy. Ol ylagpdy.",
                    "example":"I hope the bus comes soon. I've been waiting for 20 minutes.\nAt last the bus came. I'd been waiting for 20 minutes."
                },
                {
                    "id":6,
                    "title":"Had been doing vs was doing (past continuous)",
                    "section":"D",
                    "content":"Had been doing we was doing (past continuous) –lary deňeşdiriň:\nAnn was sitting in an armchair watching television. She was tired because she'd been working very hard. - En kresloda oturyp telewizor tomoşa edýärdi. Ol ýadandy, çünki ol köp işläpdi.",
                    "example":"Ann was sitting in an armchair watching television. She was tired because she'd been working very hard."
                },
                {
                    "id":7,
                    "title":"Continuous verbs exceptions",
                    "section":"E",
                    "content":"Käbir işlikler continuous-da adatça ulanylmaýar. Mysal üçin: know/want/believe:\nI've known about it for a long time. - Men bu hakda köpdan bäri bilýärin. (I’ve been knowing\" bolmaýar)",
                    "example":"I've known about it for a long time."
                }
            ]
        },
        {
            "unit":17,
            "details":[
                {
                    "id":1,
                    "title":"Have vs Have got (eýe bolmak, eýelik etmek)",
                    "section":"A",
                    "content":"Köp ýagdaýlarda have-iň ýerine have got ulanylýar:\nWe've got a new car. ýa-da We have a car. - Biziň maşynyz bar.\nAnn has got two sisters. Ýa-da Ann has two sisters. Eniň iki dogany bar.\nHave got ýa-da have nähilidir kesel, agyry we suňa meňzeşler üçin hem ulanylýar.\nI've got a headache. Ýa-da I have a headache. -Kellam agyrýar.",
                    "example":"We've got a new car. – Biziň maşynyz bar."
                },
                {
                    "id":2,
                    "title":"Sorag we ýokluk sözlemleri (3 görnüş)",
                    "section":"A",
                    "content":"Sorag ýa-da ýokluk gürrüňleriň ýasalyşy 3 hili bolup bilýär:\nHave you got any money?\nDo you have any money?\nHave you any money? (az ulanylýar) - - Pulyň barmy?\nI haven't got any money.\ndon't have any money.\nI haven't any money. - (az ulanylýar) - Pulum yok.\nHas she got a car?\nDoes she have a car?\nHas she a car? - (az ulanylýar) Onuň maşyny barmy?\nShe hasn't got a car.\nShe doesn't have a car.\nShe hasn't a car. - (az ulanylýan) - Onuň maşyny ýok.",
                    "example":"Have you got any money? - Pulyň barmy?"
                },
                {
                    "id":3,
                    "title":"Geçen zaman formasy (had)",
                    "section":"A",
                    "content":"Geçen zaman formasy üçin had ulanylýar (adatça got-syz):\nAnn had long hair 2 years ago. Eniň iki ýyl ozal uzyn saçy bardy. ('had got' däl)\nGeçen zamanyň ýoklygy edip did didn't –dan peýdalanylýar:\nDid they have a car when they were living in London? -Londonda ýaşanlarynda olaryň maşyy barmydy?\nI didn't have a watch, so I didn't know the time. Mende sagat ýokdy we şeýdip wagty bilmeýärdim.\nAnn had long hair, didn't she? – Eniň uzyn saçy bardy, şeýlemi?",
                    "example":"Did they have a car when they were living in London? - Londonda ýaşanlarynda olaryň maşyny barmydy?"
                },
                {
                    "id":4,
                    "title":"Have breakfast / have a bath / have a good time we ş.m",
                    "section":"B",
                    "content":"Have (have got däl) iş-herekt we tejribeleri beýan edýän söz birikmelerinde köp duş gelýär. Mysal üçin:\nhave breakfast/ dinner/a cup of coffee/a cigarette we ş.m\nhave a bath /a shower / a swim / a rest/ a party/ a holiday/ a nice time we ş.m\nhave an accident/an experience/a dream we ş.m\nhave a look (at something) / a chat (with somebody)\n(= çaga dogurmak)\nhave difficulty/ trouble / fun\nMary had a baby recently. - Meri ýakynda çaga dogdy.\nHave a look at that building! How beautiful! Hana ol bina seret nähili owadan.!",
                    "example":"Mary had a baby recently. – Meri ýakynda çaga dogdy."
                },
                {
                    "id":5,
                    "title":"Have got-ulanylmaly däl",
                    "section":"B",
                    "content":"Aşakdaky mysallarda have got –y ulanmak dogry däl. Deňeşdiriň:\nI usually have a sandwich for my lunch. Adatça abeda men sendwiş iýýän. (have = iýmek, have got = iýmek däl)\nemma l've got some sandwiches. Would you like one?- Mende birnäçe sendwiş bar. Birini bereýenmi?",
                    "example":"I usually have a sandwich for my lunch. – Adatça abeda men sendwiş iýýän."
                },
                {
                    "id":6,
                    "title":"Continuous form and exceptions",
                    "section":"B",
                    "content":"Bu mysallarda have başga işlikler ýaly hyzmat edýär. Şonuň uçin gerekli bolan ýerleri üçin continuous formada (is having / are having we ş.m) ulanmak mümkin:\nThe phone rang when we were having dinner. - Biz nahar iýip otyrkak telefon jyňyrdapdy.\nSorag we ýokluk sözlemler adatça do/ does/ did -lar ulanylýar.\nI don't usually have a big breakfast. – Adatça men ertirlik nahara köp zat iýmeýärin. (\"I usually haven't\" däl)\nWhat time does Ann have lunch? – En haçan günortanlyk nahar edinýär? (\"has Ann lunch bolmaýar)\nDid you have any difficulty finding somewhere to live?- Ýaşamaga bir ýerler tapmakda kynçylyklara duş geldiňmi?",
                    "example":"I don't usually have a big breakfast. – Adatça men ertirlik nahara köp zat iýmeýärin."
                }
            ]
        },
        {
            "unit":18,
            "details":[
                {
                    "id":1,
                    "title":"Used to ( geçmişdäki adaty gaýtalanyp duran iş-hereketi beýan etmek)",
                    "section":"A",
                    "content":"Denis çekmegi iki ýyl öň taşlady. Ol indi çekmeýär. But he used to smoke. – Ýöne ol çekýärdi.\nHe used to smoke 40 cigarettes a day. - Ol gününe 40 sany çilim çekýärdi.\n\"Used to\" geçmişdäki adaty gaýtalanyp duran iş-hereketi beýan edýär.\n\"He used to smoke\"- \"Ol geçmişde yzygiderli çilim çekýärdi, häzir bolsa çekmeýär. Ol keşendedi, Ol häzir beýlekdir. he used to smoke, he doesn't smoke",
                    "example":"He used to smoke 40 cigarettes a day. - Ol gününe 40 sany çilim çekýärdi."
                },
                {
                    "id":2,
                    "title":"\"Something used to happen\" (birzatlar öň yzygiderli gaýtalanyp durýardy)",
                    "section":"B",
                    "content":"\"Something used to happen\"- \"birzatlar öň yzygiderli gaýtalanyp durýardy.(häzir bolsa däl)\nI used to play tennis a lot but I don't play very often now. - Men köp tenis oýnaýardym, emma häzir o diýen köp oýnamak.\n\"Do you go to the cinema very often?\" \"Not now, but I used to\" - \"Kino ýygy-ýygydan gidýärsiňmi. Häzir ýok, ýöne öňler gidýärdim.\nŞeýelede used to bir zat geçmişde dogry bolup, häzir ýaly däldigini görkezmek üçin ulanylýar.\nThis building is now a furniture shop. It used to be a cinema. - Bu bina häzir mebeller dükany. Bu (ozal) kinoteatr bolupdy.\nI’ve started drinking coffee recently. I never used to like it before. -Kofe içmägi ýakynda başladym. Men ozal hiçem içmeýärdim.\nJanet used to have long hair when she was a child. - çagalygynda Janetiň uzyn saçy bardy.",
                    "example":"I used to play tennis a lot but I don't play very often now. - Men köp tenis oýnaýardym, emma häzir o deň-köp oýnamak."
                },
                {
                    "id":3,
                    "title":"\"I used to do\" - geçen zaman",
                    "section":"C",
                    "content":"\"I used to do\" - bu geçen zaman. Onuň häzirki zamany görnüşi ýagny \"I use to do\" diýilmeýär. Häzirki zaman barada gürleninende present simple (I do) ulanylýar.\nDeňeşdiriň:\npast : he used to smoke – Ol çekýärdi.\nPresent: he smokes – ol çekýär.\npast we used to live - biz ýaşaýardyk.\nPresent: we live- biz ýaşaýarys.\nPast:\nthere used to be - bolýardy.\npresent there is - bar\nWe used to live in a small village but now we live in London. - Biz kiçi obada ýaşaýardyk. Emma häzir biz Londonda ýaşaýarys.\nThere used to be four cinemas in the town. Now there is only one. Ozal şäherde dört sany kinoteatr bardy. Häzir bolsa diňe biri bar.",
                    "example":"We used to live in a small village but now we live in London. - Biz kiçi obada ýaşaýardyk. Emma häzir biz Londonda ýaşaýarys."
                },
                {
                    "id":4,
                    "title":"Sorag we ýokluk görnüşi",
                    "section":"D",
                    "content":"Sorag görnüşi \"did (you) use to...?\" bolýar.\nDid you use to eat a lot of sweets when you were a child? Çagalygyşda sen köp süýji iýýärdiňmi?\nÝokluk görnüşi \"didn't use to...\" bolýar. (ýa-da \"used not to...\" ulanylýar):\nI didn't use to like her. (ýa-da I used not to like her) - Ony halamaýardym.",
                    "example":"Did you use to eat a lot of sweets when you were a child? - Çagalygyşda sen köp süýji iýýärdiňmi?"
                },
                {
                    "id":5,
                    "title":"I used to do we I was doing – deňeşdiriň",
                    "section":"E",
                    "content":"I used to watch TV a lot. - Men köp telewizor tomaşa edýärdim (ozal yzygiderli tomaşa edýärdim emma häzir tomaşa etmeýärin)\nI was watching TV when the phone rang. Telefon jyňyrdanda men telewizor tomaşa edýärdim. (tomaşa etmek prosesindedim)\n\"I used to do\" we \"l am used to doing\" –lary çalyşmaň, olaryň gurluşy hem-de manysy tapawutlydyr.\nI used to live alone. - Men ýalňyz ýaşaýardym.\nI am used to living alone. – Men ýalňyz ýaşamana öwrenip galan.",
                    "example":"I used to live alone. - Men ýalňyz ýaşaýardym."
                }
            ]
        },
        {
            "unit":19,
            "details":[
                {
                    "id":1,
                    "title":"Geljek zamany beýan edýän present continuous (I am doing)",
                    "section":"A",
                    "content":"Tennis 2pm\nDentist 10.10\nDinner with Kate 8pm\nTomuň geljek hepde üçin planlaşdyran işleri:\nHe is playing tennis on Monday afternoon. - Ol Duşanbe güni abetda tenis oýnaýar.\nHe is going to the dentist on Tuesday morning. Ol sişenbe güni irden diş lukmanyna barýar.\nHe is having dinner with Kate on Friday. Anna güni agşam ol Keýt bilen bile gaşamlayk nahar iýýär.\nAşakakdaky mysallaryň hemmesinde Tom bu işler etmegi karar edip, meýilleşdirip goýan.\nPresent continuous (I am doing) edilmesi meýilleşdirilen iş-hereketi görkezmek üçin ulanylýar.\n\nPresent simple (I do) ulanylmaýar.\nA: What are you doing on Saturday evening?- Şenbe güni agşam näme edýärsiň? (\"what do you do bolmaýar)\nB: I'm going to the theatre. – Men teatra giderin . (I go däl)\nA: What time is Cathy arriving tomorrow? Keýt ertir nä wagt ýetip geler?\nB: At 10.30. I'm meeting her at the station. -Sagat 10:30da men ony wokzalda garşy alarýaryn.\nIan isn't playing foothall on Saturday. He's hurt his leg. – Aýen şenbe güni agşam futbol oýnamaýar. Ol aýagyny agyrdypdy.\nI'm not working tomorrow, so we can go somewhere. – Men ertar işlemeýärin, şonuň üçin biz bir ýerlere gidip bileris.\nŞeýlede bu gürrüňlerde \"(I'm) going to (do)\"-ny hem ulanyp bilýäris:\nWhat are you going to do on Saturday evening? – Şenbe güni agşam näme edýärsiň?\nEmma meýilleşdirlen iş-hereketler üçin present continuous-y ulanmak maksada laýyk. Şeýlede Unit 20 B-e serediň. Will meýilleşdirlen işler üçin ulanylmaýar:\nWhat are you doing this evening?- Bugün agşam näme edýärsiň? (\"what will you do\" däl)\nAlex is getting married next month. – Aleks indiki aý öýlenýär. (\"I’ll get\" emas)",
                    "example":"He is playing tennis on Monday afternoon. - Ol Duşanbe güni abetda tenis oýnaýar."
                },
                {
                    "id":2,
                    "title":"Geljek zamany beýan edýän present simple (I do)",
                    "section":"B",
                    "content":"Present simple jedweller, programmalar (mysal üçin: Jemagat transporty, kino we ş.m-lar üçin) we şular ýaly zatlar barada gürrüň edilende ulanylýar:\nThe train leaves Gubadag at 11.30 and arrives in Daşoguz at 14.45. Otly Gubadagdan sagat 11:30-da ugraýar, Daşoguza 14:45-da ýetip gelýär.\nWhat time does the film begin? - Film haçan başlanýar?\nIt's Wednesday tomorrow. Ertri çarşenbe.\nPresent simple -y edilmeli işler jedwele meňzedip meýilleşdirlen adamlaryň iş-herektini görkezmek üçin ulanylýar:\nI start my new job on Monday. – Men täze işime duşanbe güni başlaýaryn.\nWhat time do you finish work tomorrow? Sen ertir işiňi näçede tamamlaýarsyň?\nEmma şahsy meýilleri görkezmek üçin present continuous has köp ulanylýar:\nWhat time are you meeting Ann tomorrow? - Sen ertir En bilen näwagt duşuşýarsyň?\nDeňeşdiriň:\nWhat time are you leaving tomorrow? Sen ertir näwagtda ugraýrsyň?\nýöne: What time does the train leave tomorrow?- Ertir otly näwagtda ugraýar?\nI am going to the cinema this evening. Bugün agşam kino bararyn.\nýöne The film starts at 8.15 (this evening). - Film 8:15-de başlanýar.",
                    "example":"The train leaves Gubadag at 11.30 and arrives in Daşoguz at 14.45. - Otly Gubadagdan sagat 11:30-da ugraýar, Daşoguza 14:45-da ýetip gelýär."
                }
            ]
        },
        {
            "unit":20,
            "details":[
                {
                    "id":1,
                    "title":"I am going to do something",
                    "section":"A",
                    "content":"I am going to do something\" - \"men bir zady etmegi karar etdim, ony ýerine ýetirmekçi\":\nA: There's a film on television tonight. Are you going to watch it? - Bugun agşam telewizordan kino bar. Sen ony gormekçimiň?\nB: No, I'm tired. I'm going to have an early night. Yok, men ýadow. Men irräk uklamakçy.\nA: Have you made the coffee yet? – Heniz kofe taýarladyňmy? l'm just going to make it. – Men ony şuagtjyk taýarlajak bolýan.",
                    "example":"A: There's a film on television tonight. Are you going to watch it? - Bugun agşam telewizordan kino bar. Sen ony gormekçimiň?"
                },
                {
                    "id":2,
                    "title":"I am doing we I am going to do",
                    "section":"B",
                    "content":"I am doing (present continuous) bir iş-herekti ýerine ýetirmek (mysal üçin: biri bilen görüşmek, bir ýere barmak, bir ýere gitmegi) meýilleşdirlende ulanylýar. (şeýlede Unit 19-a serediň)\nWhat time are you meeting Ann this evening? – Bugün agşam En bilen näwagt duşuşýarsyň?\nI'm leaving tomorrow. I’ve got my plane ticket. Men ertir ugraýaryn. Meniň samolýoda biledim bar (uçara petegim bar).\nI am going to do something\" - \"men bir iş-hereketi etmegi karar edip goýdum (emma ony etmegi belki meýilleşdirmedim).\n\"The windows are dirty. \"Yes, I know. I'm going to clean them later\"- \" Aýnalar hapa . Howwa bilýän. Men olary soňrak arassalamakçy”. .\" (arassalamaga karar etdim emma meýilini etmedim)\nI've decided not to stay here any longer. Tomorrow I'm going to look for somewhere else to stay. – Men bu ýerde mundab beýläk galmazlyga karar etdim. Men ertir bolmak üçin başga ýer gözlemekçi.\nKöplenç tapawut gaty kiçi bolýar we formalaryň ikisini hem ulanmak mümkin.",
                    "example":"I'm leaving tomorrow. I’ve got my plane ticket. Men ertir ugraýaryn. Meniň samolýoda biledim bar (uçara petegim bar)."
                },
                {
                    "id":3,
                    "title":"Geljekde bir iş-hereketiň boljakdygyny beýan etmek",
                    "section":"C",
                    "content":"Şeýlede, geljekde bir iş-herektiň boljakdygyny beýan etmek üçin \"something is going to happen\" ulanylýar. Mysal üçin:\nGuty göterip gelýän adam ýoluny görip bilmeýär. Onuň ýolunda çukurjyk bar\nHe is going to fall into the hole. – Ol çukuryň üçine ýykylar.\n\"Something is going to happen\" ulanylanda häzirki pursatda nähilidir sebäp bilen bize geljekde bir wakanyň bolup geçmegi barada pikir döremegine sebäp bolýar.\nMysal ol adam häzir çukur tarapa barýar. Diýmek, munuň netijesinde ol çukura ýykylar.\nLook at those black clouds! It's gaing to rain. Hanha ol bulutlara seret! Ýagyş ýagmakçy. (beýle pikir bizde asmandaky gara bulutlaryň köpelmegi sebäpli döredi)\nI feel terrible. I think I'm going to be sick. Men özümi erbet duýýaryn. Pirimiçe men kesellejek bolýan. (bu pikiri men özými ýaman duýýanym getirdi)",
                    "example":"He is going to fall into the hole. – Ol çukuryň üçine ýykylar."
                },
                {
                    "id":4,
                    "title":"I was going to (do something)",
                    "section":"D",
                    "content":"I was going to (do something)\" men bir zatlar etmekçidim (emm etmedim)\nWe were going to travel by train but then we decided to go by car instead. - Biz otlyda barmakçydyk, ýöne onuň ýerine biz maşynly barmaga karar etdik.\nI was just going to cross the road when somebody shouted “Stop”- Men indi yoldan geçeýin diýip durkam kimdir “Dur” diýip seslendi.\n\"Something was going to happen\" - \" Bir waka bolup geçmekçidi \" (emma bolmady):\nI thought it was going to rain but then the sun came out. Men ýagyş ýagar diýip oýlapdym , ýöne soňra gün çykdy.",
                    "example":"We were going to travel by train but then we decided to go by car instead. - Biz otlyda barmakçydyk, ýöne onuň ýerine biz maşynly barmaga karar etdik."
                }
            ]
        },
        {
            "unit":21,
            "details":[
                {
                    "id":1,
                    "title":"I'll (I will)",
                    "section":"A",
                    "content":"I'll (I will) nähildir bir iş hereketi etmek üçin şol pursatda karar edilende ulanylýar:\nOh, I've left the door open. I'll go and shut it. - Gapyny açyk galdyrypdyryn. Gidip ony ýapjak.\n\"What would you like to drink?\" \"I’l have tea, please\" \"Näme içmek islärdiňiz?\" \"Men çaý içjek.\"\n\"Did you phone Ruth?\" \"Oh no, I forgot. 'l phone her now - \"Ruta jaň etdiňmi? Ýok, unudypdyryn. Men oňa häzir jaň etjek.\"\nBu sözlemlerde present simple (I do /I go)-y ulanyp bolmaýar:\nOh, I’ve left the door open. I'll go and shut it. (I go and shut it\" bolmaýar!)\n\"I think I'l...\" we \"I don't think I'll..\" ýaly gurluşlarlar Hem köp ulanylýar:\nI feel a bit hungry. I think I’ll have something to eat. Men biraz ajykýan ýaly. Pikirimçe birzatlar iýerin.\nI don't think I’ll go out tonight. I'm too tired. Meniň pikirimçe men bu agşam daşaryk gitmerin. Men juda ýadow.\nIňlisçe sözleninede will-iň ýokluk formasy won’t(will not) aýdylýar:\nI won't be late. Men gijikmerin.",
                    "example":"Oh, I've left the door open. I'll go and shut it. - Gapyny açyk galdyrypdyryn. Gidip ony ýapjak."
                },
                {
                    "id":2,
                    "title":"Will ulanylmaýar, eger iş-hereket öňünden karar edilse",
                    "section":"B",
                    "content":"Will birnäçe wagt ozal etmegä karar edilen iş-hereketi beýan etmek üçin ulanylmaýar.\nI'm going on holiday next Saturday. – Geljek şenbe güni dynç alyşa çykýaryn. . (\"I'll go\" diýilmez)",
                    "example":"I'm going on holiday next Saturday. – Geljek şenbe güni dynç alyşa çykýaryn."
                },
                {
                    "id":3,
                    "title":"Will köplenç ulanylýar",
                    "section":"C",
                    "content":"Will köplenç aşakdaky mysallarda görkezilen pursatlarda ulanylýar.\nThat bag looks heavy. I'll help you with it. Sumka agyr görünýär. Men size kömek etjek.\nBir iş-hereketi etmäge razy bolnanda ulanylýar:\nA: You know that book I lent you. Can I have it back if you've finished with it? – Saňa beren kitabymy bilýämiň. Eger ony tamamlan bolsaň ony gaýadyp alsam bolýarmy?\nB:Of course. I’ll give it to you this afternoon. Elbetde. Men ony saňa günortan gaýdyp bererin.\nBir iş-hereket etmegi wada berlende:\nThanks for lending me the money. I'll pay you back on Friday. – Maňa karzyna pul bereniň üçin sagbol. Men ony saňa anna güni gaýtararyn. ('I pay' däl)\nI won't tell anyone what happened. I promise. Näme bolanymy hiç kime aýtmaryn. Söz berýärin.\nKimdir birinden bir etmegi haýyş edilende:\nWill you shut the door, please? – Gapyny ýaparsyňyz, haýyş?\nWon't kimdir biri nähilidir bir iş-herekti etmegi ret edende:\nI’ve tried to advise her but she won't listen. Oňa maslahat bermäge hereket etdim, ýöne ol gulak asmak islemedi. (diňlemegi ret etdi)\nThe car won't start. I wonder what's wrong with it. – Maşin işlemedi. Men haýran oňa näme boldy. . (Maşin işlemegi \"ret etdi\")",
                    "example":"Thanks for lending me the money. I'll pay you back on Friday. – Maňa karzyna pul bereniň üçin sagbol. Men ony saňa anna güni gaýtararyn."
                },
                {
                    "id":4,
                    "title":"Shall ...? Shall we ...?",
                    "section":"D",
                    "content":"Shall esasan \"Shall l/we...?\" sorag sözlemlerde ulanylýar. Bu soraglar biriniň pikirini bilmek üçin, ýada köplenç tekliplerde ulanylýar:\nShall I open the window? - Aýnany açaýynmy?\nI’ve got no money. What shall I do? - Pulum yok. Näme edýin?\nShall ...? we will you will? - y deňeşdiriň:\nShall I shut the door? - Gapyny ýapaýynmy?\nWill you shut the door? - Gapyny ýapyrsyňyzmy?",
                    "example":"Shall I open the window? - Aýnany açaýynmy?"
                }
            ]
        },
        {
            "unit":22,
            "details":[
                {
                    "id":1,
                    "title":"Will / Shall (2)",
                    "section":"A",
                    "content":"Will kimdir biri geljekde etjegini eýýam meýil eden ýa-da karar eden iş-hereketi üçin ulanylmaýar:",
                    "example":"Ann is working next week. En geljek hepde işlemeýär. (\"Ann will work\" däl)\n\nAre you going to watch television this evening? -Bugün agşam telewizor tomaşa edersiňmi? (\"will you watch\" däl)\n\nýöne köplenç geljek hakynda gürrüň edilende gürrüň meýil edilen iş-hereket barada barmaýar.\n\nMysal üçin:\nDo you think Kate will pass the exam?\nYes, she'll pass easily.\n\nChris: Do you think Ann will pass the exam - Seniň pikiriňçe En ekzaminda geçermi?\nJoe: Yes, she’ll pass easily. - Hawa, aňsatlyk bilen geçer.\n\n\"She'll pass\" - \"Ol ekzaminden geçjegine karar etdi diýmegi aňladýar. Joe näme boljagy barada pikir bildirýär. Ol takmyn edýär.\n\nGeljekdäki waka ýa-da pursat takmyn edilende will/won't ulanylýar.\n\nWhere will you be this time next year?\" \"I’ll be in Japan\" - \" Geljek ýyl şu wagt nirde bolarsyň? Men Ýaponýada bolaryn.\n\nThat plate is very hot. If you touch it, you'l burn yourself. – Ol jam gaty gyzgyn, ony elleseň eliňi ýakarsyň.\n\nTom won't pass the examination. He hasn't worked hard enough for it. - Tom ekzaminda geçmez. Ol onuň üçin köp taýarlanmady."
                },
                {
                    "id":2,
                    "title":"",
                    "section":"B",
                    "content":"Adatça will aşakdakylar bilen hem ulanylýar.",
                    "example":"I'll probably be home late today. – Bugün öýe giç gelmegim mümkin.\n\nI haven't seen Carol today. I expect she'll phone me. – Men bugün Keroly görmedim. Onu maňa jaň ederine garaşýaryn.\n\nI'm sure you'll pass the exam. – Men ynanýan, sen ekzaminden geçersiň\n\nDo you think Sarah will like the present? - Seniň pikiriňçe Sara bu sowagady halarmy?\n\nI don't think the exam will be difficult. Meniň pikirimçe ekzamin kyn bolmaz.\n\nI wonder what will happen. Men haýran, näme bolarka."
                },
                {
                    "id":3,
                    "title":"",
                    "section":"C",
                    "content":"Adatça will geljek barada gürrüň edilende ulanylýar. Ýöne käwagt häzirki wagt barada gürrüň edilende hem ulanylýar:",
                    "example":"Dont’t phone Ann now. I know she’ll busy. En-e buwagt jaň etme. Bilýän ol işli."
                },
                {
                    "id":4,
                    "title":"",
                    "section":"D",
                    "content":"I shall.. / we shall..\n\nAdatça shall diňe I/we bilen ulanylýar.\n\nDeň I shall... ýa-da I will.., we shall... ýa-da we will... diýmek mümkin:\n\nI shall/will be tired this evening. – Bugün agşam ýadow bolaryn.\n\nWe shall/ will probably go to Scotland or our holiday. - Biz dynç alyşa Şotlandiya barmagymyz mümkin.\n\nDilden aýdylanda I'll we we'll gysga formalary ulanylýar:\n\nWe'll probably go to Scotland. - Biz dynç alyşa Şotlandiya barmagymyz mümkin.\n\nShall-yň ýoklyk formasy shall not ýa-da shan't:\n\nI shan't be here tomorrow. (ýa-da \"I won't be..)- Ertir men bu ýerde bolmaryn.\n\nHe/she/it bilen shall ulanylmaýar:\n\nShe will be very glad. – Ol gaty begener. (\"she shall be\" bolmaz)"
                }
            ]
        },
        {
            "unit":23,
            "details":[
                {
                    "id":1,
                    "title":"i will\nvs\ni am going to do",
                    "section":"A",
                    "content":"Geljekdäki iş hereket üçin will we going to -nyň tapawudyny öwreniň",
                    "example":"Syu bilen Helen gürleşip durlar.\nSue: Let's have a party. - Gel, otuluşyk guralyň.\nHelen: That's a great idea. We'll invite lots of people. – Gowy pikir. Biz köp adamlar teklip ederis.\n\nwill (w‘ll): Will bir iş-hereketi etmek barada karary gürriň edilýän wagty kabul dilende ulanylýar. Sözleýji ozal karar edilenak. Oturlyşyk barada pikir täzedir.\n\nBiraz wagt geçenden soňra Helen Deýwe duşdy.\nHelen: Sue and I have decided to have a party. We're going to invite lots of people. Sýu we Men oturlyşyk gurnamaga karar etdik. Biz köp adamalary çagyrmakçy bolýarys.\n\ngoing to: (be) going to bir iş-hereketi etmek barada eýýam äht edilen ýagdaýda ulanylýar. Helen, Deyw bilen duşuşmazdan ozal köp adamlary çagyrmagy äht edipdiler"
                },
                {
                    "id":2,
                    "title":"",
                    "section":"A",
                    "content":"Deňeşdiriň:",
                    "example":"\"George phoned while you were out.\" \"OK.\n\"I'll phone him back.\" - \"Sen daşarda wagtyň Jorj jaň edipdi \" \"Bolýa. Oňa yzyna jaň ederin.\"\n\nEmma \"George phoned while you were out\" \"Yes, I know. l'm going to phone him back. -\"Sen daşarda wagtyň Jorj jaň edipdi\" \"Howwa, bilýän. Oňa soňrak yzyna jaň ederin.\"\n\n\"Ann is in hospital\" \"Oh really? I didn't know. I'll go and visit her\" - \"En hassahanada\" \"Şeýlemi? Bilmeýärdim. Ony baryp görerin.\n\nÝöne \"Ann is in hospital\" \"Yes, I know. I'm going to visit her tomorrow\" - \"En hassahanada \" \"Hawa, bilýärin, men ony ertir gidip görmekçi\""
                },
                {
                    "id":3,
                    "title":"",
                    "section":"B",
                    "content":"Geljekdäki hadysalar we pursatlar (takmyn edilme)\n\nKäwagt will we going to arasynda tapawut gaty uly bolmaýar.",
                    "example":"Mysal üçin:\nI think the weather will be nice later. Meniň pikirimçe ertir howa gowy bolar.\n\nÝa-da I think the weather is going to be nice later. diýip bolýar.\n\n\"Something is going to happen\" (\"bir zat bolmakçy \") diýenimizde, biz häzirki pursatdan gelip çykjagyny bilýäris:\n\nLook at those black clouds! It's going to rain. Hana ol gara bulutlara seret! Ýagyş ýagar. (beýle pikir bize biz häzir görüp duran gara bulutlar sebäpli döredi.)\n\nI feel terrible. I think I'm going to be sick. - Men özümi erbet duýýaryn. Meniň pikirimçe men kesellärin. (keselbolmagymy häzir özimi erbet duýýanymdan bilýärin)"
                },
                {
                    "id":4,
                    "title":"",
                    "section":"B",
                    "content":"Şuňa meňzeş pursatlarda will ulanylýar.",
                    "example":"Başga pursatlarda will-i ulanmak maksada laýyk:\nTom will probably arrive at about 8 o’clock Tom sagat 8-de ýetip gelmegi mümkin.\n\nI think Ann will like the present we bought for her. Meniň pikirimçe, En üçin satyn alan sowgadymyzy ol halar."
                }
            ]
        },
        {
            "unit":24,
            "details":[
                {
                    "id":1,
                    "title":"Will be doing\nvs\nwill have done",
                    "section":"A",
                    "content":"Aşakdaky mysallary okaň:",
                    "example":"Kevin loves football and this evening there is a big football match on television. The match begins at 7.30 and ends at 9.15. Paul wants to see Kevin the same evening and wants to know what time to come to his house.\nKewin futboly gaty gowy görýär we bugün agşam telewizorda möhim futbol oýny bolýar. Oýun sagat 7.30-da başlap, 9.15-da gutarýar. Pol Kewini şol agşam görmekçi bolýär we onuň öýe haçan gelýänini bilmekçi.\n\nPaul: Is it all right if I come at about 8.30? Sagat 8.30-da barsam bolarmy?\nKevin: No, I'l be watching the football then. - Yok, men ol wagt futbol görüp oturan bolaryn.\nPaul: Well, what about 9.30? -Onda, sagat 9.30-da näme?\nKevin: Fine. The match will have finished by then. Gayt gowy. Oýun oňa çenli tamamlanan bolar."
                },
                {
                    "id":2,
                    "title":"",
                    "section":"B",
                    "content":"I will be doing something\" (future continuous) - \"Men bir iş edip ýören bolaryn.",
                    "example":"Futbol oýuny 7.30-dabaşlanyp, 9.15-da gutarýar. Diýmek, şol wagtyň dowamynda, mysal üçin 8.00-da Kewin oýun görüp oturan bolar - He will be watching the match.\n\nBaşga mysal:\nI'm going on holiday on Saturday. This time next week I'll be lying on a beach or swimming in the sea. – Şenbe güni dynç alyşa çykýaryn. Geljek hepde şu wagt men plýajda ýatan ýa-da deňizde ýüzp ýören bolaryn.\n\nWill be (do) + ing we will (do)-lary dňeşdiriň:\nDon't phone me between 7 and 8. We'll be having dinner then. Sagat 7 bilen 8 aralygynda maňa jaň etme. Biz şol wagt agşamlyk nahar iýip oturan bolarys.\nLet's wait for Mary to arrive and then we'll have dinner. Meriniň gelmegine garaşalyň, soňra biz agşamlyk nahar iýeris.\n\nwill be +ing -ini başga continuous formalar bilen deňeşdiriň:\nAt 10 d'clock yesterday, Sally was working. (past)-Düýn sagat 10-da Salli işlap ýördi.\nIt's 10 o'clock now. She is working. (present) - Häzir sagat 10. Ol işläp ýör.\nAt 10 o'clock tomorrow she will be working. (future)- Ertir sagat 10-da ol işläp ýören bolar."
                },
                {
                    "id":3,
                    "title":"",
                    "section":"C",
                    "content":"Will be doing şeýlede geljekdäki tamamlanan iş-hereketi görkezmek üçin ulanykýar:",
                    "example":"What time will your friends be arriving tomorrow? – Seniň doslaryň ertir nä wagtda ýetip gelen bolarlar?\n\nBeýle mysallarda will be doing geljegi beýan edýän present continuous-a meňzeýär.\n\nWill be doing -i biriniň etmekçi bolýan meýilleri barada soramak üçin ulanyp bolar, esasan bir zat islänimizde ýa-da kimdir biriniň bi iş etmegini isleseňiz. Mysal üçin:\nA: Will you be using your bike this evening? Bugün agşam welosipediňi ulanarsyňmy?\nB: No. Do you want to borrow it? - Yok. Ony ulanmaga almakçy bolrýarsyňmy?"
                },
                {
                    "id":4,
                    "title":"",
                    "section":"D",
                    "content":"Will have (done) (future perfect) bir iş-hereketiň mälim wagta çenli tamamlanjakdygy görkezmek üçin ulanylýar",
                    "example":"Kewiniň görýän futbol oýuny 9.15-da tamamlanýar, diýmek şol wagtdan soň mysal üçin 9.30-da oýun gutaran bolar. The match will have finished.\n\nBaşga mysal: We're late. The film will already have started by the time we get to the cinema. - Biz gijikýäris. Kinoteatra barýançak yetib kino eýýam başlanan bolar.\n\nWill have done-y başka perfect formalar bilen deňeşdiriň:\nTed and Amy have been married for 24 years. (present perfect) - Ted we Emi 24 ýyldan bäri är-aýal.\nNext year they will have been married for 25 years. (future perfect) – Geljek ýyl olaryň är-aýal bolanyna 25 ýyl bolar.\nWhen their first child was born, they had been married for three years. (past perfect) Olaryň birinji bäbegi doglanda olar üç ýyldan bäri är-aýal bolandylar."
                }
            ]
        },
        {
            "unit":25,
            "details":[
                {
                    "id":1,
                    "title":"when I do vs when I have done",
                    "section":"A",
                    "content":"I’ll phone you when I get home from work. 'I’ll phone you' is the main part of the sentence, and 'when I get home from work' is the when-clause. The verb in the main clause is in the future tense (I’ll phone), but the verb in the when-clause uses the present simple tense (get). The verb 'will' is not used in the when-clause.",
                    "example":"Will you phone me tomorrow? - Ertir maňa jaň edersiňmi? B: Yes, I'll phone you when I get home from work. Hawa, men saňa işden öýe gelenimde jaň ederin."
                },
                {
                    "id":2,
                    "title":"when I do vs when I have done",
                    "section":"A",
                    "content":"In the when-clause, the present simple is used, not 'will'. Also, when using conjunctions like while, before, after, as soon as, and until/till, present simple is used, not future tense.",
                    "example":"We'll go out when it stops raining. Köçä haçanda ýagyş dynanda çykarys. ('when it will stop' is not correct)."
                },
                {
                    "id":3,
                    "title":"when/after/until/as soon as - Present perfect",
                    "section":"B",
                    "content":"Present perfect can be used after when, after, until, and as soon as. For example, 'Can I borrow that book when you’ve finished it?' or 'Wait until he has gone.' These are examples where present perfect is used for actions completed before the main event.",
                    "example":"Can I borrow that book when you've finished it?- Sen kitaby okap gutaranda soňra ony okamaga alsam bolarmy?"
                },
                {
                    "id":4,
                    "title":"Present simple to express future events",
                    "section":"C",
                    "content":"To talk about future events, we typically use the present simple in clauses introduced by 'when', 'if', etc., when the event is definite. For example, 'When I go shopping, I'll buy some food.' However, when talking about possible future events, 'if' is used instead of 'when'.",
                    "example":"I might go shopping this afternoon. If I go shopping, I'll buy some food. Men günortan söwda etmäge gitmagim ahmal. (belki...) Eger söwda etmäge gitsem iýmit hem alaryn."
                }
            ]
        },
        {
            "unit":26,
            "details":[
                {
                    "id":1,
                    "title":"Can, could, (be) able to do",
                    "section":"A",
                    "content":"Can bir zat mümkin bolanda ýa-da kimdir biriniň bir herekti etmäne ukyplydygyny beýan etmek üçin ulanylýar. Can-den işligiň infinitiw formasy gelýär. (can do / can see we ş.m):",
                    "example":"We can see the lake from our bedroom window.- Biz ýatylýan otaygyň aýnasynda köli görip bilýäris."
                },
                {
                    "id":2,
                    "title":"Can, could, (be) able to do",
                    "section":"A",
                    "content":"Can-iň ýokluk formasy can't (= cannot) bolýar:",
                    "example":"I can't come to the party on Friday. - Men anna gün agşam oturluşyga gelip bilmeýärin."
                },
                {
                    "id":3,
                    "title":"(be) able to",
                    "section":"B",
                    "content":"(be) able to-ny canniň ýerine ulanyp bolýar, ýöne köplenç can-iň özi ulanylýar. Emma can-iň diňe iki formasy bar - can (present) we could (past). Şonuň üçin käwagt (be) able to-ny ulanmak dogry bolýar.",
                    "example":"Are you able to speak any foreign language? – Sen haýsydyr bir daşary ýurt dilinde gürleşip bilýärsiňmi?"
                },
                {
                    "id":4,
                    "title":"Could, was able to",
                    "section":"C",
                    "content":"Could can –iň geçen zaman görnüşi. Could Esasan aşakdaky işlikler bilen bile ulanylýar: see, hear, smell, taste, feel, remember, understand. Could umuman ukyby görkezmek üçin ulanlýar. Emma mälim bir pursatda bolup geçen wakany beýan etmek üçin was/were able to ýa-da managed to ulanylýar.(could däl).",
                    "example":"My grandfather could speak five languages. Meniň atam bäş dilde gürläp bilipdir."
                }
            ]
        },
        {
            "unit":27,
            "details":[
                {
                    "id":1,
                    "title":"Could (do) / could have (done)",
                    "section":"A",
                    "content":"Could –y her türlü edip ulanyp bolýar. Adatça could Can-iň geçen zaman hökmünde bolýar:",
                    "example":"I can swim. - Men suwda ýüzüp bilýärin. (häzir)\nI could swim when I was a child. Haçanda men ýaş wagtym suwda ýüzüp bilýärdim"
                },
                {
                    "id":2,
                    "title":"Could for possibility",
                    "section":"A",
                    "content":"Emma could diňe bir şu düşünjäni aňlatmak üçin ulanylmaýar. Could häzir ýa-da geljekde bolup geçjemegi mümki bolan hadysalar hakynda gürrüň edilende hem ulanylyp bilner. (esasan teklip edilende)",
                    "example":"What shall we do this evening?\nWe could go to the cinema\nA: What shall we do this evening? Agşam näme ederis?\nB: We could go to the cinema. Biz kino gidip bileris."
                },
                {
                    "id":3,
                    "title":"Could for possibility in the present or future",
                    "section":"B",
                    "content":"Şeýlede could bir wakanyň häzir ýa-da geljekde bolmagy mümkindigini görkezmek üçin ulanylýar. Iň gowy mysallar could bilen possibilities beýan edilende ulanylýar.",
                    "example":"The phone is ringing. It could be Tim. - Telefon jyňyrdaýar. Bu Tim bolmagy mümkin."
                },
                {
                    "id":4,
                    "title":"Could have (done) for past possibility",
                    "section":"C",
                    "content":"Could have (done)-ny deňeşdiriň: Köplenç could have (done) bolmagy ähtimal bolan, ýöne bolmadyk wakalary görkezmek üçin ulanylýar.",
                    "example":"Why did you stay at a hotel when you went to New York? You could have stayed with Barbara. Sen näme üçin Nýu Ýorkda bolanyňda myhmanhanada ýaşadyň. Sen Barbaranyň öýünde galyp bilerdiňä. (sende şeýle mümkinçilik bardy, ýöne sen ettmediň)"
                },
                {
                    "id":5,
                    "title":"Could and would be able to",
                    "section":"D",
                    "content":"Could käwagt 'would be able to' (edip bilerdi) diýen manyny bildirýär. Could have (done)-' 'would have been able to do' (edip başaran bolardy).",
                    "example":"We could go away if we had enough money. Biziň pulumyz ýeterlik bolanda biz gidip bilerdik."
                }
            ]
        },
        {
            "unit":28,
            "details":[
                {
                    "id":1,
                    "title":"Must vs Can't",
                    "section":"A",
                    "content":"Must bir zadyň dogrylygyna ynamly bolanda ulanylýar ulanylýar:",
                    "example":"You've been travelling all day. You must be tired.- Siz bütin gün gezelenç edýärsiňiz. Siz çyndanam ýadow bolmaly.\nJim is a hard worker. Jim? A hard worker? You must be joking. He's very lazy - Jim gaty zähmetkeş. Jim? Zähmetkeş? Oýun edýänsiň. Ol juda ýalta."
                },
                {
                    "id":2,
                    "title":"Must for certainty",
                    "section":"A",
                    "content":"Must bir zadyň dogrylygyna ynamly bolanda ulanylýar:",
                    "example":"Carol must get very bored in her job. She does the same thing every day. - Keral işinde gaty içi gysýandyr. Ol her güni şol bir işi edýär."
                },
                {
                    "id":3,
                    "title":"Can't for impossibility",
                    "section":"B",
                    "content":"Can't bir zadyň mümkin bolmazlygyna ynamly bolanda ulanylýar:",
                    "example":"You've just had lunch. You can't be hungry already. Sen hazirjek nahar iýdiň. Sen derrew ajygan bolmagyň mümkin däl.\nThey haven’t lived here for very long. They can't know many people. - Olar bu ýerde ýaşamandylar. Olaryň köp adamlary bilmekleri mümkin däl."
                },
                {
                    "id":4,
                    "title":"Must have (done) / Can't have (done)",
                    "section":"B",
                    "content":"Gecen zaman ücin must have (done) we can't have (done) formalary ulanylýar.",
                    "example":"There's nobody at home. They must have gone out. - Hiç kim öýde ýok. Olar daşary çykyp giden bolmaklary ahmal.\nThe phone rang but I didn't hear it. I must have been asleep. - Telefon jyňyrdapdyr emma men ony eşitmedim. Men şonda uklap ýatan bolsam gerek."
                },
                {
                    "id":5,
                    "title":"Couldn't have (done) instead of can't have (done)",
                    "section":"B",
                    "content":"Couldn't have (done)-y can't have (done) -yň ýerine ulanmak mümkin:",
                    "example":"She couldn't have seen me. – Ol meni gören bolmagy mümkin däl.\nTom couldn't have been looking where he was going. Tom nirä barýanyny seredip barýan bolmagy mümkin däl."
                }
            ]
        },
        {
            "unit":29,
            "details":[
                {
                    "id":1,
                    "title":"May vs Might",
                    "section":"A",
                    "content":"May we might bir zadyň ähtimallygyny görkezmek üçin ulanylýar. Adatça may we might-y biri-biriniň ýerine ulanmak mümkündür:",
                    "example":"Siz: Where's Bob? Siz Boby gözleýärsiňiz. Hiç kim onun niredeligini anyk bilenak, ýöne birnäçe takmynlar bar. He may be in his office. – Ol belki öz ofisinde bolmagy mümkin.\nHe might be having lunch. – Ol nahr iýip oturan bolmagy mümkin.\nAsk Ann. She might know. Enden soraň. Ol bilýän bolmagy mümkin."
                },
                {
                    "id":2,
                    "title":"May/Might for probability",
                    "section":"A",
                    "content":"May we might bir zadyň ähtimallygyny görkezmek üçin ulanylýar. Adatça may we might-y biri-biriniň ýerine ulanmak mümkin:",
                    "example":"It may/ might be true. Bu odgry bolmagy ähtimal.\nShe might/ may know. - Ol bilýän bolmagy mümkin."
                },
                {
                    "id":3,
                    "title":"May not / Might not",
                    "section":"A",
                    "content":"Ýokluk formalary may not we might not (ýa-da mightn't) görnüşde bolýar.",
                    "example":"It might not be true. - Bu dogry bolmazlygy ähtimal.\nI'm not sure whether I can lend you any money. I may not have enough. – Men saňa karzyna pul berip bilmegim anyk bilemak. Mende ýeterlik bolmazlygy mümkin."
                },
                {
                    "id":4,
                    "title":"May/Might for past possibility",
                    "section":"B",
                    "content":"Geçen zaman formasy may have (done) ýa-da might have (done) görnüşde bolýar.",
                    "example":"A: I wonder why Kay didn't answer the phone. - Men haýran, näme üçin Keý telefona jobap bermedi.\nB: She may have been asleep. Ol uklap ýatan bolmagy mümkin.\nA: I can't find my bag anywhere. Sumkamy hiç ýerden tapyp bilemak.\nB: You might have left it in the shop. – Ony dükanda galdyran bolmagyň ahmal."
                },
                {
                    "id":5,
                    "title":"May/Might for past possibility",
                    "section":"B",
                    "content":"Geçen zaman formasy may have (done) ýa-da might have (done) görnüşde bolýar.",
                    "example":"A: I was surprised that Sarah wasn’t at the meeting. - Saranyň mejlisde yoklygyna haýran galdym.\nB: She might not have known about it. – Ol mejlis hakynda bilmän galan bolmagy ahmal."
                },
                {
                    "id":6,
                    "title":"May / Might / Could similarity",
                    "section":"C",
                    "content":"Käwagt could-yň manysy may we might-yň manysyny ýakyn:",
                    "example":"The phone is ringing. It could /may / might be Tim. Telefon jyňyrdaýar. Bu Tim bolmagy mümkin."
                },
                {
                    "id":7,
                    "title":"Couldn't vs Might not",
                    "section":"C",
                    "content":"Ýöne couldn't (ýokluyk formasy) may not we might not -dan tapawutlydyr.",
                    "example":"Deňeşdiri:\nShe was too far away, so she couldn't have seen you. – Ol gat daşdady. Şonuň üçin ol seni gören bolmagy mümkin däl.\nA: I wonder why she didn't say hello. Men haýran, ol näme üçin salamlaşmady.\nB: She might not have seen you. -Ol seni görmedik bolmagy ähmal."
                }
            ]
        },
        {
            "unit":30,
            "details":[
                {
                    "id":1,
                    "title":"May / Might for future possibility",
                    "section":"A",
                    "content":"May we might geljekdäki bolup geçmegi mümkin Bolan iş-hereketi ýa-da hadysany görkezmek üçin ulanylýar:",
                    "example":"I haven't decided yet where to spend my holidays. I may go to Ireland. Men dynç alyşy nirde geçirmegim barada heniz belli karara gelmedim. Men Irlandiýa gitmegim mümkin.\nTake an umbrella with you when you go out. It might rain later. Haçanda köçä çykaňda özüň bilen saýawan al. Soňrak ýagyş ýagmagy mümkin.\nThe bus doesn't always come on time. We might have to wait. - Awtobus her gezek öz wagtynda gelmeýär. Garaşamaly bolmalygymyz mümkin."
                },
                {
                    "id":2,
                    "title":"May not / Might not",
                    "section":"A",
                    "content":"Ýokluk formalary may not we might not (mightn't) görnüşde bolýar:",
                    "example":"Ann may not come to the party tonight. She isn't well. En bugün agşam oturluşyga gelmezligi mümkin. Onu ýagday gowy däl.\nThere might not be a meeting on Friday because the director is ill. – Anna güni agşam mejlis bolmazalygy ahmal, çünki direktor kesel."
                },
                {
                    "id":3,
                    "title":"May / Might interchangeability",
                    "section":"B",
                    "content":"Adatça may we might-y biri-biriniň ýerine ulanmak mümkin:",
                    "example":"I may go to Ireland. Ýa-da I might go to Ireland. - Men Irlandiýa barmagym mümkin.\nJane might be able to help you. Ýa-da Jane may be able to help you. Belki size Jeýn kömek edip bilmego mümkin."
                },
                {
                    "id":4,
                    "title":"May / Might for unreal situations",
                    "section":"B",
                    "content":"Ýöne, pursat hakykata dogry gelmeýän bolsa might (may däl) ulanylýar.",
                    "example":"If I knew them better, I might invite them to dinner. Eger men olary gowyrak tananymda olary agşamlyk nahara teklip etmegim mümkindi. Bu ýerde pursat hakykata dogry gelmeýär, çünki men olary gowy tanamaýaryn, şonuň üçin olary nahara teklip etmekçi däl. Bu mysalda may-i ulanyp bolmaýar."
                },
                {
                    "id":5,
                    "title":"May / Might continuous forms",
                    "section":"C",
                    "content":"May/might gatnaşýan continuous forma hem bolup biler. may/might be +ing bilen Will be +ing -ni deňeşdiriň:",
                    "example":"Don't phone at 8.30. I'll be watching the football match on television. - 8.30da maňa jaň etme. Men telewizordan futbol oýuny tomaşa edýän bolaryn.\nDon't phone at 8.30. I might/ may be watching the football match on television. -8.30-da maňa jaň etme. Men telewizordan futbol oýuny tomaşa edýän bolmagym ahmal."
                },
                {
                    "id":6,
                    "title":"May / Might for future plans",
                    "section":"C",
                    "content":"May/ might bolmagy mümkin bolan meýilleri görkezmek üçin ulanylýar.",
                    "example":"I'm going to Ireland in July. - lýulda Irlandiya gitmekçi. (anyk, boljagy belli)\nI may/might be going to Ireland in July. lýulda Irlandiya gitmegim ahmal. (belki)\nEmma ýokardaky mysalda \"I may go\" ýa-da\" I might go -ny hem ulanmak mümkin. Manysy üýtgemeýär."
                },
                {
                    "id":7,
                    "title":"Might as well / May as well",
                    "section":"D",
                    "content":"(We) might as well do something - \"Biz bir işi arkaýyn edip bileris\" = \"bir zady etmek gerek , çünki başga çäre ýok, we bu işi etmezlige hiç hili sebäp ýa-da esas ýok.",
                    "example":"Helen we Kler häzirjek awtobusyny geçirip goýberdiler . Awtobuslar her sagatda 1 gezek geeçýär.\nHelen: What shall we do? Shall we walk? Biz näme ederis? Piýada giderismi?\nKler: We might as well. It's a nice day and I don't want to wait here for an hour. Biz şeýle hem edip bileris. Gün ajaýyp, Men bolsa bir sagat garaşamagy islemeýärin.\nThe buses are so expensive these days, you might as well get a taxi. – Şu günler awtobuslar şeýle gymmat, arkaýyn taksi saklap bilersiň. (= taksi awtobusdan gymmat däl)"
                }
            ]
        },
        {
            "unit":31,
            "details":[
                {
                    "id":1,
                    "title":"Must / Have to",
                    "section":"A",
                    "content":"Must we have to bir iş-hereketi ýerine ýetirrmek hökmanydygyny görkezmek üçin ulanylýar. Käte olaryň haýsy birini ulanýanymyzyň tapawudy hem galmaýar:",
                    "example":"Oh, it's later than I thought. I must go. (ýa-da I have to go)- Men oýlanymdan giç. Gitmegim zerur.\nEmma must we have to –nyň arasynda tapawut bar, ol käwagt möhümdir.\nMust şahsy duýgyny, pikirler bildirlende ulanylýar.\nHave to biziň şahsy duýgularymyzyy we pikirleri dälde, faktlary bildirmek üçin ulanylýar.\n\"You must do something\" = \"sen bir iş etmegiň zerur, men muny möhüm diýýänim üçin etmegiň zerur\"\nShe's a really nice person. You must meet her. – Ol örän ajaýyp adam. Sen hökman onun bilen tanyşmaly. (meniň pikirim)\nI'haven't phoned Ann for ages. I must phone her tonight. Men Ena köpden bäri jaň etmedim. Men oňa agşam hökman jaň etmeli.\nYou have to do something\" = \" Sen bir zady düzgün bolany üçin etmeli ýa-da ýagdaýy talap edýäni üçin etmegiň zerur.\nYou have to turn left here. You can't turn right here. You have to turn left. Sen bu yerden saga öwrülip bilmeýärsiň. Sen hökman çepe öwrülmeli.(ýol hereketiniň düzgünine laýyklykda)\nMy eyesight isn't very good. I have to wear glasses for reading. – Meniň gözim dury däl. Okamagym üçin men hökman äýnej dakmaly."
                },
                {
                    "id":2,
                    "title":"Must / Have to comparison",
                    "section":"A",
                    "content":"Aşakdakylary deňeşdiriň:",
                    "example":"I must get up early tomorrow. There are a lot of things I want to do. Men ertir ir bilen turmagym zerur. Men etmek isleýän köp işler bar.\nI have to get up early tomorrow. I'm going away and my train leaves at 7.30. – Men ertir ir turmagym zerur. Men gidýärin we meniň otlym sagat 7.30-da ugraýar.\nHaçanda haýsyny ulanmany bilmedik ýagdaýňyzda have to-ny ulanmak maksada laýyk."
                },
                {
                    "id":3,
                    "title":"Must not / Don't have to",
                    "section":"C",
                    "content":"Mustn't we don't have to tapwutlydyr:",
                    "example":"You must keep it a secret. You mustn't tell anyone. Sen muny syr saklamagyň zerur. Hiç kime aýtmazlygyň zerur.\nYou can tell me if you want but you don't have to tell me. Eger isleseň maňa aýdyp bilersiň. Ýöne aýtmagyň zerur däl."
                },
                {
                    "id":4,
                    "title":"Have to vs. Have got to",
                    "section":"D",
                    "content":"Have to -nyň ýerine have got to-y ulanmak mümkin:",
                    "example":"I've got to work tomorrow. Ýa-da I have to work tomorrow. – Ertir işlemegim zerur."
                }
            ]
        },
        {
            "unit":32,
            "details":[
                {
                    "id":1,
                    "title":"Must / Mustn't / Needn't",
                    "section":"A",
                    "content":"Must mustn't needn't\n\n\"You must do something\" - \"bir zady etmegi zerur/ şert/ gerek/ \":\nDon't tell anyone what I said. You must keep it a secret. Aýdanlarymy hiç kime ýatma. Ony syr saklamagyň zerur.\nWe haven't got much time. We must hurry. Biziň wagtymyz köp däl. Biz howlukmagymyz zerur.\n\n\"You mustn't do something\" = \"Sen bir zady etmezligiň zerur. (şonuň üçin ony etme)\"\nYou must keep it a secret. You mustn't tell anyone else. – Sen muny syr saklamagyň zerur. Sen ony başga birine aýtmazlygyň zerur.\nIt's essential that nobody hears us. We mustn't make any noise. Bizi hiç kim eşitmezligi gaty möhümdir. Goh etmezligimiz zerur.\n\n\"You needn't do something\" = \"sen bir işi etmegiň zerur däl\nYou can come with me if you like but you needn't come if you don't want to. Sen isleseň meniň bilen naryp bilersiň, ýöne islemeseň gitmegiň zerur däl.\nWe've got plenty of time. We needn't hurry. Wagtymyz ýeterlik. Howlukmagymyzy zerur däl."
                },
                {
                    "id":2,
                    "title":"Needn't / Don't need to",
                    "section":"B",
                    "content":"Needn't –yň ornuna don't/doesn't need to-ny ulanmak mümkin.\nWe needn't hurry. Ýa-da We don't need to hurry. –Howlukmagymyz zerur däl.\nÝatlatma:\n\"don't need to do\" (to bilen) Emma \"needn't do\" (to-syz)\nNeedn't we don't need to-laryň manysy don't have to –nyňka meňzeýär. (Unit 31 C):\nWe've got plenty of time. We don't have to hurry.- Wagtymyz köp. Howlukmagymyz zerur däl."
                },
                {
                    "id":3,
                    "title":"Needn't have (done)",
                    "section":"C",
                    "content":"Needn't have (done)\nAşakdaky mysaly öwreniň:\nJorj daşary çykmaly bolupdy. Ol ýagyş ýagar diýip oýlapdy, şonuň üçin ol saýawan almana karar edipdi.\nI needn't have brought the umbrella.\nEmma ýagyş ýagmady we saýawan hem şert bolmady. Diýmek:\nHe needn't have taken the umbrella. – Onuň saýawan alyp çykmagy zerur däldi.\nNeedn't (do) we needn't have (done)-lary deňeşdiriň:\nThat shirt isn't dirty. You needn’t wash it. - Bu köýnek kirdäl. Ony ýuwmagyň zerur däl.\nWhy did you wash that shirt? It wasn't dirty. You needn't have washed it. Bu köýnegi näme üçin ýuwduň? Ol kir däldi. Ony ýuwmagyň zerur däldi."
                },
                {
                    "id":4,
                    "title":"Didn't need to (do) vs. Needn't have (done)",
                    "section":"D",
                    "content":"Didn't need to (do) we needn't have (done)\nI didn't need to do something – Men bir işi etmegim zerur däldi (we men muny şol bilýärdim)\nI didn't need to get up early, so I didn't. Wagtly turmagyň zerur däldi şonuň üçin turmadym.\nI didn't need to get up early, but it was a lovely morning, so I did. – Ir turmagyň zerur däldi, ýöne daň juda ajaýypdy, şonuň üçin turdym.\nI needn't have done something- men iş etdim, emma ony etmegim zerur bolmandyny häzir bilýärin.\nI got up very early because I had to get ready to go away. But in fact it didn't take me long to get ready. So, I needn't have got up so early. I could have stayed in bed longer. Men juda ir turdym, çünki gitmäne taýynlanmagyň zerurdy. Aslynda bolsa taýynlanmagyma köp wagt gitmedi, şonuň üçin şeýle ir turmagym zerur däldi, ýerimde köpäk wagt ýatyp bilerdim."
                }
            ]
        },
        {
            "unit":33,
            "details":[
                {
                    "id":1,
                    "title":"Should",
                    "section":"A",
                    "content":"\"You should do something\" - \"sen bir iş etmegi gerek, sen iş et gowy bolardy.\"\n\nShould esasan maslahat berlende ýa-da pikir bildirlende ulanylýar:\nYou look tired. You should go to bed. - Ýadow görunýärsiň. Sen ýeriňe geçde ýatmagyň gerek.\n\n\"Should we invite Susan to the party?\"Yes, I think we should\"- \"Sýuzany oturluşyga çagyrarmagymyz gerekmi. Howwa meniň pikirimçe çagyrmaly.\n\nShould adatça I think / I don't think/ Do you think.? - ler bilen ulanylýar:\nI think you should do more to help to Jane. – Meniň pikirimç sen Jeýne köpräk kömek etmeli.\nI don't think you should work so hard. - Men seneiň şeýle köp işlemelisiň diýip pikir edemak.\nDo you think I should prepare for the exam? - Seniň pikiriňçe men ekzamina taýynlanmagym gerekmi?\n\n\"You shouldn't do something\"-\"sen bir işi etetmezligiň gerek, ony etmegiň gowy bolmaz.\"\nYou shouldn't believe everything you read in the newspapers.- Sen gazetalardan okan hemme zada ynanmazlygyň gerek.\n\nShouldyň manysy must -yňky ýaly güýçli däl:\nYou should apologise. – Sen ötünç soramagyň gerek. (gowy bolardy)\n\nYou must apologise. – Sen soramagyň zerur. (başga alaç ýok)"
                },
                {
                    "id":2,
                    "title":"Should - Expectation or Correctness",
                    "section":"B",
                    "content":"Şeýlede, should bir zady dogry ýa-da garaşylyşy ýaly bolmasa ulanylýar.\nMysal üçin:\nI wonder where Liz is. She should be here by now. Men haýran, Liza niredeka. Ol bu wagtda çenli şutaýda bolmalydy. (ol heniz gelmedi, bu geň)\nThe price on this packet is wrong. It should be $1.20, not $1.50. - Bu paketdaky baha ýalňyş. Ol 1.20$ bolmagy gerek, 1.50$ däl.\nThose boys shouldn't be playing football at this time. They should be at school. – Ol çagalar buwagt futbol oýnamazlyklery gerek. Olar buwagt mekdepde bolmaklary gerek.\nShould bir zadyň bolmagyna garaşmagy görkekzmek üçin ulanylýar.\nShe's been studying hard for the exam, so she should pass. – Ol ekzamin üçin gaty köp okaýar, şeýlelik bilen ekzaminda geçer. (onuň ekzamindan geçerne garaşýaryn)"
                },
                {
                    "id":3,
                    "title":"Should have (done)",
                    "section":"C",
                    "content":"\"You should have done something\"- \"sen bir iş etmelidiň, ony etseň gowy bolardy.\nIt was a great party last night. You should have come. Why didn't you? Düýn ajaýyp şagalaň boldy. Sen hem gelmeliň. Näme üçin gelmediň?\nI m feeling sick. I shouldn't have eaten so much chocolate. Özümi erbet duýýaryn. Munça köp şokalat iýmezligim gerekdi.\nShould (do) we should have (done)-ny deňeşdiriň:\nYou look tired. You should go to bed now. Sen ýadow görünýärsiň. Häzir ýeriňe baryp ýatmagyň gerek.\nYou went to bed very late last night. You should have gone to bed earlier. Men düýn agşam gaty giç ýatdym, irräk ýatmagym gerekdi."
                },
                {
                    "id":4,
                    "title":"Ought to",
                    "section":"D",
                    "content":"Ought to...\nÝokardaky hemme mysallarda should-yň ýerine ought to-ny hem ulanmak mümkin.\nÝatlatma:\n\"Ought to do\" hemişe \"to\" bilen ulanylýar.\nIt was a great party last night. You ought to have come. Düýn agşam örän gowy oturlyşyk boldy. Sen hem gelmelidiň. Näme üçin gelemdiň."
                }
            ]
        },
        {
            "unit":34,
            "details":[
                {
                    "id":1,
                    "title":"Should for suggestions and recommendations",
                    "section":"A",
                    "content":"Should adatça aşakdaky işlikler bilen köp ulanylýar\n\nsuggest\npropose\nrecommend\n  insist\n  demand\n\nI demanded that he should apologise. - Men Onuň ötünç soramagyny talap etdim.\n\nWhat do you suggest I should do? – Näme etmegimi maslahat berýärsiňiz?\n\nThey insisted that we should have dinner with them. – Olar bilen nahar iýmelidigimizi gerekdigini aýtdylar.\n\nŞu görnüşde should, suggestion/proposal/ recommendation şuňa meňzeşlerden hem soň getirilip ulanylýar.\n\nWhat do you think of Jane's suggestion that should buy a car? – Jeýniň maňa maşyn almagym gerekdigi hakyndaky teklibi barada pikiriňiz nähili?\n\nShould şeýlede \"it's important/vital/ necessary/essential that...\" -lardan soň ulanylýar:\nIt's essential that you should be here on time. Bu ýerde öz wagtynda bolmagyňyz juda möhimdir."
                },
                {
                    "id":2,
                    "title":"Omitting should in certain cases",
                    "section":"B",
                    "content":"A bölümdedäki mysallaryň hemmesinde should –y galdyryp ulanyp bolýar:\nI demanded that he apologise. ( that he should apologise) - Men onun soramagyny talap etdim.\n\nWhat do you suggest I do?- Maňa näme etmegimi maslahat berýärsiňiz?\n\nBu forma (I do / he apologise) käwagt subjunctive diýip aýdylýar.\n\nŞonuň bilen bile present we past zamanlaryny hem ulanmak mümkündür:\nIt's essential that you are here on time. Bu Ýerde öz wagtynda bolamgyň gaty zerurdyr.\n\nI demanded that he apologised. - Men onuň ötünç soramagyny talap etdim.\n\nSuggest-e üns beriň, ondan soň \"to\" (to do/to buy we ş.m) ulanmak mümkin däl.\n\nJane suggested that I (should) buy a car. Jeýn maşyn satyn almagymy maslahat berdi.\n\nÝa-da Jane suggested that I bought a car. (emma \"Jane suggested me to buy a car\" däl)\n\nSuggest +ing -ni Unit 52-de göriň."
                },
                {
                    "id":3,
                    "title":"Should with adjectives",
                    "section":"C",
                    "content":"Should birnäçe sypatlar bbilen bile ulanylyşy:\n\nstrange\nodd\nfunny\ntypical\nnatural\ninteresting\nsurprised\nsurprising\n\nIt's strange that he should be late. He's usually on time. – Onuň giç galýany geň. Ol adatça öz wagtynda gelýär.\n\nI was surprised that she should say such a thing. Onuň beýlik gürlänine haýran galdym."
                },
                {
                    "id":4,
                    "title":"If... should...",
                    "section":"D",
                    "content":"If.. should..\n\n\"If something should happen\"- \" egerde bir zat bolan ýagdaýda.\"\n\nIf Tom should phone when I'm out, tell him I'll phone him back later. Egerde men daşary çykanymda Tom jaň etse oňa men yzynajaň etjekdigimi aýdaýyň.\n\n\"If Tom should phone\"-nyň manysy \"If Tom Phones\"-nyňka meňzeýär.\nHaçanda Should ulanylanda sözleýji iş herekteiň bolmak ähtimallygynyň pesdigini bildirýär.\nÝenede mysal:\nI've left the washing outside. If it should rain, can you bring it in? – Kirlerni daşarda galdyrypdym. Eger ýagyş ýagsa sen ony içeri getirip bilersiňmi?\n\nShould –y bu sözlemiň başynda hem ulanmak ýalňyş bolmaz:\nShould Tom phone...- Eger Tom jaň etse, ..."
                },
                {
                    "id":5,
                    "title":"I should... / I shouldn't... for advice",
                    "section":"E",
                    "content":"I should.. /I shouldn't... birine maslahat berilýän pursatda hem ulanmak mümkün:\n\"Shall I leave?\" \"No, I should wait a bit longer\"-\"Men gidibereýinmi?\" \"Yok, men ýene biraz garaşardym.\"\n\nBu ýerde \"I should wait\" \"seniň ornuňda bolanymda men garaşardym, saňa garaşmagy maslahat berýärin.” Diýen manyny berýär."
                }
            ]
        },
        {
            "unit":35,
            "details":[
                {
                    "id":1,
                    "title":"Had better (I'd better / you’d better we ş.m )",
                    "section":"A",
                    "content":"\"I’d better do something\" - \"men bir iş edenimk makul, ony etmegim maslahat berilýär bolmasa nähilidir mesele ýa-da howp ýüz çykmagy mümkin.\n\nI have to meet Ann in ten minutes. I'd better go now or l'll be late. Eni on minut ozal garşy alamagym zerur. Men häzir gidenim makulrak, bolmasa gijä galaryn.\n\n\"Shall I take an umbrella?\" \"Yes, you'd better. It might rain.\"- \"Saýawan alaýynmy?\" \"Hawa, almagyň makul. Ýagyş ýagmagy mümkin\"\n\nÝokluk formasy I'd better not (= I had better not) görnüşde bolýar:\nYou don't look very well. You'd better not go to work today. Görnüşiň oaňat däl. Bugün işe gitmedigiň makulrak.\n\nÝatlatma:\nHad better sözleninde adatça I'd better/ You’d better we ş.m görnüşde bolýar:\nI'd better phone Carol, hadn't I?- Kerola jaň edenim makul, şeýle dälmi?\n\nHad –geçen zaman formasy emma bu fraza geçen zamany dälde eýsem, geljek zamany beýan edýär:\nI'd better go to the bank now/tomorrow.- Men banka häzir/ertir gidenim makul.\n\nBu fraza I’d better do(I’d better to do däl) görnüşde ulanylýar.\nIt might rain. We'd better take an umbrella. Ýagyş ýagmagymümkin. Saýawan alanym makul . (we'd better to take\" däl)"
                },
                {
                    "id":2,
                    "title":"Had better and should",
                    "section":"B",
                    "content":"Had better we should\n\nHad better -iň manysy Should-yň manysyna meňzeýär. (Unit 33 A-a serediň), ýöne edil meňzeş däl.\n\nHad better diňe mälim bir pursat üçin ulanylýar. (umuman aýdylanda däl).\n\nShould bolsa hemme pursatlarda pikir bildirlendddde ýa-da maslahat berlende ulanylýar:\nIt's cold today. You'd better wear a coat when you go out. - Bugun sowuk. Haçan daşaryk gitmekçi bolanyňda palto alnyň makul . (mälim bir pursatda)\n\nI think all drivers should wear seat belts.\n\n- Meniň pikirimçe , hemme sürüjiler howpsyzlyk kemerlerini dakmaklary zerur. (umumy gürrüň - \"had better wear\" däl)\n\nŞeeýlede , had better ulanylanda maslahata amal edilmese hemişe mesele ýa-da owp ýüze çykaar.\n\nShould –ň manysy bolsa - bir iş etseň gowy bolardy.\n\nIt's a great film. You should go and see it. - Bu ajaýyp film. Ony görmegiň gerek. (emma ony görmeseňem mesele bolmaz)\n\nThe film starts at 8.30. You'd better go now or you'll be late. - Film sagat 8:30-da başlanýar. Häzir baranyň makul, ýogsam gijä galarsyň."
                },
                {
                    "id":3,
                    "title":"It's time...",
                    "section":"C",
                    "content":"\"It's time (for somebody) to do something\" - \"bir iş etmäne (kimdir biri üçin) wagt boldy.\"\n\nIt's time to go home. / It's time for us to go home. (Biz üçin) Öýe gaýtmak wagt boldy.\n\nŞeýlede şu görnüşde aýtmak mümkin:\nIt's time we went home. Biz üçin öýe gitmek wagty boldy.\n\nBu ýerde geçen zaman formasy (went) ulanylan, ýöne manysy zamanda däl, eýsem häzirki zamany ýa-da geljek zamany beýan edýär.\n\n\"It's time you did something\"- \"sen bir işi aýýem etmelidiň. Bu gurluş köwend tankyt ýa-da şikaýat etmek üçin ulanylýar:\n\nIt's time the children were in bed. It's long after their bedtime. – Çagalaryň ýerinde ýatmak wagty boldy. Olaryň ýatmaly wagtyndan bireýýam geçdi.\n\nIt's about time... / It's high time. ulanylanda tankyd ýenede artýar.\n\nYou're a great talker. But it's high time you did something instead of just talking. - Sen juda köp gürleýärsiň. Emma diňe gürlemegiň ýerine birzatlar etmegiň wagty geldi."
                }
            ]
        },
        {
            "unit":36,
            "details":[
                {
                    "id":1,
                    "title":"Can/could/ would for requests",
                    "section":"A",
                    "content":"Kimdir birinden bir iş etmegini haýyş etmek üçin Can we could adamlardan bir iş etmegini haýyş edilende ulanylýar:\nCan/could you wait a moment please? – Bir minut garaşyp bilersiňizmi?\n\nLiz, can you do me a favour? - Liz, maňa ýýagşylyk eddip bilersiňmi?\nExcuse me, could you tell me how to get to the station? - Bagyşlaň meni, stansiýa nädip barmadygyny aýdyp bilersiňizmi?\nI wonder if you could help me. – Men haýran, siz maňa nähili kömek bilersiňiz.\n\nAdatça Do you think (you) could..? (can däl) diýilmedigine üns beriň:\nDo you think you could lend me some money until next week? Seniň pikiriňçe sen maňa geljekgi hepdä çenli pul karz berip bilýärsiňmi?\n\nBir iş etmegi haýyşt edilende will we would-y hem ulanmak mümkün, ýöne can/could köpräk ulanylýar:\n\nLiz, will you do me a favour?- Liz, maňa ýagşylyk edip bilersiňmi?\n\nWould you please be quiet? l'm trying to concentrate. Haýyşt ýuwaş bolup bilersiňizmi. Men ünsümi jemlemäge çalyşýaryn."
                },
                {
                    "id":2,
                    "title":"Asking for things",
                    "section":"B",
                    "content":"Zatlary soramak\nBir zady soranda Can I have...? ýa-da Could I have..? ulanylýar:\n(dükanda) Can I have these postcards, please?- Men şu otkrytkalary alyp bilenrinmi?\n\n(nahar wagtynda) Could I have a salt, please?- Duzy alyp bilerinmi haýyşt?\n\nMay I have ? –i hem ulanmak mümkin, ýöne bu fraza az ulanylýar:\nMay I have these postcards, please?- Men şu otkrytkalary alyp bilenrinmi?"
                },
                {
                    "id":3,
                    "title":"Asking for and giving permission",
                    "section":"C",
                    "content":"Rugsat sorama we berme.\nBir iş etmek üçin rugsat soramak üçin can, could ýa-da may ulanylýar:\n(telefonda) Hello, canl speak to Tom, please? - Salam, Tom bilen gürleşip bilerinmi?\n\n\"Could I use your phone?\" \"Yes, of course.\" \"Telefonyňdan peýdalansam bolýarmy? Howwa , elbetde.\n\n\"May l come in?\" \"Yes, do please.\" - \"Girsem bolýarmy?\" \"Hawa, merhemet ediň.\"\n\nRugsat berende can ýa-da may ulanylýar:\nYou can/may use the phone. - Telefondan peýdalanmagyňyz mümkin.\n\nMay resmi mana eýe we Can we could-a garanyňda az duş gelýär."
                },
                {
                    "id":4,
                    "title":"Making suggestions and offers",
                    "section":"D",
                    "content":"Bir iş etmegi teklip etmek.\nBir iş hereketi etmegi teklip etmek üçin Can I..? ulanylýar:\n\nCan I get you a cup of coffee? Yes, that would be very nice.\"- Size hem kofe alaýynmy? Howwa, juda gowy bolardy.\n\nCan I help you? No, it's all right. I can manage.- Size kömek edeýinmi? Yok, hemme zat gowy. Özim başarýan\n\nŞeýlede bir iş etmegi teklip edilende I’Il -y hem ulanmak mümkin (Unit 21 C serediň)\n\nYou look tired. I'll get you a cup of coffee. Sen ýadow görünýärsiň. Men saňa kofe getirjek ."
                },
                {
                    "id":5,
                    "title":"Making offers",
                    "section":"E",
                    "content":"Teklipler we bir ýere teklip etmek\n\nTeklip etmek üçin Would you like...? ulanylýar (do you like däl)\n\nWould you like a cup of coffee? Yes, please.- Kofe isleýäňmi? Hawa, haýyşt.\n\n\"Would you like to come to dinner tomorrow?\" \"Yes, l'd love to.\"- \"Ertir agşamlyk nahara gelmek isleýärsiňizmi? Hawa, janym bilen (halardym) \n\n\"I’d like. = islegi mylaýymlylyk bile bildirmek formasy:\n\n(dükanda) I’d like to try on this jacket, please.- Bu kurtkany geýip örmekçidim, haýyşt."
                }
            ]
        },
        {
            "unit":37,
            "details":[
                {
                    "id":1,
                    "title":"If I do vs If I did (1)",
                    "section":"A",
                    "content":"Aşakdaky mysallary deňeşdiriň:\n1 Syu sagadyny ýitirdi. Onuň pikirine görä sagat Eniň öýünde bolmagy mümkin.\nSyu: I think I left my watch at your house. Have you seen it? – Meniň pikirimçe sagadymy, seniň öýüňde galdyrdym. Ony görmediňmi?\nAnna: No, but l'll have a look when I get home. If I find it, I'll tell you. Ýok emma ony gözläp görerin. Eger ony tapsam saňa aýdaýaryn.\n\nBu mysalda sagady tapmak ähtimallygy ýokary bolany üçin En If I find..., I'll.. diýýär."
                },
                {
                    "id":2,
                    "title":"If I did (2)",
                    "section":"A",
                    "content":"Anna: If I found a wallet in the street, I'd take it to the police. Eger köçede gapjyk tapyp alsam ony polisiýa bererdim. (ýa-da tabşyrardym)\n\nBular dürli pursatlar. Munda En köçede gapjyk tapyp almak ähtimallygy ýokary diýip hasaplanmaýar.\nOl şeýle pursady göz öňüne getirýär we köçede gapjyk tapmagyna garaşmaýar. Şonuň üçin ol \"If I found., Id (= would) diýýär (If I find. I will däl).\n\nÝokardaky ýaly göz öňüne getirenimizde , if +past (if I found/ if you were/ if we didn't we ş.m) gurluş ulanylýar. Emma manysy geçen zamanda däl:\n\nWhat would you do if you won a million pounds? Million funt utsaň näme ederdiň? (biz onun hakykatddan hem bolup geçmegine garaşmaýarys)\n\nI don't really want to go to their party, but probably will go. They'd be offended if I didn't go. Men olaryň oturlyşygyna gitmek islemeýärin, emma men giderin. Barmasam olar öýkelärler."
                },
                {
                    "id":3,
                    "title":"Use of Would in the if-clause",
                    "section":"B",
                    "content":"Sözlemiň if-bölümindde adatça would ulanylmaýar:\n\nI'd be very frightened if somebody pointed a gun at me. – Biri maňa tüpeň çenese gorkan bolardym/ gorkýaryn. (\"if somebody would point... däl)\n\nÝöne \"if... would\" guruluşy birinden bir etmeegi haýyşt edilende ulanylmak mümkin:\n\n(resmi hatda) I would be grateful if you would send me your brochure as soon as possible. Broşýuraňyzy gysga wagtda iberseňiz minnetdar bolardym."
                },
                {
                    "id":4,
                    "title":"Would in other clauses",
                    "section":"C",
                    "content":"Sözlmeiň başga bölüminde (if-bölüminde däl) would ('d)/wouldn't ulanylýar:\nIf you took more exercise, you'd (= you would) probably feel healthier. Eger köpräk türgenleşseň özüňi sagdynrak duýarsyň.\n\nWould you mind if I used your phone? Telefonyňdan peýdalansam bolarmy?\n\nI'm not tired enough to go to bed yet. I wouldn't sleep (if I went to bed now). – Men heniz ýerime geçip ýatar ýaly ýadow däl. (Häzir ýatsam.) Uklamaryn\n\nBeýle ýagdaýlarda could we might-y hem ulanmak mümkin:\nIf you took more exercise, you might feel healthier. - Eger köpräk türgenleşseň özüňi sagdynrak duýarsyň.\n\nIf it stopped raining, we could go out. Eger ýagyş dynsa köçä çykardyk (çykyp bilerdik)."
                },
                {
                    "id":5,
                    "title":"Avoiding When in If Clauses",
                    "section":"D",
                    "content":"Şu unitdäki mysallarda when ulanylmaýar:\n\nThey would be offended if we didn't accept their invitation. Olaryň teklibini kabul etmesek olar öýkelärler. (\"when we didn't\" däl)\n\nWhat would you do if you were bitten by a snake?-Seni ýylan çaksa näme ederdiň / edersiň? (\"when you were bitten\" däl)\n\nIf we when-ler şeýlede Unit 25 C den gaýta görüň."
                }
            ]
        },
        {
            "unit":38,
            "details":[
                {
                    "id":1,
                    "title":"If I knew...",
                    "section":"A",
                    "content":"Aşakdaky mysaly öwreniň:\n\nSýu Pola jaň etmekçi, ýöne edip bilmeýär, çünki onuň telefon nomerini bilmeýär.\nSyu: If I knew his number, I would phone him. Eger onun nomerini bilýän bolsadym, men oňa jaň ederdim.\n\n\"If I knew his number...\" bize Sýunyň nomerini bilmeýänini görkezýär. Ol pursady göz öňüne getirýär. Aslynda Sýu Polyň nomerini bilmeýär.\n\nŞeýle görnüşdäki göz-öňüne getirilen pursatlarda if + past (if I knew / if you were/ if we didn't we ş.m) gurluşy ulanylýar. Emma bu gurluşyň manysy häzirki wagtda, geçen zamanda däl.\n\nTom would read more if he had more time. Eger onuň köpräk wagty bolanda Tom köpräk okardy. (emma onuň wagty köp däl)\n\nIf l didn't want to go to the party, I wouldn't go. Oturluşyga barmak islemeýän bola nymda barmazdym. (ýöne barasym gelýär)\n\nWe wouldn't have any money if we didn't work. Işlemesek pulumyz bolmazdy.(emma biz işleýäris)\n\nIf you were in my position, what would you do? – Meniň ornumda bolanyňda näme ederdiň?\n\nIt's a pity you can't drive. It would be useful if you could. - Sürüp bilmeýänligiňiz gynandyrýar. Başarsaňyz peýdaly bolardy."
                },
                {
                    "id":2,
                    "title":"I wish I knew",
                    "section":"B",
                    "content":"Şeýlede wish-den soňra işligiň geçen zaman şekili ulanylýar. (I wish I knew /wish you were we ş.m). Wish bir öküninende ýa-da bir zadyň biziň isleýşimiz ýaly bolmadyk ýagdaýda ulanylýar.\n\nI wish had an umbrella. Mende saýawan bolmagyny islärdim. (ýagyş ýagýarka mende saýawan ýok we men muňa ökünýärin)\n\nI wish I knew Paul's number. – Polyň telefon nmerini bilmek islärdim. (men nomeri bilmeýärin we muňa gynanýaryn)\n\nDo you ever wish you could fly? –Uçup bilmäni bir mahal isläpdiňmi? (sen uçup bilmeýärsiň)\n\nIt's very crowded here. I wish there weren't so many people. - Bu ýerde adam juda köp.\n\nMunça köp adam bolmazlygyny islärdim. (ýöne adam juda kän)\n\nI wish I didn't have to work. – Işlemäge mejbur bolmazlygymy islärdim. (emma men işlemäge mejur)"
                },
                {
                    "id":3,
                    "title":"If I were/ wish it were",
                    "section":"C",
                    "content":"If we wish-den soň was-yň ýerine were-i (if I were/I wish it were we ş.m) ulanmak mümkin\n\nIf I were/ was you, I wouldn't buy that coat. - Seniň ornuňda bolsam ol paltony almazdym.\n\nI’d go out if it weren't / wasn't raining. - Ýagyş ýagmaýan bolanda daşaryk çykardym\n\nI wish it were /was possible. Onuň bir alajy bolamgyny islärdim."
                },
                {
                    "id":4,
                    "title":"Would in the if-clause",
                    "section":"D",
                    "content":"Adatça gürrüňiň if bölüminde ýa-da wish-den soň would ulanylmaýar:\n\nIf I were rich, I would have a yacht. Baý bolanymda ýahta edinerdim. (if I would be rich däl)\n\nI wish I had something to read. – Okamana bir zatlar bolmagyny islärdim. (I wish I would have däl)\n\nEmma käwagt wish.. would (I wish you would listen) guruluşy hem ulanmak mümkin. Unit 40 C –e serediň."
                },
                {
                    "id":5,
                    "title":"Could, would be able to",
                    "section":"E",
                    "content":"Could käwagtda would be able to (edip bilerdi Unit27 D) we käwagt was/were able to (edip bildi Unit 26 C) manylarda gelýänini ýatda tutuň:\n\nYou could (= would be able to) get a job more easily if you could (= were able to) speak a foreign language. – Sen daşary ýurt dilinde gürläp bilýän bolanyňda iş tapmagyň aňsat bolardy."
                }
            ]
        },
        {
            "unit":39,
            "details":[
                {
                    "id":1,
                    "title":"Geçen aý Garri hassahanada ýatypdy. Liz muny bilmändi, şonuň üçin ony görmäne barmady.",
                    "section":"A",
                    "content":"Geçen zaman barada gürrüň edilende if + had (d) (if I had known/been/done we ş.m) gurluşy ulanylýar.",
                    "example":"If I had known you were in hospital, I would have gone to visit you. Seniň hassahanada bolanyňy bilýän bolanymdadym, seni görmäge baran bolardym."
                },
                {
                    "id":2,
                    "title":"Deňeşdiriň:",
                    "section":"A",
                    "content":"If + had (d) used to talk about past events that didn't happen.",
                    "example":"I didn't see you when you passed me in the street. If I'd seen you, of course I would have said hello."
                },
                {
                    "id":3,
                    "title":"I wish / I wish I had known...",
                    "section":"C",
                    "content":"Şu usulda wish-den soňra hem had (done) ulanylýar.",
                    "example":"I wish I'd known that Gary was ill. I would have gone to see him. Hany indi Garriniň hassadygyny bilýän bolsadym, men Garrini görmäne giden bolardym."
                },
                {
                    "id":4,
                    "title":"Would (do) we would have (done)-ny deňeşdiriň.",
                    "section":"D",
                    "content":"Would and would have are used differently to describe hypothetical situations in different tenses.",
                    "example":"If I had gone to the party last night, I would be tired now. Düýn agşam oturylyşyga giden bolsam, şuwagt ýadow bolan bolardym."
                }
            ]
        },
        {
            "unit":40,
            "details":[
                {
                    "id":1,
                    "title":"Would ('d) bir wakany ýa-da iş hereketi göz öňüne getirlende ulanylýar:",
                    "section":"A",
                    "content":"It would be nice to buy a new car, but we can't afford it. – Täze amşyn satyn alsak gaty gowy bolardy, emma oňa gurbumyz ýetmeýär.",
                    "example":"It would be nice to buy a new car, but we can't afford it."
                },
                {
                    "id":2,
                    "title":"Would have (done) bir pursady ýa-da iş-hereketi geçen zamanda göz öňüne getirlende ulanylýar:",
                    "section":"A",
                    "content":"They helped me a lot. I don't know what I would have done without their help. - Olar maňa köp kömek etdiler. Olaryň kömegisiz men näme edip biljegimi bilmeýärin.",
                    "example":"They helped me a lot. I don't know what I would have done without their help."
                },
                {
                    "id":3,
                    "title":"Will (‘ll) we would ('d)-lary deňeşdiriň:",
                    "section":"B",
                    "content":"I'll stay a bit longer. I’ve got plenty of time. - Men ýene birazajyk galjak. Wagtym köp",
                    "example":"I'll stay a bit longer. I’ve got plenty of time."
                },
                {
                    "id":4,
                    "title":"I'd stay a bit longer but I really have to go now.- Men ýene birazajyk galardym, emma häzir çyndanam gitmegim zerur.",
                    "section":"B",
                    "content":"Would/wouldn't adatça will/won't-yň geçen formasy. Deňeşdiriň:",
                    "example":"I'd stay a bit longer but I really have to go now."
                },
                {
                    "id":5,
                    "title":"present",
                    "section":"B",
                    "content":"Tom: I'll phone on Sunday. – Ýekşenbe güni jaň etjek.",
                    "example":"Tom: I'll phone on Sunday."
                },
                {
                    "id":6,
                    "title":"past",
                    "section":"B",
                    "content":"Tom said he'd phone on Sunday. Tom ýekşenbe güni jaň etjekdigini aýtdy.",
                    "example":"Tom said he'd phone on Sunday."
                },
                {
                    "id":7,
                    "title":"present",
                    "section":"B",
                    "content":"ANN: I promise I won't be late. Gijikmezlige wada berýärin.",
                    "example":"I promise I won't be late."
                },
                {
                    "id":8,
                    "title":"past",
                    "section":"B",
                    "content":"Ann promised she wouldn't be late. En gijikmezlige wada berdi.",
                    "example":"Ann promised she wouldn't be late."
                },
                {
                    "id":9,
                    "title":"I wish... would..",
                    "section":"C",
                    "content":"Ýagyş ýagyp dur. Jil köçä çykmakçy ýöne emma ýagyşda däl.",
                    "example":"Jill: I wish it would stop raining."
                },
                {
                    "id":10,
                    "title":"I wish... would... bir zadyň bolmagyny ýa-da kimdir biriniň bir zady etmegini islände ulnaylýar.",
                    "section":"C",
                    "content":"I wish... would... bir zadyň bolmagyny ýa-da kimdir biriniň bir zady etmegini islände ulnaylýar.",
                    "example":"I wish it would stop raining."
                },
                {
                    "id":11,
                    "title":"The phone has been ringing for five minutes. I wish somebody would answer it. – Telefon bäş minutdan bäri jyňyrdap dur. Oňa kimdir biri jogap bermegini islärdim.",
                    "section":"C",
                    "content":"The phone has been ringing for five minutes. I wish somebody would answer it.",
                    "example":"I wish somebody would answer it."
                },
                {
                    "id":12,
                    "title":"I wish you would do something instead of just sitting and doing nothing. – Men seniň ýöne oturanyňdan we hiç zat etmeýäniň ýerine bir zatlar etmegiňi islärdim.",
                    "section":"C",
                    "content":"I wish you would do something instead of just sitting and doing nothing.",
                    "example":"I wish you would do something instead of just sitting and doing nothing."
                },
                {
                    "id":13,
                    "title":"I wish... would... adamlaryň gaýta-gaýta etýän işlerine närazylyk bildirlende ulanmak mümkin:",
                    "section":"C",
                    "content":"I wish you wouldn't keep interrupting me. Meniň gepimi bölmezligiňi isleýän.",
                    "example":"I wish you wouldn't keep interrupting me."
                },
                {
                    "id":14,
                    "title":"I wish.. would... pursatlar üçin däl, eýsem iş-hereket we özgerişler üçin ulanylýar:",
                    "section":"C",
                    "content":"I wish Sarah would come. Saranyň gelmegini islärdim.",
                    "example":"I wish Sarah would come."
                },
                {
                    "id":15,
                    "title":"Emma I wish Sarah were/ was here now. Saranyň häzir şu ýerde bolimagyny is lärdim.",
                    "section":"C",
                    "content":"I wish Sarah were/was here now. Saranyň häzir şu ýerde bolmagyny is lärdim.",
                    "example":"I wish Sarah were here now."
                },
                {
                    "id":16,
                    "title":"D",
                    "section":"D",
                    "content":"Şeýlede would geçmişdde yzgiderli gaýtalnyp duran işler barada gürrüň edilende ulanylýar: When we were children, we lived by the sea. In summer, if the weather was fine, we would all get up early and go for a swim.",
                    "example":"When we were children, we lived by the sea. In summer, if the weather was fine, we would all get up early and go for a swim."
                },
                {
                    "id":17,
                    "title":"Would manyda used to-a meňzeýär",
                    "section":"D",
                    "content":"Whenever Arthur was angry, he would (ýa-da used to) walk out of the room. – Her gezek Artur gaharly bolanda ol otagdan çykyp gidýär.",
                    "example":"Whenever Arthur was angry, he would walk out of the room."
                }
            ]
        },
        {
            "unit":41,
            "details":[
                {
                    "id":1,
                    "title":"is done, was done",
                    "section":"A",
                    "content":"Aşakdaky mysaly öwreniň: This house was built in 1935. Bu öý 1935 ýylda gurlan.",
                    "example":"This house was built in 1935."
                },
                {
                    "id":2,
                    "title":"Işligiň anyk (active) passive paýlaryny deňeşdiriň:",
                    "section":"A",
                    "content":"Somebody built his house in 1935. This house was built in 1935. Bu öý 1935 yilda gurlan. (passive)",
                    "example":"Somebody built his house in 1935. This house was built in 1935."
                },
                {
                    "id":3,
                    "title":"Işligiň anyk paýy (active voice) eýe tarapyndan ýerine ýetirlen iş-hereketi görkezmek üçin ulanylýar:",
                    "section":"A",
                    "content":"My grandfather was a builder. He built this house in 1935. Meniň atam ussady. Ol bu öýi 1935-nji ýylda guran.",
                    "example":"My grandfather was a builder. He built this house in 1935."
                },
                {
                    "id":4,
                    "title":"It's a big company. It employs two hundred people.",
                    "section":"A",
                    "content":"It's a big company. It employs two hundred people. Bu uly kompaniýa. Ol iki ýüz kişini iş bilen üpjün edýär.",
                    "example":"It's a big company. It employs two hundred people."
                },
                {
                    "id":5,
                    "title":"Işligiň passiw gatnaşygy, eýesiniň üstünde edilmeli hereketi görkezmek üçin ulanylýar:",
                    "section":"A",
                    "content":"This house is quite old. It was built in 1930. - Bu öý gaty köne. Ol 1930-njy ýylda gurlan.",
                    "example":"This house is quite old. It was built in 1930."
                },
                {
                    "id":6,
                    "title":"Two hundred people are employed by the company.",
                    "section":"A",
                    "content":"Two hundred people are employed by the company. - Bu kompaniýada iki ýüz kşi iş bilen üpjün edilen.",
                    "example":"Two hundred people are employed by the company."
                },
                {
                    "id":7,
                    "title":"Passive ulanylanda iş-hereketiň kim tarapyndan ýerine ýetirlendigi nämälim ýa-da möhüm bolmaýar:",
                    "section":"B",
                    "content":"A lot of money was stolen in the robbery. Talaňçylykdda örän köp pul ogurlandy.(kimdir ogurlady, ýöne kim ogurlany nämälim)",
                    "example":"A lot of money was stolen in the robbery."
                },
                {
                    "id":8,
                    "title":"Is this room cleaned every day?",
                    "section":"B",
                    "content":"Is this room cleaned every day?- Bu otag hergüni arassalanýarmy? (kimdir biri otagy arassalaýany möhüm däl)",
                    "example":"Is this room cleaned every day?"
                },
                {
                    "id":9,
                    "title":"Iş-hereketiň kim tarapyndan ýerine ýetirilýändigini görkezmek üçin by (tarapyndan) ulanylýar:",
                    "section":"B",
                    "content":"This house was built by my grandfather. – Bu öý meniň atam tarapyndan gurlan. (öýi atam guran)",
                    "example":"This house was built by my grandfather."
                },
                {
                    "id":10,
                    "title":"Two hundred people are employed by the company.",
                    "section":"B",
                    "content":"Two hundred people are employed by the company. – Kompaniýa tarapyndan iki ýüz kişi iş bilen üpjün edilen.",
                    "example":"Two hundred people are employed by the company."
                },
                {
                    "id":11,
                    "title":"Passive –yň ýasalyş formasy: be (is/was/have been we ş.m) + geçen zaman goşulmasy(past participle(-ed, -d,-t ýa-da nädogry işligi beýleki şekili)) (done/cleaned/seen we ş.m)",
                    "section":"C",
                    "content":"Passive –yň ýasalyş formasy: be (is/was/have been we ş.m) + geçen zaman goşulmasy(past participle(-ed, -d,-t ýa-da nädogry işligi beýleki şekili)) (done/cleaned/seen we ş.m):",
                    "example":"be cleaned, be damaged, be done, be built, be seen"
                },
                {
                    "id":12,
                    "title":"Present simple:",
                    "section":"C",
                    "content":"active: clean(s) passive: am/is/are cleaned",
                    "example":"Somebody cleaned this room yesterday. - Düýn kimdir biri bu otagy arassalady"
                },
                {
                    "id":13,
                    "title":"This room is cleaned yesterday.",
                    "section":"C",
                    "content":"This room is cleaned yesterday. - Bu otag düýn arassalandy.",
                    "example":"This room is cleaned yesterday."
                },
                {
                    "id":14,
                    "title":"How is this word pronounced?",
                    "section":"C",
                    "content":"How is this word pronounced? Bu söz nähili aýdylýar??",
                    "example":"How is this word pronounced?"
                },
                {
                    "id":15,
                    "title":"I'm not often invited to parties.",
                    "section":"C",
                    "content":"I'm not often invited to parties. - Men köplenç oturylyşyklara çagyrylmaýaryn.",
                    "example":"I'm not often invited to parties."
                }
            ]
        },
        {
            "unit":42,
            "details":[
                {
                    "id":1,
                    "title":"Infinitive",
                    "section":"A",
                    "content":"active (to) do/clean\npassive (to) be done/cleaned",
                    "example":"Somebody will clean the room later. Biri soňrak otagy arassalar.\nThe room will be cleaned later. – Otag soňrak arassalanar.\nThe situation is serious. Something must be done before it's too late. – Ýagdaý agyr. Giç bolmanka bir zat etmegimiz zerur.\nThe music could be heard from a long way away. Aýdym uzakdan eşidilýärdi.\nA new supermarket is going to be built next year. Täze supermarket geljek ýyl gurulmakçy.\nPlease go away. I want to be left alone. Haýyşt gidiň. Men ýalňyz galmak isleýärin."
                },
                {
                    "id":2,
                    "title":"Perfect infinitive",
                    "section":"B",
                    "content":"active have done/cleaned\npassive have been done/cleaned",
                    "example":"Somebody should have cleaned the room. Kimdir biri otagy arassalamalydy.\nThe room should have been cleaned. - Otag arassalanmalydy\nI haven't received the letter yet. It might have been sent to the wrong address. – Haty heniz kabul etmedim. Ol nädogry adresa (salga) berlen bolmagy ahmal.\nIf you hadn't left the car unlocked, it wouldn't have been stolen. – Maşyny açyk galdyrmadyk bolanyňda ol ogurlanan bolmazdy."
                },
                {
                    "id":3,
                    "title":"Present perfect",
                    "section":"C",
                    "content":"active have/has (done)\npassive have/has been (done)",
                    "example":"Somebody has cleaned the room. – Otagy kimdir arassalan.\nThe room has been cleaned. Otag arassalanan.\nHave you heard the news? The criminal has been caught! Täzeligi eşitdiňmi? Jenaýatçy saklandy!\n\"Are you going to the party?\" \"No, I haven't been invited.\" Oturluşyga barýarsyňm? Yok. Men teklip edilmedim."
                },
                {
                    "id":4,
                    "title":"Past perfect",
                    "section":"C",
                    "content":"active had (done)\npassive had been (done)",
                    "example":"Somebody had cleaned the room. Otagy kimdir biri arassalapdy.\nThe room had been cleaned. Otag arassalanypy.\nThe vegetables didn't taste very good. They had been cooked for too long. Gök önümler gaty tagamly däldi. Olar gaty uzak wagtlap bişirilipdi.\nThe car was three years old but hadn't been used very much. - Maşyna üç ýyl boldy, ýöne kän ulanylmady."
                },
                {
                    "id":5,
                    "title":"Present continuous",
                    "section":"D",
                    "content":"active am/is/are (do)ing\npassive am/is/are being (done)",
                    "example":"Somebody is cleaning the room now. – Häzir kimdir biri otagy arassalaýar.\nThe room is being cleaned now. – Otag häzir arassalanýar.\nCan I use your pen, please? It's being used now. - Men galamyňyzy ulanyp bilerinmi? Häzir ol ulanylýar."
                },
                {
                    "id":6,
                    "title":"Past continuous",
                    "section":"D",
                    "content":"active was/were (do)ing\npassive was/were being (done)",
                    "example":"Somebody was cleaning the room when I arrived. Haçanda men gelenimde kimdir biri otagy arassalaýardy.\nThe room was being cleaned when I arrived.- Haçanda men gelenimde otagy arassalanýardy.\nI couldn't use the telephone because it was being used. – Men telefondan ulanyp bilmedim, çünki ol ulanylýardy."
                }
            ]
        },
        {
            "unit":43,
            "details":[
                {
                    "id":1,
                    "title":"I was born..",
                    "section":"A",
                    "content":"Adatça şu formada ulanylýar: I was born.. (\"I am born..\" däl)- Men... doguldym.",
                    "example":"I was born in Chicago. - Men Çikago-da doguldym. past simple\nWhere were you born? Sen nirde doguldyň? (\"where are you born\" däl) past simple\nEmma How many babies are born every day? Her gün näçe çaga dogulýar? present simple"
                },
                {
                    "id":2,
                    "title":"Käbir işlikler bilen iki dolduryjy (object) ulanmak mümkin",
                    "section":"B",
                    "content":"Mysal üçin give işligi:\nWe gave the police the information. Biz polisiýa maglumat berdik.\nDiýmek, bu gürrüňden iki passive gürrüň ýasamak mümkin:\nThe police were given the information. - Polisiýa maglumat berildi. (Polisiýa maglumat üpjün edildi.)\nÝa-da The information was given to the police. Maglumat polisiýa berildi.\n\nişlikler bilen hem iki dolduryjy (object) gelmegi mümkin: ask offer pay show teach tell\nBu işlikler passive –de ulanylanda gürrüň adatça şahs bilen başlanýar:\nI was offered the job but I refused it. – Maňa iş teklip edildi emma men ony ret etdim.\nYou will be given plenty of time to decide. Karar kabul etmek üçin saňa köp wagt beriler.\nHave you been shown the new machine? Saňa täze maşyny görkezdilermi."
                },
                {
                    "id":3,
                    "title":"I don't like being...",
                    "section":"C",
                    "content":"Doing/seeing we şuňa meňzeşleriň passive şekili being done / being seen we ş.m.\nDeňeşdiriň:\nactive:I don't like people telling me what to do. - Maňa näme etmelidigimi aýtýan adamlary halamaýaryn.\n\npassive:I don't like being told what to do. Maňa näme etmelidigimi aýdylmasyny halamaýaryn.\n\nI remember being given a toy drum on my fifth birthday. – Bäş ýaşymda oýunjak deprek sowgat edenleri ýadymda.\nMr. Miller hates being kept waiting. – Jenap Miller garaşdyryp goýulmagyny ýigrenýär.\nWe managed to climb over the wall without being seen. – Diwardan hiç kime görünmän geçmegi başardyk."
                },
                {
                    "id":4,
                    "title":"Get",
                    "section":"D",
                    "content":"Käte passive de be –niň ornuna get-i ulanmak mümkin.\nThere was a fight at the party but nobody got hurt. Şagalaňda uruş boldy emma hiç kim şikeslenmedi.(= nobody was hurt)\nI don't often get invited to parties. Oturlyşyklara ýygy-ýygydan çagyrylmaýaryn. (= I'm not often invited)\nGet sözlemdäki eýä bir hadysa bolup geçende, esasanam şol hadysa garaşylmadyk pursatda bolanda ulanylýar.\nMy finger got cut while cooking.-Nahar taýarlaýarkam barmagym kesildi.\nGet diňe birine bir hadysa bolanda ýa-da bir pursatda üýtgeşme bolanda ulanylýar. Mysal üçin aşakdaky gürrüňlerde get-i ulanmak mümkin däl:\nJill is liked by everybody. Jil hemmä ýarady. (\"gets liked\" däl - bu bir waka däl)\nHe was a mystery man. Nothing was known about him. – Ol syrly adamdy. Ol hakda hiçkim bilmeýärdi. (got known – däl)\nGet esasan resmi däl sözleýişde ulanylýar, be-ni bolsa hemme pursatda ulanmak mümkin.\nŞeýlede get aşakdaky görnüşde ulanylýar. (hatda olaryň manysy passive-de bolmasada):\nget married öýlenmek - äre çykmak.\nget divorced aýrylyşmak - (är-aýal )\nget dressed geýinmek\nget changed geýimi çalyşmak"
                }
            ]
        },
        {
            "unit":44,
            "details":[
                {
                    "id":1,
                    "title":"It is said that...",
                    "section":"A",
                    "content":"Aşakdaky mysaly öwreniň:\nGenri juda garry. Onuň ýaşy näçededigini hiç kim anyk bilmeýär.\nÝöne:\nIt is said that he is 108 years old.\nÝa-da He is said to be 108 years old.\nBu iki gürrüňiň manysy -(Adamlaryň) Aýtmaklarna görä onuň ýaşy 108 -de.",
                    "example":"Cathy works very hard. – Keýsi köp işleýär.\nIt is said that she works 16 hours a day.\nÝa-da She is said to work 16 hours a day.\nTerjimesi:Aýtmaklarna görä, ol gününe 16 sagat işleýär.\nThe strike started three weeks ago. Iştaşlama 3 hepde ozal başlady.\nIt is expected that it will end soon. Ýa-da The strike is expected to end soon.\nTerjimesi: Iş taşalama ýakynda tiz ara gutarmagyna garaşylýar.\nA friend of mine has been arrested. Dostlarymyň biri tussag edildi.\nIt is alleged that he kicked a policeman. Ýa-da He is alleged to have kicked a policeman.\nTerjimesi: Ol polisiýanyň işgärini dependigi barada (esassyz) günäkärlenýär.\nAdatça bu gurluş täze habarlar berlende (meselem heläkçilik barada) ulanylýar. It is reported that two people were injured in the explosion.\nÝa-da Two people are reported to have been injured in the explosion.\nTerjimesi: Habar berilmegine görä, portlamada iki adam ýaralanan."
                },
                {
                    "id":2,
                    "title":"Käbir işlikler bilen ulanylýan passive gurluşlar",
                    "section":"A",
                    "content":"Bu gurluşyň birkaç işlik bilen ulanylyp bolýandygyny gözden geçiriň, esasanda:\nthought believed considered reported known expected alleged understood",
                    "example":"The strike is expected to end soon. – Iş taşalamanyň tiz arada gutarmagyna garaşylýar.\nIt is believed that he is the best candidate for the job. – Ol iş üçin iň gowy kandidat diýip aýdylýar."
                },
                {
                    "id":3,
                    "title":"(Be) supposed to",
                    "section":"B",
                    "content":"It is supposed to.. –nyň manysy adatça it is said to..-nyňka deň.\nLet's go and see that film. It's supposed to be very good. Hany gideliň we ol filmi göreris. Aýtmaklarna görä ol juda gowy. (= it is said to be very good)\n\"Why was he arrested?\" \"He's supposed to have kicked a policeman\"- \"ol näme üçin tussag edildi? Aýtmaklarna görä ol polisiýa işgäreine uran(depen) (= he is said to have kicked a policeman)",
                    "example":"\"You're not supposed to do something\"- bir işi etmegiň zerurdy.\nYou're not supposed to park your car here. It's private parking only. – Sen bu ýere maşyny galdyrmazlygyň zerur. Bu hususy awtoulag duralga.\nMr. Bond is much better after his illness but he's still not supposed to do any heavy work. - Jenap Bond keselinden soň has gowy, ýöne henizem agyr iş etmeli däl."
                },
                {
                    "id":4,
                    "title":"Supposed to (Meaning Variation)",
                    "section":"B",
                    "content":"Ýöne käwagt supposed to-nyň manysy üýtgäp gelýär.\nSomething is supposed to happen - Bir zat bolmagyna garaşylýar.\nÝa-da meýillesdirlen. Köplenç bu aslynda bolup geçmeli zatdan tapawutly.\nTürkmen dilinde köplenç ‘zerur, gerek’ sözlerini aňladýar.",
                    "example":"I'd better hurry. It's nearly 8 o'clock and I'm supposed to be meeting Ann at 8.15. Howluganym makul. Sagat 8-e golaý, men bolsa sagat 8.15 -de En bilen duşuşmagym gerek. (Men En bilen duşuşmagy meýilleşdirdim. Oňa duşuşarys diýip aýdypdym)\nThe train was supposed to arrive at 11.30 but it was an hour late. – Otly 11.30-da gelmegi zerurdy, ýöne bir sagat gijikdi. (jedwele görä otlynyň gelmegi 11.30-a garaşylýardy)\nYou were supposed to clean the windows. Why didn't you do it? - Sen aýnalary arassalamagyň gerekdi. Näme üçin ony etmediň?"
                }
            ]
        },
        {
            "unit":45,
            "details":[
                {
                    "id":1,
                    "title":"have something done",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\nJiliň öýüniň üçegine tupan zeper ýetiripdi, şonuň üçin Jil ony bejertmek üçin ussa ýüz tutdy. Düýn ussa gelip işi bitirdi.\nJill had the roof repaired yesterday. – Düýn Jil Uçegini bejertdi.\nMunuň manysy: Jil üçegi abatlamak üçin birine ýüz tutdy. Ony özi abatlamady.",
                    "example":"Jill repaired the roof. - Jil üçegini abatlady. (özi)\nJill had the roof repaired. Jil üçegini abatlatdy. (bir kişä)\nDid Ann make the dress herself or did she have it made? Köýnegi Eniň özi tikdimi ýa ol ony birine etdirdimi?\n\"Are you going to repair the car yourself?\" \"No, I'm going to have it repaired.\" \"Maşyny özüň bejermekçimiň?\" \"Yok, men ony bejertmekçi."
                },
                {
                    "id":2,
                    "title":"Word order with have something done",
                    "section":"A",
                    "content":"Sözler tertibine üns beriň. Geçen zaman sypatdaşy (past participle) (repaired/cut we ş.m) dolduryjydan (object) (the roof / your hair we ş.m) soň gelýär:\nJill had the roof repair yesterday.\nWhere did you have your hair cut.\nJulia has just had central heating installed in her house.\nI do not like having my photograph taken.\nWe are having the house painted at the moment.\nHow often do you have serviced.",
                    "example":"Jill had the roof repair yesterday. – Düýn Jill üçegini bejertdi.\nWhere did you have your hair cut? – Saçyňy nähili ýerden aldyň?\nJulia has just had central heating installed in her house. – Julýa öýüne merkezi ýylylyk gurnatdy.\nWe are having the house painted at the moment. – Häzir öýümiz boýalýar."
                },
                {
                    "id":3,
                    "title":"get something done",
                    "section":"B",
                    "content":"Şeýlede have something donenyň ýerine get something done gurluşy ulanmak mümkin( esasan resmi däl sözleýişde):\nWhen are you going to get the roof repaired? Haçan üçegi abatlatmakçy? (= have the roof repaired)\nI think you should get your hair cut. Meniň pikirimçe sen saçyňy almaly.",
                    "example":"When are you going to get the roof repaired? – Haçan üçegi abatlatmakçy?\nI think you should get your hair cut. – Meniň pikirimçe sen saçyňy almaly."
                },
                {
                    "id":4,
                    "title":"Other meanings of have something done",
                    "section":"C",
                    "content":"Käwagt have something done başga manyda gelýär.\nMysal üçin:\nJill and Eric had all their money stolen while they were on holiday. - Jill we Erik dynç alyşda ähli pullaryny ogurlatdylar. Elbetde bu sözlemde olaryň pullaryny ogurlamak üçin başga birini hakyna tutandyklaryny aňlatmaýar.\nMunuň manysy - \"olaryň hemme pullary olardan ogurlandy.\"\nGeorge had his nose broken in a fight. Tutluşykda Jorjyň burny döwüldi.\nHave you ever had your passport stolen? - Pasportyňyzy ogurladyp gördüňizmi?",
                    "example":"Jill and Eric had all their money stolen while they were on holiday. – Jill we Erik dynç alyşda ähli pullaryny ogurlatdylar.\nGeorge had his nose broken in a fight. – Tutluşykda Jorjyň burny döwüldi.\nHave you ever had your passport stolen? – Pasportyňyzy ogurladyp gördüňizmi?"
                }
            ]
        },
        {
            "unit":46,
            "details":[
                {
                    "id":1,
                    "title":"Reported Speech - Direct and Reported Speech",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\nPol diýdi: I'm feeling ill. - Men özümi erbet duýýaryn.\nBaşga birine Polyň aýdanlaryny aýtmakçy bolýarsyňyz.\nMunuň iki ýoly bar:\nSiz Polyň aýdanlaryny gaýtalamagyňyz mümkin. (güriň özleşdirme) (direct speech):\nPaul said \"I'm feeling ill\". - \"Men özümi erbet duýýaryn” diýdi Pol.\nÝa-da siz göçürme gürrüňden(reported speech) peýdalanmagyňyz mümkin:\nPaul said that he was feeling ill. – Pol özini kesel duýýandygyny aýtdy.\nDeňeşdiriň:\ndirect: Paul said am feling ill.\nReported: Paul said that he was feeling ill.",
                    "example":"Direct speech: Paul said \"I'm feeling ill\".\nReported speech: Paul said that he was feeling ill."
                },
                {
                    "id":2,
                    "title":"Past Tense in Reported Speech",
                    "section":"B",
                    "content":"Reported speech -i ulanýanymyzda esasy işlik adatça geçen zaman şeklinde bolýar.\n(Tom said that.../ I told her that... we ş.m). Sözlemň beýleki bölegi hem geçen zamanda bolýar:\nTom said that he was feeling ill. - Tom özini hassa duýýandygyny aýtdy.\nI told her that I didn't have any money.- Oňa hiç hili pulum ýokdygyny aýtdym.\nGürrüňde that-y düşürip galdyrmak hem mümkin:\nTom said (that) he was feeling ill.\nI told her (that) I didn’t have any money.\nUmuman garalanda, direct speech-däki häzirki zaman şekli reported speech -de geçen zamana öwrülýär:\nam/is --> was\ndo/does --> did\nwill--> would\nare --> were\nhave/has--> had\ncan--> could\nwant/like/know/go we ş.m wanted/liked/knew/went we ş.m",
                    "example":"Tom said that he was feeling ill. – Tom özini hassa duýýandygyny aýtdy.\nI told her that I didn’t have any money. – Oňa hiç hili pulum ýokdygyny aýtdym."
                },
                {
                    "id":3,
                    "title":"Direct Speech vs. Reported Speech",
                    "section":"C",
                    "content":"Direct speech we reported speech –leri deňeşdiriň:\n\"My parents are very well\"-\"Meniň ene-atam gaty gowy\". Judy said that her parents were very well. Judi onuň ene-atasy gaty gowydygy aýtdy.\nI’m going to learn to drive. - Men maşyn sürmäni öwrenmekçi. Jenny said that she was going to learn to drive. Jeni maşyn sürmäni öwrenjekdigini aýtdy.\n\"John has given up his job\" - \"Jon işini taşlady\".\nMichael said that John had given up his job. Maýkl Jonyň işini taşlandygyny aýtdy.\n\"I'Il phone you tonight\" - \"Bugün agşam saňa jaň ederin\". Dennis said she would phone me tonight. Dennis bugün agşam saňa jaň etjekdigini aýtdy.\n\"I don't know where to go\" - \"Nirä gitjegimi bilmeýärin\". Jack said that she didn't know where to go. Jek onuň nirä gitjegimi bilmeýädigini aýtdy.\n\"I cant come on Friday.\" - \"Men anna güni gelip bilmeýärin\". Mary said she couldn't come on Friday. Meri anna güni gelip bilmeýändigini aýtdy.\n\"I want to eat something\" \"Men bir zatlar iýmek isleýärin\".\nLionel said she wanted to eat something. Laýonel bir zatlar iýmek isleýändigini aýtdy.",
                    "example":"Judy said that her parents were very well. – Judi onuň ene-atasy gaty gowydygy aýtdy.\nJenny said that she was going to learn to drive. – Jeni maşyn sürmäni öwrenjekdigini aýtdy.\nDennis said she would phone me tonight. – Dennis bugün agşam saňa jaň etjekdigini aýtdy."
                },
                {
                    "id":4,
                    "title":"Past Simple vs. Past Perfect in Reported Speech",
                    "section":"C",
                    "content":"Işligiň past simple şekili (did/saw/knew we ş.m) adatça reported speech-de özi galmagy mümkin, ýa-da ony past perfect şekline (had done/ had seen / had known we ş.m) üýtgetmegi mümkin:\ndirect speech\nTom said: \"I woke up feeling ill, so I didn't go to work, \"Men özimi hassa duýup oýanypdym we şonuuň üçin işe barmadym” diýdi Tom.\nreported speech\nTom said (that) he woke up feeling ill, so he didn't go to work.\nÝa-da Tom said (that) he had woken up feeling ill, so he hadn't gone to work. Tom özini hassa duýup oýanypdygyny we şonuň üçin işe barmadygyny aýtdy.",
                    "example":"Tom said (that) he woke up feeling ill, so he didn't go to work. – Tom özini hassa duýup oýanypdym we şonuň üçin işe barmadym.\nTom said (that) he had woken up feeling ill, so he hadn't gone to work. – Tom özini hassa duýup oýanypdygyny we şonuň üçin işe barmadygyny aýtdy."
                }
            ]
        },
        {
            "unit":47,
            "details":[
                {
                    "id":1,
                    "title":"Reported Speech – Tense Changes",
                    "section":"A",
                    "content":"Reported speech ulanylandan her gezekde hem işligi zerur däl. Eger siz bir zat barada maglumat berseňiz we maglumat heniz dogry bolsa işligi üýgetmek zerur däl:\nTom said \"New York is more lively than London\" - \"Nýu Ýork Londona garanyňda işli şäher diýdi Tom. (direct)\nTom said that New York is more lively than London. Tom Nýu-Yorkorkuň Londondan has janlydygyny aýtdy. (reported)\nBu ýerde işligiň zamny özgermedi (is), sebäbi Nýu-Yorkork henizem Londondan has işli şäher. Pursat üýtgemedi.\nAnn said \"I want to go to New York next year\" \"Geljek ýyl Nýu-Yorka gitmek isleýärin\"-diýdi En. (direct)\nAnn said that she wants to go to New York next year. En indiki ýyl Nýu-Yorkorka gitmek isleýändigini aýtdy. (reported)\nBu mysalda, Enhenizemgeljek ýyl Nýu-Ýorkga gitmekçi bolýar.\nÝatda saklaň, işligiň geçen zaman şekline üýtgemegi hem ýalňyş bolmaýar:\nTom said that New York was more lively than London.\nAnn said that she wanted to go to New York next year.\nÝöne aýdylan gürrüň we aslynda bolan hakykatyň arasynda tapawut bolsa işligiň geçen zaman şekili ulanmak zerur.",
                    "example":"Tom said that New York is more lively than London. – Tom Nýu-Yorkorkuň Londondan has janlydygyny aýtdy.\nAnn said that she wants to go to New York next year. – En indiki ýyl Nýu-Ýorkorka gitmek isleýändigini aýtdy."
                },
                {
                    "id":2,
                    "title":"Reported Speech and Tense Change",
                    "section":"A",
                    "content":"Have you heard? Joe is in hospital.\nSONIA: Sonia said you were in hospital. Bir näçe gün ozal siz Sonýany gördüňizmi. Ol size Jonyň keeldigini aýtdy.\nSonia said \"Joe is ill\". \"Jo hassa\", -diýdi Sonýa (direct speech)\nŞol günüň dowamynda siz Jimi görýärsiňiz. Onuň görnüşi gowy ol nirädir bir ýere gidip barýar.\nSiz: \"I didn't expect to see you. Sonia said you were ill\". \"Seni görerin diýip garaşmaýardym. Sonya seniň keseldigiňi aýtdy\"\nBu ýerde \"Sonya said you are ill\" diýmek mümkin däl, çünki ol aslyndahassa däl. Sonýanyň gürrüňi we aslynda bolan waka (Jonyň sagdygy) biri-birine garşy gelýär.",
                    "example":"Sonia said you were ill. – Sonya seniň keseldigiňi aýtdy."
                },
                {
                    "id":3,
                    "title":"Say vs Tell",
                    "section":"B",
                    "content":"TELL SOMEBODY SAY SOMEBODY Gürrüňiň kime ýadylýanyny görkezmek üçin tell ulanylýar:\nWhat did you tell the police? – Polisiýa näme diýdiň? (\"say the police\" däl)\nÝogsam say ulanylýar:\nSonia said that you were ill. - Sonýa seniň keseldigiňi aýtdy.\nWhat did you say?- Näme diýdiňiz?\nEmma \"say something to somebody\" formasyny ulanmak mümkindir:\nWhat did you say to the police? - Polisiýa näme diýdiň?",
                    "example":"What did you tell the police? – Polisiýa näme diýdiň?\nWhat did you say to the police? - Polisiýa näme diýdiň?"
                },
                {
                    "id":4,
                    "title":"Tell / Ask Somebody to Do Something",
                    "section":"C",
                    "content":"Şeýle-de, reported speech-de infinitiv hem ulnaylýar, esasan tell we ask bilen (buyruk we haýyştlarda):\nDirect\n\"Stay in bed\" the doctor said to me\". - \"Ýeriňde ýat\", - maňa diýdi lukman\nReported\nThe doctor told me to stay in bed. Lukman maňa krowatda galmagymy aýtdy.\nDirect:\n\"Don't shout\", I said to Jim\". - \"Gygyrma\" diýdim men Jime,\nReported\nI told Jim not to shout. – Jime gygyrmazlygyny aýtdym.\ndirect \"Don't tell anybody\", Ann said to me\". - \"Hiç kime aýtma\", - diýdi maňa En.\nreported Ann asked me not to tell anybody. – En menden hiç kime aýtmazlygymy sorady.\n\"said to do something\" gurluşy hem ulanmak mümkin:\nThe doctor said to stay in bed. (ýöne \"The doctor said me...\" däl)",
                    "example":"The doctor told me to stay in bed. – Lukman maňa krowatda galmagymy aýtdy.\nI told Jim not to shout. – Jime gygyrmazlygyny aýtdym.\nAnn asked me not to tell anybody. – En menden hiç kime aýtmazlygymy sorady."
                }
            ]
        },
        {
            "unit":48,
            "details":[
                {
                    "id":1,
                    "title":"Soraglar Formasy",
                    "section":"A",
                    "content":"Adatça soraglar söz tertibini üýtgedip düzülýär:\nTom will / Will Tom? Will Tom be here tomorrow? Ertir Tom şu ýerde bolaýarmy?\nyou have /have you?\nHave you been working hard? - Sen köp işleýärsiňmi?\nI can /can I?\nWhat can I do? – Näme edip bilersiň? (\"What I can do?\" däl)\nthe house was / was the house?\nWhen was the house built?- Öý haçan gurlan.",
                    "example":"Will Tom be here tomorrow? – Ertir Tom şu ýerde bolaýarmy?\nHave you been working hard? – Sen köp işleýärsiňmi?\nWhat can I do? – Näme edip bilersiň?"
                },
                {
                    "id":2,
                    "title":"Present Simple Soraglary",
                    "section":"B",
                    "content":"Present simple-daky soraglar do/does ulanylýar:\nyou live /do you live?\nDo you live near here?- Sen şu golaýda ýaşaýarsyňmy?\nthe film begins / does the film begin?\nWhat time does the film begin? – Kino näwagt başlaýar?\nPast simple-daky soraglarda did ulanylýar:\nyou sold/ did you sell?\nDid you sell your car? – Sen maşynyňy satdyňmy?\nthe shop opened / did the shop open?\nWhen did the shop open? Dükan haçan açyldy?\nEmma sözlemde eýe bolup who/what/which -ler gelse, do/does/did ulanylmaýar.",
                    "example":"Do you live near here? – Sen şu golaýda ýaşaýarsyňmy?\nDid you sell your car? – Sen maşynyňy satdyňmy?\nWhen did the shop open? – Dükan haçan açyldy?"
                },
                {
                    "id":3,
                    "title":"Who/What/Which Soraglary",
                    "section":"B",
                    "content":"Dňeşdiriň:\nwho - dolduryjy\nEmma telephoned somebody.\nWho did Emma telephone? Emma kime jaň etdi?\nwho -eýe\nSomebody telephoned Emma.\nWho telephoned Emma? Kim Emma-a jaň etdi?\nAşakdaky mysallarda who/what/which sözler hökmünde gelýär:\nWho wants something to eat?- Kim bir zatlar iýmek isleýär? (\"Who does want?\" däl)\nWhat happened to you last night? – Saňa düýn näme boldy? (\"What did happen?\" däl)\nWhich bus goes to the city centre?- Şäher merkezine haýsy awtobuz gidýär?",
                    "example":"Who did Emma telephone? – Emma kime jaň etdi?\nWho telephoned Emma? – Kim Emma-a jaň etdi?\nWho wants something to eat? – Kim bir zatlar iýmek isleýär?"
                },
                {
                    "id":4,
                    "title":"Predloglar we Why Soraglary",
                    "section":"C",
                    "content":"Who/what/which/where.. bilen başlanýan soraglarda predloglaryň ulanylyşyna üns beriň.\nWho do you want to speak to? Kim bilen gürleşmek isleýäň?\nWhich job has Jane applied for? -Jeýn haýsy işe dalaşgär boldy(ýazyldy)?\nWhere do you come from? -Nirelisiň? (Sen nireli?)\nWhat was the weather like yesterday? Düýn howa nähilidi?\nNegatiw (ýoklyk) soraglar (isn't it.? / didn't you..?)\nÝoklyk soraglar esasan haýran galmagy görkezmek üçin ýa-da diňleýjiniň size goşulmagyna garaşylanda ulanylýar:\nDidn't you hear the bell? I rang it four times. -Jaňy aşitmediňmi? Men ony dört gezek çaldym.\n\"Haven't we met somewhere before?\" \"Yes, I think we have.\" - \"Biz ozal bir ýerde görüşmänmidik?\" \"Hawa, meniň pikirimçe görüşdik.\"\nIsn't it a beautiful day!- Ajaýyp gün! (= It's a beautiful day, isn't it? – Gün ajaýyp, hämi?)",
                    "example":"Who do you want to speak to? – Kim bilen gürleşmek isleýäň?\nWhen did the shop open? – Dükan haçan açyldy?\nIsn't it a beautiful day! – Ajaýyp gün!"
                }
            ]
        },
        {
            "unit":49,
            "details":[
                {
                    "id":1,
                    "title":"Maglumat almak üçin soraglar",
                    "section":"A",
                    "content":"Adatça \"Do you know.?/ Could you tell me..?\" we şuňa meňzeşler maglumat almak üçin ulanylýar.\nSorag gürrüňiň düzümi şu tertipde başlananda ondaky tertibi ýönekeý soragdakydan başgaça bolýar.\nDeňeşdiriň:\nWhere has Tom gone?\nEmma Do you know where Tom has gone? (Do you know where has Tom gone däl)\nTom nirä giden?(ýönekeý sowal)\nTomyň nirä gidenini bilýärsiňizmi?\nSorag (\"Where has Tom gone?\") çylşyrymly sözlemiň (Do you know..? /I don't know... /Can you tell me...?\" we ş.m) bir bölegi bolanda, ol sorag sözleme degişli bolan söz tertibini üýtgetýär.\nDeňeşdiriň:\nWhat time is it? – Sagat näçe?\nÝöne Do you know what time it is? – Sagadyň näçe bolandygyny bilýärsiňizmi?\nWho is that woman? - Ol aýal kim?\nI don't know who that woman is. - Ol aýal kimdigini bilmeýärin.\nWhere can I find Linda? Lindany nirden tapyp bilerin?\nCan you tell me where l can find Linda? -Lindanynirden nirden tapyp biljekdigimi ýaýdyp bilermisiňiz?\ndo/does/did-ler gatnaşan sowallara üns beriň:\nWhat time does the film begin? - Film haçan başlanýar?\nEmma Do you know what time the film begins? Filmiň haçan başlanýandygyny bilýärsiňizmi?\nWhat do you mean? – Näme diýmekçi?\nPlease explain what you mean. – Haýyşt maňa näme diýmekçidigiňizi düşündiriň.\nWhy did Ann leave early? – En näme üçin ir gitdi?\nI wonder why Ann left early. Men haýran, En näme üçin ir gitdi?\nSorag sözler (what, why we ş.m) bolmanda, if ýa-da whether ulanylýar:\nDid anybody see you? - Seni biri gördimi?\nEmma Do you know if / whether anybody saw you? - Seni biri görenini görmänini bilýärsiňizmi?",
                    "example":"Do you know where Tom has gone? – Tomyň nirä gidenini bilýärsiňizmi?\nDo you know what time it is? – Sagadyň näçe bolandygyny bilýärsiňizmi?\nCan you tell me where I can find Linda? – Lindany nirden tapyp biljekdigimi ýaýdyp bilermisiňiz?\nDo you know if anybody saw you? – Seni biri görenini görmänini bilýärsiňizmi?"
                },
                {
                    "id":2,
                    "title":"Reported (Göçürme) Soraglar",
                    "section":"B",
                    "content":"Ýokardaky söz tertibindäki üýtgemeler göçürme (reported) soraglarda hem bolýar:\nDirect : The police officer said to us. \"Where are you going.\"\nReported: The police officer asked us where we were going.\nPolisiýa işgäri bizden nire barýanymyzy sorady.\nDirect: Clare said, \"What time do the banks close?\"\nReported: Clare wanted to know what time the banks closed.\nKler banklar näçede ýapylýandygyny bilmekçi boldy.\nUnit 46B-dagi maglumatlary ýada salyp aşakdaky mysallary öwreniň:\n\"How old are you?\" - \"Ýaşyň näçede?\"\nShe asked (me) how old I was. – Ol meniň näçe ýaşdadygymy sorady.\n\"Do you have a passport?\" \"Pasportyňyz barmy?\"\nShe asked if / whether I had a passport. – Ol meniň pasportymyň bor ýoklygyny sorady.\nWhy didn't you go?- Sen näme üçin barmadyň?\"\nHe asked why I hadn't gone. (ýa-da ...why ! didn't go.) – Ol meniň näme üçin barmandygymy sorady.\n\"Can you speak English?\" - \"Inglisçe gürläp bilýärsiňmi?\"\nAnn wondered if / whether I could speak English. En meniň inglisçe gürläp bilýänimi bilmeýänimi sorady.\n\"What do you do?\" - \"Näme iş edýärsiň?\"\nShe wanted to know what I did. – Ol meniň näme iş edendigimi bilmekçidi.",
                    "example":"The police officer asked us where we were going. – Polisiýa işgäri bizden nire barýanymyzy sorady.\nClare wanted to know what time the banks closed. – Kler banklar näçede ýapylýandygyny bilmekçi boldy.\nShe asked how old I was. – Ol meniň näçe ýaşdadygymy sorady.\nHe asked why I hadn't gone. – Ol meniň näme üçin barmandygymy sorady."
                }
            ]
        },
        {
            "unit":50,
            "details":[
                {
                    "id":1,
                    "title":"Kömekçi işlikler we olaryň ulanylyşy",
                    "section":"A",
                    "content":"Aşakdaky her bir gürrüňde iki işlik bar:\nI have lost my keys. - Men açarlarymy ýitirdim.\nShe can't come to the party. – Ol oturluşyga gelip bilmeýär.\nThe hotel was built ten years ago. - Myhmanhana 10 ýyl ozal gurlan.\nWhere do you live? Siz nirede ýaşaýarsyňyz?\nBu mysallarda have/can't/was/do işlikleri kömekçi (auxiliary) işliklerdir.\nGürrüňiň bir bölegini gaýtalamak islemeseňiz kömekçi işligiň özini ulanmak mümkin:\n\"Have you locked the door?\" \"Yes, I have.\" (= I have locked the door.)\n\"Gapyny gulpladyňmy?\" \"Howwa.\" (=Gapyny gulpladym.)\n\"Are you angry with me?\" \"Of course l'm not\"( I'm not angry) - Maňa gaharyňyz gelýärmi?\" \"Elbetde yok\" (=gaharym gelenak.)\nDo/does/did present simple we past simple zamanlary üçin ulanylýar:\n\"Do you like onions?\" \"Yes, I do. ( I like onions.)\nSogany gowy görýärsiňmi? Hawa. (Sogany gowy görýärin.)\n\"Does Mark smoke?\" \"He did but he doesn’t any more.\"\n\"Mark çekýärmi?\" \"Çekýärdi , ýöne häzir çekmeýär.\"",
                    "example":"\"Have you locked the door?\" \"Yes, I have.\" (= I have locked the door.)\n\"Do you like onions?\" \"Yes, I do. ( I like onions.)\n\"Does Mark smoke?\" \"He did but he doesn’t any more.\""
                },
                {
                    "id":2,
                    "title":"Gyzykly soraglar we haýranlyk görkezmek",
                    "section":"B",
                    "content":"Bir kişiniň gürrüňi size gyzyklydygyny görkezmek üçin have you? / isn't she? / do they? we şuňa meňzeşler ulanylýar.\n\"I've just met Simon\" \"Oh, have you? How is he?\"\nHäzirjek Simony gördüm\" \"Şeýlemi? Nähili ol?\n\"Liz isn't very well today.\" \"Oh, isn't she? What's wrong with her?\"\n\"Liziň bugün ýagaýy yok\" \"Şeýlemi? Oňa näme boldy?\nKäwagt \"gysga soraglar\" haýranlygy görkezmek üçin ulanylýar:\n\"Jim and Nora are getting married.\" \"Are they? Really?\"\n\"Jim we Nora toý tutýarlar. Şeýlemi? Çyndanam?\"",
                    "example":"\"Oh, have you? How is he?\"\n\"Oh, isn't she? What's wrong with her?\"\n\"Are they? Really?\""
                },
                {
                    "id":3,
                    "title":"So we Neither bilen ulanylyş",
                    "section":"C",
                    "content":"Kömekçi işlikler so we neither –ler bilen ulanylýar. Munda so we neither \"hem\" manyda gelýär, ýöne so bolmak manyda, neither bolsa bolmazlyk manysynda ulanylýar.\nŞeýle-de söz tertibine üns beriň:\n\"I'm feeling tired \"So am I\"- \"özümi ýadow duýaryn.\" \"Men hem.\"\n\"I never read newspapers\" \"Neither do I\"- \"Men hiçem gazet okamaýaryn. Men hem\"\nNeither –iň ýerine nor ýa-da ...not...either ulanylmagy mümkin:\n\"I haven't got any money\" \"Neither have l\"\nÝa-da \"Nor have I\" ýa-da \"I haven't either\"\n\"I haven't got any money\" \"Neither have l\" Ýa-da \"Nor have I\" ýa-da \"I haven't either\"",
                    "example":"\"So am I\"- \"Men hem.\"\n\"Neither do I\"- \"Men hem\"\n\"Neither have I\" or \"Nor have I\""
                },
                {
                    "id":4,
                    "title":"I think so, I hope so we ş.m.",
                    "section":"D",
                    "content":"Bir zady gaýtalamak islemeseňiz birnäçe işliklerden soň so-y (şeýle) ulanmak mumkin.\n\"Are those people English?\" \"I think so.\" (= I think they are English.)\n\"Şol adamlar iňlismi?\" \" Men şeýle pikir edýärin. \" (=Meniň pikirimçe olar iňlis.)\nGalanlary hem şuňa meňzeş işlikler we olaryň negatiw görnüşleri:\nI think so /I don't think so Men şeýle pikir edýärin /Men beýle pikir etmeýärin\nI expect so/ l don’t expect Men şeýlelige garaşýaryn / Men şeýleldir diýip garaşmaýaryn\nI hope so /l hope not Şöyle umyt edýärin. Şöyle däl diýip umyt etýärin\nI'm afraid so / ľ'm afraid not Şöyle diýip gorkýary. Şöyle däl diýip gorkýaryn.\nI guess so/I guess not Şöyle takmyn edýärin. Şöyle däl diýip takmyn edýärin\nI suppose so /I don't suppose so ýa-da I suppose not\nŞöyle çaklaýaryn. Beýledir diýip çaklamaýaryn",
                    "example":"\"I think so.\" (= I think they are English.)\nI think so /I don't think so Men şeýle pikir edýärin /Men şeýle pikir etmeýärin\nI expect so/ l don’t expect Men şeýlelige garaşýaryn / Men şeýleldir diýip garaşmaýaryn\nI hope so /l hope not Şöyle umyt edýärin. Şöyle däl diýip umyt etýärin"
                }
            ]
        },
        {
            "unit":51,
            "details":[
                {
                    "id":1,
                    "title":"Mini-soraglar we olaryň ulanylyşy",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\n\"You haven't seen Kate today, have you?\" \"No, I'm afraid not\" Siz bugün Keýti görmediňiz, şeýelemi? \"Yok,görmedim diýip gorkýaryn.\"\n\"It was a good film, wasn’t it? \"Yes, it was great.\" \"Film oňatdy, şeýlemi?\" \"Hawa, ajaýypdy.\"\nHave you? we wasn't it?- iňlis sözleşiginde gürrüňiň ahyrynda goýulýan mini-soraglardyr (question tags). Mini-soraglarda kömekçi (auxiliary) işlik (have/was/will we ş.m) ulanylýar.\nPresent simple we past simple üçin do/does/did ulanylýar:\n\"Karen plays the piano, doesn't she?\" \"Yes, but not very well\" \"Karen pianino çalýar, şeýle dälmi?\" \"Hawa, ýöne gaty oňat däl\"\n\"You didn't lock the door, did you? \"No, forgot\" \"Sen gapyny gulplamadyň, şeýlemi? Yok, ýadymdan çykypdyr.\"",
                    "example":"\"You haven't seen Kate today, have you?\" \"No, I'm afraid not\"\n\"It was a good film, wasn’t it?\" \"Yes, it was great.\"\n\"Karen plays the piano, doesn't she?\" \"Yes, but not very well\""
                },
                {
                    "id":2,
                    "title":"Negatiw mini-soraglar",
                    "section":"B",
                    "content":"Negatiw mini-soraglar habar sözlemden soňra gelýär: (Negtive = ýoklyk)\nMary will be here soon, won't she? negatiw mini-sorag Meri häzir şutaýda bolar, şeýle dälmi?\nThere was a lot of noise, wasn't there? Ol ýer gaty galmagalydy, şeýle dälmi?\nJim should pass the exam, shouldn'the? Jim ekzaminden geçerä, şeýle dälmi?\nNegatiw habar sözlemden soňra mini-soraglaryň gelmegi:\nMary won't be late, will she? Meri gijikmezä şeýlemi?\nThey don't like us, do they? Olar bizi halamaýarlar, şeýlemi?\nYou haven't got a car, have you? Seniň maşynyň ýok, şeýlemi?\nÝokardaky ýaly soaglaryň jogaplarna üns beriň:\nYou're not going out today, are you? – Sen bugün köçä çykmaýarsyň, şeýlemi?\nYes.(Yes, I'm going out)- Howwa. (Howwa, çykýaryn)\nNo.(= No, Tm not going out)- Yok. (= Yok, çıkmaýaryn)",
                    "example":"\"Mary will be here soon, won't she?\"\n\"There was a lot of noise, wasn't there?\"\n\"Jim should pass the exam, shouldn't he?\"\n\"Mary won't be late, will she?\"\n\"You haven't got a car, have you?\""
                },
                {
                    "id":3,
                    "title":"Mini-soragyň manysy",
                    "section":"C",
                    "content":"Mini-soragyň manysy ony nähili halatda aýdylýanyna bagly.\nEger äheňiňiz sözlemiň ahyrynda peselse siz sorag bermeýärsiňiz, siz diňe söhbetdeşiňize size goşulmagyna çagyrýarsyňyz:\n\"It's a nice day, isn't it?\" \"Yes, lovely\"- \"Gün ajaýyp, şeýle dälmi?\" \"Hawa, ajaýyp.\"\n\"Tom doesn't look well today, does he?\"\n\"No, he looks tired\" -\"Tomyň görnüşi gowy däl, şeýle dälmi? Hawa, ol ýadan ýaly göründi.\nEger äheň göterilse bu anyk sorag bolýar:\n\"You haven't seen Mary today, have you?\" \"No, I'm afraid not\" - \"Siz bugün Merini görmediňiz, şeýlemi?\" \"Yok, görmedim diýip gorkýaryn\"\nAdatça negatiw sözlem bilen mini-soraglar bir zat ýa-da maglumat soranlanda ýa-da birinde bir iş etmegini soralanda ulanylýar:\n\"You don't know where Karen is, do you?\" \"Sorry, I’ve no idea.\"-\"Kareniň nirdedigini bilmeýärsiňiz, şeýlemi? Bagyşla, pikirimem ýok.",
                    "example":"\"It's a nice day, isn't it?\" \"Yes, lovely.\"\n\"You haven't seen Mary today, have you?\" \"No, I'm afraid not\"\n\"You don't know where Karen is, do you?\" \"Sorry, I’ve no idea.\""
                },
                {
                    "id":4,
                    "title":"Let's... we Do ... / Don't do ... soraglary",
                    "section":"D",
                    "content":"Let's... den soň mini-sorag ..shall we? görnüşde bolýar:\nLet's go for a walk, shall we?- Sýile gieliň, giderismi (bolýarmy)?\nBuýrukdan (Do... / Don't do... we ş.m) soň mini-sorag ...will you? görnüşde bolýar:\nOpen the door, will you? Gapyny aç, bolýarmy?\n..am I not? mini-soragy adatça ...aren't I? görnüşde bolýar:\nI'm late, aren't I? - Men gijä kaldym, şeýlemi dälmi?",
                    "example":"\"Let's go for a walk, shall we?\"\n\"Open the door, will you?\"\n\"I'm late, aren't I?\""
                }
            ]
        },
        {
            "unit":52,
            "details":[
                {
                    "id":1,
                    "title":"Enjoy, mind we suggest-den soň gelýän işlige +ing goşulýar",
                    "section":"A",
                    "content":"Aşakdaky mysallary öwreniň:\n\"Would you mind closing the door?\" –Gapyny ýapyp göýberersiňizmi? (\"mind to close\" däl)\nI enjoy dancing. - Men tans oýnamakdan lezzet alýaryn. (\"I enjoy to dance\" däl)\nI suggested going to the cinema. – Men kino barmagy teklip etdim. (\"suggested to go däl)\nEnjoy, mind we suggest-den soň gelýän işlige +ing goşulýar (to... däl).\n+ing bilen ulanylýan ýene bir näçe işlikleri sanawy:\nstop\nfancy\nconsider\nadmit\nmiss\ninvolve\nfinish\npostpone\nimagine\navoid\ndenay\nrisk\npractise\nSuddenly everybody stopped talking. Birden hemmeler gürlemekden saklandy.\nHave you finished cleaning the room? Sen otagy arassalap bolduňmy?\nHe tried to avoid answering my question. – Ol meniň soragyma jogap bermezlige çalyşdy.\nHave you ever considered going to live in another country?- Haçandyr bir wagt daşary ýurtda ýaşamak barada pikir edip gördüňmi?\nÝoklyk formasyna not +ing bolýandygyna üns beriň:\nWhen I'm on holiday, I enjoy not having to get up early.- Men dynç alyşda ir turmagym zerur däldiginden rahatlanýaryn.",
                    "example":"\"Would you mind closing the door?\" –Gapyny ýapyp göýberersiňizmi?\n\"I enjoy dancing.\" - Men tans oýnamakdan lezzet alýaryn.\n\"I suggested going to the cinema.\" – Men kino barmagy teklip etdim."
                },
                {
                    "id":2,
                    "title":"Kömekçi işliklerden soň + ing ulanylýar",
                    "section":"B",
                    "content":"Aşakdakylardan soň + ing ulanylýar:\ngive up (= stop) taşlamak, saklamak\nput off (= postpone) – galdyrmak, soňa goýmak\ncarry on / go on (= continue) – dowam etmek\nkeep ýa-da keep on - dowam etdip gelmek (bir zady etmekde)\nPaula has given up smoking. – Paula çekmegi taşlady.\nWe must do something. We can't go on living like this! Bir zat etmegimiz zerur, biz beýläk şeýle ýaşamagy dowam edip bilmeris!",
                    "example":"\"Paula has given up smoking.\" – Paula çekmegi taşlady.\n\"We must do something. We can't go on living like this!\" Bir zat etmegimiz zerur, biz beýläk şeýle ýaşamagy dowam edip bilmeris!"
                },
                {
                    "id":3,
                    "title":"Birnäçe işlikler bilen işlik + ing",
                    "section":"C",
                    "content":"Birnäçe işlikler bilen işlik + ing gurluşy ulanmak mümkin:\nI can't imagine George riding a motorbike. Jorjyň motosikl sürýänini göz öňüne getirip bilemok.\nYou can't stop me doing what I want. – Meni islänimi etmekden saklap bilmersiň.\nDon't keep me waiting!- Meni garaşdyryp goýma!\nPassive formasyna (being done/seen/kept we ş.m) üns beriň: I don't mind being kept waiting. Meni garaşdyryp goýanyň zyýany ýok.(nägile bolmaýaryn). (= I don't mind people keeping me..)",
                    "example":"\"I can't imagine George riding a motorbike.\" Jorjyň motosikl sürýänini göz öňüne getirip bilemok.\n\"You can't stop me doing what I want.\" – Meni islänimi etmekden saklap bilmersiň.\n\"I don't mind being kept waiting.\" Meni garaşdyryp goýanyň zyýany ýok."
                },
                {
                    "id":4,
                    "title":"Tamamlanan iş-hereket barada gürrüň edilende",
                    "section":"D",
                    "content":"Tamamlanan iş-hereket barada gürrüň edilende having done/stolen/said we ş.m ulanylmagy mümkin:\nShe admitted having stolen the money. Ol puly ogurlanyny boýun aldy.\nEmma having (done)- i ulanmak şert däl, tamamlana iş-hereket üçin diňe –ing-ni hem ulanmak mümkin:\nShe admitted stealing the money. - Ol puly ogurlanyny boýun aldy.\nI now regret saying (ýa-da having said) what I said. Indi aýdanlarymy aýdanlygym üçin ökünýärin.\nRegret Unit 55 B-de.",
                    "example":"\"She admitted having stolen the money.\" Ol puly ogurlanyny boýun aldy.\n\"She admitted stealing the money.\" - Ol puly ogurlanyny boýun aldy.\n\"I now regret saying what I said.\" Indi aýdanlarymy aýdanlygym üçin ökünýärin."
                },
                {
                    "id":5,
                    "title":"Some verbs followed by that",
                    "section":"E",
                    "content":"Şu sahypadaky käbir işliklerden(esasan admit/deny/suggest) soň that-y ulanmak mümkin:\nShe denied that she had stolen the money. (ýa-da She denied stealing.)- Ol puly ogurlanyny inkär etdi.\nIan suggested that we went to the cinema. (ýa-da Ian suggested going...) - Aýen kino gitmegi teklip etdi.",
                    "example":"\"She denied that she had stolen the money.\" Ol puly ogurlanyny inkär etdi.\n\"Ian suggested that we went to the cinema.\" - Aýen kino gitmegi teklip etdi."
                }
            ]
        },
        {
            "unit":53,
            "details":[
                {
                    "id":1,
                    "title":"Verb + to ... Ulanylyşy",
                    "section":"A",
                    "content":"Şu ýokardaky işlikler başga işliklerden ozal gelse adatça verb + to.. guluşy ulanylýar:\nIt was late, so we decided to take a taxi. Gaty giç bolupdy, şonuň üçin biz taksi saklamak kararyna geldik.\nSimon was in a difficult situation, so I agreed to lend him some money. Simon agyr ýagdaýdady, şonuň üçin men oňa bir azajyk pul bermäge razy boldum.\nHow old were you when you learnt to drive? - Sürmäni öwreneniňde sen näçe ýaşdadyň?\nI waved to Karen but failed to attract her attention. – Karena elimi galgadym emma men onuň ünsini çekip bilmedim.\nAşakadaky not to... ulanylýan negatiw sözlemlere üns beriň:\nWe decided not to go because of the weather. – Howa ýagdaýy sebäpl biz barmazlyga karar etdik.\nI promised not to be late. Men gijikmezlige wada berdim.\nKöp işlikler bilen to... ulanylmaýar. mysal üçin enjoy/think/suggest:\nI enjoy dancing. Men tans etmekden lezzetlenýärin. (\"I enjoy to dance\" däl)\nIan suggested going to the cinema. Aýen kino barmagy teklip etdi. (\"suggested to go\" däl)\nAre you thinking of buying a car?- Maşyn almak barada pikir edýärsiňmi? (\"thinking to buy\" däl)",
                    "example":"\"It was late, so we decided to take a taxi.\" Gaty giç bolupdy, şonuň üçin biz taksi saklamak kararyna geldik.\n\"I waved to Karen but failed to attract her attention.\" – Karena elimi galgadym emma men onuň ünsini çekip bilmedim.\n\"We decided not to go because of the weather.\" – Howa ýagdaýy sebäpl biz barmazlyga karar etdik."
                },
                {
                    "id":2,
                    "title":"Infinitive after certain verbs",
                    "section":"B",
                    "content":"Aşakdaky işliklerden soň hem to.. ulanylýar:\nseem\nappear\ntend\npretend\nclaim\nMysal üçin:\nThey seem to have plenty of money.- Olaryň puly köpe meňzeýär.\nAnn pretended not to see me as she passed me in the street. En köçede gidip barýarka meni görmediksirän boldy.\nŞeýle dowa infinitiwi (to be doing) we perfect infinitiwi (to have done) bar:\nI pretended to be reading the newspaper. Men özümi gazet okaýana aldym (okaýansyradym).\nYou seem to have lost weight. – Sen horlanana meňzýärsiň.",
                    "example":"\"They seem to have plenty of money.\" Olaryň puly köpe meňzeýär.\n\"I pretended to be reading the newspaper.\" Men özümi gazet okaýana aldym.\n\"You seem to have lost weight.\" – Sen horlanana meňzýärsiň."
                },
                {
                    "id":3,
                    "title":"Decisions and promises",
                    "section":"C",
                    "content":"\"Decide to do something\", \"promise to do something\" ýaly birikmeler ulanylýar.\nŞol sanda \"a decision to do something\" a promise to do something\" (at + to...) ýaly birikmeler ulanylmagy mümkin:\nI think his decision to give up his job was stupid.- Meniň pikirimçe onuň işini taşlamak karary akmaklykldy.\nGeorge has a tendency to talk too much. Jorjda juda köp geplemäge maýyllyk bar.",
                    "example":"\"I think his decision to give up his job was stupid.\" Meniň pikirimçe onuň işini taşlamak karary akmaklykldy.\n\"George has a tendency to talk too much.\" Jorjda juda köp geplemäge maýyllyk bar."
                },
                {
                    "id":4,
                    "title":"Dare verb and usage",
                    "section":"D",
                    "content":"Dare işliginden soň infinitiwi to bilen hem, to-syz hem ulanmak mümkin:\nI wouldn't dare to tell him. Ýa-da I wouldn't dare tell him. – Oňa aýtmana batyrynmazdym.\nEmma negatiw(ýoklyk) daren't (ýa-da dare not) Formasyndan soň infinitiwi to-syz ulanylmagy dogry:\nI daren't tell him what happened. – Oňa näme bolanyny aýdyp bermäge batyrynmaýaryn.",
                    "example":"\"I wouldn't dare to tell him.\" Ýa-da \"I wouldn't dare tell him.\" – Oňa aýtmana batyrynmazdym.\n\"I daren't tell him what happened.\" – Oňa näme bolanyny aýdyp bermäge batyrynmaýaryn."
                },
                {
                    "id":5,
                    "title":"Verbs followed by what/how/whether",
                    "section":"E",
                    "content":"Aşakdaky işliklerden soň what/how/whether we suňa meňzeş +to.. gurluşyny ulanmak mümkün:\nask\ndecide\nknow\nremember\nforget\nexplain\nlearn\nunderstand\nwonder\nWe asked how to get to the station. Biz stansiýa nädip barylýanyny soradyk.\nHave you decided where to go for your holidays? Dynç alyşda nirä gitmelidigi barada karar etdiňmi?\nI don't know whether to go or not. Baraýynmy ýa-da ýok, bilmeýärin.\nDo you understand what to do? Näme etmelidigi düşünýärsiňmi?\nŞeýlede: show / tell/ advise/ teach somebody what / how/ where to do something;\nCan anybody show me how to change the film on this camera? - Kimdir biri maňa bu fotoaparatda plýonkan nähili çalyşylýanyny görkezip bilermi?\nAsk Jack. He'll tell you what to do. Jeckden soraň. Ol näme etmelidigini aýdyp berer.",
                    "example":"\"We asked how to get to the station.\" Biz stansiýa nädip barylýanyny soradyk.\n\"Have you decided where to go for your holidays?\" Dynç alyşda nirä gitmelidigi barada karar etdiňmi?\n\"Can anybody show me how to change the film on this camera?\" - Kimdir biri maňa bu fotoaparatda plýonkan nähili çalyşylýanyny görkezip bilermi?"
                }
            ]
        },
        {
            "unit":54,
            "details":[
                {
                    "id":1,
                    "title":"Want, Ask, Help, Expect, Beg, Would Like, etc.",
                    "section":"A",
                    "content":"Aşakdaky işliklerden soň to... ulanylýar.\nGurluş şeýle görnüşde bolmagy mümkin:\nIşlilk + to.. ýa-da işlik + dolduryjy + to..\nWe expected to be late. – Biz gijikgeris diýip garaşypdyk.\nWe expected Tom to be late. Biz Tom gijiger diýip garaşypdyk.\nWould you like to go now? Häzir gitmegi islärdiňmi?\nWould you like me to go now? – Meniň häzir gitmegimi islärdiňmi?\nHe doesn't want to know. – Ol bilmegi islemeýär.\nHe doesn't want anybody to know. – Ol hiç kimiň bilmegini islemeýär.\nWant işligine üns beriň. \"Want that...\" gurluş ulanylmaýar:\nDo you want me to come with you? – Meniň siz bilen barmagymy isleýärsiňizmi? (\"Do you want that I come\" däl)\nHelp işliginden soň infinitiwi to bilen hem, to-syz hem ulanmak mümkin:\nCan you help me to move this table? Ýa-da Can you help me move this table? Bu stoly süýşürmäne maňa kömek edip bilersiňmi?",
                    "example":"\"We expected to be late.\" – Biz gijikgeris diýip garaşypdyk.\n\"He doesn't want to know.\" – Ol bilmegi islemeýär.\n\"Can you help me to move this table?\" Ýa-da \"Can you help me move this table?\" Bu stoly süýşürmäne maňa kömek edip bilersiňmi?"
                },
                {
                    "id":2,
                    "title":"Tell, Order, Enable, Teach, Persuade, etc.",
                    "section":"B",
                    "content":"Aşakdaky işlikler işlik + dolduryjy + to... gurluşy bilen ulanylýar.\nWho taught you to drive? - Kim saňa sürmäni öwretdi?\nI didn't move the piano by myself. I got somebody to help me. - Pianinony özüm süýşürmedim. Maňa kömek etmäne birini tapdym.\nJim said the switch was dangerous and warned me not to touch it. – Jim wiklýuçateliň howply ekenini aýt we ony ellemezligimi duýdurdy.\nIndiki mysalda işlik passive görnüşde (was warned):\nI was warned not to touch the switch. – Men wiklýuçateli ellemezligim barada duýduryldym",
                    "example":"\"Who taught you to drive?\" - Kim saňa sürmäni öwretdi?\n\"I didn't move the piano by myself. I got somebody to help me.\" - Pianinony özüm süýşürmedim. Maňa kömek etmäne birini tapdym.\n\"I was warned not to touch the switch.\" – Men wiklýuçateli ellemezligim barada duýduryldym"
                },
                {
                    "id":3,
                    "title":"Advise, Encourage, Allow, Permit, Recommend, Forbid",
                    "section":"C",
                    "content":"Ýokardaky işlikleri iki hili gurluşda ulanmak mümkin. deňeşdiriň:\nişlik +-ing (dolduryjysyz) we işlik + dolduryjy + to.\nShe doesn't allow smoking in the house. – Ol gyz öýde çilim çekmäne rugsat bermeýär.\nShe doesn't allow us to smoke in the house. Ol gyz bize öýde çilim çekmäne rugsat bermeýär.\nBu mysaly işligiň passive formasy (be allowed) bilen deňeşdiriň:\nSmoking isn't allowed in the house. Öýde çilim çekmäne rugsat berilmeýär.\nWe are not allowed to smoke in the house.- Bize öýde çilim çekmäne rugsat bermeýär.",
                    "example":"\"She doesn't allow smoking in the house.\" – Ol gyz öýde çilim çekmäne rugsat bermeýär.\n\"We are not allowed to smoke in the house.\"- Bize öýde çilim çekmäne rugsat bermeýär."
                },
                {
                    "id":4,
                    "title":"Make and Let",
                    "section":"D",
                    "content":"Bu iki işlik işlik + dolduryjy + infinitive (to-syz) gurluş bilen ulanylýar:\nThe customs officer made Sally open her case. – Gümrük ofiseri Sälliniň çemodanyn açdyrdy.\nHot weather makes me feel tired. Yssy howa meni ýadow duýdurtýar.\nHer parents don't let her go out alone. -Onuň ata-enesi oňa köçä ýalňyz çykmana rugsat bermeýär.\n\"Make somebody do...\"gurluşy passive-de (be) made to do (to bilen) görnüşde bolýar:\nSally was made to open her case. Sällä çemodanyny açdyrdylar.",
                    "example":"\"The customs officer made Sally open her case.\" – Gümrük ofiseri Sälliniň çemodanyn açdyrdy.\n\"Her parents don't let her go out alone.\" -Onuň ata-enesi oňa köçä ýalňyz çykmana rugsat bermeýär.\n\"Sally was made to open her case.\" Sällä çemodanyny açdyrdylar."
                }
            ]
        },
        {
            "unit":55,
            "details":[
                {
                    "id":1,
                    "title":"Verb + -ing or Verb + to",
                    "section":"A",
                    "content":"Bir işlik haýsydyr bir işlikden soň gelse adatça işlik + -ing ýa-da işlik + to gurluşy ulanylýar:\nadmit, fancy, postpone, avoid, finish, risk, consider, imagine, stop, deny, keep (on), suggest, enjoy, mind.\nAşakdaky işliklerden soň adatça to gelýär:\nafford, fail, offer, agree, forget, plan, arrange, hope, promise, decide, learn, refuse, deserve, manage, threaten.\nAşakdaky mysallary deňeşdiriň:\nThey denied stealing the money. - Olar puly ogurlandyklaryny inkär etdiler.\nThey decided to steal the money. - Olar puly ogurlamana karar etdiler.\nI enjoy going out. - Men köçä çykmagy gow görýärin.\nI want to go out. - Men köçä çykmak isleýärin.\nAdatça -ing iş-hereket birinji işlikden ozal ýa-da bir wagtda edilende ulanylýar:\nstealing | denied\nTo... adatça iş-hereket birinji işlikden soň edilende ulanylýar:\ndecided → to steal\nwant → to go\nBu tapawudy saýgaryp bilmek köplenç peýdalydyr.",
                    "example":"\"They denied stealing the money.\" - Olar puly ogurlandyklaryny inkär etdiler.\n\"They decided to steal the money.\" - Olar puly ogurlamana karar etdiler.\n\"I enjoy going out.\" - Men köçä çykmagy gow görýärin.\n\"I want to go out.\" - Men köçä çykmak isleýärin."
                },
                {
                    "id":2,
                    "title":"Remember and Regret",
                    "section":"B",
                    "content":"Käbir işliklerden soň ýa-da -ing ýa-da to.. ulanylanda many üýtgäp glýär:\nREMEMBER\nI remember doing something. - Men bir iş edýänimi ýatlaýaryn.\nManysy: Bir işi edilenden soň ony ýatlamak:\nI'm absolutely sure I locked the door. I clearly remember locking it. – Men gapyny ýapanyma bütinleý ynamly. Men ony gulplaýanymy anyk-aýdyň ýatlaýaryn.\nI remembered to do something. - Men bir iş etmegim zerurdygyny ýatladym(we ony etdim)\nManysy: Bir iş edilmelidigini ony etmekden ozal ýatlamak.\nI remembered to lock the door when I left but I forgot to shut the windows. – Giip barýarkam gapyny gulplamadygymy ýatladym(ýadyma düşdi), ýöne aýnalary ýapmagy unudypdyryn.\nREGRET\nI regret doing something. - Bir iş edenime ökünýärin.\nI now regret saying what I said. I shouldn't have said it. – Bu geplerni aydanyma ökünýärin. Ony aýtmazlygymy gerekdi.\nI regret to say / to tell you/ to inform you - Men size bulary aýtmagym gerekdigine gynanýaryn(ökünýärin).\n(resmi hatdan) We regret to inform you that we are unable to offer you the job. - Size iş teklip edip bilmeýänimiz barada size ýetirmegimden gynanýaryn(ökünýärin).",
                    "example":"\"I remember doing something.\" - Men bir iş edýänimi ýatlaýaryn.\n\"I remembered to lock the door when I left but I forgot to shut the windows.\" – Giip barýarkam gapyny gulplamadygymy ýatladym, ýöne aýnalary ýapmagy unudypdyryn.\n\"I regret doing something.\" - Bir iş edenime ökünýärin."
                },
                {
                    "id":3,
                    "title":"Go On",
                    "section":"C",
                    "content":"GO ON\nGo on doing something. – Bir iş etmegi dowam etmek.\nThe ministers went on talking for two hours. - Wezirler gürleşigi iki sagat dowam etdiler.\nGo on to do something. – Täze bir zady etmek ýa-da aýtmak.\nAfter discussing the economy, the ministers then went on to talk about foreign policy. - Ykdysadyýeti maslahat edenlerinden soňra wezirler daşary syýasat barada gürleşmegi dowam etdiler.",
                    "example":"\"The ministers went on talking for two hours.\" - Wezirler gürleşigi iki sagat dowam etdiler.\n\"After discussing the economy, the ministers then went on to talk about foreign policy.\" - Ykdysadyýeti maslahat edenlerinden soňra wezirler daşary syýasat barada gürleşmegi dowam etdiler."
                },
                {
                    "id":4,
                    "title":"Begin, Start, Intend, Continue, Bother",
                    "section":"D",
                    "content":"begin, start, intend, continue, bother.\nÝokardaky işliklerden soňra -ing ýa-da to.. ulanylanda many üýtgemeýär. Şeýlelik bilen:\nIt has started raining. Ýa-da It has started to rain. Ýagyş başlady.\nJohn intends buying a house. Ýa-da John intends to buy... Jon öý satyn almak niýetinde.\nEmma adatça –ing-den soň -ing ulanylmaýar.\nIt's starting to rain. – Ýagyş ýagyp başlaýar. (\"it's starting raining\" däl)",
                    "example":"\"It has started raining.\" – Ýagyş başlady.\n\"John intends buying a house.\" – Jon öý satyn almak niýetinde.\n\"It's starting to rain.\" – Ýagyş ýagyp başlaýar."
                }
            ]
        },
        {
            "unit":56,
            "details":[
                {
                    "id":1,
                    "title":"Try to.. we try -ing",
                    "section":"A",
                    "content":"Try to do – etmäne çalyşmak:\nI was very tired. I tried to keep my eyes open but I couldn't. – Men juda ýadowdym. Gözümi açyp turman hereket edýärdim, ýöne turup bilmedim.\nPlease, try to be quiet when you come home. Everyone will be asleep. – Haýyşt, öýe geleniňizde ýuwaşlyk bolmana çalyşyň. Hemme uklap ýatan bolar.\nTry şeýlede \"bir zady (tejribe görnüşde) edip görmek\" manysyny aňlatýar. Mysal üçin:\nThese cakes are delicious. You must try one. – Bu tortlar juda tagamly. Sen birini iýip görmegiň zerur.\nWe couldn't find anywhere to stay. We tried every hotel in the town but they were all full. – Bolmak üçin hiç hili ýer tapyp bilmedik. Biz şäherdäki her bir myhmanhana baryp gördük, ýöne olaryň hemmesi doludy.\nBu manydaky try işliginden soň bir işlik gelse try ... -ing gurluşy ulanylýar:\n\"The photocopier doesn't seem to be working\" \"Try pressing the green button\" – \"Fotokopiýa işleýän ýaly görünmeýär\" \"Ýaşyl düwmä basyp görüň\"\nDeňeşdiriň:\nI tried to move the table but it was too heavy. – Stoly süýşürmäne synanyşdym, emma ol juda agyrdy.\nI didn't like the furniture was arranged, so I tried moving the table to the other side of the room. But it still didn't look right, so I moved it back again. – Mebeliň ýerleşişini halamadym, şonuň üçin stoly otagyň beýleki tarapyna süýşürip gördüm. Ýöne şondada görnüş oňat däldi, şonuň üçin ony ýerine süýşürip goýdum.",
                    "example":"\"I tried to move the table but it was too heavy.\" – Stoly süýşürmäne synanyşdym, emma ol juda agyrdy.\n\"I didn't like the furniture was arranged, so I tried moving the table to the other side of the room. But it still didn't look right, so I moved it back again.\" – Mebeliň ýerleşişini halamadym, şonuň üçin stoly otagyň beýleki tarapyna süýşürip gördüm. Ýöne şondada görnüş oňat däldi, şonuň üçin ony ýerine süýşürip goýdum."
                },
                {
                    "id":2,
                    "title":"Need to... we need -ing",
                    "section":"B",
                    "content":"I need to do something. – Men bir zady etmegim gerek.\nI need to take more exercise. – Men köpräk tügenleşmegim gerek.\nI don't need to come to the meeting, do I? – Mejise gelmegim zerur däl, şeýlemi?\nSomething needs doing. – Bir zat edilmegi zerur.\nThe room looks untidy. It needs tidying. – Otag biserenjam görünýär. Ony tertiplemek zerur.\nThe batteries in the radio needs changing. – Radionyň batareýalary çalşylmagy gerek.\nDo you think my jacket needs cleaning? – Nähili pkir edýärsiň, meniň kurtkam araasalanmagy zerurmy?",
                    "example":"\"I need to do something.\" – Men bir zady etmegim gerek.\n\"Something needs doing.\" – Bir zat edilmegi zerur.\n\"The room looks untidy. It needs tidying.\" – Otag biserenjam görünýär. Ony tertiplemek zerur."
                },
                {
                    "id":3,
                    "title":"Help we can't help",
                    "section":"C",
                    "content":"\"Help to do\" ýa-da \"help do\" (infinitiw to bilen ýa-da to-syz) gurluşlar ulanylýar:\nCan you help me to move this table? – Bu stoly süýşürmäne kömek edip bilersiňmi?\nÝa-da Can you help me move..? – Bu stoly süýşümäne kömek edip bilersiňmi?\nŞeýlede \"can't/couldn't help doing something\" görnüşi hem bar.\nI can't help doing something – Bir zat etmekden özümi saklap bilmeýärin.\nShe tried to be serious but she couldn't help laughing. – Ol çynlakaý görünmäne çalyşdy, ýöne gülmekden özüni saklap bilmedi.\nI'm sorry I'm so nervous. I can't help it. – Beýle tolgunýanym üçin bagyşla, men özümi dürsäp bilemak.",
                    "example":"\"Can you help me to move this table?\" – Bu stoly süýşürmäne kömek edip bilersiňmi?\n\"I can't help doing something.\" – Bir zat etmekden özümi saklap bilmeýärin.\n\"She tried to be serious but she couldn't help laughing.\" – Ol çynlakaý görünmäne çalyşdy, ýöne gülmekden özüni saklap bilmedi."
                }
            ]
        },
        {
            "unit":57,
            "details":[
                {
                    "id":1,
                    "title":"like, love, hate, enjoy, mind, dislike, can't bear, can't stand",
                    "section":"A",
                    "content":"Aşakdaky işlikleriň hemmesi halamak ýa-da halamazly manylaryy berýär. Adatça olar soň gelen işlikere -ing goşulýar:",
                    "example":"Ann hates flying. –En uçmany ýaman görýär."
                },
                {
                    "id":2,
                    "title":"love, hate, can't bear (with to)",
                    "section":"A",
                    "content":"Love, hate we can't bear -lerden soň to-ny hem ulnmak mümkin:",
                    "example":"I love meeting people. Ýa-da I love to meet people. -Adamlar bilen duşuşmany gowy görýärin."
                },
                {
                    "id":3,
                    "title":"enjoy, dislike, mind, can't stand",
                    "section":"A",
                    "content":"Emma enjoy/ dislike /mind / can't Stand- lardan soň diňe -ing ulanylýar:",
                    "example":"I enjoy being alone. – Ýalňyz bolmany gowy görýärin."
                },
                {
                    "id":4,
                    "title":"like (with to)",
                    "section":"B",
                    "content":"I like doing something we I like to do something deň ulanylýar:",
                    "example":"I like getting up early. Ýa-da I like to get up early.- Men ir turmany gowy görýärin."
                },
                {
                    "id":5,
                    "title":"I like doing / I like to do",
                    "section":"B",
                    "content":"Britan iňlis-dilinde \"I like doing\" we \"I like to do\"-laryň araasynda azajyk tapawut bar.",
                    "example":"Do you like cooking? - Nahar bişimäni gowy görýärsiň?"
                },
                {
                    "id":6,
                    "title":"would like, would love, would hate, would prefer (with to)",
                    "section":"C",
                    "content":"Would like/ would love/would hate /would prefer-lerden soň adatça to.. ulanylýar:",
                    "example":"I would like to be rich. - Men baý bolmak islärdim."
                },
                {
                    "id":7,
                    "title":"would like vs like",
                    "section":"C",
                    "content":"I like we I would like -lary deňeşdiriň:",
                    "example":"I would like to play tennis today. - Men bugün tenis oýnamagy islärdim."
                },
                {
                    "id":8,
                    "title":"would mind",
                    "section":"C",
                    "content":"Would mind-dan soň -ing (to... däl) ulanylýanyny ýatda saklaň.",
                    "example":"Would you mind closing the door, please? Gapyny ýapyp goýberersiňizmi, haýyşt?"
                },
                {
                    "id":9,
                    "title":"I would like to have done",
                    "section":"D",
                    "content":"I would like to have done something diýip aýdylma bar. Onuň manysy bir işi (geçmişde) eden bolmagymy isleýärin (ol işi etmedim ýa-da edip bilmedim).",
                    "example":"It's a pity we didn't see Val when we were in London. I would like to have seen her again."
                },
                {
                    "id":10,
                    "title":"would like to have done",
                    "section":"D",
                    "content":"We'd like to have gone on holiday but we didn't have enough money. Dynç alyşa giden bolmagymyzy islärdik, ýöne pulumyz ýeterlik däldi.",
                    "example":"Poor old Tom! I would hate to have been in his position. Garry biçäre Tom! Onuň ornunda bolygy islemezdim."
                }
            ]
        },
        {
            "unit":58,
            "details":[
                {
                    "id":1,
                    "title":"Prefer to do we prefer doing",
                    "section":"A",
                    "content":"\"Prefer to (do)\" we \"prefer –ing-ler umuman nämäni artykrak(makulrak) görülýändigini görkezmek üçin ulanylýar.",
                    "example":"I prefer something to something else. Men bir zady başga zatdan makul görýärin."
                },
                {
                    "id":2,
                    "title":"Prefer (to do) vs prefer (doing)",
                    "section":"A",
                    "content":"I prefer doing something to doing something else. (Bir zat etmegi başga bir zat etmekden makul görýärin.)",
                    "example":"I prefer driving to travelling by train. Otluda syýahat edenimden maşynda gezenimi makul bilýärin."
                },
                {
                    "id":3,
                    "title":"Prefer (to do) rather than",
                    "section":"A",
                    "content":"Emma: I prefer to do something rather than (do) something else.",
                    "example":"I don't like cities. I prefer to live (va-da prefer living) in the country. – Men uly şäherleri halamaýaryn. Men obada ýaşamany makul görýärin."
                },
                {
                    "id":4,
                    "title":"Would prefer (I’d prefer..)",
                    "section":"B",
                    "content":"\"Would prefer\" biriniň mälim pursatda (umuman däl) nämäni makul görýänini, nämäni isleýänini bildirmek üçin ulanylýar.",
                    "example":"Would you prefer tea or coffee? Coffee, please. \"(Size bagly bolanda) Çaý içerdiňizmi ýa kofe? Kofe, haýyşt."
                },
                {
                    "id":5,
                    "title":"Would prefer (with to)",
                    "section":"B",
                    "content":"Would preferdan soň to... ulanylýar (-ing däl):",
                    "example":"\"Shall we go by train?\" \"Well, I'd prefer to go by car\" - \"Otluda bararymysmy? \"Men maşynly barardym.\""
                },
                {
                    "id":6,
                    "title":"Would rather (I'd rather..)",
                    "section":"C",
                    "content":"Would rather (do) = would prefer (to do). Would ratherdan soň to-syz infinitive ulanylýar.",
                    "example":"\"Shall we go by train?\" \"I’d prefer to go by car\" \"I’d rather go by car\" (\"to go\" däl)"
                },
                {
                    "id":7,
                    "title":"Would rather (negative form)",
                    "section":"C",
                    "content":"Ýokluk formasy \"would rather not\" görnüşde bolýar:",
                    "example":"I'm tired. I’d rather not go out tonight. Men ýadow. Bugün agşam daşary çykmak islemezdim."
                },
                {
                    "id":8,
                    "title":"Would rather (with infinitive)",
                    "section":"C",
                    "content":"Would rather -dan soň gelýän gurluşy öwreniň:",
                    "example":"I'd rather stay at home than go to the cinema.- Kino barandan öýde galardym."
                },
                {
                    "id":9,
                    "title":"I'd rather you did something",
                    "section":"D",
                    "content":"Bu gurluşy birinden bir zady etmegini isläniňizde ulanyp bilersiňiz.",
                    "example":"\"Shall stay here?\" \"I’d rather you came with us.\" - \"Şu ýerde galaýynmy?\" \"Sen biz bilen gelmegiňi islärdim.\""
                },
                {
                    "id":10,
                    "title":"I'd rather you did something (negative form)",
                    "section":"D",
                    "content":"Ýokluk formasy \"I'd rather you didn't...\" görnüşde bolýar:",
                    "example":"I'd rather you didn't tell anyone about it. – Bu hakda hiç kime aýtmazlygyňy islärdim."
                }
            ]
        },
        {
            "unit":59,
            "details":[
                {
                    "id":1,
                    "title":"Predlogdan (in/for/about we ş.m) soň işlik gelse şol işlige –ing goşulýar.",
                    "section":"A",
                    "content":"Predlog + (ing)",
                    "example":"Are you interested in working for us? Biz üçin işlemäge gyzyklanýarsyňmy?"
                },
                {
                    "id":2,
                    "title":"Predlog + -ing örnegi",
                    "section":"A",
                    "content":"I'm not very good at learning languages. Men dil öwrenmek ukybym juda gowy däl.",
                    "example":"She must be fed up with studying. Ol okamakdan bizar bolandyr."
                },
                {
                    "id":3,
                    "title":"Additional examples with prepositions",
                    "section":"A",
                    "content":"This knife is only for cutting bread. Bu pyçak diňe çöregi kesmek üçin niýetlenen.",
                    "example":"How about playing tennis? Tenis oýnasak nähili?"
                },
                {
                    "id":4,
                    "title":"Examples with fed up and interested",
                    "section":"A",
                    "content":"\"Interested in somebody (do)ing...\" \"fed up with you (doing... we şular ýaly sözlemler hem bar:",
                    "example":"I'm fed up with you telling me what to do. Näme etmegimi aýtmagyňdan bizar."
                },
                {
                    "id":5,
                    "title":"Before and After with -ing",
                    "section":"B",
                    "content":"Before going out, I phoned Sarah. Daşary çykmazdan ozal men Sara jaň etdim.",
                    "example":"What did you do after leaving school?- Mekdebi tamamlandan soň näme etdiňiz?"
                },
                {
                    "id":6,
                    "title":"By -ing examples",
                    "section":"B",
                    "content":"by -ing (bir zadyň nähili ýagdaýda bolýanyny beýan etmek üçin):",
                    "example":"The burglars got into the house by breaking a window. Ogrylar öýe aýnany döwmek arkaly girdiler."
                },
                {
                    "id":7,
                    "title":"Without -ing",
                    "section":"B",
                    "content":"without -ing:",
                    "example":"I ran ten kilometres without stopping. – Men durman on kilometr ylgadym."
                },
                {
                    "id":8,
                    "title":"Examples with without -ing",
                    "section":"B",
                    "content":"They climbed through the window without anybody seeing them (ýa-da without being seen).",
                    "example":"She needs to work without people disturbing her (ýa-da without being disturbed). – Ol hiç kimiň päsgel bermesiz işlemegi zerur."
                },
                {
                    "id":9,
                    "title":"To -ing",
                    "section":"C",
                    "content":"To adatça infinitiwiň başdaky bölegi (to see / to do we ş.m)",
                    "example":"We decided to go out. - Biz köçä çykmana karar etdik."
                },
                {
                    "id":10,
                    "title":"Would like to + infinitive",
                    "section":"C",
                    "content":"Would you like to play tennis?- Tenis oýnamany işlärdiňizmi?",
                    "example":"Emma to predlog hem bolýandyr (in/for/about/from we şuňa meňzeşler ýaly)."
                },
                {
                    "id":11,
                    "title":"To + preposition + -ing",
                    "section":"C",
                    "content":"I prefer tea to coffee. Men çaýy kofeden makul görýärin.",
                    "example":"I prefer driving to travelling by train. – Otlyda syýahat edenimden maşynda gezmegi artykrak görýärin."
                },
                {
                    "id":12,
                    "title":"Looking forward to + -ing",
                    "section":"C",
                    "content":"Are you looking forward to seeing Ann again? Eni ýene görmäne sabyrsyzlyk bilen garaşýarsyňmy?",
                    "example":"I prefer driving to travelling by train. – Otlyda syýahat edenimden maşynda gezmegi artykrak görýärin."
                }
            ]
        },
        {
            "unit":60,
            "details":[
                {
                    "id":1,
                    "title":"Mysal üçin",
                    "section":"A",
                    "content":"Jeýn amerikaly, emma üç ýyl Britaniýada ýaşaýan. Ol ýerde birinji gezek maşyn sürende oňa juda kyn boldy, çünki sag tarapdan dälde çep tarapdan sürmeli boldy.",
                    "example":"She wasn't used to it. - Ol muňa öwrenişmändi"
                },
                {
                    "id":2,
                    "title":"Mysallar",
                    "section":"A",
                    "content":"She wasn't used to driving on the left. - Çep tarapda sürmäge endik etmändi. Emma ol birazajyk, tejribe alandan soňra çep tarapdan sürmeklik oňaýsyzlygy peseldi.",
                    "example":"She got used to driving on the left. Ol çep tarapda sürmäge öwrenişdi."
                },
                {
                    "id":3,
                    "title":"Üç ýyldan soň, Jeýn üçin bu kynçylyk däl",
                    "section":"A",
                    "content":"She is used to driving on the left. – Ol çep tarapdan sürmäne öwrenip galan.",
                    "example":"Frank lives alone. He doesn't mind this because he has lived alone for 15 years. It's not strange for him. He is used to it."
                },
                {
                    "id":4,
                    "title":"Examples",
                    "section":"A",
                    "content":"Our new flat is on a very busy street. I think we'll get used to the noise. Biziň täze kwartiramyz gatnawy kän köçede ýerleşýär. Meniň pikirimçe biz galamgala öwrenşeris.",
                    "example":"Brenda's husband is often away from home. She doesn't mind this. Brenda is used to him being away."
                },
                {
                    "id":5,
                    "title":"Be/get used to-dan soň infinitiw ulanma",
                    "section":"B",
                    "content":"Be/get used to-dan soň infinitiw (to do/ to drive we ş.m) ulanmak mümkin däl.",
                    "example":"She is used to driving on the left. - Ol çep tarapdan sürmäne öwrenip galan. (\"she is used to drive\" däl)"
                },
                {
                    "id":6,
                    "title":"I am used to...",
                    "section":"B",
                    "content":"\"I am used to...\" sözlemindäki to predlogdyr, Infinitiwiň baş bölegi.",
                    "example":"Frank is used to living alone. Frenk ýalňyz ýaşaman öwrenip galan. (\"used to live\" däl)"
                },
                {
                    "id":7,
                    "title":"Jane had to get used to driving on the left.",
                    "section":"B",
                    "content":"Jane had to get used to driving on the left. - Jeýn çep tarapdan sürmäni öwrenmäne mejbur boldy. (\"get used to drive\" däl)",
                    "example":""
                },
                {
                    "id":8,
                    "title":"I am used to doing vs I used to do",
                    "section":"C",
                    "content":"I am used to (doing) something- Men bir zada(etmäne) etmäne öwrenşip(endik bolup) galan.",
                    "example":"I am used to the weather in this country. Bu ýurtdaky howa ýagdaýyna öwrip galan."
                },
                {
                    "id":9,
                    "title":"Examples with I used to do",
                    "section":"C",
                    "content":"I used to do something. - Men ozal bir iş edýärdim.(indi bolsa etmeýärin) Bu guluş häzirki zaman üçin däl, eýse, diňe geçen zaman üçin ulanylýar.",
                    "example":"I used to drive to work every day, but these days I usually go by bike. – işe her güni maşynly barýardym, emma bugünlerde adatça welosipedde barýaryn."
                },
                {
                    "id":10,
                    "title":"We used to live",
                    "section":"C",
                    "content":"We used to live in a small village, but now we live in London. - Biz kiçi obada ýaşaýardyk, ýöne häzir Londanda ýaşaýarys.",
                    "example":""
                }
            ]
        },
        {
            "unit":61,
            "details":[
                {
                    "id":1,
                    "title":"Mysal üçin",
                    "section":"A",
                    "content":"We talked about the problem. Biz mesele barada gürleşdik.",
                    "example":"You must apologise for what you said. Aýdan gepleriň üçin sen hökman ötünç soramaly."
                },
                {
                    "id":2,
                    "title":"Dolduryjy wezipesinde işlik gelse ol –ing bilen tamamlanýar",
                    "section":"A",
                    "content":"We talked about going to America. Biz Amerika gitmek barad gürleşdik.",
                    "example":"She apologised for not telling the truth. Ol çyn sözlemedigi üçin ötünç sorady."
                },
                {
                    "id":3,
                    "title":"She apologised to somebody for",
                    "section":"A",
                    "content":"Bu işlik \"apologise to somebody for. \" (birinden bir zat üçin ötünç soramak) usulynda ulanylýar:",
                    "example":"She apologised to me for not telling the truth. Ol çyn sözlemedigi üçin menden ötünç sorady."
                },
                {
                    "id":4,
                    "title":"Other examples of verbs",
                    "section":"A",
                    "content":"They insisted on paying for the meal. Olar nahar üçin tölejekdiklerni aýtdylar.",
                    "example":"I'm thinking of buying a new house. Täze öý satyn almak barada oýlanýaryn."
                },
                {
                    "id":5,
                    "title":"More examples with verbs",
                    "section":"A",
                    "content":"Don't even dream of taking the car. Maşyn almak barada hatda arzuwam etme.",
                    "example":"She doesn't approve of gambling. Ol humary makullamaýar."
                },
                {
                    "id":6,
                    "title":"Decisions against",
                    "section":"A",
                    "content":"We have decided against moving to London. Biz Londona göçmezlik kararyna geldik.",
                    "example":"Do you feel like playing tennis? Tenis oýnasyn gelýänini duýýarsyňmy?"
                },
                {
                    "id":7,
                    "title":"Looking forward",
                    "section":"A",
                    "content":"I'm looking forward to meeting her. Onuň bilen duşuşmagy sabyrsyzlyk bilen garaşýarsyňmy.",
                    "example":""
                },
                {
                    "id":8,
                    "title":"Verb + predlog + somebody + -ing",
                    "section":"B",
                    "content":"A bölümdäki käbir işlikler bilen işlik+ predlog + somebody + -ing gurluşy ulanmak mümkin:",
                    "example":"She doesn't approve of me gambling. Ol meniň humar oýnamagymy makullamaýar."
                },
                {
                    "id":9,
                    "title":"Looking forward with somebody",
                    "section":"B",
                    "content":"We' re looking forward to Liz coming. Biz Liziň gelmegine sabyrsyzlyk bilen garaşýarys.",
                    "example":""
                },
                {
                    "id":10,
                    "title":"Verb + predlog + -ing with congratulating",
                    "section":"C",
                    "content":"I congratulated Ann on passing the exam. Eni ekzaminden geçeni bilen gutladym.",
                    "example":"They accused me of telling lies. Olar meni ýalan gürlemekde günäkärlediler."
                },
                {
                    "id":11,
                    "title":"Other verb + predlog + -ing examples",
                    "section":"C",
                    "content":"No one suspected the man of being a spy. Hiç kim ol adam içalydyr diýip güman etmedi.",
                    "example":"What prevented him from coming here? Onuň bu ýere gelmegine näme päsgel berdi."
                },
                {
                    "id":12,
                    "title":"Stopping somebody from doing",
                    "section":"C",
                    "content":"She stopped us from leaving. Ol bizi gitmekden saklady.",
                    "example":"Please forgive me for not writing. Size ýazmadygym üçin meni bagyşlaň."
                },
                {
                    "id":13,
                    "title":"Warned against",
                    "section":"C",
                    "content":"They warned us against buying the car. Olar maşyn almazlygymyz barada duýdurdylar.",
                    "example":"I forgot to thank them for helping me. Olar maňa kömek edenleri üçin sagbol aýtmagy unudypdyryn."
                },
                {
                    "id":14,
                    "title":"Passive constructions",
                    "section":"C",
                    "content":"Bu işlikleriň birnäçe-si passive-de hem ulanylýar.",
                    "example":"I was accused of telling lies. - Meni ýalan gürlemekde aýyplandym."
                },
                {
                    "id":15,
                    "title":"Passive constructions with suspicion",
                    "section":"C",
                    "content":"The man was suspected of being a spy. Adamyň içaly bolandygy barada güman etdiler.",
                    "example":"We were warned against buying a car. – Biz maşyn satyn almazlygymyz barada duýduryldyk."
                }
            ]
        },
        {
            "unit":62,
            "details":[
                {
                    "id":1,
                    "title":"It's no use...",
                    "section":"A",
                    "content":"There's nothing you can do about the situation, so it's no use worrying about it. Bu ýagdaýda hiç zat edip bolmaýar, şonuň üçin ony alada etmegiň geregi ýok.",
                    "example":"It's no good trying to persuade me. You won't succeed. - Meni yrmana synanyşygyňyz gowy däl. Siz meni yryp bilmeersiňiz."
                },
                {
                    "id":2,
                    "title":"There's no point in...",
                    "section":"A",
                    "content":"There's no point in having a car if you never use it. Maşyny hiçem ulanmasaň ony satyn alanyň peýdasy ýok.",
                    "example":""
                },
                {
                    "id":3,
                    "title":"It's (not) worth...",
                    "section":"A",
                    "content":"I live only a short walk from here, so it's not worth taking a taxi. Men men şu golaýda ýaşaýaryn , şonuň üçin taksi tutmagyň geregi ýok.",
                    "example":"What was the film like? Was it worth seeing? - Kino nähili eken? Göreniňe degýärmidi?"
                },
                {
                    "id":4,
                    "title":"Newspapers and reading",
                    "section":"A",
                    "content":"I don't think newspapers are worth reading. Gazetlar okanyňa deger diýip oýlamaýaryn.",
                    "example":""
                },
                {
                    "id":5,
                    "title":"Have difficulty -ing",
                    "section":"B",
                    "content":"\"Have difficulty doing something\" (\"to do\" däl)- \"Bir iş etmekde kynçylyga duş gelmek.",
                    "example":"I had difficulty finding a place to live. Ýaşamana ýer tapmakda kynçylyga duş geldiňizmi?"
                },
                {
                    "id":6,
                    "title":"Other examples with difficulty",
                    "section":"B",
                    "content":"People often have great difficulty reading my writing. Meniň ýazuwymy okamakda adamlar kynçylyk çekýärler.",
                    "example":"I'm sure you'll have no difficulty passing the exam. Seniň hiç hili kynçylyksyz synagdan geçjegiňe men ynanýaryn."
                },
                {
                    "id":7,
                    "title":"Waste of money/time",
                    "section":"C",
                    "content":"a waste of money... / a waste of time... - pul ýitirmek ... / wagt ýitirmek ... - (to...-ny hem ulanmak mümkin)",
                    "example":"It was a waste of time reading that book. –Şol kitaby okamak wagty biderek sarplamakdy."
                },
                {
                    "id":8,
                    "title":"Waste of money example",
                    "section":"C",
                    "content":"It's a waste of money buying things you don't need. Geregi ýok zatlary satyn almak puly biderek sarplamakdyr.",
                    "example":""
                },
                {
                    "id":9,
                    "title":"Spend/waste examples",
                    "section":"C",
                    "content":"He spent hours trying to repair the clock. Ol sagady sazlamak üçin köp wagt ýitirdi.",
                    "example":"I waste a lot of time daydreaming. Pikire çümüp köp wagt ýitirdim."
                },
                {
                    "id":10,
                    "title":"Be busy doing something",
                    "section":"C",
                    "content":"She said she couldn't see me. She was too busy doing other things. – Ol meniň bilen görşüp bilmezligini aýtdy. Sebäbi ol başga zatlar bilen gaty işlidi.",
                    "example":""
                },
                {
                    "id":11,
                    "title":"Go -ing (sports)",
                    "section":"C",
                    "content":"Go -ing birnäçe çäreler (esasanam sport) üçin ulanylýar: go swimming/ go sailing/ go fishing/ go climbing/ go skiing we ş.m",
                    "example":"I’d like to go skiing. –Kankide typmana gitmek islärdim."
                },
                {
                    "id":12,
                    "title":"Go -ing examples",
                    "section":"C",
                    "content":"When did you last go shopping? Soňky gezek haçan dükanba söwda etmäge gitdiň?",
                    "example":""
                },
                {
                    "id":13,
                    "title":"Come swimming/come skiing",
                    "section":"C",
                    "content":"Şeýle-de \"come swimming/come skiing we ş.m \" diýmek hem mümkin:",
                    "example":"Why don't you come swimming with us? Näme üçin biz bilen suwada ýüzmänge barmaýarsyň?"
                }
            ]
        }
    ]
);

// Function to send JSON data to the backend
const sendDataToBackend = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/units', { units: jsonData.value });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};
</script>

<style scoped>
button {
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #4c8bf5;
}
</style>

