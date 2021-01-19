# Github Actions Workflows

A testing ground for various ideations on testing workflows.

## Custom Workflow Templates

There are currently 5 major templates for the following usages:

1. Manual Trigger: Do you want to trigger something manually? Well copy this one
2. Multi-triggered-deploy: On creation of a release tag, or a manual trigger, this will deploy code to a provided environment
3. PR CI: This will be used to verify that PRs are in a valid state before merging with the main branch
4. Publishing: Did you commit something? I bet that we want this to now have updates to the versions, and publish artifacts somewhere
5. Webhook Triggered: Want to trigger something from an external system to regenerate content based on a change in data? This is your guy. This can also be configured to read from deploy success events
