import {EzJson} from '../../../ezlibrary/helpers/EzJson.js';

describe('EzJson', () => {
  describe('toJson', () => {
    test('should return "{}" for undefined input', () => {
      const result = EzJson.toJson(undefined);
      expect(result).toBe('{}');
    });

    test('should return "{}" for null input', () => {
      const result = EzJson.toJson(null);
      expect(result).toBe('{}');
    });

    test('should return JSON string using ezToJSON method if available', () => {
      const obj = {
        ezToJSON: jest.fn(() => '{"key": "value"}')
      };
      const result = EzJson.toJson(obj);
      expect(result).toBe('{"key": "value"}');
      expect(obj.ezToJSON).toHaveBeenCalled();
    });

    test('should return JSON string using toJson method if available', () => {
      const obj = {
        toJson: jest.fn(() => '{"key": "value"}')
      };
      const result = EzJson.toJson(obj);
      expect(result).toBe('{"key": "value"}');
      expect(obj.toJson).toHaveBeenCalled();
    });

    test('should handle indentValue and forHtmlDisplay options', () => {
      const obj = {
        key: 'value'
      };
      const indentValue = 2;
      const forHtmlDisplay = true;
      const result = EzJson.toJson(obj, indentValue, forHtmlDisplay);
      expect(result).toContain('{<br/>&nbsp;&nbsp;  \"key\": \"value\"<br/>&nbsp;&nbsp;}')
    });
  });
  describe('toJsonArray', () => {
    test('should return "[]" for undefined input', () => {
      const result = EzJson.toJsonArray(undefined);
      expect(result).toBe('[]');
    });

    test('should return "[]" for null input', () => {

      const result = EzJson.toJsonArray(null);
      expect(result).toBe('[]');
    });
  });
  describe('fromJson', () => {
    test('should return empty string for undefined input', () => {
      const result = EzJson.fromJson(undefined);
      expect(result).toBe(undefined);
    });

    test('should return empty string for null input', () => {
      const result = EzJson.fromJson(null);
      expect(result).toBe(null);
    });

    test('should return empty string for empty string input', () => {
      const result = EzJson.fromJson('');
      expect(result).toBe('');
    });

    test('should return parsed JSON object for valid JSON string input', () => {
      const jsonString = '{"key": "value"}';
      const result = EzJson.fromJson(jsonString);
      expect(result).toEqual({ key: 'value' });
    });

    test('should return original string if parsing fails and ignoreParseError is true', () => {
 
      const jsonString = '{"key": "value"'; // Invalid JSON
      global.console = { error: jest.fn() };
      const spy = jest.spyOn(global.console, 'error').mockImplementation();
      const result = EzJson.fromJson(jsonString, true);
      expect(result).toBe(jsonString);
      expect(spy).toHaveBeenCalled();
    });

    test('should log error if parsing fails and ignoreParseError is false', () => {
      const jsonString = '{"key": "value"'; 
      global.console = { error: jest.fn() };
      const spy = jest.spyOn(global.console, 'error').mockImplementation();
      const result = EzJson.fromJson(jsonString);
      expect(result).toBe(jsonString);
    });
  });
})