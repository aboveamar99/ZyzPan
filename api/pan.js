export default async function handler(req, res) {
  try {
    const { pan } = req.query;

    if (!pan) {
      return res.status(400).json({
        error: true,
        message: "PAN is required. Use ?pan=ABCDE1234F"
      });
    }

    const turtleUrl =
      `https://app.turtlefin.com/api/minterprise/v1/products/personal-loan/leads/existing-lead-by-pan?pan=${pan}`;

    const headers = {
      "authorization": "69e82d4f667f7e7939b7c5c5fa0c6063f6e5da0b5cf9559758feeb416a2f526c35961a754dc8ba81a2a99e6a07f9e28a",
      "x-broker": "turtlemint",
      "x-provider": "signzy",
      "x-partner-id": "68f61e4e310f4219c3aa846d",
      "x-tenant": "turtlemint",
      "user-agent": "Mozilla/5.0 (Android)",
      "accept": "application/json"
    };

    const extRes = await fetch(turtleUrl, { headers });
    const extData = await extRes.json();

    const data = extData?.data || {};

    const result = {
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      dob: data.dob || null,
      panStatus: data.panStatus || null,
      fullName: `${data.customerName || ""} ${data.firstName || ""} ${data.lastName || ""}`.trim(),
      success: true
    };

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Server Error",
      details: err.message
    });
  }
}
