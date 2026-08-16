
//Example training model with tensor flow
async function initialize() {
        // Fuerza a TensorFlow a usar el procesador normal
        await tf.setBackend('cpu');
        console.log("Backend actual:", tf.getBackend());
        const userData = [
            { userId: 1, productId: 101, rating:5 },
            { userId: 1, productId: 102, rating:3 },
            { userId: 2, productId: 101, rating:4 },
            { userId: 2, productId: 103, rating:2 },
            { userId: 3, productId: 101, rating:5 },
            { userId: 3, productId: 104, rating:3 },
        ];

        const userTensor = tf.tensor2d(userData.map(item => [item.userId, item.productId]), [userData.length, 2]);
        const ratingTensor = tf.tensor2d(userData.map(item => [item.rating]), [userData.length, 1])

        const model = tf.sequential();
        model.add(
            tf.layers.dense({units: 50, activation: 'relu', inputShape: [2]})
        );
        model.add(tf.layers.dense({units: 1}));
        model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

        async function trainModel() {
            await model.fit(userTensor, ratingTensor, {
                epochs: 10,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        console.log('Epoch' + epoch + ':' + 'loss=' + logs.loss);
                    }
                }
            })
        }

        function generateRecommendation(userId, productId) {
            const newUserInput = tf.tensor2d([[userId, productId]]);
            const prediction = model.predict(newUserInput);
            prediction.print();
        }

        trainModel().then(() => {
            console.log('modelo entrenado');
            generateRecommendation(1, 103);
        })
    }
    initialize();