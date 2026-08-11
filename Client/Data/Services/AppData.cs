namespace KeyRequest.Client.Data.Services
{
    public class AppData
    {
        public string CompID { get; set; } = string.Empty;

        public bool KeyRequestReviewer { get; set; } = false;
        public bool KeyTicketApprover { get; set; } = false;
        public bool LockShop { get; set; } = false;
        public bool ReadOnly { get; set; } = false;
        public bool Admin { get; set; } = false;
    }
}