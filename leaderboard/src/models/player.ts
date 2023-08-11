import mongoose from 'mongoose';

// Interface that describes the properties
// required to create a new Player
interface PlayerAttrs {
  name: string;
  score: number;
}

// Interface that describes the properties
// that a Player Document has
interface PlayerDoc extends mongoose.Document {
  name: string;
  score: number;
}

// Interface that describes the properties
// a Player model has
interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

playerSchema.statics.build = (attrs: PlayerAttrs) => {
  return new Player(attrs);
};

const Player = mongoose.model<PlayerDoc, PlayerModel>('Player', playerSchema);

export { Player };
