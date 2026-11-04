import { Exercise, WorkoutRoutine, UserProfile } from "../types";

export const EXERCISES_DATASET: Exercise[] = [
  {
    "id": "0025",
    "name": "barbell bench press",
    "nameIt": "Panca Piana con Bilanciere",
    "category": "chest",
    "bodyPart": "chest",
    "muscleGroup": "Petto",
    "equipment": "Bilanciere",
    "target": "pectorals",
    "instructionsEn": "Lie flat on a bench with your feet flat on the ground and your back pressed against the bench. Grasp the barbell with an overhand grip slightly wider than shoulder-width apart. Lift the barbell off the rack and hold it directly above your chest with your arms fully extended. Lower the barbell slowly towards your chest, keeping your elbows tucked in. Pause for a moment when the barbell touches your chest. Push the barbell back up to the starting position by extending your arms. Repeat for the desired number of repetitions.",
    "instructionsIt": "Sdraiati su una panca con i piedi appoggiati a terra e la schiena premuta contro la panca. Afferrare il bilanciere con una presa prona leggermente più larga della larghezza delle spalle. Solleva il bilanciere dal rack e tienilo direttamente sopra il petto con le braccia completamente distese. Abbassa lentamente il bilanciere verso il petto, tenendo i gomiti piegati. Fai una pausa per un momento quando il bilanciere tocca il petto. Spingi il bilanciere nella posizione iniziale estendendo le braccia. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Sdraiati su una panca con i piedi appoggiati a terra e la schiena premuta contro la panca.",
      "Afferrare il bilanciere con una presa prona leggermente più larga della larghezza delle spalle.",
      "Solleva il bilanciere dal rack e tienilo direttamente sopra il petto con le braccia completamente distese.",
      "Abbassa lentamente il bilanciere verso il petto, mantenendo i gomiti piegati.",
      "Fai una pausa per un momento quando il bilanciere tocca il tuo petto.",
      "Spingi il bilanciere nella posizione iniziale estendendo le braccia.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif",
    "isCustom": false
  },
  {
    "id": "0314",
    "name": "dumbbell incline bench press",
    "nameIt": "Panca Inclinata con Manubri",
    "category": "chest",
    "bodyPart": "chest",
    "muscleGroup": "Petto",
    "equipment": "Manubri",
    "target": "pectorals",
    "instructionsEn": "Set up an incline bench at a 45-degree angle. Sit on the bench with your feet flat on the ground and your back pressed firmly against the bench. Hold a dumbbell in each hand, palms facing forward, and lift them to shoulder height. Slowly lower the dumbbells to the sides of your chest, keeping your elbows at a 90-degree angle. Push the dumbbells back up to the starting position, fully extending your arms. Repeat for the desired number of repetitions.",
    "instructionsIt": "Installa una panca inclinata con un angolo di 45 gradi. Siediti sulla panca con i piedi piatti a terra e la schiena premuta saldamente contro la panca. Tieni un manubrio in ogni mano, palmi rivolti in avanti, e sollevali all'altezza delle spalle. Abbassa lentamente i manubri ai lati del petto, mantenendo i gomiti a 90 gradi. Spingi i manubri di nuovo alla posizione iniziale, estendendo completamente le braccia. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Installa una panca inclinata con un angolo di 45 gradi.",
      "Siediti sulla panca con i piedi piatti a terra e la schiena premuta saldamente contro la panca.",
      "Tieni un manubrio in ogni mano, palmi rivolti in avanti, e sollevali all'altezza delle spalle.",
      "Abbassa lentamente i manubri ai lati del petto, mantenendo i gomiti a 90 gradi.",
      "Spingi i manubri di nuovo alla posizione iniziale, estendendo completamente le braccia.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0314-ns0SIbU.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0314-ns0SIbU.gif",
    "isCustom": false
  },
  {
    "id": "0308",
    "name": "dumbbell fly",
    "nameIt": "Croci con Manubri su Panca",
    "category": "chest",
    "bodyPart": "chest",
    "muscleGroup": "Petto",
    "equipment": "Manubri",
    "target": "pectorals",
    "instructionsEn": "Lie flat on a bench with a dumbbell in each hand, palms facing each other. Extend your arms straight up over your chest, with a slight bend in your elbows. Keeping a slight bend in your elbows, lower your arms out to the sides in a wide arc until you feel a stretch in your chest. Pause for a moment, then reverse the movement and bring the dumbbells back up to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Sdraiati disteso su una panchina con un manubrio in ogni mano, i palmi uno verso l'altro. Allunga le braccia dritte sopra il petto, con una leggera piega dei gomiti. Mantenendo una leggera piega dei gomiti, abbassa le braccia ai lati in un ampio arco finché non senti uno stiramento al petto. Fermati un attimo, poi inverti il movimento e riporta i manubri alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Sdraiati disteso su una panchina con un manubrio in ogni mano, i palmi uno verso l'altro.",
      "Allunga le braccia dritte sopra il petto, con una leggera piega dei gomiti.",
      "Mantenendo una leggera piega dei gomiti, abbassa le braccia ai lati in un ampio arco finché non senti uno stiramento al petto.",
      "Fermati un attimo, poi inverti il movimento e riporta i manubri alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0308-yz9nUhF.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0308-yz9nUhF.gif",
    "isCustom": false
  },
  {
    "id": "0158",
    "name": "cable decline fly",
    "nameIt": "Croci ai Cavi Alti",
    "category": "chest",
    "bodyPart": "chest",
    "muscleGroup": "Petto",
    "equipment": "Cavi",
    "target": "pectorals",
    "instructionsEn": "Adjust the cable machine to a decline position. Stand facing away from the machine with your feet shoulder-width apart. Hold the handles with your palms facing forward and your arms extended straight out in front of you. Keeping a slight bend in your elbows, open your arms out to the sides in a controlled motion. Pause for a moment at the fully extended position, then slowly return to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Regola la macchina a cavo in posizione declinante. Mettiti di spalle alla macchina con i piedi a larghezza delle spalle. Tieni le maniglie con i palmi rivolti in avanti e le braccia estese dritte davanti a te. Mantenendo una leggera piega dei gomiti, apri le braccia ai lati in un movimento controllato. Fermati un attimo nella posizione completamente estesa, poi torna lentamente alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Regola la macchina a cavo in posizione declinante.",
      "Mettiti di spalle alla macchina con i piedi a larghezza delle spalle.",
      "Tieni le maniglie con i palmi rivolti in avanti e le braccia estese dritte davanti a te.",
      "Mantenendo una leggera piega dei gomiti, apri le braccia ai lati in un movimento controllato.",
      "Fermati un attimo nella posizione completamente estesa, poi torna lentamente alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0158-7saC5zz.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0158-7saC5zz.gif",
    "isCustom": false
  },
  {
    "id": "0975",
    "name": "band close-grip push-up",
    "nameIt": "Piegamenti sulle Braccia (Push-up)",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Petto",
    "equipment": "Corpo Libero",
    "target": "triceps",
    "instructionsEn": "Place a band around your upper arms, just above the elbows. Assume a push-up position with your hands directly under your shoulders and your body in a straight line from head to heels. Bend your elbows and lower your chest towards the ground, keeping your elbows close to your sides. Push through your palms to extend your arms and return to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Posiziona una fascia attorno alla parte superiore delle braccia, appena sopra i gomiti. Assumi una posizione di push-up con le mani direttamente sotto le spalle e il corpo in linea retta dalla testa ai talloni. Piega i gomiti e abbassa il petto verso terra, mantenendo i gomiti vicini ai fianchi. Spingi attraverso i palmi delle mani per estendere le braccia e tornare alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Posiziona una fascia attorno alla parte superiore delle braccia, appena sopra i gomiti.",
      "Assumi una posizione di push-up con le mani direttamente sotto le spalle e il corpo in linea retta dalla testa ai talloni.",
      "Piega i gomiti e abbassa il petto verso terra, mantenendo i gomiti vicini ai fianchi.",
      "Spingi attraverso i palmi delle mani per estendere le braccia e tornare alla posizione di partenza.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0975-ufaxB52.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0975-ufaxB52.gif",
    "isCustom": false
  },
  {
    "id": "3287",
    "name": "elbow dips",
    "nameIt": "Dip alle Parallele",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Petto",
    "equipment": "Corpo Libero",
    "target": "triceps",
    "instructionsEn": "Sit on the edge of a bench or chair with your hands gripping the edge next to your hips. Slide your hips forward off the bench and straighten your legs, keeping your heels on the ground. Bend your elbows and lower your body towards the ground, keeping your back close to the bench. Pause for a moment at the bottom, then push through your hands to straighten your arms and lift your body back up to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Siediti sul bordo di una panca o di una sedia con le mani che stringono il bordo accanto ai fianchi. Fai scivolare i fianchi in avanti dalla panca e raddrizzare le gambe, mantenendo i talloni a terra. Piega i gomiti e abbassa il corpo verso terra, tenendo la schiena vicina alla panca. Fermati un attimo in basso, poi spingi tra le mani per raddrizzare le braccia e sollevare il corpo fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Siediti sul bordo di una panca o di una sedia con le mani che stringono il bordo accanto ai fianchi.",
      "Fai scivolare i fianchi in avanti dalla panca e raddrizzare le gambe, mantenendo i talloni a terra.",
      "Piega i gomiti e abbassa il corpo verso terra, tenendo la schiena vicina alla panca.",
      "Fermati un attimo in basso, poi spingi tra le mani per raddrizzare le braccia e sollevare il corpo fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/3287-LkoAWAE.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/3287-LkoAWAE.gif",
    "isCustom": false
  },
  {
    "id": "0015",
    "name": "assisted parallel close grip pull-up",
    "nameIt": "Trazioni alla Sbarra",
    "category": "back",
    "bodyPart": "back",
    "muscleGroup": "Dorso",
    "equipment": "Corpo Libero",
    "target": "lats",
    "instructionsEn": "Adjust the machine to your desired weight and height. Place your hands on the parallel bars with a close grip, palms facing each other. Hang from the bars with your arms fully extended and your feet off the ground. Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body. Continue pulling until your chin is above the bars. Pause for a moment at the top, then slowly lower your body back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Regola la macchina in base al peso e all'altezza desiderati. Posiziona le mani sulle barre parallele con una presa salda, i palmi rivolti l'uno verso l'altro. Appendi alle sbarre con le braccia completamente distese e i piedi sollevati da terra. Coinvolgi i muscoli della schiena e solleva il corpo verso le sbarre, mantenendo i gomiti vicini al corpo. Continua a tirare finché il mento non è sopra le sbarre. Fai una pausa per un momento in alto, quindi abbassa lentamente il corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Regola la macchina in base al peso e all'altezza desiderati.",
      "Posiziona le mani sulle barre parallele con una presa salda, i palmi rivolti l'uno verso l'altro.",
      "Appendi alle sbarre con le braccia completamente distese e i piedi sollevati da terra.",
      "Coinvolgi i muscoli della schiena e solleva il corpo verso le sbarre, mantenendo i gomiti vicini al corpo.",
      "Continua a tirare finché il mento non è sopra le sbarre.",
      "Fai una pausa per un momento in alto, quindi abbassa lentamente il corpo fino alla posizione di partenza.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0015-vrhHa6D.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0015-vrhHa6D.gif",
    "isCustom": false
  },
  {
    "id": "2330",
    "name": "cable lat pulldown full range of motion",
    "nameIt": "Lat Machine Avanti al Petto",
    "category": "back",
    "bodyPart": "back",
    "muscleGroup": "Dorso",
    "equipment": "Cavi",
    "target": "lats",
    "instructionsEn": "Sit on the lat pulldown machine with your knees positioned under the pads. Grasp the cable bar with an overhand grip, slightly wider than shoulder-width apart. Lean back slightly and keep your chest up, maintaining a slight arch in your lower back. Pull the bar down towards your upper chest, squeezing your shoulder blades together. Pause for a moment at the bottom of the movement, then slowly release the bar back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Siediti sulla macchina per il lat pulldown con le ginocchia posizionate sotto le protezioni. Afferra la barra con una presa sopra la mano, leggermente più larga della larghezza delle spalle. Inclinati leggermente all'indietro e tieni il petto sollevato, mantenendo un leggero arco nella parte bassa della schiena. Tira la barra verso il torace superiore, stringendo le scapole insieme. Fermati un attimo alla base del movimento, poi rilasci lentamente la barra alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Siediti sulla macchina per il lat pulldown con le ginocchia posizionate sotto le protezioni.",
      "Afferra la barra con una presa sopra la mano, leggermente più larga della larghezza delle spalle.",
      "Inclinati leggermente all'indietro e tieni il petto sollevato, mantenendo un leggero arco nella parte bassa della schiena.",
      "Tira la barra verso il torace superiore, stringendo le scapole insieme.",
      "Fermati un attimo alla base del movimento, poi rilasci lentamente la barra alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2330-LEprlgG.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif",
    "isCustom": false
  },
  {
    "id": "0027",
    "name": "barbell bent over row",
    "nameIt": "Rematore con Bilanciere",
    "category": "back",
    "bodyPart": "back",
    "muscleGroup": "Dorso",
    "equipment": "Bilanciere",
    "target": "upper back",
    "instructionsEn": "Stand with your feet shoulder-width apart and knees slightly bent. Bend forward at the hips while keeping your back straight and chest up. Grasp the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Pull the barbell towards your lower chest by retracting your shoulder blades and squeezing your back muscles. Pause for a moment at the top, then slowly lower the barbell back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai in piedi con i piedi alla larghezza delle spalle e le ginocchia leggermente piegate. Piegati in avanti sui fianchi mantenendo la schiena dritta e il petto in alto. Afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Tirare il bilanciere verso la parte inferiore del torace ritraendo le scapole e contraendo i muscoli della schiena. Fermati per un momento in alto, quindi abbassa lentamente il bilanciere nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai in piedi con i piedi alla larghezza delle spalle e le ginocchia leggermente piegate.",
      "Piegati in avanti sui fianchi mantenendo la schiena dritta e il petto in alto.",
      "Afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle.",
      "Tirare il bilanciere verso la parte inferiore del torace ritraendo le scapole e contraendo i muscoli della schiena.",
      "Fermati per un momento in alto, quindi abbassa lentamente il bilanciere nella posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0027-eZyBC3j.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0027-eZyBC3j.gif",
    "isCustom": false
  },
  {
    "id": "0292",
    "name": "dumbbell one arm bent-over row",
    "nameIt": "Rematore con Manubrio Singolo",
    "category": "back",
    "bodyPart": "back",
    "muscleGroup": "Dorso",
    "equipment": "Manubri",
    "target": "upper back",
    "instructionsEn": "Stand with your feet shoulder-width apart, holding a dumbbell in one hand with your palm facing your body. Bend your knees slightly and hinge forward at the hips, keeping your back straight and your core engaged. Let the dumbbell hang straight down towards the floor, with your arm fully extended. Pull the dumbbell up towards your chest, keeping your elbow close to your body and squeezing your shoulder blades together. Pause for a moment at the top, then slowly lower the dumbbell back down to the starting position. Repeat for the desired number of repetitions, then switch sides.",
    "instructionsIt": "Stai in piedi con i piedi a larghezza delle spalle, tenendo un manubrio in una mano con il palmo rivolto verso il corpo. Flette leggermente le ginocchia e incurva in avanti sui fianchi, mantenendo la schiena dritta e il core attivo. Lascia che il manubrio penda dritto verso il pavimento, con il braccio completamente esteso. Tira il manubrio verso il petto, tenendo il gomito vicino al corpo e stringendo le scapole insieme. Fermati un attimo in cima, poi abbassa lentamente il manubrio fino alla posizione di partenza. Ripeti per il numero desiderato di ripetizioni, poi cambia lato.",
    "instructionStepsIt": [
      "Stai in piedi con i piedi a larghezza delle spalle, tenendo un manubrio in una mano con il palmo rivolto verso il corpo.",
      "Flette leggermente le ginocchia e incurva in avanti sui fianchi, mantenendo la schiena dritta e il core attivo.",
      "Lascia che il manubrio penda dritto verso il pavimento, con il braccio completamente esteso.",
      "Tira il manubrio verso il petto, tenendo il gomito vicino al corpo e stringendo le scapole insieme.",
      "Fermati un attimo in cima, poi abbassa lentamente il manubrio fino alla posizione di partenza.",
      "Ripeti per il numero desiderato di ripetizioni, poi cambia lato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0292-C0MA9bC.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0292-C0MA9bC.gif",
    "isCustom": false
  },
  {
    "id": "0861",
    "name": "cable seated row",
    "nameIt": "Pulley Basso al Cavo",
    "category": "back",
    "bodyPart": "back",
    "muscleGroup": "Dorso",
    "equipment": "Cavi",
    "target": "upper back",
    "instructionsEn": "Sit on the cable row machine with your feet flat on the footrests and your knees slightly bent. Grasp the handles with an overhand grip, keeping your back straight and your shoulders relaxed. Pull the handles towards your body, squeezing your shoulder blades together. Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Siediti sulla macchina a remi con i piedi piatti sui piedi e le ginocchia leggermente piegate. Afferra le maniglie con una presa sopra la mano, tenendo la schiena dritta e le spalle rilassate. Tira le maniglie verso il corpo, stringendo le scapole insieme. Fermati un attimo al picco del movimento, poi rilasci lentamente le maniglie alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Siediti sulla macchina a remi con i piedi piatti sui piedi e le ginocchia leggermente piegate.",
      "Afferra le maniglie con una presa sopra la mano, tenendo la schiena dritta e le spalle rilassate.",
      "Tira le maniglie verso il corpo, stringendo le scapole insieme.",
      "Fermati un attimo al picco del movimento, poi rilasci lentamente le maniglie alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0861-fUBheHs.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0861-fUBheHs.gif",
    "isCustom": false
  },
  {
    "id": "0032",
    "name": "barbell deadlift",
    "nameIt": "Stacco da Terra (Deadlift)",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Dorso",
    "equipment": "Bilanciere",
    "target": "glutes",
    "instructionsEn": "Stand with your feet shoulder-width apart and the barbell on the ground in front of you. Bend your knees and hinge at the hips to lower your torso and grip the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Keep your back straight and chest lifted as you drive through your heels to lift the barbell off the ground, extending your hips and knees. As you stand up straight, squeeze your glutes and keep your core engaged. Lower the barbell back down to the ground by bending at the hips and knees, keeping your back straight. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi alla larghezza delle spalle e il bilanciere a terra davanti a te. Piega le ginocchia e fai perno sui fianchi per abbassare il busto e afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Tieni la schiena dritta e il petto sollevato mentre spingi i talloni per sollevare il bilanciere da terra, estendendo i fianchi e le ginocchia. Mentre stai in piedi, contrai i glutei e mantieni il core impegnato. Abbassa il bilanciere a terra piegando le anche e le ginocchia, mantenendo la schiena dritta. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai con i piedi alla larghezza delle spalle e il bilanciere a terra davanti a te.",
      "Piega le ginocchia e fai perno sui fianchi per abbassare il busto e afferrare il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle.",
      "Tieni la schiena dritta e il petto sollevato mentre spingi i talloni per sollevare il bilanciere da terra, estendendo i fianchi e le ginocchia.",
      "Mentre stai in piedi, contrai i glutei e mantieni il core impegnato.",
      "Abbassa il bilanciere a terra piegando le anche e le ginocchia, mantenendo la schiena dritta.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0032-ila4NZS.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0032-ila4NZS.gif",
    "isCustom": false
  },
  {
    "id": "0043",
    "name": "barbell full squat",
    "nameIt": "Squat con Bilanciere",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Bilanciere",
    "target": "glutes",
    "instructionsEn": "Stand with your feet shoulder-width apart, toes slightly turned out. Hold the barbell across your upper back, resting it on your traps or rear delts. Engage your core and keep your chest up as you begin to lower your body down. Bend at the knees and hips, pushing your hips back and down as if sitting into a chair. Lower yourself until your thighs are parallel to the ground or slightly below. Keep your knees in line with your toes and your weight in your heels. Drive through your heels to stand back up, extending your hips and knees. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi alla larghezza delle spalle, le dita leggermente rivolte verso l'esterno. Tieni il bilanciere sulla parte superiore della schiena, appoggiandolo sulle trappole o sui deltoidi posteriori. Coinvolgi il tuo core e mantieni il petto sollevato mentre inizi ad abbassare il corpo. Piega le ginocchia e i fianchi, spingendo i fianchi indietro e in basso come se fossi seduto su una sedia. Abbassati finché le cosce non sono parallele al suolo o leggermente più in basso. Tieni le ginocchia in linea con le dita dei piedi e il peso sui talloni. Spingi i talloni per rialzarti, estendendo i fianchi e le ginocchia. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai con i piedi alla larghezza delle spalle, le dita leggermente rivolte verso l'esterno.",
      "Tieni il bilanciere sulla parte superiore della schiena, appoggiandolo sulle trappole o sui deltoidi posteriori.",
      "Coinvolgi il tuo core e mantieni il petto sollevato mentre inizi ad abbassare il corpo.",
      "Piega le ginocchia e i fianchi, spingendo i fianchi indietro e in basso come se fossi seduto su una sedia.",
      "Abbassati finché le cosce non sono parallele al suolo o leggermente più in basso.",
      "Tieni le ginocchia in linea con le dita dei piedi e il peso sui talloni.",
      "Spingi i talloni per rialzarti, estendendo i fianchi e le ginocchia.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0043-qXTaZnJ.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0043-qXTaZnJ.gif",
    "isCustom": false
  },
  {
    "id": "2287",
    "name": "lever alternate leg press",
    "nameIt": "Pressa per Gambe (Leg Press)",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Macchina",
    "target": "quads",
    "instructionsEn": "Adjust the seat and foot platform of the leverage machine to your desired position. Sit on the machine with your back against the backrest and your feet on the foot platform. Place your hands on the handles or sides of the machine for stability. Push one foot against the foot platform, extending your leg until it is almost fully straight. Pause for a moment, then slowly bend your leg and return to the starting position. Repeat with the other leg. Continue alternating legs for the desired number of repetitions.",
    "instructionsIt": "Regola il sedile e la pedana della macchina con leva nella posizione desiderata. Sedersi sulla macchina con la schiena contro lo schienale e i piedi sulla pedana. Metti le mani sulle maniglie o sui lati della macchina per stabilità. Spingere un piede contro la pedana, estendendo la gamba finché non è quasi completamente diritta. Fai una pausa per un momento, poi piega lentamente la gamba e torna alla posizione di partenza. Ripeti con l'altra gamba. Continua ad alternare le gambe per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Regola il sedile e la pedana della macchina con leva nella posizione desiderata.",
      "Sedersi sulla macchina con la schiena contro lo schienale e i piedi sulla pedana.",
      "Metti le mani sulle maniglie o sui lati della macchina per stabilità.",
      "Spingere un piede contro la pedana, estendendo la gamba finché non è quasi completamente diritta.",
      "Fai una pausa per un momento, poi piega lentamente la gamba e torna alla posizione di partenza.",
      "Ripeti con l'altra gamba.",
      "Continua ad alternare le gambe per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2287-V07qpXy.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2287-V07qpXy.gif",
    "isCustom": false
  },
  {
    "id": "0585",
    "name": "lever leg extension",
    "nameIt": "Leg Extension",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Macchina",
    "target": "quads",
    "instructionsEn": "Adjust the seat height and backrest of the machine to fit your body. Sit on the machine with your back against the backrest and your feet on the footpad. Grasp the handles or sidebars for stability. Extend your legs forward by straightening your knees, lifting the weight. Pause for a moment at the top, then slowly lower the weight back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Regola l'altezza del sedile e lo schienale della macchina per adattarli al tuo corpo. Sedersi sulla macchina con la schiena appoggiata allo schienale e i piedi sul poggiapiedi. Afferrare le maniglie o le barre laterali per garantire stabilità. Estendi le gambe in avanti raddrizzando le ginocchia, sollevando il peso. Fermati per un momento in alto, quindi abbassa lentamente il peso nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Regola l'altezza del sedile e lo schienale della macchina per adattarli al tuo corpo.",
      "Sedersi sulla macchina con la schiena appoggiata allo schienale e i piedi sul poggiapiedi.",
      "Afferrare le maniglie o le barre laterali per garantire stabilità.",
      "Estendi le gambe in avanti raddrizzando le ginocchia, sollevando il peso.",
      "Fermati per un momento in alto, quindi abbassa lentamente il peso nella posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0585-my33uHU.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0585-my33uHU.gif",
    "isCustom": false
  },
  {
    "id": "0599",
    "name": "lever seated leg curl",
    "nameIt": "Leg Curl da Seduto",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Macchina",
    "target": "hamstrings",
    "instructionsEn": "Adjust the machine to fit your body and sit on it with your back against the backrest. Place your lower legs under the padded lever, just above your ankles. Grasp the handles on the sides of the machine for support. Keeping your upper legs stationary, exhale and curl your legs up as far as possible. Hold the contracted position for a brief pause as you squeeze your hamstrings. Inhale and slowly lower the lever back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Regola la macchina per adattarla al tuo corpo e siediti con la schiena contro lo schienale. Posiziona la parte inferiore delle gambe sotto la leva imbottita, appena sopra le caviglie. Afferrare le maniglie ai lati della macchina per sostenersi. Mantenendo ferma la parte superiore delle gambe, espira e piega le gambe il più possibile. Mantieni la posizione contratta per una breve pausa mentre contrai i muscoli posteriori della coscia. Inspira e abbassa lentamente la leva nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Regola la macchina per adattarla al tuo corpo e siediti con la schiena contro lo schienale.",
      "Posiziona la parte inferiore delle gambe sotto la leva imbottita, appena sopra le caviglie.",
      "Afferrare le maniglie ai lati della macchina per sostenersi.",
      "Mantenendo ferma la parte superiore delle gambe, espira e piega le gambe il più possibile.",
      "Mantieni la posizione contratta per una breve pausa mentre contrai i muscoli posteriori della coscia.",
      "Inspira e abbassa lentamente la leva nella posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0599-Zg3XY7P.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0599-Zg3XY7P.gif",
    "isCustom": false
  },
  {
    "id": "0336",
    "name": "dumbbell lunge",
    "nameIt": "Affondi sul Posto con Manubri",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Manubri",
    "target": "glutes",
    "instructionsEn": "Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Take a step forward with your right foot, lowering your body into a lunge position. Keep your back straight and your chest up as you lower your body. Push through your right heel to return to the starting position. Repeat with your left leg. Alternate legs for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi a larghezza delle spalle, tenendo un manubrio in ciascuna mano. Fai un passo avanti con il piede destro, abbassando il corpo in posizione di affondamento. Tieni la schiena dritta e il petto sollevato mentre abbassi il corpo. Spingi attraverso il tallone destro per tornare alla posizione di partenza. Ripeti con la gamba sinistra. Alterna le gambe per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Stai con i piedi a larghezza delle spalle, tenendo un manubrio in ciascuna mano.",
      "Fai un passo avanti con il piede destro, abbassando il corpo in posizione di affondamento.",
      "Tieni la schiena dritta e il petto sollevato mentre abbassi il corpo.",
      "Spingi attraverso il tallone destro per tornare alla posizione di partenza.",
      "Ripeti con la gamba sinistra.",
      "Alterna le gambe per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0336-RRWFUcw.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0336-RRWFUcw.gif",
    "isCustom": false
  },
  {
    "id": "1372",
    "name": "barbell standing calf raise",
    "nameIt": "Calf Raise in Piedi",
    "category": "lower legs",
    "bodyPart": "lower legs",
    "muscleGroup": "Polpacci",
    "equipment": "Macchina",
    "target": "calves",
    "instructionsEn": "Stand with your feet shoulder-width apart and place a barbell across your upper back. Raise your heels off the ground as high as possible, using only your toes. Pause for a moment at the top, then slowly lower your heels back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi a larghezza delle spalle e posiziona una barra sulla parte superiore della schiena. Alza i talloni da terra il più in alto possibile, usando solo le dita dei piedi. Fermati un attimo in cima, poi abbassa lentamente i talloni fino alla posizione di partenza. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Stai con i piedi a larghezza delle spalle e posiziona una barra sulla parte superiore della schiena.",
      "Alza i talloni da terra il più in alto possibile, usando solo le dita dei piedi.",
      "Fermati un attimo in cima, poi abbassa lentamente i talloni fino alla posizione di partenza.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1372-8ozhUIZ.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1372-8ozhUIZ.gif",
    "isCustom": false
  },
  {
    "id": "0085",
    "name": "barbell romanian deadlift",
    "nameIt": "Stacco Rumeno con Bilanciere",
    "category": "upper legs",
    "bodyPart": "upper legs",
    "muscleGroup": "Gambe",
    "equipment": "Bilanciere",
    "target": "glutes",
    "instructionsEn": "Stand with your feet shoulder-width apart and your toes pointing forward. Hold the barbell with an overhand grip, hands slightly wider than shoulder-width apart. Bend at the hips, keeping your back straight and your knees slightly bent. Lower the barbell towards the ground, keeping it close to your body. Feel the stretch in your hamstrings as you lower the barbell. Once you feel a stretch in your hamstrings, push your hips forward and stand up straight. Squeeze your glutes at the top of the movement. Lower the barbell back down to the starting position and repeat for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi alla larghezza delle spalle e le dita dei piedi rivolte in avanti. Tieni il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle. Piegati sui fianchi, mantenendo la schiena dritta e le ginocchia leggermente piegate. Abbassa il bilanciere verso terra, tenendolo vicino al corpo. Senti l'allungamento dei muscoli posteriori della coscia mentre abbassi il bilanciere. Una volta che senti un allungamento nei muscoli posteriori della coscia, spingi i fianchi in avanti e stai dritto. Contrai i glutei nella parte superiore del movimento. Abbassare nuovamente il bilanciere nella posizione iniziale e ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai con i piedi alla larghezza delle spalle e le dita dei piedi rivolte in avanti.",
      "Tieni il bilanciere con una presa prona, con le mani leggermente più larghe della larghezza delle spalle.",
      "Piegati sui fianchi, mantenendo la schiena dritta e le ginocchia leggermente piegate.",
      "Abbassa il bilanciere verso terra, tenendolo vicino al corpo.",
      "Senti l'allungamento dei muscoli posteriori della coscia mentre abbassi il bilanciere.",
      "Una volta che senti un allungamento nei muscoli posteriori della coscia, spingi i fianchi in avanti e stai dritto.",
      "Contrai i glutei nella parte superiore del movimento.",
      "Abbassare nuovamente il bilanciere nella posizione iniziale e ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0085-wQ2c4XD.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0085-wQ2c4XD.gif",
    "isCustom": false
  },
  {
    "id": "1012",
    "name": "band twisting overhead press",
    "nameIt": "Military Press / Lento Avanti",
    "category": "shoulders",
    "bodyPart": "shoulders",
    "muscleGroup": "Spalle",
    "equipment": "Bilanciere",
    "target": "delts",
    "instructionsEn": "Stand with your feet shoulder-width apart and place the band under your feet. Hold the band handles at shoulder height with your palms facing forward. Engage your core and press the band overhead, fully extending your arms. As you press, twist your torso to one side, keeping your hips stable. Pause for a moment at the top, then return to the starting position. Repeat the press and twist on the opposite side. Continue alternating sides for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi alla larghezza delle spalle e posiziona la fascia sotto i piedi. Tieni le maniglie della fascia all'altezza delle spalle con i palmi rivolti in avanti. Coinvolgi il tuo core e premi la fascia sopra la testa, estendendo completamente le braccia. Mentre premi, ruota il busto da un lato, mantenendo i fianchi stabili. Fermati per un momento in alto, quindi torna alla posizione di partenza. Ripeti la pressa e ruotala sul lato opposto. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai con i piedi alla larghezza delle spalle e posiziona la fascia sotto i piedi.",
      "Tieni le maniglie della fascia all'altezza delle spalle con i palmi rivolti in avanti.",
      "Coinvolgi il tuo core e premi la fascia sopra la testa, estendendo completamente le braccia.",
      "Mentre premi, ruota il busto da un lato, mantenendo i fianchi stabili.",
      "Fermati per un momento in alto, quindi torna alla posizione di partenza.",
      "Ripeti la pressa e ruotala sul lato opposto.",
      "Continua ad alternare i lati per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/1012-u4bAmKp.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/1012-u4bAmKp.gif",
    "isCustom": false
  },
  {
    "id": "0334",
    "name": "dumbbell lateral raise",
    "nameIt": "Alzate Laterali con Manubri",
    "category": "shoulders",
    "bodyPart": "shoulders",
    "muscleGroup": "Spalle",
    "equipment": "Manubri",
    "target": "delts",
    "instructionsEn": "Stand with your feet shoulder-width apart and hold a dumbbell in each hand, palms facing your body. Keep your back straight and engage your core. Raise your arms out to the sides until they are parallel to the floor, keeping a slight bend in your elbows. Pause for a moment at the top, then slowly lower your arms back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai in piedi con i piedi alla larghezza delle spalle e tieni un manubrio in ogni mano, palmi rivolti verso il corpo. Tieni la schiena dritta e attiva il core. Alza le braccia ai lati finché non sono parallele al pavimento, mantenendo una leggera piega dei gomiti. Fermati un attimo in cima, poi abbassa lentamente le braccia fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Stai in piedi con i piedi alla larghezza delle spalle e tieni un manubrio in ogni mano, palmi rivolti verso il corpo.",
      "Tieni la schiena dritta e attiva il core.",
      "Alza le braccia ai lati finché non sono parallele al pavimento, mantenendo una leggera piega dei gomiti.",
      "Fermati un attimo in cima, poi abbassa lentamente le braccia fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0334-DsgkuIt.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0334-DsgkuIt.gif",
    "isCustom": false
  },
  {
    "id": "0310",
    "name": "dumbbell front raise",
    "nameIt": "Alzate Frontali con Manubri",
    "category": "shoulders",
    "bodyPart": "shoulders",
    "muscleGroup": "Spalle",
    "equipment": "Manubri",
    "target": "delts",
    "instructionsEn": "Stand with your feet shoulder-width apart, holding a dumbbell in each hand with your palms facing your thighs. Keeping your arms straight, exhale and lift the dumbbells in front of you until they are at shoulder level. Pause for a moment at the top, then inhale and slowly lower the dumbbells back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai con i piedi a larghezza delle spalle, tenendo un manubrio in ogni mano con i palmi rivolti verso le cosce. Tieni le braccia dritte, espira e solleva i manubri davanti a te finché non sono all'altezza delle spalle. Fermati un attimo in cima, poi inspira e abbassa lentamente i manubri fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Stai con i piedi a larghezza delle spalle, tenendo un manubrio in ogni mano con i palmi rivolti verso le cosce.",
      "Tieni le braccia dritte, espira e solleva i manubri davanti a te finché non sono all'altezza delle spalle.",
      "Fermati un attimo in cima, poi inspira e abbassa lentamente i manubri fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0310-3eGE2JC.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0310-3eGE2JC.gif",
    "isCustom": false
  },
  {
    "id": "0246",
    "name": "cable upright row",
    "nameIt": "Tirate al Mento ai Cavi",
    "category": "shoulders",
    "bodyPart": "shoulders",
    "muscleGroup": "Spalle",
    "equipment": "Cavi",
    "target": "delts",
    "instructionsEn": "Stand with your feet shoulder-width apart, knees slightly bent, and hold the cable attachment with an overhand grip. Keep your back straight and your core engaged throughout the exercise. Pull the cable attachment straight up towards your chin, leading with your elbows. Pause for a moment at the top, squeezing your shoulder blades together. Slowly lower the cable attachment back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai in piedi con i piedi larghi le spalle, le ginocchia leggermente piegate, e tieni il cavo con una presa sopra la mano. Mantieni la schiena dritta e il core attivo durante tutto l'esercizio. Tira il cavo dritto verso il mento, iniziando con i gomiti. Fermati un attimo in cima, stringendo le scapole insieme. Abbassa lentamente il cavo fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Stai in piedi con i piedi larghi le spalle, le ginocchia leggermente piegate, e tieni il cavo con una presa sopra la mano.",
      "Mantieni la schiena dritta e il core attivo durante tutto l'esercizio.",
      "Tira il cavo dritto verso il mento, iniziando con i gomiti.",
      "Fermati un attimo in cima, stringendo le scapole insieme.",
      "Abbassa lentamente il cavo fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0246-cALKspW.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0246-cALKspW.gif",
    "isCustom": false
  },
  {
    "id": "0031",
    "name": "barbell curl",
    "nameIt": "Curl Bicipiti con Bilanciere",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Bicipiti",
    "equipment": "Bilanciere",
    "target": "biceps",
    "instructionsEn": "Stand up straight with your feet shoulder-width apart and hold a barbell with an underhand grip, palms facing forward. Keep your elbows close to your torso and exhale as you curl the weights while contracting your biceps. Continue to raise the bar until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Inhale as you slowly begin to lower the bar back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Stai dritto con i piedi alla larghezza delle spalle e tieni un bilanciere con una presa subdola, con i palmi rivolti in avanti. Tieni i gomiti vicini al busto ed espira mentre pieghi i pesi mentre contrai i bicipiti. Continua a sollevare la barra finché i bicipiti non sono completamente contratti e la barra è all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre contrai i bicipiti. Inspira mentre inizi lentamente ad abbassare la barra nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Stai dritto con i piedi alla larghezza delle spalle e tieni un bilanciere con una presa subdola, con i palmi rivolti in avanti.",
      "Tieni i gomiti vicini al busto ed espira mentre pieghi i pesi mentre contrai i bicipiti.",
      "Continua a sollevare la barra finché i bicipiti non sono completamente contratti e la barra è all'altezza delle spalle.",
      "Mantieni la posizione contratta per una breve pausa mentre contrai i bicipiti.",
      "Inspira mentre inizi lentamente ad abbassare la barra nella posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0031-25GPyDY.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0031-25GPyDY.gif",
    "isCustom": false
  },
  {
    "id": "0285",
    "name": "dumbbell alternate biceps curl",
    "nameIt": "Curl Alternato con Manubri",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Bicipiti",
    "equipment": "Manubri",
    "target": "biceps",
    "instructionsEn": "Stand up straight with a dumbbell in each hand, palms facing forward and arms fully extended. Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the dumbbells until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Inhale and slowly begin to lower the dumbbells back to the starting position. Repeat for the desired number of repetitions, alternating arms.",
    "instructionsIt": "Stai dritto con un manubrio in ogni mano, palmi rivolti in avanti e braccia completamente estese. Mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti. Continua ad alzare i manubri finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti. Inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni, alternando le braccia.",
    "instructionStepsIt": [
      "Stai dritto con un manubrio in ogni mano, palmi rivolti in avanti e braccia completamente estese.",
      "Mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti.",
      "Continua ad alzare i manubri finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle.",
      "Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti.",
      "Inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni, alternando le braccia."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0285-BU15nH4.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0285-BU15nH4.gif",
    "isCustom": false
  },
  {
    "id": "0313",
    "name": "dumbbell hammer curl",
    "nameIt": "Hammer Curl (a Martello)",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Bicipiti",
    "equipment": "Manubri",
    "target": "biceps",
    "instructionsEn": "Stand up straight with a dumbbell in each hand, palms facing your torso. Keep your elbows close to your torso and rotate the palms of your hands until they are facing forward. This will be your starting position. Now, keeping the upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the weights until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Then, inhale and slowly begin to lower the dumbbells back to the starting position. Repeat for the recommended amount of repetitions.",
    "instructionsIt": "Stai dritto con un manubrio in ogni mano, i palmi rivolti verso il busto. Tieni i gomiti vicini al busto e ruota i palmi delle mani finché non sono rivolti in avanti. Questa sarà la tua posizione di partenza. Ora, mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti. Continua ad alzare i pesi finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti. Poi, inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale. Ripeti per il numero consigliato di ripetizioni.",
    "instructionStepsIt": [
      "Stai dritto con un manubrio in ogni mano, i palmi rivolti verso il busto.",
      "Tieni i gomiti vicini al busto e ruota i palmi delle mani finché non sono rivolti in avanti.",
      "Questa sarà la tua posizione di partenza.",
      "Ora, mantenendo ferme le braccia superiori, espira e arriccia i pesi mentre contrahi i bicipiti.",
      "Continua ad alzare i pesi finché i bicipiti non sono completamente contratti e i manubri non sono all'altezza delle spalle.",
      "Mantieni la posizione contratta per una breve pausa mentre stringi i bicipiti.",
      "Poi, inspira e inizia lentamente ad abbassare i manubri fino alla posizione iniziale.",
      "Ripeti per il numero consigliato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0313-slDvUAU.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0313-slDvUAU.gif",
    "isCustom": false
  },
  {
    "id": "0059",
    "name": "barbell lying preacher curl",
    "nameIt": "Curl Bicipiti su Panca Scott",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Bicipiti",
    "equipment": "Bilanciere",
    "target": "biceps",
    "instructionsEn": "Sit on a preacher bench with your chest against the pad and your arms extended over the edge, holding a barbell with an underhand grip. Keeping your upper arms stationary, exhale and curl the weights while contracting your biceps. Continue to raise the bar until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a brief pause as you squeeze your biceps. Inhale and slowly begin to lower the barbell back to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Siediti su una panca da predicatore con il petto contro il cuscino e le braccia distese oltre il bordo, tenendo un bilanciere con una presa subdola. Mantenendo ferma la parte superiore delle braccia, espira e piega i pesi contraendo i bicipiti. Continua a sollevare la barra finché i bicipiti non sono completamente contratti e la barra è all'altezza delle spalle. Mantieni la posizione contratta per una breve pausa mentre contrai i bicipiti. Inspira e inizia lentamente ad abbassare il bilanciere nella posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Siediti su una panca da predicatore con il petto contro il cuscino e le braccia distese oltre il bordo, tenendo un bilanciere con una presa subdola.",
      "Mantenendo ferma la parte superiore delle braccia, espira e piega i pesi contraendo i bicipiti.",
      "Continua a sollevare la barra finché i bicipiti non sono completamente contratti e la barra è all'altezza delle spalle.",
      "Mantieni la posizione contratta per una breve pausa mentre contrai i bicipiti.",
      "Inspira e inizia lentamente ad abbassare il bilanciere nella posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0059-SYJ4Bkt.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0059-SYJ4Bkt.gif",
    "isCustom": false
  },
  {
    "id": "0201",
    "name": "cable pushdown",
    "nameIt": "Pushdown Tricipiti al Cavo",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Tricipiti",
    "equipment": "Cavi",
    "target": "triceps",
    "instructionsEn": "Attach a straight bar to a high pulley cable machine. Stand facing the machine with your feet shoulder-width apart and a slight bend in your knees. Grasp the bar with an overhand grip, hands shoulder-width apart. Keep your elbows close to your sides and your upper arms stationary. Exhale and push the bar down until your elbows are fully extended. Pause for a moment, then inhale and slowly return the bar to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Attacca una barra dritta a una macchina a cavo a carrucole alta. Stai rivolto verso la macchina con i piedi a larghezza delle spalle e con una leggera piega delle ginocchia. Afferra la barra con una presa sopra la mano, mani a larghezza delle spalle. Tieni i gomiti vicini ai fianchi e le braccia superiori ferme. Espira e spingi la barra verso il basso finché i gomiti non sono completamente estesi. Fermati un attimo, poi inspira e riporta lentamente la barra alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Attacca una barra dritta a una macchina a cavo a carrucole alta.",
      "Stai rivolto verso la macchina con i piedi a larghezza delle spalle e con una leggera piega delle ginocchia.",
      "Afferra la barra con una presa sopra la mano, mani a larghezza delle spalle.",
      "Tieni i gomiti vicini ai fianchi e le braccia superiori ferme.",
      "Espira e spingi la barra verso il basso finché i gomiti non sono completamente estesi.",
      "Fermati un attimo, poi inspira e riporta lentamente la barra alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0201-3ZflifB.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0201-3ZflifB.gif",
    "isCustom": false
  },
  {
    "id": "0019",
    "name": "assisted triceps dip (kneeling)",
    "nameIt": "Dip per Tricipiti su Panca",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Tricipiti",
    "equipment": "Corpo Libero",
    "target": "triceps",
    "instructionsEn": "Adjust the machine to your desired weight and height. Kneel down on the pad facing the machine, with your hands gripping the handles. Lower your body by bending your elbows, keeping your back straight and close to the machine. Pause for a moment at the bottom, then push yourself back up to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Regola la macchina in base al peso e all'altezza desiderati. Inginocchiarsi sul tappetino di fronte alla macchina, con le mani che afferrano le maniglie. Abbassa il corpo piegando i gomiti, mantenendo la schiena dritta e vicina alla macchina. Fai una pausa per un momento in basso, quindi spingiti indietro fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Regola la macchina in base al peso e all'altezza desiderati.",
      "Inginocchiarsi sul tappetino di fronte alla macchina, con le mani che afferrano le maniglie.",
      "Abbassa il corpo piegando i gomiti, mantenendo la schiena dritta e vicina alla macchina.",
      "Fai una pausa per un momento in basso, quindi spingiti indietro fino alla posizione di partenza.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0019-J60bN17.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0019-J60bN17.gif",
    "isCustom": false
  },
  {
    "id": "0061",
    "name": "barbell lying triceps extension",
    "nameIt": "French Press con Bilanciere",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Tricipiti",
    "equipment": "Bilanciere",
    "target": "triceps",
    "instructionsEn": "Lie flat on a bench with your feet flat on the ground and your head at the end of the bench. Hold the barbell with an overhand grip, hands shoulder-width apart, and extend your arms straight up over your chest. Keeping your upper arms stationary, slowly lower the barbell towards your forehead by bending your elbows. Pause for a moment at the bottom, then extend your arms back up to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Sdraiati su una panca con i piedi appoggiati a terra e la testa all'estremità della panca. Tieni il bilanciere con una presa prona, le mani alla larghezza delle spalle ed estendi le braccia verso l'alto sul petto. Mantenendo ferma la parte superiore delle braccia, abbassare lentamente il bilanciere verso la fronte piegando i gomiti. Fai una pausa per un momento in basso, quindi allunga le braccia fino alla posizione iniziale. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Sdraiati su una panca con i piedi appoggiati a terra e la testa all'estremità della panca.",
      "Tieni il bilanciere con una presa prona, le mani alla larghezza delle spalle ed estendi le braccia verso l'alto sul petto.",
      "Mantenendo ferma la parte superiore delle braccia, abbassare lentamente il bilanciere verso la fronte piegando i gomiti.",
      "Fai una pausa per un momento in basso, quindi allunga le braccia fino alla posizione iniziale.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0061-iZop9xO.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0061-iZop9xO.gif",
    "isCustom": false
  },
  {
    "id": "0194",
    "name": "cable overhead triceps extension (rope attachment)",
    "nameIt": "Estensioni Tricipiti ai Cavi Dietro la Testa",
    "category": "upper arms",
    "bodyPart": "upper arms",
    "muscleGroup": "Tricipiti",
    "equipment": "Cavi",
    "target": "triceps",
    "instructionsEn": "Attach a rope to a cable machine at a high position. Stand facing away from the machine with your feet shoulder-width apart. Grasp the rope with both hands, palms facing each other, and bring your hands above your head. Keep your upper arms close to your head and your elbows pointing forward. Slowly lower the rope behind your head by bending your elbows. Pause for a moment, then extend your arms back up to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Attacca una corda a una macchina per cavi in una posizione alta. Mettiti di spalle alla macchina con i piedi a larghezza delle spalle. Afferra la corda con entrambe le mani, palmi rivolti l'uno verso l'altro, e porta le mani sopra la testa. Tieni le braccia superiori vicine alla testa e i gomiti rivolti in avanti. Abbassa lentamente la corda dietro la testa piegando i gomiti. Fermati un attimo, poi rialza le braccia fino alla posizione iniziale. Ripeti per il numero desiderato di ripetizioni.",
    "instructionStepsIt": [
      "Attacca una corda a una macchina per cavi in una posizione alta.",
      "Mettiti di spalle alla macchina con i piedi a larghezza delle spalle.",
      "Afferra la corda con entrambe le mani, palmi rivolti l'uno verso l'altro, e porta le mani sopra la testa.",
      "Tieni le braccia superiori vicine alla testa e i gomiti rivolti in avanti.",
      "Abbassa lentamente la corda dietro la testa piegando i gomiti.",
      "Fermati un attimo, poi rialza le braccia fino alla posizione iniziale.",
      "Ripeti per il numero desiderato di ripetizioni."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0194-2IxROQ1.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0194-2IxROQ1.gif",
    "isCustom": false
  },
  {
    "id": "0001",
    "name": "3/4 sit-up",
    "nameIt": "Crunch a Terra",
    "category": "waist",
    "bodyPart": "waist",
    "muscleGroup": "Addominali",
    "equipment": "Corpo Libero",
    "target": "abs",
    "instructionsEn": "Lie flat on your back with your knees bent and feet flat on the ground. Place your hands behind your head with your elbows pointing outwards. Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle. Pause for a moment at the top, then slowly lower your upper body back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Sdraiati sulla schiena con le ginocchia piegate e i piedi appoggiati a terra. Metti le mani dietro la testa con i gomiti rivolti verso l'esterno. Coinvolgendo gli addominali, solleva lentamente la parte superiore del corpo da terra, piegandoti in avanti finché il busto non forma un angolo di 45 gradi. Fermati per un momento in alto, quindi abbassa lentamente la parte superiore del corpo fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Sdraiati sulla schiena con le ginocchia piegate e i piedi appoggiati a terra.",
      "Metti le mani dietro la testa con i gomiti rivolti verso l'esterno.",
      "Coinvolgendo gli addominali, solleva lentamente la parte superiore del corpo da terra, piegandoti in avanti finché il busto non forma un angolo di 45 gradi.",
      "Fermati per un momento in alto, quindi abbassa lentamente la parte superiore del corpo fino alla posizione di partenza.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0001-2gPfomN.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0001-2gPfomN.gif",
    "isCustom": false
  },
  {
    "id": "3544",
    "name": "bodyweight incline side plank",
    "nameIt": "Plank Isometrico",
    "category": "waist",
    "bodyPart": "waist",
    "muscleGroup": "Addominali",
    "equipment": "Corpo Libero",
    "target": "abs",
    "instructionsEn": "Start by lying on your side with your legs extended and stacked on top of each other. Place your forearm on the ground directly below your shoulder, with your elbow bent at a 90-degree angle. Engage your core and lift your hips off the ground, creating a straight line from your head to your feet. Hold this position for the desired amount of time. Lower your hips back down to the ground and repeat on the other side.",
    "instructionsIt": "Inizia sdraiandoti su un fianco con le gambe distese e sovrapposte una sopra l'altra. Appoggia l'avambraccio a terra direttamente sotto la spalla, con il gomito piegato a 90 gradi. Attiva il core e solleva i fianchi da terra, creando una linea retta dalla testa ai piedi. Mantieni questa posizione per il tempo desiderato. Abbassa i fianchi di nuovo a terra e ripeti dall'altro lato.",
    "instructionStepsIt": [
      "Inizia sdraiandoti su un fianco con le gambe distese e sovrapposte una sopra l'altra.",
      "Appoggia l'avambraccio a terra direttamente sotto la spalla, con il gomito piegato a 90 gradi.",
      "Attiva il core e solleva i fianchi da terra, creando una linea retta dalla testa ai piedi.",
      "Mantieni questa posizione per il tempo desiderato.",
      "Abbassa i fianchi di nuovo a terra e ripeti dall'altro lato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/3544-5VXmnV5.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/3544-5VXmnV5.gif",
    "isCustom": false
  },
  {
    "id": "0472",
    "name": "hanging leg raise",
    "nameIt": "Sollevamento Gambe alla Sbarra",
    "category": "waist",
    "bodyPart": "waist",
    "muscleGroup": "Addominali",
    "equipment": "Corpo Libero",
    "target": "abs",
    "instructionsEn": "Hang from a pull-up bar with your arms fully extended and your palms facing away from you. Engage your core and lift your legs up in front of you, keeping them straight. Continue lifting until your legs are parallel to the ground or as high as you can comfortably go. Pause for a moment at the top, then slowly lower your legs back down to the starting position. Repeat for the desired number of repetitions.",
    "instructionsIt": "Appendi a una barra per trazioni con le braccia completamente distese e i palmi rivolti lontano da te. Coinvolgi il tuo core e solleva le gambe davanti a te, mantenendole dritte. Continua a sollevare finché le gambe non sono parallele al suolo o il più in alto possibile. Fai una pausa per un momento in alto, quindi abbassa lentamente le gambe fino alla posizione di partenza. Ripetere per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Appendi a una barra per trazioni con le braccia completamente distese e i palmi rivolti lontano da te.",
      "Coinvolgi il tuo core e solleva le gambe davanti a te, mantenendole dritte.",
      "Continua a sollevare finché le gambe non sono parallele al suolo o il più in alto possibile.",
      "Fai una pausa per un momento in alto, quindi abbassa lentamente le gambe fino alla posizione di partenza.",
      "Ripetere per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0472-I3tsCnC.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0472-I3tsCnC.gif",
    "isCustom": false
  },
  {
    "id": "0014",
    "name": "assisted motion russian twist",
    "nameIt": "Russian Twist a Terra",
    "category": "waist",
    "bodyPart": "waist",
    "muscleGroup": "Addominali",
    "equipment": "Corpo Libero",
    "target": "abs",
    "instructionsEn": "Sit on the ground with your knees bent and feet flat on the floor. Hold the medicine ball with both hands in front of your chest. Lean back slightly, engaging your abs and keeping your back straight. Slowly twist your torso to the right, bringing the medicine ball towards the right side of your body. Pause for a moment, then twist your torso to the left, bringing the medicine ball towards the left side of your body. Continue alternating sides for the desired number of repetitions.",
    "instructionsIt": "Sedersi a terra con le ginocchia piegate e i piedi appoggiati sul pavimento. Tieni la palla medica con entrambe le mani davanti al petto. Appoggiati leggermente all'indietro, contraendo gli addominali e mantenendo la schiena dritta. Ruota lentamente il busto verso destra, portando la palla medica verso il lato destro del corpo. Fai una pausa per un momento, quindi ruota il busto verso sinistra, portando la palla medica verso il lato sinistro del corpo. Continua ad alternare i lati per il numero di ripetizioni desiderato.",
    "instructionStepsIt": [
      "Sedersi a terra con le ginocchia piegate e i piedi appoggiati sul pavimento.",
      "Tieni la palla medica con entrambe le mani davanti al petto.",
      "Appoggiati leggermente all'indietro, contraendo gli addominali e mantenendo la schiena dritta.",
      "Ruota lentamente il busto verso destra, portando la palla medica verso il lato destro del corpo.",
      "Fai una pausa per un momento, quindi ruota il busto verso sinistra, portando la palla medica verso il lato sinistro del corpo.",
      "Continua ad alternare i lati per il numero di ripetizioni desiderato."
    ],
    "image": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0014-r7cT9YD.jpg",
    "gifUrl": "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0014-r7cT9YD.gif",
    "isCustom": false
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Marco Rossi",
  age: 27,
  gender: "male",
  heightCm: 178,
  currentWeightKg: 76.5,
  targetWeightKg: 80.0,
  fitnessGoal: "hypertrophy",
  fitnessLevel: "intermediate",
  trainingDaysPerWeek: 3,
  bio: "Obiettivo aumento massa muscolare pulita e progressione carichi sui fondamentali.",
  personalRecords: [
    {
      exerciseId: "0025",
      exerciseName: "Panca Piana con Bilanciere",
      weightKg: 95,
      reps: 5,
      date: "2026-09-02",
      estimatedOneRepMax: 107
    },
    {
      exerciseId: "0102",
      exerciseName: "Squat con Bilanciere",
      weightKg: 120,
      reps: 5,
      date: "2026-08-28",
      estimatedOneRepMax: 135
    },
    {
      exerciseId: "0032",
      exerciseName: "Stacco da Terra (Deadlift)",
      weightKg: 150,
      reps: 3,
      date: "2026-09-08",
      estimatedOneRepMax: 160
    }
  ],
  weightHistory: [
    { id: "w1", date: "2026-08-15", weightKg: 75.2 },
    { id: "w2", date: "2026-08-25", weightKg: 75.8 },
    { id: "w3", date: "2026-09-05", weightKg: 76.1 },
    { id: "w4", date: "2026-09-15", weightKg: 76.5 }
  ]
};

export const STARTER_ROUTINES: WorkoutRoutine[] = [
  {
    id: "routine-hypertrophy-abc",
    name: "Scheda Ipertrofia A-B-C",
    description: "Programma classico su 3 giorni diviso per gruppi muscolari sinergici con progressione carichi.",
    isActive: true,
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-15T08:00:00.000Z",
    days: [
      {
        id: "day-a",
        name: "Giorno A - Petto, Spalle & Tricipiti",
        dayOfWeek: 1,
        notes: "Focus su spinta orizzontale e verticale",
        exercises: [
          {
            exerciseId: "0025",
            exerciseName: "Panca Piana con Bilanciere",
            exerciseNameIt: "Panca Piana con Bilanciere",
            muscleGroup: "Petto",
            category: "chest",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif",
            restSeconds: 120,
            sets: [
              { setNumber: 1, targetReps: 8, targetWeightKg: 70, completed: false },
              { setNumber: 2, targetReps: 8, targetWeightKg: 75, completed: false },
              { setNumber: 3, targetReps: 8, targetWeightKg: 75, completed: false },
              { setNumber: 4, targetReps: 6, targetWeightKg: 80, completed: false }
            ],
            notes: "Recupero completo, discesa controllata in 2 secondi."
          },
          {
            exerciseId: "0314",
            exerciseName: "Panca Inclinata con Manubri",
            exerciseNameIt: "Panca Inclinata con Manubri",
            muscleGroup: "Petto",
            category: "chest",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0314-ns0SIbU.jpg",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 24, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 24, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 26, completed: false }
            ]
          },
          {
            exerciseId: "0334",
            exerciseName: "Alzate Laterali con Manubri",
            exerciseNameIt: "Alzate Laterali con Manubri",
            muscleGroup: "Spalle",
            category: "shoulders",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0334-DsgkuIt.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0334-DsgkuIt.gif",
            restSeconds: 60,
            sets: [
              { setNumber: 1, targetReps: 12, targetWeightKg: 10, completed: false },
              { setNumber: 2, targetReps: 12, targetWeightKg: 10, completed: false },
              { setNumber: 3, targetReps: 15, targetWeightKg: 10, completed: false }
            ]
          }
        ]
      },
      {
        id: "day-b",
        name: "Giorno B - Dorso, Bicipiti & Addominali",
        dayOfWeek: 3,
        notes: "Focus su trazione verticale, remate e core",
        exercises: [
          {
            exerciseId: "0015",
            exerciseName: "Trazioni alla Sbarra",
            exerciseNameIt: "Trazioni alla Sbarra",
            muscleGroup: "Dorso",
            category: "back",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0015-vrhHa6D.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0015-vrhHa6D.gif",
            restSeconds: 120,
            sets: [
              { setNumber: 1, targetReps: 8, targetWeightKg: 0, completed: false },
              { setNumber: 2, targetReps: 8, targetWeightKg: 0, completed: false },
              { setNumber: 3, targetReps: 6, targetWeightKg: 0, completed: false }
            ]
          },
          {
            exerciseId: "2330",
            exerciseName: "Lat Machine Avanti al Petto",
            exerciseNameIt: "Lat Machine Avanti al Petto",
            muscleGroup: "Dorso",
            category: "back",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2330-LEprlgG.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 55, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 60, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 60, completed: false }
            ]
          },
          {
            exerciseId: "0001",
            exerciseName: "Crunch a Terra",
            exerciseNameIt: "Crunch a Terra",
            muscleGroup: "Addominali",
            category: "waist",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0001-2gPfomN.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0001-2gPfomN.gif",
            restSeconds: 60,
            sets: [
              { setNumber: 1, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 2, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 3, targetReps: 15, targetWeightKg: 0, completed: false }
            ]
          }
        ]
      },
      {
        id: "day-c",
        name: "Giorno C - Gambe & Polpacci",
        dayOfWeek: 5,
        notes: "Focus quadricipiti, femorali e catena cinetica posteriore",
        exercises: [
          {
            exerciseId: "0102",
            exerciseName: "Squat con Bilanciere",
            exerciseNameIt: "Squat con Bilanciere",
            muscleGroup: "Gambe",
            category: "upper legs",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0102-oR7O9LW.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0102-oR7O9LW.gif",
            restSeconds: 150,
            sets: [
              { setNumber: 1, targetReps: 6, targetWeightKg: 90, completed: false },
              { setNumber: 2, targetReps: 6, targetWeightKg: 100, completed: false },
              { setNumber: 3, targetReps: 6, targetWeightKg: 100, completed: false },
              { setNumber: 4, targetReps: 6, targetWeightKg: 105, completed: false }
            ]
          },
          {
            exerciseId: "2287",
            exerciseName: "Pressa per Gambe (Leg Press)",
            exerciseNameIt: "Pressa per Gambe (Leg Press)",
            muscleGroup: "Gambe",
            category: "upper legs",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2287-V07qpXy.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2287-V07qpXy.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 160, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 180, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 180, completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "routine-upper-lower",
    name: "Scheda Upper / Lower (Forza & Tono)",
    description: "Divisione focalizzata tra parte superiore e inferiore del corpo, ideale per massimizzare forza e recupero muscolare.",
    isActive: false,
    createdAt: "2026-09-02T08:00:00.000Z",
    updatedAt: "2026-09-15T08:00:00.000Z",
    days: [
      {
        id: "ul-upper",
        name: "Upper Body - Spinta & Trazione",
        dayOfWeek: 2,
        notes: "Lavoro completo su torace, dorso, spalle e braccia",
        exercises: [
          {
            exerciseId: "0025",
            exerciseName: "Panca Piana con Bilanciere",
            exerciseNameIt: "Panca Piana con Bilanciere",
            muscleGroup: "Petto",
            category: "chest",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif",
            restSeconds: 120,
            sets: [
              { setNumber: 1, targetReps: 8, targetWeightKg: 70, completed: false },
              { setNumber: 2, targetReps: 8, targetWeightKg: 75, completed: false },
              { setNumber: 3, targetReps: 8, targetWeightKg: 75, completed: false }
            ]
          },
          {
            exerciseId: "2330",
            exerciseName: "Lat Machine Avanti al Petto",
            exerciseNameIt: "Lat Machine Avanti al Petto",
            muscleGroup: "Dorso",
            category: "back",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2330-LEprlgG.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 55, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 60, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 60, completed: false }
            ]
          },
          {
            exerciseId: "0334",
            exerciseName: "Alzate Laterali con Manubri",
            exerciseNameIt: "Alzate Laterali con Manubri",
            muscleGroup: "Spalle",
            category: "shoulders",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0334-DsgkuIt.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0334-DsgkuIt.gif",
            restSeconds: 60,
            sets: [
              { setNumber: 1, targetReps: 12, targetWeightKg: 10, completed: false },
              { setNumber: 2, targetReps: 12, targetWeightKg: 10, completed: false },
              { setNumber: 3, targetReps: 12, targetWeightKg: 10, completed: false }
            ]
          },
          {
            exerciseId: "3287",
            exerciseName: "Dip alle Parallele",
            exerciseNameIt: "Dip alle Parallele",
            muscleGroup: "Petto",
            category: "upper arms",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/3287-LkoAWAE.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/3287-LkoAWAE.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 0, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 0, completed: false },
              { setNumber: 3, targetReps: 8, targetWeightKg: 0, completed: false }
            ]
          }
        ]
      },
      {
        id: "ul-lower",
        name: "Lower Body - Gambe & Addome",
        dayOfWeek: 4,
        notes: "Intenso stimolo per cosce, glutei e stabilizzazione",
        exercises: [
          {
            exerciseId: "0102",
            exerciseName: "Squat con Bilanciere",
            exerciseNameIt: "Squat con Bilanciere",
            muscleGroup: "Gambe",
            category: "upper legs",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0102-oR7O9LW.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0102-oR7O9LW.gif",
            restSeconds: 150,
            sets: [
              { setNumber: 1, targetReps: 6, targetWeightKg: 90, completed: false },
              { setNumber: 2, targetReps: 6, targetWeightKg: 100, completed: false },
              { setNumber: 3, targetReps: 6, targetWeightKg: 100, completed: false }
            ]
          },
          {
            exerciseId: "2287",
            exerciseName: "Pressa per Gambe (Leg Press)",
            exerciseNameIt: "Pressa per Gambe (Leg Press)",
            muscleGroup: "Gambe",
            category: "upper legs",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2287-V07qpXy.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2287-V07qpXy.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 160, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 180, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 180, completed: false }
            ]
          },
          {
            exerciseId: "0001",
            exerciseName: "Crunch a Terra",
            exerciseNameIt: "Crunch a Terra",
            muscleGroup: "Addominali",
            category: "waist",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0001-2gPfomN.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0001-2gPfomN.gif",
            restSeconds: 60,
            sets: [
              { setNumber: 1, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 2, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 3, targetReps: 15, targetWeightKg: 0, completed: false }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "routine-fullbody",
    name: "Scheda Full Body (Tonificazione Totale)",
    description: "Sessione completa che allena tutti i principali gruppi muscolari per un dispendio calorico elevato e tonicità.",
    isActive: false,
    createdAt: "2026-09-03T08:00:00.000Z",
    updatedAt: "2026-09-15T08:00:00.000Z",
    days: [
      {
        id: "fb-day-1",
        name: "Full Body A - Tono & Funzionale",
        dayOfWeek: 1,
        notes: "Compositi multi-articolari per tutto il corpo",
        exercises: [
          {
            exerciseId: "0102",
            exerciseName: "Squat con Bilanciere",
            exerciseNameIt: "Squat con Bilanciere",
            muscleGroup: "Gambe",
            category: "upper legs",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0102-oR7O9LW.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0102-oR7O9LW.gif",
            restSeconds: 120,
            sets: [
              { setNumber: 1, targetReps: 8, targetWeightKg: 80, completed: false },
              { setNumber: 2, targetReps: 8, targetWeightKg: 85, completed: false },
              { setNumber: 3, targetReps: 8, targetWeightKg: 85, completed: false }
            ]
          },
          {
            exerciseId: "0025",
            exerciseName: "Panca Piana con Bilanciere",
            exerciseNameIt: "Panca Piana con Bilanciere",
            muscleGroup: "Petto",
            category: "chest",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0025-EIeI8Vf.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0025-EIeI8Vf.gif",
            restSeconds: 120,
            sets: [
              { setNumber: 1, targetReps: 8, targetWeightKg: 65, completed: false },
              { setNumber: 2, targetReps: 8, targetWeightKg: 70, completed: false },
              { setNumber: 3, targetReps: 8, targetWeightKg: 70, completed: false }
            ]
          },
          {
            exerciseId: "2330",
            exerciseName: "Lat Machine Avanti al Petto",
            exerciseNameIt: "Lat Machine Avanti al Petto",
            muscleGroup: "Dorso",
            category: "back",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/2330-LEprlgG.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/2330-LEprlgG.gif",
            restSeconds: 90,
            sets: [
              { setNumber: 1, targetReps: 10, targetWeightKg: 50, completed: false },
              { setNumber: 2, targetReps: 10, targetWeightKg: 55, completed: false },
              { setNumber: 3, targetReps: 10, targetWeightKg: 55, completed: false }
            ]
          },
          {
            exerciseId: "0001",
            exerciseName: "Crunch a Terra",
            exerciseNameIt: "Crunch a Terra",
            muscleGroup: "Addominali",
            category: "waist",
            image: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/images/0001-2gPfomN.jpg",
            gifUrl: "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/videos/0001-2gPfomN.gif",
            restSeconds: 60,
            sets: [
              { setNumber: 1, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 2, targetReps: 15, targetWeightKg: 0, completed: false },
              { setNumber: 3, targetReps: 15, targetWeightKg: 0, completed: false }
            ]
          }
        ]
      }
    ]
  }
];

// Sample initial history logs for the calendar so it immediately looks lived-in and functional!
export const INITIAL_WORKOUT_LOGS = [
  {
    id: "log-1",
    routineId: "routine-hypertrophy-abc",
    routineName: "Scheda Ipertrofia A-B-C",
    dayId: "day-a",
    dayName: "Giorno A - Petto, Spalle & Tricipiti",
    date: "2026-09-08",
    startTime: "2026-09-08T18:00:00.000Z",
    endTime: "2026-09-08T19:15:00.000Z",
    durationMinutes: 75,
    totalVolumeKg: 6420,
    totalSetsCompleted: 13,
    rating: 5,
    notes: "Ottima spinta, aumentato peso sulla panca.",
    exercises: []
  },
  {
    id: "log-2",
    routineId: "routine-hypertrophy-abc",
    routineName: "Scheda Ipertrofia A-B-C",
    dayId: "day-b",
    dayName: "Giorno B - Dorso, Bicipiti & Addominali",
    date: "2026-09-10",
    startTime: "2026-09-10T18:30:00.000Z",
    endTime: "2026-09-10T19:35:00.000Z",
    durationMinutes: 65,
    totalVolumeKg: 5200,
    totalSetsCompleted: 12,
    rating: 4,
    notes: "Trazioni a corpo libero molto pulite.",
    exercises: []
  },
  {
    id: "log-3",
    routineId: "routine-hypertrophy-abc",
    routineName: "Scheda Ipertrofia A-B-C",
    dayId: "day-c",
    dayName: "Giorno C - Gambe & Polpacci",
    date: "2026-09-12",
    startTime: "2026-09-12T17:45:00.000Z",
    endTime: "2026-09-12T19:00:00.000Z",
    durationMinutes: 75,
    totalVolumeKg: 7800,
    totalSetsCompleted: 14,
    rating: 5,
    notes: "Squat pesante completato senza problemi.",
    exercises: []
  },
  {
    id: "log-4",
    routineId: "routine-hypertrophy-abc",
    routineName: "Scheda Ipertrofia A-B-C",
    dayId: "day-a",
    dayName: "Giorno A - Petto, Spalle & Tricipiti",
    date: "2026-09-15",
    startTime: "2026-09-15T09:00:00.000Z",
    endTime: "2026-09-15T10:10:00.000Z",
    durationMinutes: 70,
    totalVolumeKg: 6850,
    totalSetsCompleted: 13,
    rating: 5,
    notes: "Sessione di oggi completata con successo!",
    exercises: []
  }
];
