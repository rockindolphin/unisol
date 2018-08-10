<?php
	
	header('Access-Control-Allow-Origin: *');

	$articles = array();
	class Article{
		public $id;
		public $title;
		public $excerpt;
		public $date;
		public $source;
		public $tags;
		public $categories;
		public $picture;
		public $youtube;
		public $link;
		public function  __construct($props) {
			foreach ($props as $key => $value) {
				switch ($key) {
					case 'id':
					case 'title':
					case 'excerpt':
					case 'date':
					case 'source':
					case 'youtube':
						$this->$key = $value;
					break;
					case 'tags':
					case 'categories':
						$arr = array();
						foreach ($value as $key2 => $value2) {
							array_push($arr, $value2);
						}
						$this->$key = $arr;
					break;
					default:
					break;
				}
			};
			$this->picture = 'images/articles/article-' .$props['id']. '.jpg';
			$this->link = 'news.html';
		}		
	}

	class Source{
		public $name;
		public $link;
		public function  __construct($name) {
			$this->name = $name;			
			$this->link = '#';			
		}		
	}

	class Tag{
		public $name;
		public $link;
		public function  __construct($name) {
			$this->name = $name;			
			$this->link = 'tags.html';			
		}		
	}

	class Category{
		public $name;
		public $link;
		public function  __construct($name) {
			$this->name = $name;			
			$this->link = '#';			
		}		
	}	


	$article = new Article(array(
		"id" => 1,
		"title" => 'Ванда Тиллес на площадке СПЧ призвала создавать «первички» для борьбы с нарушениями трудовых прав преподавателей',
		"excerpt" => '21 мая в Администрации Президента состоялось специальное заседание Совета развитию гражданского общества и правам человека при Президенте Российской Федерации на тему «Реализация права граждан на образование и защита прав участников образовательного процесса». В ходе мероприятия председатель Постоянной комиссии СПЧ по культурным правам, образованию и науке Анита Соболева рассказала о нарушении прав профессорско-преподавательского состава. В заседании также приняла участие и выступила с докладом сопредседатель межрегионального профсоюза работников высшей школы «Университетская солидарность», доцент Югорского... ',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Ванда Тиллес'), new Tag('Высшее образование'), new Tag('Защита прав'), new Tag('Первичка'), new Tag('ППС'), new Tag('Сокращения')),
		"categories" => array('Заявления ППО', 'Документы')
	));
	array_push($articles, $article);

	$article = new Article(array(
		"id" => 2,
		"title" => 'Во время одиночного пикета задержан сопредседатель «Университетской солидарности» Андроник Арутюнов',
		"excerpt" => 'Задержание произошло во время одиночного пикета возле метро Университет в поддержку студента МГУ Дмитрия Петелина, обвиненного в вандализме, а также всех студентов и преподавателей МГУ, которые протестуют против размещения фан-зоны на его территории.',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('FIFA2018'), new Tag('FIFAFANFEST'), new Tag('Андроник Арутюнов'), new Tag('Задержание'), new Tag('Пикет')),
		"categories" => array(new Category('Действия'), new Category('МГУ'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 3,
		"title" => 'Активисты «Университетской солидарности» поддержали акцию за свободный Интернет',
		"excerpt" => '',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 4,
		"title" => '«Бунд физкека». Студенты и преподаватели недовольны реформой в вузе»',
		"excerpt" => '',
		"date" => '27.05.18',
		"source" => new Source('Радио Свобода'),
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 5,
		"title" => 'Профсоюз присоединится к акции «За свободный интернет»',
		"excerpt" => 'В воскресенье, 13 мая, в Москве на проспекте Сахарова в 14.00 состоится митинг за свободный интернет. Главные цели акции – выступить против действий Роскомнадзора и против цензуры в Интернете в любом ее проявлении. Активисты Межрегионального профсоюза работников высшей школы',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('За свободный интернет'), new Tag('Митинг'), new Tag('Против цензуры'), new Tag('Шествие')),
		"categories" => array(new Category('Анонс'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 6,
		"title" => 'В Москве прошла конференция по трудовому праву с участием профсоюзных юристов',
		"excerpt" => '23 и 24 мая в Москве в Университете им. О.Е. Кутафина прошла конференция «Общее и специальное законодательство о труде и социальном обеспечении» (IV Гусовские чтения). Мероприятие состоялось при поддержке Центра социально-трудовых прав и ассоциации «Юристы за трудовые права» и привлекло всех заинтересованных как в теоретических вопросах трудо',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заявление'), new Tag('МФТИ'), new Tag('Первичка'), new Tag('Протест')),
		"categories" => array(new Category('Профсоюз'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 7,
		"title" => 'Как живет преподаватель СПбГАУ: сокращения и зарплата 40 тысяч рублей вместо 74 тысяч',
		"excerpt" => '22 мая 2018 года на Ученом совете Санкт-Петербургского государственного аграрного университета было объявлено о сокращении штата профессорско-преподавательского состава более чем на 41 ставку. Сокращение в большей степени коснется преподавателей агробиологических и агроинженерных направлений подготовки, но не затронет, к примеру, администрацию вуза, штат которой увеличился за 2017 год почти на 30 единиц.',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заработная плата'), new Tag('ППС'), new Tag('Сокращения')),
		"categories" => array(new Category('СПбГАУ'), new Category('Высшая школа'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 8,
		"title" => 'КТР объявила о начале общероссийской кампании по защите пенсионных прав работников',
		"excerpt" => '',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 9,
		"title" => 'Каждый остался при своем: первичная профсоюзная организация Уральской консерватории',
		"excerpt" => '',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 10,
		"title" => 'Открытое собрание преподавателей и ученых Екатеринбурга',
		"excerpt" => '',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 11,
		"title" => '34 дня до чемпионата мира: что будет с фан-зоной возле МГУ?',
		"excerpt" => 'Сегодня муниципальный депутат района Зюзино, выпускник МГУ и общественный активист Александр Замятин опубликовал пост в Facebook, где подвел промежуточные итоги общественного',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заявление'), new Tag('МФТИ'), new Tag('Первичка'), new Tag('Протест')),
		"categories" => array(new Category('СМИ'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 12,
		"title" => 'Болонская система в России: движение на болотные огни',
		"excerpt" => 'Болонская система плохо приживается на российской почве во многом потому, что само понятие болонской системы сильно искажено. Она не сводится только к трёхуровневой системе (бакалавриат – магистратура – аспирантура и её аналоги) и «кредитам» за курсы.',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Интервью'), new Tag('П.М.Кудюкин')),
		"categories" => array(new Category('Действия'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 13,
		"title" => '«Университетская солидарность» поддержала итоговое заявление Конференции по свободе объединения',
		"excerpt" => 'Активисты Межрегионального Профсоюза «Университетская солидарность» из Москвы, Иваново и Ханты-Мансийска приняли участие в IV Конференции «Свобода объединения и права профсоюзов в Российской ',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('За свободный интернет'), new Tag('Митинг'), new Tag('Против цензуры'), new Tag('Шествие')),
		"categories" => array(new Category('Анонс'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 14,
		"title" => 'Полиция терроризирует студентов РГАУ за одиночные пикеты в защиту увольняемых преподавателей',
		"excerpt" => 'СРОЧНО! Максимальный репост… Сейчас в общежития РГАУ имени Тимирязева (бывшая сельско-хозяйственная академия) нагрянула полиция. Силовики из ОМВД по району Тимирязевский угрожают более десяти студентам, принявшим участие в акциях протеста в защиту своих преподавателей 26 декабря. Полиция растащила студентов на беседы по одному, требует составления объяснительных, в которых оговорить себя и товарищей, признав организацию несанкционированного митинга ',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('За свободный интернет'), new Tag('Митинг'), new Tag('Против цензуры'), new Tag('Шествие')),
		"categories" => array(new Category('Анонс'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 15,
		"title" => 'На дне образования. Выпуск 2. Как общаться с Минобрануки',
		"excerpt" => '',
		"date" => '2 апр. 2018 г.',
		"source" => false,
		"tags" => array(new Tag('А.А.Арутюнов'), new Tag('Высшая Школа')),
		"categories" => array(),
		"youtube" => 'O5ekyxzWXY4'
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 16,
		"title" => 'На дне образования. Выпуск 3. О фан-зоне возле МГУ',
		"excerpt" => '',
		"date" => '4 мая 2018 г.',
		"source" => false,
		"tags" => array(new Tag('А.А.Арутюнов'), new Tag('Высшая Школа')),
		"categories" => array(),
		"youtube" => 'EMQHZXbyoVY'
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 17,
		"title" => 'Действия администрации МФТИ привели к появлению протестной волны в среде студентов и преподавателей',
		"excerpt" => 'Вслед за МГУ острой социальной площадкой постепенно становится Московский физико-технический университет. Волну недовольства студентов и преподавателей...',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заявление'), new Tag('МФТИ'), new Tag('Первичка'), new Tag('Протест')),
		"categories" => array(new Category('Документы'), new Category('Заявления ППО'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 18,
		"title" => 'Депутат Олег Шеин обратился к ректору МФТИ в защиту прав членов первички «Университетской солидарности» в вузе',
		"excerpt" => '',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заявление'), new Tag('МФТИ'), new Tag('Первичка'), new Tag('Протест')),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 19,
		"title" => '«Академики предрекли интенсивную эмиграцию научной элиты страны» ',
		"excerpt" => '',
		"date" => '27.05.18',
		"source" => new Source('СеверПост'),
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 20,
		"title" => '«Пять российских университетов вошли в топ-1000 лучших вузов мира»',
		"excerpt" => '',
		"date" => '27.05.18',
		"source" => new Source('Известия'),
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 21,
		"title" => '«Лоббист соцсферы: сколько дадут на медицину и образование»',
		"excerpt" => '',
		"date" => '27.05.18',
		"source" => new Source('Газета.ру'),
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 22,
		"title" => '«Первый этап формирования Миннауки РФ может быть завершен в июне»',
		"excerpt" => '',
		"date" => '27.05.18',
		"source" => new Source('ТАСС'),
		"tags" => array(),
		"categories" => array()
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 23,
		"title" => 'В Санкт-Петербурге состоялось шествие в поддержку деятельности независимых профсоюзов',
		"excerpt" => 'Активисты «Университетской солидарности» прошлись вместе с сотнями человек  в поддержку Межрегионального профсоюза «Рабочая ассоциация» (МПРА). Массовое шествие стало центральной акцией профсоюзов Конфедерации труда России (КТР) ',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('FIFA2018'), new Tag('Fifafanfest'), new Tag('Андроник'), new Tag('Арутюнов'), new Tag('Задержание')),
		"categories" => array(new Category('Действия'), new Category('МГУ'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 24,
		"title" => 'Сопредседатель «Университетской солидарности» Павел Кудюкин стал участником рубрики «Личное мнение» на ОТР',
		"excerpt" => 'Темой передачи стали вопросы прав трудящихся, повышения заработных плат и исполнения майских указов Президента России. На этот раз в роли эксперта программы выступил сопредседатель межрегионального профсоюза работников высшей',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Заявление'), new Tag('МФТИ'), new Tag('Первичка'), new Tag('Протест')),
		"categories" => array(new Category('Профсоюз'))
	));
	array_push($articles, $article);
			
	$article = new Article(array(
		"id" => 25,
		"title" => 'Андроник Арутюнов оштрафован на 20 тысяч рублей за одиночный пикет в поддержку Дмитрия Петелина',
		"excerpt" => 'Никулинский суд Москвы оштрафовал сопредседателя Межрегионального профсоюза работников высшей школы «Университетская солидарность» Андроника Арутюнова на 20 тыс. руб. (минимальный штраф по вменявшейся статье 20.2 часть 2 КоАП) за проведение одиночного пикета против уголовного преследования студента филологического факультета МГУ Дмитрия Петелина.',
		"date" => '28 мая 2018',
		"source" => false,
		"tags" => array(new Tag('Андроник Арутюнов'), new Tag('Задержание'), new Tag('МГУпротивфанзоны'), new Tag('Пикет'), new Tag('Суд')),
		"categories" => array(new Category('Действия'), new Category('МГУ'))
	));
	array_push($articles, $article);


	if( isset($_REQUEST['get_article']) ){
		$ids = explode(',', $_REQUEST['get_article']);
		$found = false;
		$resp = array();
		foreach ($ids as $key => $id) {
			$id = intval($id);
			foreach ($articles as $key => $article) {
				if( $article->id === $id ){
					$found = true;
					array_push($resp, $article);
				}
			}
		}
		if( $found ){
			http_response_code(200);
			echo json_encode($resp);			
		}else{
			http_response_code(404);			
		}
	}

?>