import { expect } from 'chai';
import parseSchemaFile from './parseSchemaFile';

describe('parseSchemaFile', function() {
  it('should be okay with an empty file', function() {
    expect(parseSchemaFile('')).to.deep.equal({ length: 0, fields: [] });
  });

  it('should throw on a malformed line', function() {
    expect(() => parseSchemaFile('foobar')).to.throw();
    expect(() => parseSchemaFile('fieldo,12')).to.throw();
  });

  it('should throw if the type is not INTEGER, BOOLEAN, or TEXT', function() {
    expect(() => parseSchemaFile('field,12,INTAGER'));
  });

  it('should properly parse a valid file', function() {
    const validFile = 'measure_id,10,TEXT\nperformance_year,4,INTEGER\nis_required,1,BOOLEAN\nminimum_score,2,INTEGER';
    expect(parseSchemaFile(validFile)).to.deep.equal({
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
    });
  });
});
