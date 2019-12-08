# Unipäiväkirja

Tiimi: Marja, Pekka, Hanna, Santtu

## Johdanto

Projektin tarkoituksena on toteuttaa ja julkaista verkkopohjainen unipäiväkirjasovellus. Unipäiväkirjan laatimisessa sovelletaan Työterveyslaitoksen ja Käypä hoito -suosituksen mukaisia pohjia, joita lääkäri voi hyödyntää anamneesityökaluna. Käyttäjä on kuka tahansa, joka haluaa seurata ja selvittää omaa unirytmiään ja siihen vaikuttaneita ulkoisia asioita. Käyttäjä syöttää sovellukseen nukahtamis- ja heräämisajat sekä muita mahdollisia huomioita edellisestä unijaksosta. Käyttäjä saa palvelusta tiedon edellisistä uniajoistaan vertailua ja johtopäätöksiä varten. Projektin päättyessä valmiina on visuaalisesti miellyttävä ja teknisesti toimiva sovellusratkaisu.

Palvelutoteutaan Java Springboot kehystä käyttäen ja thymeleaf template engineä hyödyntäen. Tietokantajärejstelmänä toimii MariaDB. Sovelluksesta tehdään responsiivinen eli se toimii luontevasti kaikilla päätelaitteilla.

## Järjestelmän määrittely

Peruskäyttäjä on henkilö, joka palveluun kirjautumalla pystyy lisäämään, muokkaamaan, tarkastelemaan ja poistamaan omia tietojaan.

Tarkastelija on henkilö, joka palveluun kirjautumalla pystyy tarkastelemaan palveluun syötettyjä tietoja haluamansa peruskäyttäjän osalta. Tarkastelija voi olla esimerkiksi lääkäri tai terapiaryhmän vetäjä.

Järjestelmän toiminnot (peruskäyttäjä)
- palveluun rekisteröityminen
- sisäänkirjautuminen
- tietojen syöttäminen: nukahtamisaika, heräämisaika, unenlaadun arviointi, uneen vaikuttaneet ulkopuoliset seikat.
- tietojen tarkastelu eri aikaväleillä
- tietojen muokaaminen
- tietojen poistaminen
- tarkasteluoikeuden myöntäminen
- uloskirjautuminen

Järjestelmän toiminnot (tarkastelija)
- palveluun rekisteröityminen
- sisäänkirjautuminen
- tarkasteluoikeuden pyytäminen
- tarkasteltavan henkilön valinta
- tietojen tarkastelu eri aikaväleillä
- uloskirjautuminen


## Käyttöliittymä

Käyttöliittymäkaavio, peruskäyttäjä
![peruskäyttäjä](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/kayttoliittymakaavio_peruskayttaja.png)

Käyttöliittymäkaavio, tarkastelija
![tarkastelija](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/kayttoliittymakaavio_tarkastelija.png)

## Tietokanta

Kaavio
![tietokantakaavio](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/DB_final.PNG)

> ### User
> _User-taulu sisältää käyttäjätilit._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> user_id | int PK | Käyttäjän id
> name | varchar(50) |  Tilin nimimerkki
> password | varchar(50) | Tilin salasana
> userLevel_id | int | Käyttäjätason id

> ### Permission
> _Permission-taulu sisältää luvat käyttäjän tietojen takasteluun. Lupa viittaa yhteen käyttäjään ja sillä on yksi tarkastelija._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> permission_id | int PK | Tilin id
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa, jolla on lupa tarkastella tietoja
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa, jonka tietoja voidaan tarkastella

> ### SleepPeriod
> _Unijaksot-taulu sisältää käyttäjien unijaksot. Unijakso liittyy aina yhteen päiväkirjamerkintään._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> user_id | int PK | Unijakson id
> startTime | DateTime | Unijakson alkuaika
> endTime | DateTime | Unijakson päättymisaika
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa

> ### Comment
> _Kommentit-taulu sisältää unijaksoon liittyvät kommentit ja laadun arvioinnin. Kommentilla on yksi kirjoittaja ja se liittyy koko vuorokauteen._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> comment_id | int PK | Kommentin id
> comment | varchar(200) | Kommentin sisältö.
> commentDate | DateTime | Kommentin päiväys.
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa
> sleepQuality | int FK | Unen laadun arviointi asteikolla.

> ### External
> _External-taulu sisältää vuorokauden unijaksoihin vaikuttaneet muut mahdolliset asiat, kuten kahvin, alkoholin tai lääkkeiden nauttimisen. Ulkoiset asiat liittyvät käyttäjään ja koko vuorokauteen._
>
> Kenttä | Tyyppi | Kuvaus
> ------ | ------ | ------
> external_id | int PK | Ulkoisen seikan id
> user_id | int FK | Viittaus käyttäjään [User](#User)-taulussa
> dateTime | DateTime | Seikan aikaleima.
> externalType | int | Seikan tyyppi.
> quantity | int | Seikan määrä, esim. alkoholiannokset.

## Tekninen kuvaus, jonka tietoja voidaan tarkastella

Teknisessä kuvauksessa esitetään järjestelmän toteutuksen suunnittelun tekniset
ratkaisut, esim.
-   Missä mikäkin järjestelmän komponentti ajetaan (tietokone, palvelinohjelma)
    ja komponenttien väliset yhteydet (vaikkapa tähän tyyliin:
    https://security.ufl.edu/it-workers/risk-assessment/creating-an-information-systemdata-flow-diagram/)
-   Palvelintoteutuksen yleiskuvaus
-   Keskeisten rajapintojen kuvaukset, esimerkit client-server -rajapinnan käytöstä (sekvenssikaaviot)
-   Toteutuksen yleiset periaatteet, esim. käyttäjän tunnistus, istunnonhallinta.

Tämän lisäksi

-   ohjelmakoodin tulee olla kommentoitua
-   luokkien, metodien ja muuttujien tulee olla kuvaavasti nimettyjä ja noudattaa
    johdonmukaisia nimeämiskäytäntöjä
-   ohjelmiston pitää olla organisoitu komponentteihin niin, että turhalta toistolta
    vältytään

## Testaus

Tässä kohdin selvitetään, miten ohjelmiston oikea toiminta varmistetaan
testaamalla projektin aikana: millaisia testauksia tehdään ja missä vaiheessa.
Testauksen tarkemmat sisällöt ja testisuoritusten tulosten raportit kirjataan
erillisiin dokumentteihin.

Tänne kirjataan myös lopuksi järjestelmän tunnetut ongelmat, joita ei ole korjattu.

## Asennustiedot

Järjestelmän asennus on syytä dokumentoida kahdesta näkökulmasta:

-   järjestelmän kehitysympäristö: miten järjestelmän kehitysympäristön saisi
    rakennettua johonkin toiseen koneeseen

-   järjestelmän asentaminen tuotantoympäristöön: miten järjestelmän saisi
    asennettua johonkin uuteen ympäristöön.

Asennusohjeesta tulisi ainakin käydä ilmi, miten käytettävä tietokanta ja
käyttäjät tulee ohjelmistoa asentaessa määritellä (käytettävä tietokanta,
käyttäjätunnus, salasana, tietokannan luonti yms.).

## Käynnistys- ja käyttöohje

Tyypillisesti tässä riittää kertoa ohjelman käynnistykseen tarvittava URL sekä
mahdolliset kirjautumiseen tarvittavat tunnukset. Jos järjestelmän
käynnistämiseen tai käyttöön liittyy joitain muita toimenpiteitä tai toimintajärjestykseen liittyviä asioita, nekin kerrotaan tässä yhteydessä.

Usko tai älä, tulet tarvitsemaan tätä itsekin, kun tauon jälkeen palaat
järjestelmän pariin !

## Tietosuojailmoitus

Tämä tietosuojailmoitus koskee Sleepdiary-palvelua ja henkilötietojen käsittelyä siinä. 

### Palvelussa käsiteltävät henkilötiedot 

- yksilöintitiedot: käyttäjätunnus, etunimi, sukunimi 
- yhteystiedot: sähköpostiosoite 

### Palvelussa käsiteltävät muut tiedot 

- Palveluun syötetyt unijaksot, unen laatuun vaikuttaneet ulkopuoliset tekijät, kommentit ja vireystilan arviointi 
- Tietojen tarkastelijan yhteystiedot 

### Henkilötietojen käyttötarkoitus ja käsittelyperuste 

Käytämme henkilötietoja ainoastaan käyttäjän yksilöimiseen. Palvelun tarjoaja ei luovuta tietoja kolmansille osapuolille. Palvelussa olevat tiedot pohjautuvat täysin henkilön itse ilmoittamiin tietoihin. Henkilö voi itse päättää jakaako tietonsa ensimerkiksi hoitosuhteesta vastaavalle taholle. 

### Henkilötietojen suojaus ja säilytysaika 

Henkilötietoihin pääsy on vain niillä henkilöillä, joille se työtehtäviensä vuoksi on tarpeen. Henkilötiedot on suojattu asiattomalta pääsyltä tai käsittelemiseltä.  

Tietoja säilytetään palvelussa kuusi kuukautta viimeisen merkinnän tekemisestä tai kunnes käyttäjä itse pyytää tietojen poistamista. Tietojen poistumisesta lähetetään henkilölle muistutusviesti kuukautta ennen poistumispäivää ilmoitettuun sähköpostiosoitteeseen.  

### Rekisteröidyn oikeudet 

Pyytää rekisterinpitäjältä pääsy häntä itseään koskeviin henkilötietoihin sekä oikeus pyytää kyseisten tietojen oikaisemista tai poistamista. 

Pyytää rekisterinpitäjältä häntä itseään koskevien henkilötietojen käsittelyn rajoittamista tai vastustaa käsittelyä sekä oikeutta siirtää tiedot järjestelmästä toiseen. 

Niiltä osin kuin henkilötietojen käsittely perustuu rekisteröidyn suostumukseen, oikeus peruuttaa suostumus milloin tahansa, tämän vaikuttamatta suostumuksen perusteella ennen sen peruuttamista suoritetun käsittelyn lainmukaisuuteen. 

Tehdä valitus henkilötiedon käsittelystä kansalliselle valvontaviranomaiselle, jos rekisteröity katsoo, että häntä koskevien henkilötietojen käsittelyssä rikotaan EU:n yleistä tietosuoja-asetusta. 

Voit tehdä oikeuksiesi käyttämistä koskevan pyynnön palvelussa.

![logo](https://raw.githubusercontent.com/hannayj/sleepdiary/master/images/logo_dark.png)
