'use strict';

var app = angular.module('eventoL', ['ngMaterial', 'ngMap', 'ngSanitize']);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('amber');
});

app.run(function($window) {
    $window.scrollTo(0, 0);
});

/*
 * 'scroll' Angular Directive
 * Used to handle page header during scroll event (and rezise event too) of the window.
 *
 */
app.directive('scroll', function($window) {

    return function(scope, element, attrs) {

        /* header DOM element with md-page-header attribute */
        var header = document.querySelector('[md-page-header]');
        /* Store header dimensions to initialize header styling */
        var baseDimensions = header.getBoundingClientRect();
        /* DOM element with md-header-title attribute (title in toolbar) */
        var title = angular.element(document.querySelector('[md-header-title]'));
        /* DOM element with md-header-picture attribute (picture in header) */
        var picture = angular.element(document.querySelector('[md-header-picture]'));
        /* DOM element with main-fab class (a DOM element which contains the main float action button element) */
        //var fab = angular.element(document.querySelector('.main-fab'));
        /* The height of a toolbar by default in Angular Material */
        var legacyToolbarH = 64;
        /* The mid-height of a float action button by default in Angular Material */
        //var legacyFabMid = 56 / 2;
        /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
        var titleZoom = 1.5;
        /* The primary color palette used by Angular Material */
        var primaryColor = [76, 175, 80];

        function styleInit() {
            title.css('padding-left', '16px');
            title.css('position', 'relative');
            title.css('transform-origin', '24px');
        }

        function handleStyle(dim) {
            if ((dim.bottom - baseDimensions.top) > legacyToolbarH) {
                title.css('top', ((dim.bottom - baseDimensions.top) - legacyToolbarH) + 'px');
                element.css('height', (dim.bottom - baseDimensions.top) + 'px');
                title.css('transform', 'scale(' + ((titleZoom - 1) * ratio(dim) + 1) + ',' + ((titleZoom - 1) * ratio(dim) + 1) + ')');

            } else {
                title.css('top', '0px');
                element.css('height', legacyToolbarH + 'px');
                title.css('transform', 'scale(1,1)');
            }
            element.css('background-color', 'rgba(' + primaryColor[0] + ',' + primaryColor[1] + ',' + primaryColor[2] + ',' + (1 - ratio(dim)) + ')');
            picture.css('background-position', '50% ' + (ratio(dim) * 50) + '%');
        }

        function ratio(dim) {
            var r = (dim.bottom - baseDimensions.top) / dim.height;
            if (r < 0) return 0;
            if (r > 1) return 1;
            return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
        }

        angular.element($window).bind('onbeforeunload', function() {
            angular.element($window).scrollTo(0, 0);
        });

        styleInit();
        handleStyle(baseDimensions);

        /* Scroll event listener */
        angular.element($window).bind('scroll', function() {
            var dimensions = header.getBoundingClientRect();
            handleStyle(dimensions);
            scope.$apply();
        });

        /* Resize event listener */
        angular.element($window).bind('resize', function() {
            baseDimensions = header.getBoundingClientRect();
            var dimensions = header.getBoundingClientRect();
            handleStyle(dimensions);
            scope.$apply();
        });

    };

})
    .directive('backImg', function() {
        return function(scope, element, attrs) {
            var url = scope.$eval(attrs.backImg);
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size':  'cover'
            });
        };
    })
    .controller('eventsCtrl', function($scope) {
        $scope.theEvent = {
            'title':       'Morbi montes augue senectus.',
            'img':         'http://lorempixel.com/720/360',
            'description': 'Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo:\n Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. \nTodas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y han de sucedernos bien las cosas; porque no es posible que el mal ni el bien sean durables, y de aquí se sigue que, habiendo durado mucho el mal, el bien está ya cerca. \n\nnAsí que, no debes congojarte por las desgracias que a mí me suceden, pues a ti no te cabe parte dellas. Y, viéndole don Quijote de aquella manera, con muestras de tanta tristeza, le dijo: Sábete, Sancho, que no es un hombre más que otro si no hace más que otro. \n\nTodas estas borrascas que nos suceden son señales de que presto ha de serenar el tiempo y han de sucedernos bien las cosas; porque no es posible que el mal ni el bien sean durables, y de aquí se sigue que, habiendo durado mucho el mal, el bien está ya cerca. Así que, no debes congojarte por las desgracias que a mí me suceden, pues a ti no',
            'date':        '1944-12-07T11:31:36.603+0000',
            'tags':        [
                'Hac.',
                'Nec.',
                'Odio?',
                'Dolor.'
            ],
            place: {
                'address_components': [{
                    'long_name':  '1551',
                    'short_name': '1551',
                    'types':      ['street_number']
                }, {
                    'long_name':  'Sarmiento',
                    'short_name': 'Sarmiento',
                    'types':      ['route']
                }, {
                    'long_name':  'San Nicolas',
                    'short_name': 'San Nicolas',
                    'types':      ['sublocality_level_1', 'sublocality', 'political']
                }, {
                    'long_name':  'Buenos Aires',
                    'short_name': 'CABA',
                    'types':      ['locality', 'political']
                }, {
                    'long_name':  'Comuna 1',
                    'short_name': 'Comuna 1',
                    'types':      ['administrative_area_level_2', 'political']
                }, {
                    'long_name':  'Ciudad Autónoma de Buenos Aires',
                    'short_name': 'CABA',
                    'types':      ['administrative_area_level_1', 'political']
                }, {
                    'long_name':  'Argentina',
                    'short_name': 'AR',
                    'types':      ['country', 'political']
                }, {
                    'long_name':  'C1042ABC',
                    'short_name': 'C1042ABC',
                    'types':      ['postal_code']
                }],
                'adr_address':            '<span class="street-address">Sarmiento 1551</span>, <span class="postal-code">C1042ABC</span> <span class="locality">CABA</span>, <span class="country-name">Argentina</span>',
                'formatted_address':      'Sarmiento 1551, C1042ABC CABA, Argentina',
                'formatted_phone_number': '011 4374-1251',
                'geometry':               {
                    'location': {
                        'lat': -34.6053428,
                        'lng': -58.38861109999999
                    },
                    'viewport': {
                        'south': -34.60534819999999,
                        'west':  -58.38861564999996,
                        'north': -34.6053266,
                        'east':  -58.38859745000002
                    }
                },
                'icon':                       'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
                'id':                         '1ae29acfaf780e98a848d4c919c56ed2d968f1b5',
                'international_phone_number': '+54 11 4374-1251',
                'name':                       'Centro Cultural San Martin',
                'opening_hours':              {
                    'open_now': true,
                    'periods':  [{
                        'close': {
                            'day':      0,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476658800000
                        },
                        'open': {
                            'day':      0,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476626400000
                        }
                    }, {
                        'close': {
                            'day':      1,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476140400000
                        },
                        'open': {
                            'day':      1,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476712800000
                        }
                    }, {
                        'close': {
                            'day':      2,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476226800000
                        },
                        'open': {
                            'day':      2,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476194400000
                        }
                    }, {
                        'close': {
                            'day':      3,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476313200000
                        },
                        'open': {
                            'day':      3,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476280800000
                        }
                    }, {
                        'close': {
                            'day':      4,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476399600000
                        },
                        'open': {
                            'day':      4,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476367200000
                        }
                    }, {
                        'close': {
                            'day':      5,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476486000000
                        },
                        'open': {
                            'day':      5,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476453600000
                        }
                    }, {
                        'close': {
                            'day':      6,
                            'time':     '2000',
                            'hours':    20,
                            'minutes':  0,
                            'nextDate': 1476572400000
                        },
                        'open': {
                            'day':      6,
                            'time':     '1100',
                            'hours':    11,
                            'minutes':  0,
                            'nextDate': 1476540000000
                        }
                    }],
                    'weekday_text': ['lunes: 11:00–20:00', 'martes: 11:00–20:00', 'miércoles: 11:00–20:00', 'jueves: 11:00–20:00', 'viernes: 11:00–20:00', 'sábado: 11:00–20:00', 'domingo: 11:00–20:00']
                },
                'photos': [{
                    'height':            2448,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/101185782453759222152/photos">Marcos Trubbo</a>'],
                    'width':             3264
                }, {
                    'height':            3024,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100260781329291956558/photos">Nestor Barbitta</a>'],
                    'width':             4032
                }, {
                    'height':            1440,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/102213618061460820316/photos">Germán Manrique</a>'],
                    'width':             2560
                }, {
                    'height':            3648,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/100260781329291956558/photos">Nestor Barbitta</a>'],
                    'width':             5472
                }, {
                    'height':            1536,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/107244953325259983791/photos">Aldano Pelusso</a>'],
                    'width':             2048
                }, {
                    'height':            4128,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108091004383945358635/photos">Nahuel Omar Cardozo</a>'],
                    'width':             2322
                }, {
                    'height':            2322,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/106305267993484628367/photos">Juan Martín Zubiri</a>'],
                    'width':             4128
                }, {
                    'height':            3264,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/111119279299131956164/photos">Melina Petta</a>'],
                    'width':             2448
                }, {
                    'height':            2560,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108396310151354444962/photos">Tomas Cristian Duran</a>'],
                    'width':             1440
                }, {
                    'height':            2268,
                    'html_attributions': ['<a href="https://maps.google.com/maps/contrib/112059531999482023214/photos">Tony Gennaro</a>'],
                    'width':             4032
                }],
                'place_id':  'ChIJE3CDCcTKvJURx1qrbEAoSxU',
                'rating':    4.1,
                'reference': 'CnRtAAAAZtLGeTUPhMfN_ZKM2G92_32bwXnWquDxTwSzyZf3x0H7t4NpLIxF3_Hm_l6YS8caJ4Ul9Z2y1Ue9z-65dY9IpbHYefO01FqZ3r22zLETJkEfXgk5zD7FbWRTM_Lg4tne8_CuT35rzoY1Vj6UPuPavhIQNBfoZVRfQrFkYF32He_tDRoU8zNKGvcfw7cCFfYCVVfWCeCUf18',
                'reviews':   [{
                    'aspects': [{
                        'rating': 1,
                        'type':   'overall'
                    }],
                    'author_name':       'Gabriel Chwojnik',
                    'author_url':        'https://plus.google.com/116726402256215579832',
                    'language':          'es',
                    'profile_photo_url': '//lh4.googleusercontent.com/-D_xJUycbTt0/AAAAAAAAAAI/AAAAAAAAAOo/9uL9vVsRPKY/photo.jpg',
                    'rating':            3,
                    'text':              'Teatro importante de la ciudad para obras contemporaneas de danza, drama, musica ',
                    'time':              1473636936
                }, {
                    'aspects': [{
                        'rating': 3,
                        'type':   'overall'
                    }],
                    'author_name':       'Diego Esteves',
                    'author_url':        'https://plus.google.com/102160779266134826872',
                    'language':          'es',
                    'profile_photo_url': '//lh4.googleusercontent.com/-MZGvVGRWTKg/AAAAAAAAAAI/AAAAAAAAAC4/kdKfm7bUEGs/photo.jpg',
                    'rating':            5,
                    'text':              'Diversas salas de teatro, cinema, café, no centro de Buenos Aires.',
                    'time':              1470747865
                }, {
                    'aspects': [{
                        'rating': 3,
                        'type':   'overall'
                    }],
                    'author_name':       'Marcelo Salas',
                    'author_url':        'https://plus.google.com/108154550652540595997',
                    'language':          'es',
                    'profile_photo_url': '//lh3.googleusercontent.com/-vZmkYV63TCQ/AAAAAAAAAAI/AAAAAAAAMyE/u034jlPBp6g/photo.jpg',
                    'rating':            5,
                    'text':              'Muy buena.propuestas para los chicos',
                    'time':              1469294113
                }, {
                    'aspects': [{
                        'rating': 3,
                        'type':   'overall'
                    }],
                    'author_name':       'Julio Lago',
                    'author_url':        'https://plus.google.com/103903186618060219433',
                    'language':          'es',
                    'profile_photo_url': '//lh6.googleusercontent.com/-jQrfukKE-Zs/AAAAAAAAAAI/AAAAAAAAB1M/M_2mtOkTQT8/photo.jpg',
                    'rating':            5,
                    'text':              'Siempre hay eventos super buenos a buen precio. Un espacio desatendido por el gobierno pero súper fructífero en ofertas culturales ',
                    'time':              1476117510
                }, {
                    'aspects': [{
                        'rating': 2,
                        'type':   'overall'
                    }],
                    'author_name':       'Gonzalo Gálvez',
                    'author_url':        'https://plus.google.com/109400600001492471841',
                    'language':          'es',
                    'profile_photo_url': '//lh3.googleusercontent.com/-j145Y1y2QzU/AAAAAAAAAAI/AAAAAAAAAAA/lNUlnKneic4/photo.jpg',
                    'rating':            4,
                    'text':              '\n\nMuy buena sala de cine',
                    'time':              1467656485
                }],
                'scope':             'GOOGLE',
                'types':             ['point_of_interest', 'establishment'],
                'url':               'https://maps.google.com/?cid=1534364355215973063',
                'utc_offset':        -180,
                'vicinity':          'Sarmiento 1551',
                'website':           'http://elculturalsanmartin.org/',
                'html_attributions': ['Fichas de empresa proporcionadas por <a href="http://www.paginasamarillas.com.ar">PaginasAmarillas.com.ar</a>']
            }
        };
        $scope.events = [
            {
                'title':       'Morbi montes augue senectus.',
                'img':         'http://lorempixel.com/306/418',
                'description': 'Lorem ipsum curabitur lacinia accumsan urna amet curae; amet venenatis semper varius faucibus.Mattis scelerisque aptent libero magna non sodales libero nisi.',
                'date':        '1944-12-07T11:31:36.603+0000',
                'tags':        [
                    'Hac.',
                    'Nec.',
                    'Odio?',
                    'Dolor.'
                ],
                'address': '8467 Riverdale'
            },
            {
                'title':       'Sociosqu lectus iaculis vestibulum.',
                'img':         'http://lorempixel.com/497/535',
                'description': 'Lorem ipsum nisl cras odio tristique conubia accumsan risus a dictum!Volutpat montes vitae ipsum conubia est volutpat neque.',
                'date':        '1923-12-13T09:52:36.143+0000',
                'tags':        [
                    'Aliquet.',
                    'Torquent.',
                    'Auctor.',
                    'Sociis?'
                ],
                'address': '2540 Mcclellan'
            },
            {
                'title':       'Enim nullam eu mattis?',
                'img':         'http://lorempixel.com/574/748',
                'description': 'Lorem ipsum dui cubilia gravida varius ultrices porttitor bibendum egestas malesuada lectus.Rhoncus sociis lectus mollis tristique, id iaculis hendrerit facilisi erat.',
                'date':        '1974-02-10T02:05:41.243+0000',
                'tags':        [
                    'Montes.',
                    'Ridiculus.',
                    'Eget.',
                    'Aliquet.'
                ],
                'address': '5144 Vine'
            },
            {
                'title':       'Donec iaculis rutrum at.',
                'img':         'http://lorempixel.com/796/519',
                'description': 'Lorem ipsum augue vel arcu ac bibendum tristique cubilia vulputate bibendum nec?Accumsan felis primis eros, ligula tristique eros ultrices nisi habitant?',
                'date':        '1953-05-11T08:14:03.499+0000',
                'tags':        [
                    'Bibendum.',
                    'Potenti.',
                    'Urna?',
                    'Ornare.'
                ],
                'address': '4021 Vanderpoel'
            },
            {
                'title':       'Dapibus curabitur ultrices condimentum.',
                'img':         'http://lorempixel.com/475/275',
                'description': 'Lorem ipsum pretium potenti morbi aenean suscipit gravida vitae sit lacus a.Nec primis ad maecenas magna morbi magna fusce eu.',
                'date':        '1999-04-16T05:02:54.596+0000',
                'tags':        [
                    'Adipiscing!',
                    'Accumsan.',
                    'Fringilla!',
                    'Magnis.'
                ],
                'address': '1231 45th'
            },
            {
                'title':       'Dignissim hendrerit erat dapibus.',
                'img':         'http://lorempixel.com/599/728',
                'description': 'Lorem ipsum facilisis rhoncus mus mattis donec suscipit per augue.Quam senectus sagittis donec congue aenean gravida class quam?',
                'date':        '2012-11-15T08:24:52.943+0000',
                'tags':        [
                    'Posuere.',
                    'Purus.',
                    'Quis!',
                    'Dictum.'
                ],
                'address': '3167 Foreman'
            },
            {
                'title':       'Cum cursus per faucibus.',
                'img':         'http://lorempixel.com/792/282',
                'description': 'Lorem ipsum vestibulum vestibulum sed ultrices eget ante auctor feugiat eget porttitor vivamus.Etiam tempus lacinia consequat vel fusce aliquam et integer egestas.',
                'date':        '1956-10-10T10:07:10.509+0000',
                'tags':        [
                    'Platea.',
                    'Sit?',
                    'Varius.',
                    'Justo.'
                ],
                'address': '6446 Abbott'
            },
            {
                'title':       'Auctor per lorem sem!',
                'img':         'http://lorempixel.com/925/390',
                'description': 'Lorem ipsum mauris torquent morbi venenatis duis faucibus id ultrices dui.Est felis cursus vivamus sollicitudin lorem etiam quisque nostra vehicula rhoncus ligula.',
                'date':        '2001-08-05T05:00:52.600+0000',
                'tags':        [
                    'Tellus.',
                    'Morbi.',
                    'Litora.',
                    'Fusce.'
                ],
                'address': '356 Coyle'
            },
            {
                'title':       'Quis sollicitudin netus ut.',
                'img':         'http://lorempixel.com/916/293',
                'description': 'Lorem ipsum leo senectus velit blandit sagittis aenean nisl condimentum sed dapibus aenean sed!Tincidunt aenean porttitor himenaeos elementum phasellus ut per.',
                'date':        '1963-02-15T04:01:27.164+0000',
                'tags':        [
                    'Tempus.',
                    'Conubia.',
                    'Risus!',
                    'Tristique.'
                ],
                'address': '6243 Leavitt'
            },
            {
                'title':       'Ipsum tristique a magnis.',
                'img':         'http://lorempixel.com/888/785',
                'description': 'Lorem ipsum interdum eleifend curae; eleifend vitae mi magna litora congue nisi pretium donec.Nisi cras quam neque nisi himenaeos condimentum ante ultricies odio conubia?',
                'date':        '1969-06-30T08:35:09.087+0000',
                'tags':        [
                    'Pretium.',
                    'Nibh.',
                    'Dictumst!',
                    'Fermentum.'
                ],
                'address': '5024 Magnolia'
            },
            {
                'title':       'Himenaeos sit vivamus varius?',
                'img':         'http://lorempixel.com/937/792',
                'description': 'Lorem ipsum hendrerit interdum porttitor tincidunt faucibus quam netus cubilia convallis habitant.Habitant tellus, tempus id rhoncus hac ultricies in cubilia laoreet.',
                'date':        '1945-04-02T06:12:08.964+0000',
                'tags':        [
                    'Blandit.',
                    'Leo.',
                    'Fermentum.',
                    'Elit.'
                ],
                'address': '9125 Lundy'
            },
            {
                'title':       'Volutpat rhoncus eu taciti.',
                'img':         'http://lorempixel.com/539/451',
                'description': 'Lorem ipsum porttitor congue conubia nec purus nulla aptent maecenas dictumst feugiat fames risus.Adipiscing taciti quisque turpis purus erat lacus taciti.',
                'date':        '1981-09-01T01:19:32.393+0000',
                'tags':        [
                    'Sapien?',
                    'Quisque.',
                    'Ridiculus.',
                    'Urna.'
                ],
                'address': '9060 Lowerlevelt1'
            },
            {
                'title':       'Tortor urna praesent rhoncus.',
                'img':         'http://lorempixel.com/888/306',
                'description': 'Lorem ipsum metus hac, taciti eros nulla per vestibulum justo proin nam quis.Diam magnis commodo viverra pulvinar dictum fermentum libero ante pretium.',
                'date':        '1984-11-08T10:25:28.730+0000',
                'tags':        [
                    'Eu?',
                    'Habitasse.',
                    'Eleifend!',
                    'Eget!'
                ],
                'address': '7193 Ohare Airport'
            },
            {
                'title':       'Vitae quis commodo dictumst.',
                'img':         'http://lorempixel.com/341/776',
                'description': 'Lorem ipsum arcu non velit feugiat nascetur et cum sodales sagittis.Sociosqu neque aliquam libero primis, cubilia enim tempus habitant.',
                'date':        '1969-11-25T08:23:05.929+0000',
                'tags':        [
                    'Litora.',
                    'Magnis?',
                    'Magna.',
                    'Dignissim.'
                ],
                'address': '4199 Newport'
            },
            {
                'title':       'Lacinia phasellus velit proin!',
                'img':         'http://lorempixel.com/804/787',
                'description': 'Lorem ipsum duis taciti magna molestie ut scelerisque rutrum luctus maecenas.Venenatis semper hendrerit curae; lacinia ultrices cras massa.',
                'date':        '2005-07-12T06:15:33.148+0000',
                'tags':        [
                    'Mollis?',
                    'Enim.',
                    'At?',
                    'Sociis?'
                ],
                'address': '7473 Aberdeen'
            },
            {
                'title':       'Dictumst tristique bibendum dolor!',
                'img':         'http://lorempixel.com/522/204',
                'description': 'Lorem ipsum suscipit iaculis ornare phasellus felis arcu ipsum netus.Arcu nulla luctus mollis laoreet gravida nostra natoque.',
                'date':        '1979-09-29T04:15:13.613+0000',
                'tags':        [
                    'Ridiculus.',
                    'Mattis?',
                    'Placerat.',
                    'Commodo!'
                ],
                'address': '4560 Menomonee'
            },
            {
                'title':       'Mollis consectetur condimentum a.',
                'img':         'http://lorempixel.com/627/380',
                'description': 'Lorem ipsum cursus nunc vitae urna parturient, non platea lacinia nisi.Vulputate netus fringilla suscipit dui parturient orci auctor quam justo fringilla felis.',
                'date':        '1989-09-05T08:33:07.175+0000',
                'tags':        [
                    'Ultrices.',
                    'Justo?',
                    'Lorem.',
                    'Massa.'
                ],
                'address': '9634 California'
            },
            {
                'title':       'Congue dictum dui varius.',
                'img':         'http://lorempixel.com/639/761',
                'description': 'Lorem ipsum tortor nisi mus sagittis nisi per mauris fringilla.Lacus luctus eros ultrices curae; tincidunt semper faucibus nunc?',
                'date':        '2012-05-26T07:22:41.131+0000',
                'tags':        [
                    'In.',
                    'Lacinia.',
                    'Lectus.',
                    'Sollicitudin.'
                ],
                'address': '713 Illinois Lower'
            },
            {
                'title':       'Litora aenean interdum quam!',
                'img':         'http://lorempixel.com/662/677',
                'description': 'Lorem ipsum facilisis penatibus ligula diam himenaeos consequat conubia netus auctor.Consectetur accumsan condimentum pellentesque laoreet montes hendrerit nisi ac rutrum aliquet fusce.',
                'date':        '1913-01-11T05:19:40.777+0000',
                'tags':        [
                    'Curae;.',
                    'Suspendisse?',
                    'Lectus.',
                    'Enim.'
                ],
                'address': '3295 84th'
            },
            {
                'title':       'Hac luctus malesuada sagittis!',
                'img':         'http://lorempixel.com/317/379',
                'description': 'Lorem ipsum vestibulum faucibus class malesuada convallis eros sed magna urna commodo.Sit risus ipsum mus libero molestie, commodo hendrerit tempus eros.',
                'date':        '1926-05-05T01:19:33.641+0000',
                'tags':        [
                    'Netus.',
                    'Massa.',
                    'Nascetur?',
                    'Ligula.'
                ],
                'address': '666 Oakley'
            },
            {
                'title':       'Tellus taciti proin pulvinar.',
                'img':         'http://lorempixel.com/773/742',
                'description': 'Lorem ipsum malesuada sapien ullamcorper dictumst primis nam cubilia fringilla orci non dolor.Id dolor eget vivamus aenean mattis maecenas, purus dapibus.',
                'date':        '1925-11-09T08:13:20.787+0000',
                'tags':        [
                    'Fermentum.',
                    'Odio.',
                    'Nam.',
                    'Nisl!'
                ],
                'address': '1022 Merrimac'
            },
            {
                'title':       'Tellus velit massa rhoncus!',
                'img':         'http://lorempixel.com/862/530',
                'description': 'Lorem ipsum porta nostra lacus senectus quam accumsan fames, taciti gravida?Risus, magna elementum elit sollicitudin purus pharetra varius.',
                'date':        '1916-06-22T04:43:08.967+0000',
                'tags':        [
                    'Consectetur.',
                    'Eros.',
                    'Bibendum?',
                    'Potenti.'
                ],
                'address': '5306 Navajo'
            },
            {
                'title':       'Metus sollicitudin ultrices potenti?',
                'img':         'http://lorempixel.com/948/278',
                'description': 'Lorem ipsum dignissim blandit eleifend platea at facilisis euismod cursus lacinia vivamus!Neque malesuada facilisi hendrerit fames dapibus sed porta habitant elit?',
                'date':        '1989-02-17T04:13:01.832+0000',
                'tags':        [
                    'Lorem.',
                    'Eu.',
                    'Sit.',
                    'Curae;.'
                ],
                'address': '6384 I57 111th St'
            },
            {
                'title':       'Auctor egestas sociis, phasellus.',
                'img':         'http://lorempixel.com/652/589',
                'description': 'Lorem ipsum habitasse sit nam faucibus fames netus phasellus natoque.Sociosqu, iaculis orci lorem montes molestie porta potenti sociosqu adipiscing pretium.',
                'date':        '1927-08-04T12:01:30.374+0000',
                'tags':        [
                    'Placerat.',
                    'Non.',
                    'Felis.',
                    'Neque.'
                ],
                'address': '7700 Pearson'
            },
            {
                'title':       'Accumsan hac phasellus gravida.',
                'img':         'http://lorempixel.com/568/420',
                'description': 'Lorem ipsum turpis consectetur rhoncus condimentum tortor pharetra commodo senectus imperdiet neque eget sit?Vestibulum cras fames sit velit torquent dictum eros ridiculus quisque.',
                'date':        '1985-06-23T02:28:35.461+0000',
                'tags':        [
                    'Tempus.',
                    'Nibh.',
                    'Ante.',
                    'Fusce.'
                ],
                'address': '7598 Eisenhower Racine Av'
            },
            {
                'title':       'Turpis aptent tristique sapien.',
                'img':         'http://lorempixel.com/510/241',
                'description': 'Lorem ipsum elementum laoreet amet ridiculus ut rhoncus potenti sagittis auctor felis consequat.Felis torquent adipiscing nibh dis donec, sit natoque nisl euismod rutrum?',
                'date':        '1939-10-17T06:51:01.973+0000',
                'tags':        [
                    'Sociis.',
                    'Lectus.',
                    'Justo.',
                    'Cubilia?'
                ],
                'address': '675 36th'
            },
            {
                'title':       'Consequat fames volutpat aliquam.',
                'img':         'http://lorempixel.com/729/651',
                'description': 'Lorem ipsum fermentum varius sagittis at ante molestie parturient, mattis iaculis.Praesent faucibus lacus ante quisque dui libero per potenti?',
                'date':        '1945-07-12T12:44:08.805+0000',
                'tags':        [
                    'Litora.',
                    'Sem.',
                    'Nec.',
                    'Luctus.'
                ],
                'address': '1315 Glenwood'
            },
            {
                'title':       'Egestas nascetur tempor sollicitudin.',
                'img':         'http://lorempixel.com/511/791',
                'description': 'Lorem ipsum sed erat habitasse accumsan suscipit sociosqu, libero pretium accumsan gravida tristique conubia.Sem ullamcorper integer gravida gravida accumsan proin curabitur integer.',
                'date':        '1943-09-07T10:48:12.935+0000',
                'tags':        [
                    'Pulvinar.',
                    'Torquent.',
                    'Iaculis.',
                    'Tristique.'
                ],
                'address': '8920 South Water Market'
            },
            {
                'title':       'Vivamus nunc metus imperdiet.',
                'img':         'http://lorempixel.com/665/786',
                'description': 'Lorem ipsum urna, habitasse senectus duis dignissim sem facilisis posuere netus.Cubilia ut quam metus, bibendum in aliquet egestas dis dapibus.',
                'date':        '1921-05-08T01:05:54.167+0000',
                'tags':        [
                    'Bibendum.',
                    'Etiam.',
                    'Porttitor.',
                    'Congue.'
                ],
                'address': '1084 Seminole'
            },
            {
                'title':       'Vel etiam fermentum ligula.',
                'img':         'http://lorempixel.com/731/420',
                'description': 'Lorem ipsum neque faucibus tortor cras praesent gravida mattis ornare nam.Porttitor a cum tempus duis velit ipsum nam porttitor porta justo.',
                'date':        '1980-08-25T01:48:41.138+0000',
                'tags':        [
                    'Eleifend.',
                    'Leo?',
                    'Nibh.',
                    'Ridiculus.'
                ],
                'address': '4850 Harding'
            },
            {
                'title':       'Eros facilisi ac quam.',
                'img':         'http://lorempixel.com/412/687',
                'description': 'Lorem ipsum quisque hac litora litora euismod in potenti ridiculus cubilia, condimentum aenean.Himenaeos natoque inceptos class nascetur hac lacus, ultricies viverra inceptos litora?',
                'date':        '1931-07-22T08:38:10.071+0000',
                'tags':        [
                    'Nullam.',
                    'Penatibus.',
                    'Scelerisque.',
                    'Facilisi!'
                ],
                'address': '7790 Moffat'
            },
            {
                'title':       'Volutpat ornare ultricies, habitasse.',
                'img':         'http://lorempixel.com/913/219',
                'description': 'Lorem ipsum suspendisse vulputate suscipit potenti donec elementum, dui aptent.Nisi molestie nulla tortor ultricies condimentum scelerisque porttitor aenean imperdiet venenatis.',
                'date':        '1973-10-03T08:37:24.044+0000',
                'tags':        [
                    'Pretium.',
                    'Porta.',
                    'Conubia.',
                    'Amet.'
                ],
                'address': '1407 Post'
            },
            {
                'title':       'Velit consequat sociis dictum.',
                'img':         'http://lorempixel.com/870/314',
                'description': 'Lorem ipsum orci at libero netus ut tincidunt mi odio.Leo integer aenean pharetra, parturient molestie inceptos bibendum iaculis turpis consequat malesuada.',
                'date':        '1978-11-08T07:27:27.786+0000',
                'tags':        [
                    'Et.',
                    'Justo.',
                    'Leo.',
                    'Ipsum.'
                ],
                'address': '4250 Spine'
            },
            {
                'title':       'Imperdiet praesent praesent penatibus.',
                'img':         'http://lorempixel.com/656/572',
                'description': 'Lorem ipsum fringilla mi sem erat scelerisque primis turpis consequat porttitor mattis.Iaculis at suspendisse porttitor volutpat nibh dignissim nam nec sodales pharetra leo.',
                'date':        '1934-08-02T11:23:53.947+0000',
                'tags':        [
                    'Eget.',
                    'Senectus.',
                    'Tempor!',
                    'Commodo.'
                ],
                'address': '8101 110th'
            },
            {
                'title':       'Consequat sociis justo vitae.',
                'img':         'http://lorempixel.com/346/796',
                'description': 'Lorem ipsum neque massa praesent parturient posuere hac sociis praesent litora sit curabitur luctus.Placerat luctus vitae id sollicitudin ad pretium augue consectetur scelerisque eros scelerisque.',
                'date':        '2000-09-12T09:59:32.152+0000',
                'tags':        [
                    'Mi.',
                    'Viverra.',
                    'Risus!',
                    'Litora.'
                ],
                'address': '950 49th'
            },
            {
                'title':       'Consectetur imperdiet rhoncus class!',
                'img':         'http://lorempixel.com/703/764',
                'description': 'Lorem ipsum nec pretium sapien amet lectus leo ac ornare inceptos; interdum egestas justo?Metus dictum sem suscipit libero natoque aptent ipsum.',
                'date':        '1990-10-16T06:02:13.112+0000',
                'tags':        [
                    'Sagittis.',
                    'Posuere.',
                    'Metus.',
                    'Diam?'
                ],
                'address': '1408 Dan Ryan Ib Franklin Ext'
            },
            {
                'title':       'Euismod nulla urna sapien.',
                'img':         'http://lorempixel.com/917/417',
                'description': 'Lorem ipsum ullamcorper pharetra leo euismod tempus quis gravida duis ad lobortis donec.Rutrum, justo ante quis elit litora neque diam!',
                'date':        '1957-07-15T06:02:06.377+0000',
                'tags':        [
                    'Fusce.',
                    'Cras.',
                    'Nulla.',
                    'Pretium.'
                ],
                'address': '3001 Huntington'
            },
            {
                'title':       'Enim rutrum elementum orci.',
                'img':         'http://lorempixel.com/490/314',
                'description': 'Lorem ipsum semper eros laoreet cras gravida nunc purus euismod.Scelerisque auctor habitasse lectus dolor at dictum varius enim ut.',
                'date':        '1964-06-08T03:57:18.892+0000',
                'tags':        [
                    'Ac.',
                    'Hendrerit!',
                    'Dolor.',
                    'Lacus.'
                ],
                'address': '1717 Belmont Harbor'
            },
            {
                'title':       'Elit interdum pulvinar phasellus.',
                'img':         'http://lorempixel.com/565/495',
                'description': 'Lorem ipsum fringilla vitae sem purus nec curabitur nulla cras, odio mi porttitor.Sed magnis nec vivamus convallis dapibus ullamcorper tortor elementum vehicula dignissim tincidunt.',
                'date':        '1979-03-10T07:11:10.332+0000',
                'tags':        [
                    'Rutrum.',
                    'Facilisi.',
                    'Nulla.',
                    'Aliquam.'
                ],
                'address': '5422 Germania'
            },
            {
                'title':       'Ligula purus dictum himenaeos.',
                'img':         'http://lorempixel.com/361/484',
                'description': 'Lorem ipsum sollicitudin non taciti sapien dis molestie lacinia nascetur mus.Natoque aliquam quam pellentesque ante potenti condimentum placerat ipsum inceptos donec sodales.',
                'date':        '1947-12-27T08:38:59.690+0000',
                'tags':        [
                    'Vitae.',
                    'Placerat!',
                    'At?',
                    'Aenean?'
                ],
                'address': '6286 Madison St'
            },
            {
                'title':       'Donec non placerat sapien.',
                'img':         'http://lorempixel.com/684/220',
                'description': 'Lorem ipsum tristique cras penatibus morbi hac platea diam et suscipit justo tempus rutrum!Sociis magna placerat volutpat fermentum penatibus dui non imperdiet.',
                'date':        '1913-02-09T12:04:45.161+0000',
                'tags':        [
                    'Cubilia.',
                    'Convallis.',
                    'Dignissim.',
                    'Nec.'
                ],
                'address': '4240 I190'
            },
            {
                'title':       'Duis non purus dictumst.',
                'img':         'http://lorempixel.com/584/722',
                'description': 'Lorem ipsum tincidunt hac consequat commodo lorem blandit facilisi ullamcorper suscipit nulla suspendisse eros.Proin leo hendrerit dolor accumsan aptent quisque tortor nulla mattis parturient.',
                'date':        '1959-02-10T05:00:36.065+0000',
                'tags':        [
                    'Vitae.',
                    'Laoreet.',
                    'Montes.',
                    'Rutrum.'
                ],
                'address': '1296 Prescott'
            },
            {
                'title':       'Hendrerit risus tellus sodales.',
                'img':         'http://lorempixel.com/609/647',
                'description': 'Lorem ipsum bibendum vestibulum pharetra massa rhoncus potenti penatibus placerat himenaeos malesuada.Adipiscing venenatis cum conubia ipsum natoque donec consequat viverra iaculis platea.',
                'date':        '1927-12-12T06:10:44.640+0000',
                'tags':        [
                    'Vehicula.',
                    'Cursus?',
                    'Torquent.',
                    'Placerat.'
                ],
                'address': '3783 Lsd Wacker Dr Nb'
            },
            {
                'title':       'Nostra litora eros dui!',
                'img':         'http://lorempixel.com/693/523',
                'description': 'Lorem ipsum fusce duis ante taciti non porttitor quam rhoncus dapibus dapibus sem platea!Pulvinar faucibus placerat pulvinar ad imperdiet sapien class vulputate venenatis morbi id.',
                'date':        '1941-09-28T07:06:28.177+0000',
                'tags':        [
                    'Nascetur.',
                    'Lacinia.',
                    'Consequat.',
                    'Suscipit.'
                ],
                'address': '8713 Avenue C'
            },
            {
                'title':       'Urna aliquet nisl praesent?',
                'img':         'http://lorempixel.com/909/320',
                'description': 'Lorem ipsum fames tellus et per amet lobortis consequat eu varius senectus hendrerit.Lectus posuere euismod lobortis cras nascetur orci neque molestie laoreet!',
                'date':        '2008-05-25T09:56:25.955+0000',
                'tags':        [
                    'Lacinia.',
                    'Massa.',
                    'Himenaeos?',
                    'Sociis.'
                ],
                'address': '13 Melvina'
            },
            {
                'title':       'Consequat aliquet auctor a.',
                'img':         'http://lorempixel.com/399/799',
                'description': 'Lorem ipsum iaculis montes bibendum euismod cras curae; accumsan eget, tristique commodo dui condimentum.Et orci hac etiam vestibulum id quam, dictum ipsum aenean?',
                'date':        '2011-06-26T05:22:55.420+0000',
                'tags':        [
                    'Ultricies.',
                    'Imperdiet?',
                    'Tempus.',
                    'Phasellus.'
                ],
                'address': '9747 Margate'
            },
            {
                'title':       'Ipsum ornare dictumst quis.',
                'img':         'http://lorempixel.com/570/234',
                'description': 'Lorem ipsum amet sagittis nisi dapibus laoreet, dolor lacinia tortor orci lacinia porttitor.Neque habitant consequat habitant nullam primis interdum habitasse gravida magnis, congue sociis.',
                'date':        '1981-10-06T09:29:19.423+0000',
                'tags':        [
                    'Rutrum.',
                    'Turpis!',
                    'Eu.',
                    'Varius.'
                ],
                'address': '3044 Cheltenham'
            },
            {
                'title':       'Etiam consequat nisi fringilla.',
                'img':         'http://lorempixel.com/912/376',
                'description': 'Lorem ipsum pharetra in at dui rutrum lacus sem leo.Luctus ridiculus enim urna auctor vivamus, nam pharetra suspendisse habitasse!',
                'date':        '1969-05-30T05:16:21.036+0000',
                'tags':        [
                    'Laoreet.',
                    'Semper.',
                    'Vehicula.',
                    'Congue.'
                ],
                'address': '1423 Lehigh'
            },
            {
                'title':       'Arcu hendrerit turpis nullam.',
                'img':         'http://lorempixel.com/636/590',
                'description': 'Lorem ipsum condimentum interdum cursus iaculis eros sed magna imperdiet vel lacinia.Magna eros suscipit mi dapibus, aptent ultrices risus augue magna auctor.',
                'date':        '1936-08-02T04:31:46.433+0000',
                'tags':        [
                    'Natoque.',
                    'Nisi!',
                    'Magna.',
                    'Cubilia.'
                ],
                'address': '3037 Payne'
            },
            {
                'title':       'Montes feugiat elementum ullamcorper.',
                'img':         'http://lorempixel.com/924/506',
                'description': 'Lorem ipsum condimentum, lectus dolor penatibus ut mattis ad facilisi.Est vulputate fermentum dui id venenatis risus hendrerit diam porta consectetur dis.',
                'date':        '1932-07-16T12:50:20.673+0000',
                'tags':        [
                    'Sociosqu.',
                    'Dignissim.',
                    'Ipsum.',
                    'Taciti.'
                ],
                'address': '5288 Dan Ryan Wentworth Av'
            },
            {
                'title':       'Libero id ipsum lobortis.',
                'img':         'http://lorempixel.com/903/763',
                'description': 'Lorem ipsum ante ut malesuada fames dapibus neque fermentum congue ultricies tortor!Aptent ultricies commodo nam ac cubilia ultricies donec nisl dignissim.',
                'date':        '1950-09-30T02:48:52.969+0000',
                'tags':        [
                    'Vulputate.',
                    'Cum.',
                    'Est.',
                    'Congue.'
                ],
                'address': '7183 Walnut'
            },
            {
                'title':       'Ridiculus lobortis lacus id.',
                'img':         'http://lorempixel.com/591/241',
                'description': 'Lorem ipsum ornare vitae scelerisque ultricies magna mi congue suscipit semper iaculis.Posuere eu mauris nostra velit elementum curae; eleifend nibh congue.',
                'date':        '1997-02-15T11:53:27.109+0000',
                'tags':        [
                    'Amet.',
                    'Congue.',
                    'Blandit.',
                    'Mattis.'
                ],
                'address': '998 Brandon'
            },
            {
                'title':       'Vitae quam dictum taciti?',
                'img':         'http://lorempixel.com/545/762',
                'description': 'Lorem ipsum euismod torquent praesent habitant ultrices malesuada dictum nec.Purus lacinia, velit per dolor mi sociosqu in?',
                'date':        '1984-02-07T02:22:35.453+0000',
                'tags':        [
                    'Proin.',
                    'Vehicula.',
                    'Eleifend.',
                    'Cubilia.'
                ],
                'address': '3666 St Louis'
            },
            {
                'title':       'Consequat primis ligula massa.',
                'img':         'http://lorempixel.com/520/316',
                'description': 'Lorem ipsum a; in sollicitudin justo dictum eget torquent orci in.Blandit massa, et integer viverra bibendum dui sagittis.',
                'date':        '2000-12-26T05:49:12.663+0000',
                'tags':        [
                    'Non.',
                    'Diam!',
                    'Tincidunt.',
                    'Gravida.'
                ],
                'address': '6808 South Shore'
            },
            {
                'title':       'Nisl vitae tristique dictumst.',
                'img':         'http://lorempixel.com/845/727',
                'description': 'Lorem ipsum blandit molestie auctor proin sagittis suscipit varius senectus iaculis.Hendrerit bibendum inceptos neque nisi pretium euismod et?',
                'date':        '1906-04-03T09:04:33.596+0000',
                'tags':        [
                    'Nibh?',
                    'Porttitor!',
                    'Ante.',
                    'Lacinia.'
                ],
                'address': '7294 Richmond'
            },
            {
                'title':       'Cras velit commodo vitae.',
                'img':         'http://lorempixel.com/366/634',
                'description': 'Lorem ipsum etiam euismod nulla tempor habitant dignissim varius eu aenean hendrerit.Integer leo parturient tempor class montes porttitor suspendisse justo phasellus orci nascetur.',
                'date':        '1959-02-06T07:45:23.331+0000',
                'tags':        [
                    'Proin.',
                    'Erat.',
                    'Vel!',
                    'Consequat.'
                ],
                'address': '3316 117th'
            },
            {
                'title':       'Fusce nascetur dapibus leo.',
                'img':         'http://lorempixel.com/695/439',
                'description': 'Lorem ipsum fringilla luctus condimentum, phasellus velit natoque porttitor tempus dis nulla ornare.Condimentum nullam litora ac purus nascetur lacinia amet nam nostra!',
                'date':        '1998-07-02T11:34:02.969+0000',
                'tags':        [
                    'Pulvinar.',
                    'Porttitor?',
                    'Turpis?',
                    'Leo.'
                ],
                'address': '5506 Frontier'
            },
            {
                'title':       'Urna porttitor inceptos sed.',
                'img':         'http://lorempixel.com/564/548',
                'description': 'Lorem ipsum ultricies senectus porta bibendum malesuada erat sociosqu litora!Mi ad mattis orci porttitor, laoreet justo ad cum nisl non.',
                'date':        '1963-08-06T07:11:15.861+0000',
                'tags':        [
                    'Hendrerit.',
                    'Euismod.',
                    'Feugiat.',
                    'Dapibus.'
                ],
                'address': '3790 Adams'
            },
            {
                'title':       'Eget sodales massa molestie?',
                'img':         'http://lorempixel.com/853/430',
                'description': 'Lorem ipsum class nascetur amet quis phasellus dis suscipit nam aliquet semper nascetur auctor.Dictumst hendrerit phasellus senectus tincidunt inceptos et hac ullamcorper?',
                'date':        '1914-01-20T08:13:39.139+0000',
                'tags':        [
                    'Potenti!',
                    'Mattis!',
                    'Quisque?',
                    'Velit?'
                ],
                'address': '6813 St Clair'
            },
            {
                'title':       'Hac dictumst tellus id.',
                'img':         'http://lorempixel.com/593/286',
                'description': 'Lorem ipsum natoque potenti mollis semper facilisi ante blandit viverra tincidunt sit.Augue lectus nisi laoreet lectus aenean fringilla mauris lobortis gravida.',
                'date':        '1981-01-14T11:58:38.313+0000',
                'tags':        [
                    'Venenatis.',
                    'Class.',
                    'Eget.',
                    'Mus.'
                ],
                'address': '6415 Crandon'
            },
            {
                'title':       'Massa, faucibus tempor consectetur.',
                'img':         'http://lorempixel.com/910/232',
                'description': 'Lorem ipsum dapibus velit non auctor mus consectetur gravida ut sem himenaeos!Ullamcorper volutpat facilisi vulputate dui dolor penatibus vulputate.',
                'date':        '1906-05-24T01:39:47.528+0000',
                'tags':        [
                    'Turpis.',
                    'Vulputate.',
                    'Litora.',
                    'Curabitur?'
                ],
                'address': '1093 Ionia'
            },
            {
                'title':       'Sodales semper feugiat habitasse.',
                'img':         'http://lorempixel.com/530/341',
                'description': 'Lorem ipsum faucibus viverra ligula bibendum in orci tincidunt commodo platea, lacus ut sociis.Curae; volutpat habitant dictumst vulputate lorem ut sed.',
                'date':        '1935-01-14T12:37:34.485+0000',
                'tags':        [
                    'Semper.',
                    'Tortor.',
                    'Mollis.',
                    'Et.'
                ],
                'address': '9781 Gregory'
            },
            {
                'title':       'Erat massa cras molestie.',
                'img':         'http://lorempixel.com/606/633',
                'description': 'Lorem ipsum dignissim porttitor iaculis nisl rhoncus integer fringilla pellentesque rutrum quam.Mus taciti at lobortis etiam convallis aptent cursus quam.',
                'date':        '1939-12-01T08:42:53.026+0000',
                'tags':        [
                    'At.',
                    'Eros.',
                    'Senectus.',
                    'Montes.'
                ],
                'address': '5527 Hastings'
            },
            {
                'title':       'Orci imperdiet eros nam!',
                'img':         'http://lorempixel.com/574/256',
                'description': 'Lorem ipsum nibh tincidunt nulla erat praesent nulla, viverra imperdiet phasellus ad.Nisl potenti risus convallis elementum hendrerit fusce ut suscipit tortor eros.',
                'date':        '1979-10-27T08:34:01.316+0000',
                'tags':        [
                    'Luctus.',
                    'Eros.',
                    'Consectetur!',
                    'Convallis.'
                ],
                'address': '5347 Kennedy Western Av'
            },
            {
                'title':       'Enim lorem elementum phasellus.',
                'img':         'http://lorempixel.com/858/350',
                'description': 'Lorem ipsum netus porttitor egestas sed tempor pretium adipiscing magnis ac duis.Proin nam felis mus risus curabitur odio non velit magnis dignissim.',
                'date':        '1957-06-25T09:41:16.916+0000',
                'tags':        [
                    'Sollicitudin.',
                    'Elit.',
                    'Orci.',
                    'Potenti.'
                ],
                'address': '9519 Eisenhower Independence Bl'
            },
            {
                'title':       'Sodales curae; nisi lorem.',
                'img':         'http://lorempixel.com/443/342',
                'description': 'Lorem ipsum leo orci aliquam sagittis posuere ut vestibulum, sociosqu congue sem purus!Risus leo praesent phasellus consequat at vehicula duis congue, amet posuere.',
                'date':        '1961-07-12T02:46:58.803+0000',
                'tags':        [
                    'Ridiculus.',
                    'Diam.',
                    'Morbi.',
                    'Integer.'
                ],
                'address': '9615 Woodlawn'
            },
            {
                'title':       'Aliquet urna quisque aptent.',
                'img':         'http://lorempixel.com/480/458',
                'description': 'Lorem ipsum quis maecenas laoreet laoreet mus dui posuere facilisi mus?Nibh curabitur blandit enim maecenas lobortis habitant curabitur facilisi vulputate aliquam.',
                'date':        '1965-12-25T03:33:03.871+0000',
                'tags':        [
                    'Blandit.',
                    'Quam.',
                    'Et.',
                    'Eget.'
                ],
                'address': '1311 Edens Wilson Av'
            },
            {
                'title':       'Interdum dignissim nascetur risus.',
                'img':         'http://lorempixel.com/820/708',
                'description': 'Lorem ipsum fringilla odio et fermentum hendrerit gravida dignissim dictum dictumst!Interdum aliquam euismod posuere dapibus viverra porttitor magnis sed libero aliquet curae;.',
                'date':        '1928-11-19T07:10:02.573+0000',
                'tags':        [
                    'Augue.',
                    'Placerat.',
                    'Imperdiet.',
                    'Semper.'
                ],
                'address': '3604 Wayne'
            },
            {
                'title':       'Nunc nibh est tristique.',
                'img':         'http://lorempixel.com/516/476',
                'description': 'Lorem ipsum dapibus bibendum parturient phasellus ligula nam sit accumsan phasellus?Ornare dolor dui molestie suscipit laoreet morbi lorem risus rutrum parturient.',
                'date':        '1925-08-10T03:25:55.422+0000',
                'tags':        [
                    'Litora.',
                    'Primis.',
                    'Arcu?',
                    'Sociis.'
                ],
                'address': '4384 Hooker'
            },
            {
                'title':       'Luctus porta sociis erat.',
                'img':         'http://lorempixel.com/998/572',
                'description': 'Lorem ipsum congue fringilla vulputate blandit viverra adipiscing sit feugiat lorem mi porttitor facilisis.Molestie venenatis urna nullam mus mauris curae; bibendum.',
                'date':        '1943-06-19T05:47:25.981+0000',
                'tags':        [
                    'Eleifend.',
                    'Aliquet.',
                    'Risus?',
                    'Hendrerit.'
                ],
                'address': '3579 Stevenson Ib Dan Ryan Ob'
            },
            {
                'title':       'Varius cras volutpat ut!',
                'img':         'http://lorempixel.com/943/576',
                'description': 'Lorem ipsum at nascetur erat per eget fames rhoncus quisque ac fringilla sapien condimentum.Nulla volutpat integer auctor morbi convallis nascetur ultrices platea.',
                'date':        '1973-08-18T02:58:39.033+0000',
                'tags':        [
                    'Enim.',
                    'Varius.',
                    'Eros.',
                    'Montes.'
                ],
                'address': '7113 134th'
            },
            {
                'title':       'Praesent neque ultrices semper.',
                'img':         'http://lorempixel.com/419/442',
                'description': 'Lorem ipsum senectus augue tempor dapibus tristique convallis auctor sodales.Facilisi molestie etiam lacinia sem placerat dictum curae; amet.',
                'date':        '1941-04-01T03:33:21.498+0000',
                'tags':        [
                    'Habitant.',
                    'Lectus.',
                    'Fames.',
                    'Imperdiet.'
                ],
                'address': '7314 La Salle'
            },
            {
                'title':       'Aliquam massa sit eu.',
                'img':         'http://lorempixel.com/381/368',
                'description': 'Lorem ipsum proin phasellus habitant tristique dignissim venenatis accumsan nisl arcu adipiscing bibendum.Velit enim rutrum blandit eu rhoncus malesuada vel!',
                'date':        '1921-02-28T01:16:15.500+0000',
                'tags':        [
                    'Rutrum.',
                    'Volutpat.',
                    'Enim.',
                    'In.'
                ],
                'address': '8039 Commercial'
            },
            {
                'title':       'Nascetur interdum purus cubilia.',
                'img':         'http://lorempixel.com/318/385',
                'description': 'Lorem ipsum nibh eros volutpat habitant mus vehicula class ligula.Arcu rutrum et ad integer nulla sollicitudin litora semper elit.',
                'date':        '1979-01-11T03:42:21.178+0000',
                'tags':        [
                    'Integer.',
                    'Etiam.',
                    'Adipiscing.',
                    'In.'
                ],
                'address': '2039 Gunnison'
            },
            {
                'title':       'Fames, fusce non in.',
                'img':         'http://lorempixel.com/449/729',
                'description': 'Lorem ipsum sapien mi taciti fringilla nascetur egestas dignissim euismod ipsum.Sed semper leo nostra mauris potenti vulputate laoreet!',
                'date':        '1935-02-23T10:03:53.200+0000',
                'tags':        [
                    'Morbi.',
                    'Curae;.',
                    'Quis.',
                    'Luctus.'
                ],
                'address': '9873 Kimberly'
            },
            {
                'title':       'Suspendisse fermentum, augue sed.',
                'img':         'http://lorempixel.com/404/464',
                'description': 'Lorem ipsum tortor integer maecenas rutrum mi nam imperdiet etiam.Gravida luctus vitae sit porttitor fames malesuada porttitor ad.',
                'date':        '1985-06-12T09:15:47.877+0000',
                'tags':        [
                    'Eu.',
                    'Nisl.',
                    'Massa.',
                    'Ad.'
                ],
                'address': '3185 Nixon'
            },
            {
                'title':       'Mauris quis facilisis magna.',
                'img':         'http://lorempixel.com/927/567',
                'description': 'Lorem ipsum mus neque fermentum lobortis a potenti sem tempus sollicitudin sem.Vitae sociosqu libero ornare fermentum velit potenti leo vestibulum eu phasellus.',
                'date':        '1951-02-05T03:15:56.839+0000',
                'tags':        [
                    'Curabitur?',
                    'Nunc.',
                    'A.',
                    'Porta.'
                ],
                'address': '1170 Shelby'
            },
            {
                'title':       'Purus proin quam est.',
                'img':         'http://lorempixel.com/587/667',
                'description': 'Lorem ipsum orci nisi vehicula sapien mi justo posuere gravida.Ac curae; integer massa arcu in ut pulvinar nascetur.',
                'date':        '1945-11-10T02:33:10.038+0000',
                'tags':        [
                    'Ultricies.',
                    'Urna?',
                    'Lacinia.',
                    'Morbi.'
                ],
                'address': '1893 Wolcott'
            },
            {
                'title':       'Nostra libero consectetur sem.',
                'img':         'http://lorempixel.com/416/267',
                'description': 'Lorem ipsum venenatis vitae praesent sapien eros bibendum diam posuere suscipit, a in est.Lacinia convallis fames fringilla dictum fusce habitasse luctus.',
                'date':        '1906-10-17T06:18:59.180+0000',
                'tags':        [
                    'Molestie!',
                    'Ipsum.',
                    'Dolor.',
                    'Senectus.'
                ],
                'address': '5373 Kenneth'
            },
            {
                'title':       'Tortor dignissim proin, lectus.',
                'img':         'http://lorempixel.com/670/431',
                'description': 'Lorem ipsum class lobortis, eros ad conubia donec nam tempor vel amet maecenas viverra.Condimentum sollicitudin placerat elementum facilisi adipiscing elit feugiat potenti!',
                'date':        '1906-12-04T12:07:12.599+0000',
                'tags':        [
                    'Bibendum?',
                    'Mattis.',
                    'Porta.',
                    'Rutrum?'
                ],
                'address': '3516 Mendota'
            },
            {
                'title':       'Aliquam morbi massa in.',
                'img':         'http://lorempixel.com/523/646',
                'description': 'Lorem ipsum nibh viverra quis ultrices nibh cras mus dis.Accumsan scelerisque habitasse erat pretium accumsan eleifend lobortis mattis facilisi vulputate himenaeos.',
                'date':        '1953-03-04T03:53:21.757+0000',
                'tags':        [
                    'Sed!',
                    'Integer.',
                    'Blandit.',
                    'Placerat.'
                ],
                'address': '4910 Cermak'
            },
            {
                'title':       'Phasellus eu mauris nulla.',
                'img':         'http://lorempixel.com/988/707',
                'description': 'Lorem ipsum blandit quisque viverra etiam porta mauris semper habitasse nullam.Vehicula morbi elit ultrices malesuada in elit quam interdum scelerisque, netus sed.',
                'date':        '1954-05-30T02:56:47.278+0000',
                'tags':        [
                    'Rhoncus.',
                    'Accumsan.',
                    'Interdum.',
                    'Ornare.'
                ],
                'address': '7631 Scott'
            },
            {
                'title':       'Elit purus blandit aptent.',
                'img':         'http://lorempixel.com/572/626',
                'description': 'Lorem ipsum quisque tincidunt turpis lobortis class elit litora condimentum.Placerat pretium dui suscipit sapien hac mauris nam.',
                'date':        '1927-11-10T05:58:46.991+0000',
                'tags':        [
                    'Nostra.',
                    'Curabitur.',
                    'Eleifend.',
                    'Gravida.'
                ],
                'address': '7698 Pavilion Plaza'
            },
            {
                'title':       'Sed a integer nascetur.',
                'img':         'http://lorempixel.com/340/548',
                'description': 'Lorem ipsum nostra facilisis neque sociis sociosqu condimentum consectetur pretium faucibus id facilisis tristique.Condimentum dictum nam et felis gravida pellentesque viverra est aenean rutrum accumsan.',
                'date':        '1951-03-31T05:04:37.559+0000',
                'tags':        [
                    'Ultricies!',
                    'Elit.',
                    'Taciti.',
                    'Hendrerit.'
                ],
                'address': '7141 Lansing'
            },
            {
                'title':       'Nulla nullam eleifend quam!',
                'img':         'http://lorempixel.com/835/782',
                'description': 'Lorem ipsum dictum risus sociosqu fusce nascetur nec dis sagittis sed lacus sodales.Molestie massa mollis sociosqu pulvinar rhoncus commodo vehicula aptent accumsan class.',
                'date':        '1944-07-27T01:20:36.927+0000',
                'tags':        [
                    'Pharetra.',
                    'Lacinia.',
                    'Metus.',
                    'Platea.'
                ],
                'address': '8501 West Circle'
            },
            {
                'title':       'Facilisis scelerisque dis tortor.',
                'img':         'http://lorempixel.com/588/525',
                'description': 'Lorem ipsum magna a consequat nisl tincidunt potenti quisque, venenatis nulla magna.Parturient aenean primis pretium hendrerit lacus odio convallis porta risus!',
                'date':        '1956-05-07T09:28:37.129+0000',
                'tags':        [
                    'Dolor.',
                    'Tempus.',
                    'Congue.',
                    'Nibh!'
                ],
                'address': '185 Churchill'
            },
            {
                'title':       'Leo interdum facilisi; mollis.',
                'img':         'http://lorempixel.com/924/205',
                'description': 'Lorem ipsum convallis magna lacus netus est sociis sagittis nam!Metus congue senectus imperdiet fames tempor erat nostra maecenas curae;.',
                'date':        '1911-04-14T07:42:32.893+0000',
                'tags':        [
                    'Potenti.',
                    'Non?',
                    'Euismod.',
                    'Lobortis.'
                ],
                'address': '4571 Constance'
            },
            {
                'title':       'In purus, nullam mus.',
                'img':         'http://lorempixel.com/852/732',
                'description': 'Lorem ipsum eget urna sociis montes et dictumst, lectus nisl ligula dapibus suspendisse!Blandit phasellus euismod egestas lorem aliquam nibh cum sollicitudin ac pellentesque integer!',
                'date':        '1961-07-11T05:45:18.425+0000',
                'tags':        [
                    'Neque!',
                    'Porta.',
                    'Vehicula.',
                    'Nam.'
                ],
                'address': '5732 Prindiville'
            },
            {
                'title':       'Diam eleifend tristique potenti.',
                'img':         'http://lorempixel.com/403/692',
                'description': 'Lorem ipsum cubilia, nullam risus faucibus iaculis varius maecenas porttitor.Porta consectetur purus sapien odio eget rhoncus tristique ultrices elementum mus vivamus.',
                'date':        '1946-07-14T12:17:52.046+0000',
                'tags':        [
                    'Fermentum.',
                    'Massa.',
                    'Duis?',
                    'Taciti.'
                ],
                'address': '6288 Chicago Skyway State St'
            },
            {
                'title':       'Non primis diam consequat.',
                'img':         'http://lorempixel.com/416/385',
                'description': 'Lorem ipsum tempor est class dolor magnis eu augue ipsum cubilia.Eleifend dictum auctor augue rutrum, hac facilisis vehicula.',
                'date':        '1976-04-27T05:00:29.710+0000',
                'tags':        [
                    'Id.',
                    'Tortor!',
                    'Dictumst.',
                    'Aptent.'
                ],
                'address': '7263 Shields'
            },
            {
                'title':       'Risus, fringilla nam mus!',
                'img':         'http://lorempixel.com/757/279',
                'description': 'Lorem ipsum tincidunt magna laoreet fringilla eget aenean nec posuere facilisis.Nam laoreet congue at purus rhoncus magna euismod penatibus elit eu sociis?',
                'date':        '1995-01-31T01:08:04.205+0000',
                'tags':        [
                    'Lobortis?',
                    'Bibendum.',
                    'Porttitor?',
                    'Rhoncus.'
                ],
                'address': '1664 State Line'
            },
            {
                'title':       'Tempor placerat suscipit aliquet.',
                'img':         'http://lorempixel.com/637/683',
                'description': 'Lorem ipsum tincidunt hac egestas adipiscing vivamus purus himenaeos mollis laoreet ultrices scelerisque sociis.Nascetur a lobortis posuere lectus ut volutpat vel purus dis fusce nulla.',
                'date':        '1927-10-06T03:08:58.289+0000',
                'tags':        [
                    'Facilisis.',
                    'Habitant.',
                    'Dis?',
                    'Auctor.'
                ],
                'address': '1444 Hortense'
            },
            {
                'title':       'Quam mi hac cursus.',
                'img':         'http://lorempixel.com/307/653',
                'description': 'Lorem ipsum varius molestie elementum urna sagittis dis dictumst per pharetra mauris felis facilisis.Congue tincidunt est, diam natoque scelerisque dis ad aptent.',
                'date':        '1945-02-01T07:10:18.417+0000',
                'tags':        [
                    'Orci.',
                    'Ut!',
                    'Pellentesque.',
                    'Consequat.'
                ],
                'address': '9663 Division'
            },
            {
                'title':       'Scelerisque aliquam accumsan elit.',
                'img':         'http://lorempixel.com/640/685',
                'description': 'Lorem ipsum purus lacinia ultrices auctor magna aliquet hendrerit diam velit curae;.Justo maecenas dictumst, dolor hac dictumst consectetur montes nostra.',
                'date':        '1914-12-04T07:24:13.885+0000',
                'tags':        [
                    'Semper?',
                    'Sit.',
                    'Sed.',
                    'Lorem.'
                ],
                'address': '4768 Bishop Ford Stony Island Av'
            },
            {
                'title':       'Gravida porttitor nullam sodales.',
                'img':         'http://lorempixel.com/642/413',
                'description': 'Lorem ipsum tellus, ipsum ac amet orci habitasse facilisis hendrerit taciti fusce maecenas!Sociis fermentum interdum donec magna odio cubilia ante per.',
                'date':        '1993-09-04T09:15:16.284+0000',
                'tags':        [
                    'Ultrices.',
                    'Felis.',
                    'Maecenas.',
                    'Urna.'
                ],
                'address': '7860 Mobile'
            },
            {
                'title':       'Mus interdum dictum phasellus.',
                'img':         'http://lorempixel.com/916/244',
                'description': 'Lorem ipsum blandit nullam lorem quam augue himenaeos tellus duis.Duis vestibulum odio, odio metus tristique pellentesque tincidunt.',
                'date':        '1942-12-22T11:55:15.894+0000',
                'tags':        [
                    'Sociis.',
                    'Eu.',
                    'Urna.',
                    'Interdum.'
                ],
                'address': '4722 Larrabee'
            },
            {
                'title':       'Posuere tristique sed molestie.',
                'img':         'http://lorempixel.com/676/692',
                'description': 'Lorem ipsum netus ad porttitor varius lectus quam bibendum id molestie volutpat.Orci sem massa lacus hac lacinia vehicula vulputate?',
                'date':        '1914-02-24T05:13:38.471+0000',
                'tags':        [
                    'Curae;?',
                    'Placerat.',
                    'Eu?',
                    'Leo.'
                ],
                'address': '2507 Pierce'
            },
            {
                'title':       'Aliquam nam lectus duis.',
                'img':         'http://lorempixel.com/388/555',
                'description': 'Lorem ipsum potenti feugiat aptent morbi placerat nisi bibendum ut lectus adipiscing at.Elit ultricies orci porttitor diam rhoncus consequat sem porttitor.',
                'date':        '1911-05-09T06:06:57.531+0000',
                'tags':        [
                    'Ut!',
                    'Ultrices.',
                    'Felis.',
                    'Aliquet!'
                ],
                'address': '201 Le Moyne'
            },
            {
                'title':       'Taciti ridiculus diam habitasse.',
                'img':         'http://lorempixel.com/753/709',
                'description': 'Lorem ipsum eu facilisis at arcu ultrices suscipit taciti inceptos laoreet donec?Hendrerit fermentum vestibulum est dolor, fermentum aliquam hendrerit vehicula dapibus parturient.',
                'date':        '1960-04-21T04:03:00.718+0000',
                'tags':        [
                    'Ac.',
                    'Cursus.',
                    'Penatibus.',
                    'Integer.'
                ],
                'address': '3177 Neenah'
            },
            {
                'title':       'Egestas platea augue habitant.',
                'img':         'http://lorempixel.com/736/523',
                'description': 'Lorem ipsum mus ultrices nibh viverra quis condimentum euismod rutrum semper.Sed congue facilisi morbi nostra natoque torquent laoreet!',
                'date':        '1919-06-06T09:08:24.585+0000',
                'tags':        [
                    'Nullam.',
                    'In!',
                    'Integer.',
                    'Interdum!'
                ],
                'address': '3226 Pitney'
            }
        ];
    });
