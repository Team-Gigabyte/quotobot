PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Quotes(quote text not null, id int not null primary key, source text not null, usage int not null);
INSERT INTO Quotes VALUES('Never put off till to-morrow what you can do to-day.',1,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Never trouble another for what you can do yourself. ',2,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Never spend your money before you have it.',3,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Never buy what you do not want, because it is cheap; it will be dear to you.}',4,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Pride costs us more than hunger, thirst, and cold.}',5,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('We never repent of having eaten too little.}',6,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Nothing is troublesome that we do willingly.}',7,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('How much pain have cost us the evils which have never happened.',8,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('Take things always by their smooth handle.}',9,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('When angry, count ten, before you speak; if very angry, a hundred.}',10,'Thomas Jefferson',0);
INSERT INTO Quotes VALUES('It is better to offer no excuse than a bad one. }',11,'George Washington',0);
INSERT INTO Quotes VALUES('It is better to be alone than in bad company. }',12,'George Washington',0);
INSERT INTO Quotes VALUES('If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.}',13,'George Washington',0);
INSERT INTO Quotes VALUES('But lest some unlucky event should happen unfavorable to my reputation, I beg it may be remembered by every gentleman in the room that I this day declare with the utmost sincerity, I do not think myself equal to the command I am honored with.}',14,'George Washington',0);
INSERT INTO Quotes VALUES('A primary object should be the education of our youth in the science of government. In a republic, what species of knowledge can be equally important? And what duty more pressing than communicating it to those who are to be the future guardians of the liberties of the country?}',15,'George Washington',0);
INSERT INTO Quotes VALUES('Be courteous to all, but intimate with few, and let those few be well tried before you give them your confidence. True friendship is a plant of slow growth, and must undergo and withstand the shocks of adversity before it is entitled to appellation.}',16,'George Washington',1);
INSERT INTO Quotes VALUES('A free people ought not only to be armed, but disciplined; to which end a uniform and well-digested plan is requisite; and their safety and interest require that they should promote such manufactories as tend to render them independent of others for essential, particularly military, supplies.}',17,'George Washington',0);
INSERT INTO Quotes VALUES('Human happiness and moral duty are inseparably connected.}',18,'George Washington',0);
INSERT INTO Quotes VALUES('However [political parties] may now and then answer popular ends, they are likely in the course of time and things, to become potent engines, by which cunning, ambitious, and unprincipled men will be enabled to subvert the power of the people and to usurp for themselves the reins of government, destroying afterwards the very engines which have lifted them to unjust dominion.}',19,'George Washington',0);
INSERT INTO Quotes VALUES('99% of failures come from people who make excuses.}',20,'George Washington',0);
INSERT INTO Quotes VALUES('Guard against the impostures of pretended patriotism.}',21,'George Washington',0);
INSERT INTO Quotes VALUES('Labor to keep alive in your breast that little spark of celestial fire called conscience.}',22,'George Washington',0);
INSERT INTO Quotes VALUES('Perseverance and spirit have done wonders in all ages.}',23,'George Washington',0);
INSERT INTO Quotes VALUES('Associate yourself with men of good quality, if you esteem your own reputation; for ‘tis better to be alone than in bad company.}',24,'George Washington',0);
INSERT INTO Quotes VALUES('Few men have virtue to withstand the highest bidder.}',25,'George Washington',0);
INSERT INTO Quotes VALUES('Happiness depends more upon the internal frame of a person’s own mind, than on the externals in the world.}',26,'George Washington',0);
INSERT INTO Quotes VALUES('Experience teaches us that it is much easier to prevent an enemy from posting themselves than it is to dislodge them after they have got possession. }',27,'George Washington',0);
INSERT INTO Quotes VALUES('The harder the conflict, the greater the triumph}',28,'George Washington',0);
INSERT INTO Quotes VALUES('Worry is the interest paid by those who borrow trouble.}',29,'George Washington',0);
INSERT INTO Quotes VALUES('The turning points of lives are not the great moments. The real crises are often concealed in occurrences so trivial in appearance that they pass unobserved.}',30,'George Washington',0);
INSERT INTO Quotes VALUES('Real men despise battle, but will never run from it.}',31,'George Washington',0);
INSERT INTO Quotes VALUES('Discipline is the soul of an army. It makes small numbers formidable; procures success to the weak, and esteem to all.}',32,'George Washington',0);
INSERT INTO Quotes VALUES('Citizens by birth or choice of a common country, that country has a right to concentrate your affections. The name of American, which belongs to you, in your national capacity, must always exalt the just pride of Patriotism, more than any appellation derived from local discriminations.}',33,'George Washington',0);
INSERT INTO Quotes VALUES('We should not look back unless it is to derive useful lessons from past errors, and for the purpose of profiting by dearly bought experience.}',34,'George Washington',0);
INSERT INTO Quotes VALUES('I read my eyes out and can''t read half enough...the more one reads the more one sees we have to read.',35,'John Adams',0);
INSERT INTO Quotes VALUES('Let us tenderly and kindly cherish therefore, the means of knowledge. Let us dare to read, think, speak, and write.',36,'John Adams',0);
INSERT INTO Quotes VALUES('Facts are stubborn things; and whatever may be our wishes, our inclinations, or the dictates of our passion, they cannot alter the state of facts and evidence.',37,'John Adams',0);
INSERT INTO Quotes VALUES('A Constitution of Government once changed from Freedom, can never be restored. Liberty, once lost, is lost forever.',38,'John Adams',0);
INSERT INTO Quotes VALUES('The longer I live, the more I read, the more patiently I think, and the more anxiously I inquire, the less I seem to know...Do justly. Love mercy. Walk humbly. This is enough.',39,'John Adams',0);
INSERT INTO Quotes VALUES('There is nothing which I dread so much as a division of the republic into two great parties, each arranged under its leader, and concerting measures in opposition to each other. This, in my humble apprehension, is to be dreaded as the greatest political evil under our Constitution.',40,'John Adams',0);
INSERT INTO Quotes VALUES('Posterity! you will never know how much it cost the present generation to preserve your freedom! I hope you will make a good use of it.',41,'John Adams',0);
INSERT INTO Quotes VALUES('I say, that Power must never be trusted without a check.',42,'John Adams',0);
INSERT INTO Quotes VALUES('Children should be educated and instructed in the principles of freedom. Aristotle speaks plainly to this purpose, saying, ''that the institution of youth should be accommodated to that form of government under which they live; forasmuch as it makes exceedingly for the preservation of the present government, whatsoever it be.',43,'John Adams',0);
INSERT INTO Quotes VALUES('Let the human mind loose. It must be loose. It will be loose. Superstition and dogmatism cannot confine it.',44,'John Adams',0);
INSERT INTO Quotes VALUES('I must judge for myself, but how can I judge, how can any man judge, unless his mind has been opened and enlarged by reading.',45,'John Adams',0);
INSERT INTO Quotes VALUES('To believe all men honest is folly. To believe none is something worse.',46,'John Adams',1);
INSERT INTO Quotes VALUES('Government has no right to hurt a hair on the head of an Atheist for his Opinions. Let him have a care of his Practices.',47,'John Adams',0);
INSERT INTO Quotes VALUES('You will never be alone with a poet in your pocket.',48,'John Adams',0);
INSERT INTO Quotes VALUES('The way to secure liberty is to place it in the people''s hands, that is, to give them the power at all times to defend it in the legislature and in the courts of justice.',49,'John Adams',0);
INSERT INTO Quotes VALUES('There is danger from all men. The only maxim of a free government ought to be to trust no man living with power to endanger the public liberty.',50,'John Adams',0);
INSERT INTO Quotes VALUES('The happiness of society is the end of government.',51,'John Adams',0);
INSERT INTO Quotes VALUES('Be not intimidated...nor suffer yourselves to be wheedled out of your liberties by any pretense of politeness, delicacy, or decency. These, as they are often used, are but three different names for hypocrisy, chicanery and cowardice.',52,'John Adams',0);
INSERT INTO Quotes VALUES('And liberty cannot be preserved without a general knowledge among the people who have a right from the frame of their nature to knowledge...',53,'John Adams',0);
INSERT INTO Quotes VALUES('Without the pen of Paine, the sword of Washington would have been wielded in vain.',54,'John Adams',0);
INSERT INTO Quotes VALUES('Laws for the liberal education of youth, especially of the lower class of people, are so extremely wise and useful, that, to a humane and generous mind, no expense for this purpose would be thought extravagant.',55,'John Adams',0);
INSERT INTO Quotes VALUES('Old minds are like old horses; you must exercise them if you wish to keep them in working order.',56,'John Adams',0);
INSERT INTO Quotes VALUES('Nineteen twentieths of [mankind is] opaque and unenlightened. Intimacy with most people will make you acquainted with vices and errors and follies enough to make you despise them.',57,'John Adams',0);
INSERT INTO Quotes VALUES('If worthless men are sometimes at the head of affairs, it is, I believe, because worthless men are at the tail and the middle',58,'John Adams',1);
INSERT INTO Quotes VALUES('When legislature is corrupted, the people are undone.',59,'John Adams',0);
INSERT INTO Quotes VALUES('The true source of our sufferings has been our timidity.',60,'John Adams',0);
INSERT INTO Quotes VALUES('Everything in life should be done with reflection.',61,'John Adams',0);
INSERT INTO Quotes VALUES('Great is the guilt of an unnecessary war.',62,'John Adams',0);
INSERT INTO Quotes VALUES('The jaws of power are always open to devour, and her arm is always stretched out, if possible, to destroy the freedom of thinking, speaking, and writing.',63,'John Adams',0);
INSERT INTO Quotes VALUES('Abuse of words has been the great instrument of sophistry and chicanery, of party, faction, and division of society.',64,'John Adams',0);
INSERT INTO Quotes VALUES('Property monopolized or in the possession of a few is a curse to mankind.',65,'John Adams',0);
INSERT INTO Quotes VALUES('Work smarter, not harder — something we should''ve followed more when making this.',66,'QB Devs',0);
INSERT INTO Quotes VALUES('Always make sure you know what work the other people in a group project will do before starting work on the project.',67,'QB Devs',0);
INSERT INTO Quotes VALUES('He seemed so devoted — a very slave — and there was a certain latent intensity in that love which had fascinated her.',68,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('Thus human beings judge of one another, superficially, casually, throwing contempt on one another, with but little reason, and no charity.',69,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('He was calmly eating his soup, laughing with pleasant good-humour, as if he had come all the way to Calais for the express purpose of enjoying supper at this filthy inn, in the company of his arch-enemy.',70,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('Those friends who knew, laughed to scorn the idea that Marguerite St. Just had married a fool for the sake of the worldly advantages with which he might endow her. They knew, as a matter of fact, that Marguerite St. Just cared nothing about money, and still less about a title.',71,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('"Money and titles may be hereditary," she would say, "but brains are not."',72,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('We seek him here, we seek him there, Those Frenchies seek him everywhere. Is he in heaven? — Is he in hell? That demmed, elusive Pimpernel?',73,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('How that stupid, dull Englishman ever came to be admitted within the intellectual circle which revolved round “the cleverest woman in Europe,” as her friends unanimously called her, no one ventured to guess—a golden key is said to open every door, asserted the more malignantly inclined.',74,'Scarlet Pimpernel by Baroness Orczy',0);
INSERT INTO Quotes VALUES('This is an example.',75,'QB Devs',0);
COMMIT;
