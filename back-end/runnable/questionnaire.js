
  var db      = require('promised-mongo')('paragala'),
      Promise = require('bluebird'),
      mongo   = require('../configuration/mongodb');
var promises = [];

  promises.push(
    db.collection('questions').insert({
      _id: 'paragalaQuestionnaire',
      questions: [{
        title: 'ENTERTAINMENT PROGRAMS',
        editing: false,
        items: [{
          title: 'Best Television Actor',
          editing: false,
          items: [{
            title: 'Jericho Rosales in The Legal Wife(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Alden Richard in Carmela(GMA)',
            editing: false,
            selected: false
          },{
            title: 'Coco Martin in Ikaw Lamang(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Aljur Abrenica in Kambal Sirena(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Enrique Gil in Mirabella(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Paulo Avelino in Sana Bukas pa ang Kahapon(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Richard Yap in Be Carefull with my Heart(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Alwyn Uytingco in Beki Boxer(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Television Actress',
          editing: false,
          items: [{
            title: 'Angel Locsin in The Legal Wife(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Maja Salvador in The Legal Wife(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Marian Rivera in Carmela(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Jennylyn Mercado in Rhodora X(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Anne Curtis in Dyesebel(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Jodi Sta Maria in Be Carefull with my Heart(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Bea Alonzo in Sana Bukas pa ang Kahapon(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title:  'Kim Chui in Ikaw Lamang(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Male Child Performer',
          editing: false,
          items: [{
            title: 'James "Bimbi" Yap in My little Bossings',
            editing: false,
            selected: false
          }, {
            title: 'David Remo in Nino(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'JM Ibanez in Be Careful with my Heart(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Clarrence Delgado in Home Sweetie Home(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: "Bugoy Cariño in Goin' Bulilit(ABS-CBN)",
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Female Child Performer',
          editing: false,
          items: [{
            title: 'Ryzza Mae Dizon in My little Bossings',
            editing: false,
            selected: false
          }, {
            title: 'Xyriel Manabat in Wansapanataym(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Jillian Ward in Kambal Sirena(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Mutya Orquia in Be Careful with my Heart(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Rhed Bustamante in The Borrowed Wife(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Teleserye',
          editing: false,
          items: [{
            title: 'The Legal Wife(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Rhodora X(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Carmela(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Ikaw Lamang(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Dyesebel(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Beki Boxer(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Be Careful with my Heart(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Sana Bukas pa ang Kahapon(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Sitcom',
          editing: false,
          items: [{
            title: 'Best Sitcom',
            editing: false,
            selected: false
          }, {
            title: 'Home Sweetie Home(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Vampire ang Daddy ko(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Pepito Manoloto(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Confessions of a Torpe(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'One of the Boys(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Gag Show',
          editing: false,
          items: [{
            title: 'Bubble Gang(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Banana Split(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: "Goin' Bulilit(ABS-CBN)",
            editing: false,
            selected: false
          }, {
            title: 'Wow Mali Pa Rin!(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Musical Variety Show',
          editing: false,
          items: [{
            title: 'A.S.A.P.(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Sunday All Stars(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Walang Tulugan(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Talk Show',
          editing: false,
          items: [{
            title: 'KrisTV(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Gandang Gabi Vice(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Mars (GMA)',
            editing: false,
            selected: false
          }, {
            title: 'The Ryzza Mae Show(GMA)',
            editing: false,
            selected: false
          }, {
            title:  'Face The People(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Talk Show Host',
          editing: false,
          items: [{
            title: 'Kris Aquino in KrisTV(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Vice Ganda in Gandang Gabi Vice(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Camille Prats in Mars(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Ryzza Mae Dizon in The Ryzza Mae Show(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Gelli De Bellen in Face The People(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Toni Gonzaga in The Buzz(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Entertainment News Program',
          editing: false,
          items: [{
            title: 'The Buzz (ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Startalk (GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Showbiz Police (TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Aquino and Abunda Tonight (ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Entertainment News Program Host',
          editing: false,
          items: [{
            title: 'Kris Aquino in Aquino and Abunda Tonight(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Boy Abunda in The Buzz(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Joey De Leon in Startalk(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Raymond Gutierrez in Showbiz Police(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Variety Show',
          editing: false,
          items: [{
            title: 'Showtime (ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Eat Bulaga (GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Variety Show Host',
          editing: false,
          items: [{
            title: 'Vice Ganda in Showtime(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Anne Curtis in Showtime(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Vic Sotto in Eat Bulaga(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Joey De Leon in Eat Bulaga(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Game Show',
          editing: false,
          items: [{
            title: 'Bet on your Baby(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Singing Bee(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Picture, Picture(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Celebrity Bluff(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Who Wants to be a Millionaire(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Killer Karaoke(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Game Show Host',
          editing: false,
          items: [{
            title: 'Judy Ann Santos-Agoncillo in Bet on your Baby(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Ryan Agoncillo in Picture, Picture(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Eugene Domingo in Celebrity Bluff(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Vic Sotto in Who Wants to be a Millionaire(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Michael V in Killer Karaoke(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Amy Perez in Singing Bee(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Drama Anthology',
          editing: false,
          items: [{
            title: 'Maalaala Mo Kaya (ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Magpakailanman (GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Minamahal (TV5)',
            editing: false,
            selected: false
          }]
        }]
      }, {
        title: 'NEWS PROGRAMS',
        editing: false,
        items: [{
          title: 'Best Morning Show',
          editing: false,
          items: [{
            title: 'Umagang Kay Ganda(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Unang Hirit(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Good Morning Club(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Morning Show Host',
          editing: false,
          items: [{
            title: 'Anthony Taberna in Umagang Kay Ganda(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Bernadette Sembrano in Umagang Kay Ganda(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Arnold Clavio in Unang Hirit(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Rhea Santos in Unang Hirit(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Cheryl Cosim in Good Morning Club(TV5)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best News Program',
          editing: false,
          items: [{
            title: 'TV Patrol(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: '24 Oras(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Bandila(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Saksi(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Aksyon(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'State of the Nation(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best News Program Male Anchor',
          editing: false,
          items: [{
            title: 'Noli De Castro in TV Patrol (ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Ted Failon in TV Patrol (ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Mike Enriquez in 24 Oras (GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Erwin Tulfo in Aksyon (TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Arnold Clavio in Saksi (GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Julius Babaw in Bandila (ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best News Program Female Anchor',
          editing: false,
          items: [{
            title: 'Korina Sanchez in TV Patrol(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Mel Tiangco in 24 Oras(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Jessica Soho in State of the Nation(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Cheryl Cosim in Aksyon(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Karen Davila in Bandila(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best News Public Affairs Talk Show',
          editing: false,
          items: [{
            title: 'Bottomline(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Tonight with Arnold Clavio(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Tunay na Buhay(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Tapatan Ni Tunying(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Magazine Show',
          editing: false,
          items: [{
            title: 'Rated K(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Kapuso mo, Jessica Soho(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Biyahe ni Drew(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Magazine Show Host',
          editing: false,
          items: [{
            title: 'Korina Sanchez in Rated K(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Jessica Soho in Kapuso mo, Jessica Soho(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Drew Arellano in Biyahe ni Drew(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Investigative Show',
          editing: false,
          items: [{
            title: 'Scene of the Crime Operatives(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Imbestigador(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Tutok Tulfo(TV5)',
            editing: false,
            selected: false
          }, {
            title: 'Investigative Documentaries(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Failon Ngayon(ABS-CBN)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Education Show',
          editing: false,
          items: [{
            title: 'Matanglawin(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: "Kap's Amazing Story(GMA)",
            editing: false,
            selected: false
          }, {
            title: 'Ibilib(GMA)',
            editing: false,
            selected: false
          }, {
            title: 'Salamat Doc(ABS-CBN)',
            editing: false,
            selected: false
          }, {
            title: 'Born to be Wild(GMA)',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best Documentary Show',
          editing: false,
          items: [{
            title: 'I-Witness(GMA)',
            editing: false,
            selected: false
          }, {
            title: "Reporter's Notebook(GMA)",
            editing: false,
            selected: false
          }, {
            title: 'Frontrow(GMA)',
            editing: false,
            selected: false
          }]
        }]
      }, {
        title: 'TV STATION',
        editing: false,
        items: [{
          title: 'Best Local TV Station',
          editing: false,
          items: [{
            title: 'CLTV36',
            editing: false,
            selected: false
          }, {
            title: 'PEP TV',
            editing: false,
            selected: false
          }, {
            title: 'ABS-CBN Pampanga',
            editing: false,
            selected: false
          }, {
            title: 'GNN 44 Informax',
            editing: false,
            selected: false
          }]
        }, {
          title: 'Best TV Station',
          editing: false,
          items: [{
            title: 'ABS-CBN',
            editing: false,
            selected: false
          }, {
            title: 'GMA',
            editing: false,
            selected: false
          }, {
            title: 'TV5',
            editing: false,
            selected: false
          }]
        }]
      }]
    })
  )

  Promise.all(promises).then(function () {
    process.exit();
  });
