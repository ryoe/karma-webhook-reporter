# karma-webhook-reporter
Karma reporter plugin which will POST results to the configured URL

# Install
Coming soon!

# Configuration
In **karma.conf.js**, add the `webhook` reporter:
```
  reporters: ['webhook']
```

Add the `webHookReporter` configuration:
```
  webHookReporter: { 
    url: 'http://localhost:1337/',
    notify: {
      runComplete: true,
      runStart:    true,
      specFailure: true,
      specSkipped: false,
      specSuccess: false
    }
  }
```

- **url** - the URL to POST results
- **notify** - notify when...
  - **runComplete** - a test run completes (default: true)
  - **runStart** - a test run starts (default: true)
  - **specFailure** - a spec fails (default: true)
  - **specSkipped** - a spec is skipped (default: false)
  - **specSuccess** - a spec succeeds (default: false)
 