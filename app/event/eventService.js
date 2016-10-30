'use strict';

function EventService($http, $window) {
    var self = this;
    self.event;
    self.eventId;
    self.events = [];

    self.getEvent = function getEvent(eventId) {
        if (eventId !== self.eventId) {
            self.eventId = eventId;
            // self.event   = self.events.filter(function(event) {
            //     return event.id === eventId;
            // })[0];
            self.event = self.events[0];
        }

        return self.event;
    }

    self.generateEvent = function generateEvent() {
        var someHtmlDescription = '<h1>HTML Ipsum Presents</h1>' +
            '<p><strong>Pellentesque habitant morbi tristique</strong>senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam,' +
            'feugiat vitae,' +
            'ultricies eget,' +
            'tempor sit amet,' +
            'ante.Donec eu libero sit amet quam egestas semper. <em> Aenean ultricies mi vitae est. </em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,' +
            'ornare sit amet,' +
            'wisi.Aenean fermentum,' +
            'elit eget tincidunt condimentum,' +
            'eros ipsum rutrum orci,' +
            'sagittis tempus lacus enim ac dui. <a href="#"> Donec non enim </a> in turpis pulvinar facilisis. Ut felis.</p> <h2>Header Level 2</h2> <ol> <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li> Aliquam tincidunt mauris eu risus. </li>' +
            '</ol> <blockquote>' +
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p>' +
            '</blockquote> <h3> Header Level 3 </h3>' +
            '<ul>' +
            '   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li>Aliquam tincidunt mauris eu risus.</li> </ul>' +
            '<pre><code>' +
            '#header h1 a {' +
            '	display: block; ' +
            'width: 300px; ' +
            'height: 80px; ' +
            '}' +
            '</code> </pre>';

        var someAddress = [
            {
                'long_name':  $window.faker.random.number(9999).toString(),
                'short_name': $window.faker.random.number(9999).toString(),
                'types':      ['street_number']
            }, {
                'long_name':  $window.faker.address.streetName(),
                'short_name': $window.faker.address.streetName(),
                'types':      ['route']
            }, {
                'long_name':  $window.faker.address.county(),
                'short_name': $window.faker.address.county(),
                'types':      ['sublocality_level_1', 'sublocality', 'political']
            }, {
                'long_name':  $window.faker.address.city(),
                'short_name': $window.faker.address.city(),
                'types':      ['locality', 'political']
            }, {
                'long_name':  'Comuna 1',
                'short_name': 'Comuna 1',
                'types':      ['administrative_area_level_2', 'political']
            }, {
                'long_name':  $window.faker.address.city(),
                'short_name': $window.faker.address.city(),
                'types':      ['administrative_area_level_1', 'political']
            }, {
                'long_name':  $window.faker.address.country(),
                'short_name': $window.faker.address.countryCode(),
                'types':      ['country', 'political']
            }, {
                'long_name':  $window.faker.address.zipCode(),
                'short_name': $window.faker.address.zipCode(),
                'types':      ['postal_code']
            }
        ];

        return {
            'title': $window.faker.random.words($window.faker.random.number({
                min: 2,
                max: 9
            })),
            'img':         $window.faker.image.imageUrl(768, 432, undefined, true),
            'description': someHtmlDescription,
            'date':        $window.faker.date.future(0, new Date()),
            'tags':        [
                $window.faker.random.word(), $window.faker.random.word(), $window.faker.random.word(),
                $window.faker.random.word(), $window.faker.random.word(), $window.faker.random.word()
            ],
            place: {
                'address_components': someAddress,
                'adr_address':        '<span class="street-address">' + someAddress[1].long_name + ' ' + someAddress[0].long_name + '</span>, <span class="postal-code">' + someAddress[7].long_name + '</span> <span class="locality">' + someAddress[3].long_name + '</span>, <span class="country-name">' + someAddress.long_name + '</span>',
                'formatted_address':  someAddress[1].long_name + ' ' + someAddress[0].long_name + ', ' + someAddress[7].long_name + ' ' + someAddress[3].long_name + ' ' + someAddress[6].long_name,
                'geometry':           {
                    'location': {
                        'lat': $window.faker.address.latitude(),
                        'lng': $window.faker.address.longitude()
                    },
                    'viewport': {
                        'south': $window.faker.address.latitude(),
                        'west':  $window.faker.address.longitude(),
                        'north': $window.faker.address.latitude(),
                        'east':  $window.faker.address.longitude()
                    }
                },
                'id':       $window.faker.random.uuid(),
                'name':     $window.faker.company.companyName(),
                'place_id': $window.faker.random.uuid(),
                'types':    [
                    'point_of_interest', 'establishment'
                ],
                'url':      'https://maps.google.com/?cid=' + $window.faker.random.uuid(),
                'vicinity': someAddress[1].long_name + ' ' + someAddress[0].long_name,
                'website':  $window.faker.internet.url()
            }
        };
    };

    self.generateEvents = function generateEvents() {
        for (var i = 1; i <= 100; i++) {
            self.events.push(self.generateEvent());
        }
    };

    self.generateEvents();
}

angular.module('eventoL')
    .service('eventService', ['$http', '$window', EventService]);
