import fetch from "node-fetch";

const { DEPLOY_VERSION, TOKEN, DEPLOY_ENVIRONMENT } = process.env;
export async function DeployVersion() {
  console.log("Starting Deployment of Version:" + DEPLOY_VERSION);

  const deploymentConfig = {
    environment: DEPLOY_ENVIRONMENT || "preprod",
    ref: DEPLOY_VERSION,
    auto_merge: false
  };
  const deployment = await postRequest("deployments", deploymentConfig);
  console.log(`Deployment Created: ${deployment.id}`);

  try {
    await Promise.resolve(); // do something doesn't really matter
    console.log("Deployment Success");
    await postRequest(`deployments/${deployment.id}/statuses`, {
      state: "success"
    });
  } catch (e) {
    console.log("Deployment Failed");
    postRequest(`deployments/${deployment.id}/statuses`, {
      state: "failure"
    });
  }
}

async function postRequest(url: string, config: any) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `token ${TOKEN}`,
      "User-Agent": "Github-Actions"
    },
    body: JSON.stringify(config)
  };
  const response = await fetch(
    `https://api.github.com/repos/mikeswright49/github-actions-workflows/${url}`,
    options
  );
  return await response.json();
}

DeployVersion();
