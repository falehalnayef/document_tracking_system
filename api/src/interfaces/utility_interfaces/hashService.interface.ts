interface IHashService {
  hash(data: string, saltRounds: number): Promise<string>;
  compare(plainText: string, hashedValue: string): Promise<Boolean>;
}

export default IHashService;
