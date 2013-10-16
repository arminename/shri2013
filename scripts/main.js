$(function(){

    $(".show__block").hide();
    $("#nav__h div:eq(0)").css('float','left');
    $("#nav__h div:eq(0)").css('margin-left','230px');
    $("#nav__h div:eq(1)").css('margin-right','10px');

    // создаем объект ШРИ
    var Shri = {
        Models: {},
        Collections: {},
        Views: {},
        Templates:{}
    }
    //шаблоный хелпер 
    window.template = function(id) {
        return _.template( $('#tpl_Teacher' + id).html() );
    };

    //У Ч И Т Е Л Ь - - Y - & - U
    //создаем модель Y -& - U
    Shri.Models.Teacher = Backbone.Model.extend({})
    //коллекцию Y -& - U
    Shri.Collections.Teachers = Backbone.Collection.extend({
        model: Shri.Models.Teacher,
        url: "scripts/data/data.json",
        initialize: function(){
           // console.log("Teachers list initialize")
        }
    });
    //отправляем на мето Y -& - U
    Shri.Templates.teachers = template('s');
    //вид Y -& - U
    Shri.Views.Teachers = Backbone.View.extend({
    el: $("#mainContainer"),
    template: Shri.Templates.teachers,
    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);
    },
    render: function () {
       // console.log("render")
       // console.log(this.collection.length);
        $(this.el).html(this.template());
        this.addAll();
    },
    addAll: function () {
        //console.log("addAll")
        this.collection.each(this.addOne);
    },
    addOne: function (model) {
       // console.log("добавить")
        view = new Shri.Views.Teacher({ model: model });
        $("div#albom", this.el).append(view.render());
    }
    })
    //шаблон для отного Y
    Shri.Templates.theacher = template('');
    //определяем вид одного Y
    Shri.Views.Teacher = Backbone.View.extend({
        tagName: "div",
        className: "",
        template: Shri.Templates.theacher,
        //events: { "click .delete": "test" },

        initialize: function () {
            //_.bindAll(this, 'render', 'test');
            this.model.bind('destroy', this.destroyItem, this);
            this.model.bind('remove', this.removeItem, this);
        },

        render: function () {
            return $(this.el).append(this.template(this.model.toJSON())) ;
        },

        removeItem: function (model) {
            console.log("Remove - " + model.get("Name"))
            this.remove();
        }
    })
    //
    Shri.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"  //http://localhost:22257/Shri/index.html
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        Shri.teachers = new Shri.Collections.Teachers()
        new Shri.Views.Teachers({ collection: Shri.teachers }); //добавляем список
        Shri.teachers.fetch();
        console.log(Shri.teachers.length)
    }
    });


    var appRouter = new Shri.Router();
    Backbone.history.start();


    //эффект скольжения экранов
    $(window).stellar();
    var links = $('header').find('a');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('header a[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        }
        else {
            $('header a[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
        }

    });
 
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('header a[data-slide="1"]').addClass('active');
            $('header a[data-slide="2"]').removeClass('active');
        }
    });
    //
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }

    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
    //лайтпокс 
    $(".show__block").click(function(){
        $(".show__block").fadeOut( "slow" );
    });
    $("#slide2 li:eq(0)").click(function(){
        $(".show__block").fadeIn( "slow" );
        $(".show__block").html("<p>Яндекс открывает набор во вторую Школу разработки интерфейсов в Москве.</p><p>Мы приглашаем студентов старших курсов и недавних выпускников вузов, которые хотят развиваться в области фронтенд-разработки веб-сервисов. Чтобы учиться в нашей Школе, вам понадобятся базовые знания по разработке интерфейсов и небольшой опыт их создания.</p><p>Бесплатные занятия будут проходить три раза в неделю в <a href=\"http://company.yandex.ru/contacts/redrose/\" title=\"московском офисе Яндекса\">московском офисе Яндекса</a>: <strong>во вторник и четверг — с 18:30 до 21:30, в субботу — с 12:00 до 15:00.</strong></p><p>Наиболее успешные выпускники Школы получат возможность пройти практику в компании.</p>");
        $(".show__block").prepend("<div class=\"closee\"></div>");
    });
    $("#slide2 li:eq(1)").click(function(){
        $(".show__block").fadeIn( "slow" );
        $(".show__block").html("<p>Приём заявок на поступление закончен. По результатам теста мы пригласим в Школу 30-40 человек.</p>");
        $(".show__block").prepend("<div class=\"closee\"></div>");
    });
    $("#slide2 li:eq(2)").click(function(){
        $(".show__block").fadeIn( "slow" );
        $(".show__block").html("<p><strong>Теоретический этап</strong></p><p>Первый этап обучения представляет собой курс лекций, посвящённых различным сторонам фронтенд-разработки. С программой прошлого года вы можете ознакомиться на <a href=\"http://events.yandex.ru/events/shri/msk-2012/programm/\">этой</a> странице. Лекцииначнутся 7 сентября и будут продолжаться в течение месяца. В конце курса слушателям предстоит экзамен. Лучшим студентам мы предложим пройти практический этап Школы.</p><p><strong>Практический этап</strong></p><p>Практика — это отличный шанс увидеть работу Яндекса изнутри. Практиканты получат корпоративные компьютеры, пропуски в офис, а ещё мы будем платить им стипендию. С середины октября до середины декабря практикантам предстоит выполнить большое задание под руководством опытного разработчика. Также во время практики будут продолжаться лекции.</p><p>Тех, кто успешно пройдёт практику, мы с удовольствием пригласим к нам на работу или стажировку.</p><p>Все вопросы о Школе присылайте на адрес: <a href=\"mailto:intern@yandex-team.ru\" title=\"intern@yandex-team.ru\">intern@yandex-team.ru</a></p>");
        $(".show__block").prepend("<div class=\"closee\"></div>");
    });
    $("#nav__h div:eq(0)").click(function(){
         var leftPosition = $("#mainContainer").css("left");
         //console.log(leftPosition);
         if (leftPosition!="0px") {
            $("#mainContainer").animate({
            "left":"+=270px"
            }, 1000);
        };
        
    });
    $("#nav__h div:eq(1)").click(function(){
        var rightPosition = parseInt($("#mainContainer").css("right"));
        console.log(rightPosition);
        if (rightPosition<-10) {
            $("#mainContainer").animate({
            "left":"-=270px"
            },  1000);
        };
        
    });
    $("#Students").css("display","none");
        
    $("#mainContainer").css("width","1900px");
    $("#nav__l div:eq(0)").click(function(){
        $("#Teachers").css("display","block");
        $("#Students").css("display","none");
        $("#mainContainer").css("width","1900px");
        $("#mainContainer").css("left","0px");

    });
    $("#nav__l div:eq(1)").click(function(){
        $("#Teachers").css("display","none");
        $("#Students").css("display","block");
        $("#mainContainer").css("width","3400px");
        $("#mainContainer").css("left","0px");
    });
    $('#mainContainer').on('click', '.t_name', function(e){
        $(this).parent().next(".infoperson").prepend("<div class=\"closee\"></div>");
        $(this).parent().css("background","rgb(255, 114, 114)");
        $(this).css("background","rgb(255, 114, 114)");
        $(this).parent().next(".infoperson").css("display","block");
        $(this).parent().next(".infoperson").css("display","block"); 
        $(this).parent().next(".infoperson").animate({
        height: "400px"}, 1000 ); 
    });
     $('#mainContainer').on('click', '.closee', function(e){
        $(".t_name").css("background","rgb(255, 220, 45)");
        $(".bb-item").css("background","rgb(255, 220, 45)");
        $(".infoperson").fadeOut( "slow" );
        $(".infoperson").css("display","none");


    });
    
    $('#mainContainer').on('click', '.revert', function(e){
         $(this).parent().html(OrigText).addClass("editText").bind("click", updateText);
     });
     //Редактирование инфо 
    $('#mainContainer').on('click', '.editText', editText);
    function editText() {
        $(this).removeClass('inlineEdit');
        $(this).removeAttr('class');
        OrigText = $(this).html();
        $(this).addClass("selected").html('<form ><textarea class="edit">' + OrigText + '" </textarea> </form><button disabled="disabled">Сохранить</button> <button class="revert">Отмена</button>').unbind('click', updateText);
    }


});
