# Twilio Remove Recordings

Twilio上に保管されている録音データを日付を範囲指定して一括削除します

# Features

Twilioの管理コンソールでは、録音データを1件ずつしか削除できないため、日付を指定して一括削除するプログラムを作成しました

# Requirement

* node 10.8.0 以上
* dotenv 8.2.0
* moment 2.24.0
* twilio 3.39.5

# Installation

```zsh
git clone https://github.com/mobilebiz/twilio-remove-recordings.git
cd twilio-remove-recordings
npm install
cp .env.sample .env
```

`.env`をエディタで開き、TwilioのAccountSidとAuthTokenを書き込みます。  
AccountSidとAuthTokenは [こちら](https://jp.twilio.com/console) で調べられます。  
次に、`.env`のSTART_DATEとEND_DATEに削除したい日付を範囲指定します。日付は`2015-01-01`のように指定してください。  
**<注意>**  
日付を指定し間違えると、予期しないデータを削除することになりますので注意してください。

# Usage

`.env`ファイルを編集したら、まずはパラメータをテストしてください。

```zsh
npm test
```

エラーがなければ実行します。

```zsh
npm start
```

# Note

一度削除してしまった録音データは復活できません。  
日付範囲指定はくれぐれも間違えないようにしましょう。  
また、本プログラムを利用したことによる責任は、当方では負いかねますので予めご了承ください。  

# Author

* Katsumi Takahashi
* [Facebook](https://facebook.com/katsumi.takahashi)
* [Twitter](https://twitter.com/_katsumi)
* [Qiita](https://qiita.com/mobilebiz)

# License

"twilio-remove-recordings" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
