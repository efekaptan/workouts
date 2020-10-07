import { MigrationInterface, QueryRunner } from "typeorm";
import moment from 'moment';

export class Workout1602064799298 implements MigrationInterface {
    private readonly DATA = [{
        name: 'Belly Fat Burner',
        description: 'Fall in love with this popular workout as Andy pushes you through challenging core exercises and fat-burning cardio drills. Get ready to stay in the fat-burning zone as you blend high- and low-intensity exercises to keep your heart rate guessing. See for yourself why this is one of the best ways to train. Enjoy!',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3114-bellyfatburner/webapp-thumbnail-large.jpg'
    }, {
        name: 'Calorie Killer',
        description: '"Stay fit, slay fat." That\'s the motto for Calorie Killer! This is your go-to workout if you want to quickly lose weight and tone your entire body. Yvonne is a top motivator. She\'ll take you through a never boring calorie-crushing circuit. Prepare to get sweaty as you squat and lunge your way to getting toned and burning calories.',
        image: 'https://cdn4.service.prod.gymondo.io/content/rgTWaEzhbk7qUndj3FuTvx/webapp-thumbnail-large.jpg'
    }, {
        name: 'Feel Good',
        description: 'This 15-minute yoga class will release tension, stiffness and stress from your entire body. Anja will lead you through flows that will ground, energize and leave you feeling blissfully amazing. Remember to listen to your body and take the time to connect with your breath. Allow this practice to feel good in your body.',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3321-feelgood/webapp-thumbnail-large.jpg'
    }, {
        name: 'Sweat & Burn',
        description: 'Looking for a quick sweat? This intense workout will make you sweat buckets! Sweat & Burn is the perfect workout to burn some serious calories with quick and intense exercises. Bring your heart rate up, challenge your cardiovascular fitness and put a smile on your face for the next 25 minutes.',
        image: 'https://cdn4.service.prod.gymondo.io/content/rgTWaEzhbk7qUndj82cuez/webapp-thumbnail-large.jpg'
    }, {
        name: 'Rise & Shine',
        description: 'Wake up your mind and body with Rise & Shine. When you begin your day with yoga, your body is more energized and you\'ll feel mentally refreshed to take on whatever life throws your way. This invigorating sequence integrates strength, flexibility and toning elements as you\'re calmly guided through each flow. Prepare to face your day with renewed energy and strength',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3297-riseandshine/webapp-thumbnail-large.jpg'
    }, {
        name: 'Perfect Abs, Legs & Glutes',
        description: 'Target belly fat, tone your legs and lift your booty in today\'s workout from former professional dancer and trainer, Louisa Paterson. Louisa will lead you through effective exercises targeting your trouble areas. Get ready for squat walks to fire up your legs and glutes, plank twists to hit your obliques and bridge variations to target your booty. Shape and tone that beautiful body of yours!',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3213-perfectabslegsbutt/webapp-thumbnail-large.jpg'
    }, {
        name: 'Flex & Relax',
        description: 'Flex & Relax will lightly tax your muscles through strength-building asanas and slow and gentle flexibility exercises. As Sarah takes you through various movements and yoga-based postures, you\'ll develop a greater understanding of your body. You’ll also learn how to tap into the muscles you already have but are not using effectively, build strength and learn the foundations for more advanced techniques. In just 30 minutes, you\'ll feel like a new person!',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3296-flexandrelax/webapp-thumbnail-large.jpg'
    }, {
        name: 'Smart Start',
        description: 'New to fitness or starting back up? Welcome! This beginner-friendly full-body workout is a perfect place to start. Andy is an incredible motivator who will patiently guide you through simple moves in this fun-filled cardio workout. You\'ll start with a warm-up, then jump into a fat-burning cardio circuit and finish off with a gentle cool down. Lace-up those sneakers and let\'s get started.',
        image: 'https://cdn4.service.prod.gymondo.io/content/rgTWaEzhbk7qUnfThOJpAb/webapp-thumbnail-large.jpg'
    }, {
        name: 'Ballerina Arms & Abs',
        description: 'Burn up your abs and arms in just 20 minutes with this short and sweet barre workout from professional dancer, Louisa Paterson. Your arms and abs will be feeling tight and toned after this ballet-inspired workout. Focus your energy on push-up and plank variations and feel the burn. Louisa will finish off the session with a much-deserved stretch.',
        image: 'https://d11y8h2xe0qeoe.cloudfront.net/resources/3336-ballerinaarmsandabs/webapp-thumbnail-large.jpg'
    }, {
        name: 'Get Slim',
        description: 'Staying lean and fit is key to looking and feeling your best. Tackle all your get-healthy, be-stronger, love-your-body intentions with this exclusive bodyweight workout. Yvonne will help you feel better than you\'ve ever felt before. In just 22 minutes, you\'ll skip, squat and hop your way to getting slim. Ready to roll?',
        image: 'https://cdn4.service.prod.gymondo.io/content/rgTWaEzhbk7qUndj6WwAyj/webapp-thumbnail-large.jpg'
    }];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < 1000; i++) {
            const workout = this.DATA[this.getRandom(0, 9)];
            const category = `c${this.getRandom(1, 7)}`;
            const startDate = moment().startOf('month')
                .add(this.getRandom(0, 11), 'month')
                .add(this.getRandom(0, 30), 'day')
                .add(this.getRandom(0, 23), 'hour')
                .add(this.getRandom(0, 59), 'minute').toISOString();
            await queryRunner.query("Insert into Workout('name', 'description', 'startDate', 'category', 'image') values(:name, :description, :startDate, :category, :image)", [
                workout.name,
                workout.description,
                startDate,
                category,
                workout.image
            ]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
