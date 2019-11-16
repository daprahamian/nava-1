import { expect } from 'chai';
import parseDataFile from './parseDataFile';
import { FileSchema } from './parseSchemaFile';

describe('parseDataFile', function() {
  const schema = {
    length: 17,
    fields: [
      {
        key: 'measure_id',
        length: 10,
        type: 'TEXT'
      },
      {
        key: 'performance_year',
        length: 4,
        type: 'INTEGER'
      },
      {
        key: 'is_required',
        length: 1,
        type: 'BOOLEAN'
      },
      {
        key: 'minimum_score',
        length: 2,
        type: 'INTEGER'
      }
    ]
  };

  it('should throw if a line is of an invalid length', function() {
    const data = 'IA_PCMH 20171 0\nACI_LVPP 20170-1\nCAHPS_1 2017010';
    expect(() => parseDataFile(data, schema as FileSchema)).to.throw();
  });

  it('should work for a valid schema/data pairing', function() {
    const data = 'IA_PCMH   20171 0\nACI_LVPP  20170-1\nCAHPS_1   2017010';

    expect(parseDataFile(data, schema as FileSchema)).to.deep.equal([
      {
        measure_id: 'IA_PCMH',
        performance_year: 2017,
        is_required: true,
        minimum_score: 0
      },
      {
        measure_id: 'ACI_LVPP',
        performance_year: 2017,
        is_required: false,
        minimum_score: -1
      },
      {
        measure_id: 'CAHPS_1',
        performance_year: 2017,
        is_required: false,
        minimum_score: 10
      }
    ])
  });
});
