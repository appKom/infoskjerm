import { EventCard } from './EventCard';

export function EventCarousel(){

  // dette er bare midliering data
  const events = [
    {
      'absolute_url': '/events/2322/arena-trondheim/',
      'attendance_event': {
        'id': 2322,
        'max_capacity': 30,
        'waitlist': true,
        'guest_attendance': false,
        'registration_start': '2024-04-19T12:00:00+02:00',
        'registration_end': '2024-04-26T18:00:00+02:00',
        'unattend_deadline': '2024-04-24T12:00:00+02:00',
        'automatically_set_marks': false,
        'rule_bundles': [],
        'number_on_waitlist': 0,
        'number_of_seats_taken': 30,
        'extras': []
      },
      'company_event': [],
      'description': 'Arrkom inviterer til en actionfylt kveld fylt med spenning, strategi og uforglemmelige øyeblikk! Vi har satt sammen en 3-kamp bestående av en unik blanding av paintball, lazermaze og blacklight dodgeball for å gi deg en episke opplevelse! Så ta deg en pause fra eksamenslesingen og meld deg på. Det blir servert digg og ikke minst GRATIS pizza fra Peppes mellom aktivitetene. \r\n\r\n🔴🔵 Paintball: Klar til å bli en del av slagmarken? Ta på deg utstyret og gjør deg klar til å kjempe for seieren i Arena Trondheim sin paintball labyrinth, bestående av hinder, skjulesteder og strategiske punkter. Dette er ikke bare et spill - det er krig!\r\n\r\n🌀🔦 Lazermaze: Tror du har det som trengs for å smyge seg gjennom en labyrint av lasere? Disse ferdighetene får du testet når du og laget skal prøve å navigere dere gjennom alle laserne uten å komme nær dem!\r\n\r\n💥🏐 Blacklight dodgeball: De fleste av oss kjenner til kanonball, men har du spilt det før i et mørkt rom med lysende kanonballer? Dette er ikke for pyser - det er for de tøffe! Ta sikte, kast, og se ballene fly i dette actionfylte spillet. \r\n\r\nEnten du er en erfaren kriger eller nybegynner, er dette er morsom aktivitet man både kan komme alene, men også dra med seg vennene sine på. Vi setter sammen lag slik at man vil rullere på aktivitetene. \r\nVi sees der :D\r\n\r\n\r\nEnglish:\r\n\r\nArrkom invites you to an action-packed evening filled with excitement, strategy, and unforgettable moments! We have put together a triathlon consisting of a unique blend of paintball, lazermaze, and blacklight dodgeball to give you an epic experience! So take a break from your exam studies and sign up. Delicious and, most importantly, FREE pizza from Peppes will be served between activities.\r\n\r\n🔴🔵 Paintball: Ready to become part of the battlefield? Gear up and get ready to fight for victory in Arena Trondheim\'s paintball labyrinth, consisting of obstacles, hiding spots, and strategic points. This is not just a game - it\'s war!\r\n\r\n🌀🔦 Lazermaze: Think you have what it takes to sneak through a labyrinth of lasers? These skills will be put to the test as you and your team try to navigate through all the lasers without getting too close to them!\r\n\r\n💥🏐 Blacklight dodgeball: Most of us are familiar with dodgeball, but have you ever played it in a dark room with glowing dodgeballs? This is not for the faint-hearted - it\'s for the tough ones! Aim, throw, and watch the balls fly in this action-packed game.\r\n\r\nWhether you\'re an experienced warrior or a beginner, this is a fun activity that you can enjoy alone or bring your friends along. We will organize teams so that everyone can rotate through the activities.',
      'event_start': '2024-04-26T18:00:00+02:00',
      'event_end': '2024-04-26T19:45:00+02:00',
      'event_type': 1,
      'id': 2322,
      'image': {
        'id': 1438,
        'name': 'paintball',
        'timestamp': '2024-04-15T11:11:07.125612+02:00',
        'description': 'paintball',
        'thumb': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/thumbnails/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'original': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'wide': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/wide/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'lg': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/lg/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'md': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/md/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'sm': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'xs': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/6a91316d-1fc6-457b-a0d5-3c40d577cca3.jpeg',
        'tags': [],
        'photographer': '',
        'preset': 'event',
        'preset_display': 'Arrangement'
      },
      'ingress': 'Bli med på aktiviteter på ARENA Trondheim!',
      'ingress_short': 'Bli med på aktiviteter på ARENA Trondheim!',
      'location': 'Arena Trondheim',
      'slug': 'arena-trondheim',
      'title': 'ARENA Trondheim',
      'organizer_name': 'arrKom',
      'organizer': 1
    },
    {
      'absolute_url': '/events/2316/volleyball-turnering/',
      'attendance_event': {
        'id': 2316,
        'max_capacity': 100,
        'waitlist': false,
        'guest_attendance': false,
        'registration_start': '2024-04-10T12:00:00+02:00',
        'registration_end': '2024-04-14T11:00:00+02:00',
        'unattend_deadline': '2024-04-14T11:00:00+02:00',
        'automatically_set_marks': true,
        'rule_bundles': [],
        'number_on_waitlist': 0,
        'number_of_seats_taken': 20,
        'extras': [
          {
            'id': 180,
            'choice': 'Nivå - Avansert',
            'note': 'Jeg har erfaring med dette'
          },
          {
            'id': 178,
            'choice': 'Nivå - Middels',
            'note': 'Jeg har litt erfaring med dette'
          },
          {
            'id': 177,
            'choice': 'Nivå - Nybegynner',
            'note': 'Jeg har ikke mye erfaring med dette'
          }
        ]
      },
      'company_event': [],
      'description': 'Ingen krav til forkunnskaper.\r\nBli med å representer online mot andre linjeforeninger i volleyball turnerning mot andre linjeforeninger.\r\nDette blir en super hyggelig og sosial dag, og en passende lørdagsaktivitet rett før eksamensperioden.\r\nVi deler opp i lag etter nivå, og heier selvfølgelig på de andre lagene når vi ikke spiller selv.\r\nOIL stiller med snacks til alle sprekingene som dukker opp!🤩\r\nVi ses!\r\n\r\nOppmøte 12:00 utenfor dragvoll idrettsenter\r\nså deler vi gruppen opp i 2 lag. \r\nkampstart er hver halvtime. Best av 3 sett, 1 sett er 10 min, 1 min mellom sett. Evt 3 set spilles til 8 poeng. \r\nFinale og bronsfinale spilles best av 3 sett (til 25 p)',
      'event_start': '2024-04-27T12:00:00+02:00',
      'event_end': '2024-04-27T17:00:00+02:00',
      'event_type': 1,
      'id': 2316,
      'image': {
        'id': 365,
        'name': 'volleyball',
        'timestamp': '2018-07-24T08:19:30.706205+02:00',
        'description': 'volleyball',
        'thumb': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/thumbnails/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'original': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'wide': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/wide/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'lg': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/lg/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'md': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/md/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'sm': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'xs': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/83de35f3-1562-459a-8dd0-1ede42f6c4ff.jpeg',
        'tags': [
          'sommer',
          'volleyball'
        ],
        'photographer': '[NavyLifeSW](https://www.flickr.com/photos/navylifesw/)',
        'preset': 'event',
        'preset_display': 'Arrangement'
      },
      'ingress': 'NTNUI arrgangerer voleyball turnering for linjeforeningene ved ntnu',
      'ingress_short': 'Representer online i volleyballturnering',
      'location': 'Dragvoll idrettssenter',
      'slug': 'volleyball-turnering',
      'title': 'Volleyball turnering',
      'organizer_name': 'Online-IL',
      'organizer': 36
    },
    {
      'absolute_url': '/events/2253/badstue-pa-havet/',
      'attendance_event': {
        'id': 2253,
        'max_capacity': 24,
        'waitlist': true,
        'guest_attendance': false,
        'registration_start': '2024-04-15T12:00:00+02:00',
        'registration_end': '2024-04-28T12:00:00+02:00',
        'unattend_deadline': '2024-04-27T12:00:00+02:00',
        'automatically_set_marks': false,
        'rule_bundles': [],
        'number_on_waitlist': 6,
        'number_of_seats_taken': 24,
        'extras': []
      },
      'company_event': [],
      'description': 'Det vil bli booket private badstuer på HAVET Arena på Nyhavna. Her er det er mulighet for å nyte varmen, samt ta seg et bad i havet! Ta med badetøy, et håndkle og hengelås for oppbevaring av eiendeler. Det er ikke lov å ta med seg medbrakt drikke og mat, men man kan kjøpe drikke der.',
      'event_start': '2024-04-28T16:00:00+02:00',
      'event_end': '2024-04-28T19:00:00+02:00',
      'event_type': 1,
      'id': 2253,
      'image': {
        'id': 1433,
        'name': 'Havet',
        'timestamp': '2024-04-09T11:13:35.038629+02:00',
        'description': 'Havet',
        'thumb': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/thumbnails/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'original': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'wide': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/wide/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'lg': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/lg/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'md': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/md/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'sm': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'xs': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/9811e272-b3de-4cb8-8c77-389c32d77bf6.jpeg',
        'tags': [],
        'photographer': '',
        'preset': 'event',
        'preset_display': 'Arrangement'
      },
      'ingress': 'Ta deg en pause fra stress og skole, og koble av i en deilig badstu- rett på vannet!',
      'ingress_short': 'Bli med i badstua med Online!',
      'location': 'HAVET Arena, Strandveien 104',
      'slug': 'badstue-pa-havet',
      'title': 'Badstue på HAVET',
      'organizer_name': 'arrKom',
      'organizer': 1
    },
    {
      'absolute_url': '/events/2324/padel-med-online-il/',
      'attendance_event': {
        'id': 2324,
        'max_capacity': 16,
        'waitlist': true,
        'guest_attendance': false,
        'registration_start': '2024-04-23T17:00:00+02:00',
        'registration_end': '2024-04-29T12:00:00+02:00',
        'unattend_deadline': '2024-04-28T12:00:00+02:00',
        'automatically_set_marks': true,
        'rule_bundles': [],
        'number_on_waitlist': 2,
        'number_of_seats_taken': 16,
        'extras': []
      },
      'company_event': [],
      'description': 'Padeltennis passer for alle, og med to spillere på hvert lag er dette en sosial og morsom aktivitet som gir rask mestringsfølelse, som ikke krever noen forkunnskaper. Online IL står for leie av baner og racketer. Vi begynner med å gjennomgå regler for spillet, og deretter rullerer vi litt på lag på hver enkelt bane.\r\n\r\nDersom noe oppstår, ta kontakt med +47 458 626 41',
      'event_start': '2024-04-29T12:00:00+02:00',
      'event_end': '2024-04-29T14:00:00+02:00',
      'event_type': 1,
      'id': 2324,
      'image': {
        'id': 1372,
        'name': 'Padel',
        'timestamp': '2023-11-08T13:52:20.791073+01:00',
        'description': 'Padel, oil',
        'thumb': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/thumbnails/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'original': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'wide': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/wide/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'lg': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/lg/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'md': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/md/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'sm': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/sm/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'xs': 'https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/media/images/responsive/xs/c72577a9-051e-41d9-b0e2-85cdbf4642c4.jpeg',
        'tags': [
          'oil',
          'padel'
        ],
        'photographer': '',
        'preset': 'event',
        'preset_display': 'Arrangement'
      },
      'ingress': 'Trondheim Padel ønsker onlinere velkommen til byens flotteste innendørs padelhaller',
      'ingress_short': 'Trondheim Padel ønsker onlinere velkommen til byens flotteste innendørs padelhaller',
      'location': 'Haakon VIIs gate 25, 7041 Trondheim',
      'slug': 'padel-med-online-il',
      'title': 'Padel med Online IL',
      'organizer_name': 'Online-IL',
      'organizer': 36
    },
    {
      'absolute_url': '/events/2323/poledance-kurs/',
      'attendance_event': {
        'id': 2323,
        'max_capacity': 20,
        'waitlist': true,
        'guest_attendance': false,
        'registration_start': '2024-05-01T12:00:00+02:00',
        'registration_end': '2024-05-08T12:00:00+02:00',
        'unattend_deadline': '2024-05-07T12:00:00+02:00',
        'automatically_set_marks': true,
        'rule_bundles': [],
        'number_on_waitlist': 0,
        'number_of_seats_taken': 0,
        'extras': []
      },
      'company_event': [],
      'description': 'Nybegynner kurs i poledance med NTNUI dans💃',
      'event_start': '2024-05-08T18:00:00+02:00',
      'event_end': '2024-05-08T19:30:00+02:00',
      'event_type': 3,
      'id': 2323,
      'image': null,
      'ingress': 'Poledance kurs med NTNUI dans!',
      'ingress_short': 'Poledance kurs med NTNUI dans!',
      'location': 'Skippergata 10',
      'slug': 'poledance-kurs',
      'title': 'Poledance kurs',
      'organizer_name': 'fagKom',
      'organizer': 6
    },
  ];

  return(
    <div className='px-8 py-5'>
      <h2 className="mb-5 text-4xl font-bold dark:text-white">Kommende arrangementer</h2>
      <div className ="flex justify-between max-w-full gap-8" >
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}