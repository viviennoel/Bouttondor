const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const measuresSchema = mongoose.Schema({
    userId: { type: String, required: true },
    datenow: { type: Number, required: true },
    gender: { type: String, required: true },
    unity: { type: String, required: true },
    measure1: { type: String, required: true  },
    measure2: { type: String, required: true  },
    measure3: { type: String, required: true  },
    measure4: { type: String, required: true  },
    measure5: { type: String, required: true  },
    measure6: { type: String, required: true  },
    measure7: { type: String, required: true  },
    measure8: { type: String, required: true  },
    measure9: { type: String, required: true  },
    measure10: { type: String, required: true  },
    measure11: { type: String, required: true  },
    measure12: { type: String, required: true  },
    measure13: { type: String, required: true  },
    measure14: { type: String, required: true },
    measure15: { type: String, required: true },
})

module.exports = mongoose.model('Measures', measuresSchema);